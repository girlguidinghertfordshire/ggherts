// @ts-check
/// <reference types="jquery" />
// Width in pixels for each breakpoint
const breakpoint = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };
// Mobile menu
(function (/** @type {JQueryStatic} */ $) {
    function closeChildMenu(/** @type {JQuery<HTMLElement>} */ $li) {
        $li.removeClass("open");
        $li.find("ul li:first").remove();
    }
    function closeAllChildMenus(/** @type {JQuery.PlainObject<any>} */ $ul) {
        if (typeof $ul === "undefined")
            $ul = $(".gg-menu ul:first");
        $(".open", $ul).each(function () { closeChildMenu($(this)); });
    }
    function slidingMenu(/** @type {boolean} */ openMenu) {
        $("#showmenu").toggleClass("active");
        if (openMenu) {
            $(".gg-sliding-frame").addClass("open").animate({ left: "-250px" }, 500);
        } else {
            $(".gg-sliding-frame").removeClass("open").animate({ left: "0" }, 500);
        }
    }
    function initialisePage() {
        if (window.innerWidth < breakpoint.lg) {
            if ($(".gg-menu").attr("style") !== '') {
                $(".gg-menu").attr("style", "");
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
                const $li = $(this).parent();
                if ($li.hasClass("open")) {
                    closeChildMenu($li);
                } else {
                    closeAllChildMenus($(this).closest("ul"));
                    $li.addClass("open");
                    const $a = $(this);
                    const firstLi = "<li><a href=\"" + $a.prop("href") + "\">" + $a.text() + "</a></li>";
                    $li.find("ul:first").prepend(firstLi);
                }
            });
        } else {
            if ($(".gg-sliding-frame").attr("style") !== '') {
                $(".gg-sliding-frame").attr("style", "");
            }
            $(".gg-sliding-frame,.main-content").css("min-height", "auto");
            $(".gg-menu-fixed").css("height", "auto");
            $(".gg-menu").css("right", $(document).width() - ($(".gg-search-form").position().left + $(".gg-search-form").width()));
        }
    }
    $.when($.ready).then(function () {
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
    const tweetList = d.querySelectorAll(".tweet-list")[0];
    const hgcmap = d.getElementById("hgcmap");
    const social = d.querySelectorAll(".social-media")[0];
    let isTwitterLoaded = false, isMapLoaded = false, isSocialLoaded = false;
    function lazyLoad() {
        const viewportHeight = w.innerHeight || d.documentElement.clientHeight;
        const tPos = tweetList.getBoundingClientRect().top;
        const mPos = hgcmap.getBoundingClientRect().top;
        const sPos = social.getBoundingClientRect().top;
        if (!isSocialLoaded && sPos - viewportHeight < 100) {
            isSocialLoaded = true;
            const script = document.createElement('script');
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
    function showBlock(/** @type {JQuery<HTMLElement>} */ $block, /** @type {JQuery<HTMLElement>} */ $filters, /** @type {string} */ dataName) {
        if (typeof ($block) === "undefined" || $block == null) {
            console.error("$block cannot be null");
            return true;
        }
        if ($filters.length == 0) {
            return true;
        }
        const categories = $block.data(dataName);
        if (typeof (categories) === "undefined" || categories == null) {
            console.warn("No data attribute: " + dataName);
            return true;
        }
        let canShowBlock = false;
        $filters.each(function () {
            if (categories.indexOf("|" + $(this).val() + "|") >= 0) {
                canShowBlock = true;
            }
        });
        return canShowBlock;
    }
    function filterPosts() {
        $(".filter-list .col").hide();
        const $type = $(".division.type input:checked");
        const $age = $(".division.age input:checked");
        const $location = $(".division.location input:checked");
        $(".filter-list .col").each(function () {
            if (showBlock($(this), $type, "type") && showBlock($(this), $age, "age-group") && showBlock($(this), $location, "location")) {
                $(this).show();
            }
        });
        $(".js-selected-filters").text(`${$(".filter-list .col").filter(":visible").length} ${$(".filter-list").data("type")} - ${$(".division input:checked").length } filters`);
    }
    function initialiseFilters() {
        if (window.innerWidth < breakpoint.md) {
            $(".js-selected-filters").text(`${$(".filter-list .col").length} ${$(".filter-list").data("type")} - no filters`);
            $(".filter-result h4").on("click", function () {
                $(".filter-options").toggle();
            });
            $("#filterClose").on("click", function () {
                $(".filter-options").hide();
            });
        }
    }
    $.when($.ready).then(function () {
        initialiseFilters();
        $(".division input").on("change", function () {
            filterPosts();
            const event=new CustomEvent("filterChanged",{bubbles:true, detail:{text:""}});
            this.dispatchEvent(event);
        });
    });
    // eslint-disable-next-line no-undef
})(jQuery);
// Add in-page links for long pages
(function ($) {
    const pages = ["challenge-badges", "resources", "thanks-awards-and-recognition","share-with-us"]; //classes added to main-content section used to filter which pages this runs on
    const page = pages.find(pageClass => $(".main-content").hasClass(pageClass));
    if (typeof (page) === "undefined" || page == null) {
        return;
    }
    const $li = $(`.${page} .gg-left-menu .nav-link.active`).parent();
    if ($li.find("ul").length==0){
        $li.append("<ul/>");
    } 
    const $ul=$li.find("ul");
    $(`.${page} .content h2`).each(function () { $ul.append(`<li><a href="#${this.id}">${$(this).text()}</a></li>`) });
    // eslint-disable-next-line no-undef
})(jQuery);
// Add in-page links for membership system pages
(function ($) {
    $.when($.ready).then(function () {
        const pages = ["membership-system-updates"]; //classes added to main-content section used to filter which pages this runs on
        const page = pages.find(pageClass => $(".main-content").hasClass(pageClass));
        if (typeof (page) === "undefined" || page == null) {
            return;
        }
        const menu = ".gg-left-menu";
        // @ts-ignore
        $("body").scrollspy({ target: menu, offset: 20 });
        $(".js-updates > section").each(function () {
            const $h3s = $(this).find("h3");
            const $section = $(this);
            if ($h3s.length > 0) {
                const id = this.id;
                const $menuLi = $(`${menu} a[href='#${id}']`).parent();
                $menuLi.append("<ul/>");
                $section.find("h2:first").after("<ul/>");
                const $menu = $menuLi.find("ul");
                $h3s.each(function () {
                    $menu.append("<li><a href='#" + this.id + "'>" + $(this).text() + "</a></li>");
                    $section.find("h2+ul").append("<li><a href='#" + this.id + "'>" + $(this).text() + "</a></li>");
                })
            }
        });
    });
    // eslint-disable-next-line no-undef
})(jQuery);