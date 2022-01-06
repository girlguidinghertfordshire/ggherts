// Lazy loader for footer content
(function ($, w, d) {
    var tweetList = d.querySelectorAll(".tweet-list")[0];
    var hgcmap = d.getElementById("hgcmap");
    var social = d.querySelectorAll(".social-media")[0];
    var isTwitterLoaded = false, isMapLoaded = false, isSocialLoaded = false;
    function lazyLoad() {
        var viewportHeight = w.innerHeight || d.documentElement.clientHeight;
        var tPos = tweetList.getBoundingClientRect().top;
        var mPos = hgcmap.getBoundingClientRect().top;
        var sPos = social.getBoundingClientRect().top;
        if (!isSocialLoaded && sPos - viewportHeight < 100) {
            isSocialLoaded = true;
            var script = document.createElement('script');
            script.setAttribute('src', '//w.sharethis.com/button/buttons.js');
            script.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        if (!isTwitterLoaded && (tPos - viewportHeight < 100)) {
            isTwitterLoaded = true;
            $("body").append('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />');
        }
        if (!isMapLoaded && (mPos - viewportHeight < 100)) {
            isMapLoaded = true;
            $("#hgcmap").append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4918.554001206864!2d-0.080472!3d51.94714!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x270a82ff6b880eb9!2sGirlguiding%20UK!5e0!3m2!1sen!2suk!4v1604057144990!5m2!1sen!2suk" width="100%" height="360" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0" title="Hertfordshire Guiding Centre Map"></iframe>')
        }
    }
    lazyLoad();
    $(w).on("scroll resize", function (e) {
        lazyLoad();
    });
})(jQuery, window, document);
// Filter for Events/Training pages
(function ($) {
    var showBlock = function ($block, $filters, dataName) {
        if (typeof ($block) === "undefined" || $block == null) {
            console.error("$block cannot be null");
            return true;
        }
        if ($filters.length == 0) {
            return true;
        }
        var categories = $block.data(dataName);
        if (typeof (categories) === "undefined" || categories == null) {
            console.warn("No data attribute: " + dataName);
            return true;
        }
        var showBlock = false;
        $filters.each(function (index, obj) {
            if (categories.indexOf("|" + $(this).val() + "|") >= 0) {
                showBlock = true;
            }
        });
        return showBlock;
    }
    var filterPosts = function () {
        $(".eventshop-list .col").hide();
        var $type = $(".division.type input:checked");
        var $age = $(".division.age input:checked");
        var $location = $(".division.location input:checked");
        $(".eventshop-list .col").each(function (index, obj) {
            if (showBlock($(this), $type, "type") && showBlock($(this), $age, "age-group") && showBlock($(this), $location, "location")) {
                $(this).show();
            }
        });
    }
    $(document).ready(function () {
        $(".division input").on("change", function (event) {
            console.log(this);
            filterPosts();
        });
    });
})(jQuery);