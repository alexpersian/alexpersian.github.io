$(document).ready(function($) {
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

    $("#blog-feed").rss(
        "http://blog.alexpersian.com/rss/",
        {
            limit: 4,
            effect: 'slideFastSynced',
            layoutTemplate: "<div class='item'>{entries}</div>",
            entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        }
    );
});