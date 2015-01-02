/*
 * Created by alexpersian on 12/31/14.
 */

$(function() {
    console.log('ready');

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
        $('#current-artist').html('<img src="ajax-loader.gif">');
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
            success: function(response) {
                console.log(response);
                artistId = response.artists.items["0"].id;
                $.ajax({
                    type: 'GET',
                    url: 'https://api.spotify.com/v1/artists/' + artistId + '/related-artists',
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
