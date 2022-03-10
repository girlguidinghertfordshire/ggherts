// Width in pixels for each breakpoint
var breakpoint = { xs:0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400};
// Mobile menu
(function ($) {
    var closeChildMenu = function (li) {
        $(li).removeClass("open");
        $(li).find("ul li:first").remove();
    };
    var closeAllChildMenus = function (parent) {
        if (typeof parent === "undefined")
            parent = $(".gg-menu");
        $(".open", parent).each(function () { closeChildMenu(this); });
    };
    var slidingMenu = function (openMenu) {
        $("#showmenu").toggleClass("active");
        if (openMenu) {
            $(".gg-sliding-frame").addClass("open").animate({ left: "-250px" }, 500);
        } else {
            $(".gg-sliding-frame").removeClass("open").animate({ left: "0" }, 500);
        }
    }
    var initialisePage = function () {
        if (window.innerWidth < breakpoint.lg) {
            if ($(".gg-menu").attr("style")!==''){
                $(".gg-menu").attr("style","");
            }
            $(".gg-sliding-frame,.main-content").css("min-height", document.documentElement.clientHeight);
            $(".gg-menu-fixed").css("height", document.documentElement.clientHeight);
            $("#showmenu").on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                slidingMenu(!$(".gg-sliding-frame").hasClass("open"));
            });
            $(".gg-content").on("click", function (event) {
                if ($(".gg-sliding-frame").hasClass("open")) {
                    event.preventDefault();
                    event.stopPropagation();
                    slidingMenu(false);
                }
            });

            $(".gg-menu .has-children>a").on("click", function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                var li = $(this).parent();
                if ($(li).hasClass("open")) {
                    closeChildMenu(li);
                } else {
                    closeAllChildMenus($(this).closest("ul"));
                    $(li).addClass("open");
                    var $a=$(this);
                    var firstLi = "<li><a href=\"" + $a.prop("href") + "\">" + $a.text() + "</a></li>";
                    $(li).find("ul:first").prepend(firstLi);
                }
            });        
        }else {
            if ($(".gg-sliding-frame").attr("style")!==''){
                $(".gg-sliding-frame").attr("style","");
            }
            $(".gg-sliding-frame,.main-content").css("min-height","auto");
            $(".gg-menu-fixed").css("height","auto");
            $(".gg-menu").css("right",$(document).width() - ($(".gg-search-form").position().left + $(".gg-search-form").width()));
        }
    };
    $(document).ready(function () {
        initialisePage();
    });
    $(window).on("resize", function () {
        $("#showmenu").off("click");
        initialisePage();
    });
// eslint-disable-next-line no-undef
})(jQuery);
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
    $(w).on("scroll resize", function () {
        lazyLoad();
    });
// eslint-disable-next-line no-undef
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
        $filters.each(function () {
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
        $(".eventshop-list .col").each(function () {
            if (showBlock($(this), $type, "type") && showBlock($(this), $age, "age-group") && showBlock($(this), $location, "location")) {
                $(this).show();
            }
        });
        $(".js-selected-filters").text($(".eventshop-list .col").filter(":visible").length + " events - "+ $(".division input:checked").length +" filters");
    }
    var initialiseFilters = function(){
        if (window.innerWidth < breakpoint.md){
            $(".js-selected-filters").text($(".eventshop-list .col").length + " events - no filters");
            $(".filter-result h4").on("click",function(){
                $(".filter-options").toggle();
            });
            $("#filterClose").on("click",function(){
                $(".filter-options").hide();
            });
        }
    }
    $(document).ready(function () {
        initialiseFilters();
        $(".division input").on("change", function () {
            console.log(this);
            filterPosts();
        });
    });
// eslint-disable-next-line no-undef
})(jQuery);
// Add in-page links for long pages
(function ($) {    
    var pages = ["challenge-badges"]; //classes added to main-content section used to filter which pages this runs on
    var page = pages.find(pageClass => $(".main-content").hasClass(pageClass));
    if (typeof(page)==="undefined" || page==null){
        return;
    }
    var $ul = $(`.${page} .gg-left-menu .nav-link.active`).parent().append("<ul/>");
    $(`.${page} .content h2`).each(function(){$ul.find("ul").append(`<li><a href="#${this.id}">${$(this).text()}</a></li>`)});
// eslint-disable-next-line no-undef
})(jQuery);