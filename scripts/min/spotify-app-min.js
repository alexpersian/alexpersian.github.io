$(document).ready(function(){console.log("ready");var t=$("#search-template").html(),e=Handlebars.compile(t),s=$("#artist-results"),a="playing",r=null,o=$("#related-template").html(),i=Handlebars.compile(o),c=$("#related-artists");$("#search").click(function d(){$("#current-artist").html('<img src="../images/ajax-loader.gif">'),$("#albums, #artists").css("display","block");var t=$("#query").val();$("#query").val(""),console.log(t),n(t),l(t)}),$("#query").keydown(function(t){var e=t.keyCode?t.keyCode:t.which;13===e&&$("#search").trigger("click")});var n=function(t){$("#current-artist").html("Results for: "+t),$.ajax({type:"GET",url:"https://api.spotify.com/v1/search",data:{q:t,type:"album"},success:function(t){console.log(t),s.html(e(t))},error:function(){console.log("Error searching artist.")}})},l=function(t){var e;$.ajax({type:"GET",url:"https://api.spotify.com/v1/search",data:{q:t,type:"artist"},success:function(t){console.log(t),e=t.artists.items[0].id,$.ajax({type:"GET",url:"https://api.spotify.com/v1/artists/"+e+"/related-artists",success:function(t){console.log(t),c.html(i(t))},error:function(){console.log("Error retrieving related artists.")}})},error:function(){console.log("Error getting related artists.")}})},u=function(t,e){$.ajax({url:"https://api.spotify.com/v1/albums/"+t,success:function(t){e(t)}})};s.on("click",function(t){var e=t.target;null!==e&&e.classList.contains("cover")&&(e.classList.contains(a)?r.pause():(r&&r.pause(),u(e.getAttribute("data-album-id"),function(t){r=new Audio(t.tracks.items[0].preview_url),r.play(),e.classList.add(a),r.addEventListener("ended",function(){e.classList.remove(a)}),r.addEventListener("pause",function(){e.classList.remove(a)})})))}),c.on("click",function(t){var e=$(event.target).text();n(e)})});