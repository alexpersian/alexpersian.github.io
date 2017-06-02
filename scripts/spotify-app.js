/*
 * Created by alexpersian on 12/31/14.
 */
$(document).ready(function() {
    console.log('ready');

    // Authorization info
    var CLIENT_ID = "d96dcdaf6e674b46a1bf42d5f6367889";
    var AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    var REDIRECT_URI = "http://alexpersian.com/html/spotify-app.html";

    // Implicit Grant auth process
    // Referencing Spotify's example
    var stateKey = 'auth_state_key';

    // Parse out the parameters from the URL hash
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    };

    // Random string used for state value
    function generateRandomString(length) {
        var text = '';
        var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
        }
        return text;
    };

    var params = getHashParams();
    var accessToken = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);

    // Check if we have a valid access token already
    if (accessToken && (state == null || state !== storedState)) {
        alert('Authorization error...');
    } else {
        localStorage.removeItem(stateKey);
        if (accessToken) {
            $('#login').hide();
        } else {
            $('#query').prop('placeholder', 'Please login...');
            $('#query').prop('readonly', true);
            $('#search').hide();
        }
    }

    // Basic login auth flow
    $('#login').click(function login() {
        var state = generateRandomString(16);
        localStorage.setItem(stateKey, state);

        var authURL = 'https://accounts.spotify.com/authorize';
        authURL += '?response_type=token';
        authURL += '&client_id=' + encodeURIComponent(CLIENT_ID);
        authURL += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
        authURL += '&state=' + encodeURIComponent(state);

        window.location = authURL;
    });

    // Handlebars templates for DOM manipulation
    var searchTemplateSource = $("#search-template").html(),
        searchTemplate = Handlebars.compile(searchTemplateSource),
        searchResultsPlaceholder = $("#artist-results"),
        playingCssClass = 'playing',
        audioObject = null;

    var relatedTemplateSource = $("#related-template").html(),
        relatedTemplate = Handlebars.compile(relatedTemplateSource),
        relatedResultsPlaceholder = $("#related-artists");

    // Event listeners for buttons
    $('#search').click(function getInfo() {
        $('#current-artist').html('<img src="../images/ajax-loader.gif">');

        $("#albums, #artists").css('display', 'block');

        var query = $("#query").val();
        $('#query').val('');
        console.log(query);
        searchAlbums(query);
        getRelatedArtists(query);
    });

    // Handle pressing enter in input field
    $('#query').keydown(function(e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode === 13) {
            $('#search').trigger('click');
        }
    });

    // Search for albums done by the artist
    // Populates 'albums' column with album artwork
    var searchAlbums = function(query) {
        $('#current-artist').html('Results for: ' + query);

        $.ajax({
            type: 'GET',
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                console.log(response);
                searchResultsPlaceholder.html(searchTemplate(response));
            },
            error: function() {
                console.log('Error searching artist.');
            }
        });
    };

    // Grabs the related artists to the users search
    // Lists out the artists in the 'related artists' column
    var getRelatedArtists = function(query) {
        var artistId;

        $.ajax({
            type: 'GET',
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'artist'
            },
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                console.log(response);
                artistId = response.artists.items["0"].id;
                $.ajax({
                    type: 'GET',
                    url: 'https://api.spotify.com/v1/artists/' + artistId + '/related-artists',
                    headers: {
                      'Authorization': 'Bearer ' + accessToken
                    },
                    success: function(response) {
                        console.log(response);
                        relatedResultsPlaceholder.html(relatedTemplate(response));
                    },
                    error: function() {
                        console.log('Error retrieving related artists.');
                    }
                });
            },
            error: function() {
                console.log('Error getting related artists.');
            }
        });
    };

    var fetchTracks = function(albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                callback(response);
            }
        });
    };

    // On album cover click, grabs track sample and begins to play it
    searchResultsPlaceholder.on('click', function(e) {
        var target = e.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function(data) {
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function() {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function() {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }
    });

    // On related artist click, refresh albums, but leave related artists up
    relatedResultsPlaceholder.on('click', function(e) {
        var choice = $(event.target).text();
        searchAlbums(choice);
    });
});
