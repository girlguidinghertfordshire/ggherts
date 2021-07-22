jQuery(document).ready(function() {
    if (jQuery('.page-template-tp-noticeboard').length > 0) {
        if (jQuery('.col-sm-6').length < 8) {
            jQuery(".post-list > .row").addClass('all-loaded');
        }
    }
    equalheight('.full-height');
    jQuery(".drop-down > a").click(function() {
        jQuery(".drop-down").next().slideToggle("slow");
    });
    jQuery(".switcher").on("click touchstart", function(event) {
        event.preventDefault();
    });
    jQuery('.fancybox-media').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            media: {}
        }
    });
    jQuery(function() {
        jQuery('ul li:has(ul)').addClass('hassub');
    });
    jQuery('.letest-newsslider').owlCarousel({
        items: 1,
        loop: (jQuery(this).find('.row').length > 1) ? false : true,
        dots: false,
        nav: true
    });
    jQuery(".tweet-list ul").bxSlider({
        mode: 'vertical',
        slideWidth: 300,
        minSlides: 2,
        slideMargin: 10,
        pager: false
    });
    jQuery('.post-section .row').owlCarousel({
        items: 3,
        loop: (jQuery(this).find('.post-section .row').length > 1) ? false : true,
        dots: false,
        nav: (jQuery(".post-section .post").length > 1) ? true : false,
        margin: 30,
        responsiveRefreshRate: 500,
        responsive: {
            0: {
                items: (jQuery(".post-section .post").length > 1) ? true : false,
                singleItem: true,
                loop: (jQuery(".post-section .post").length > 1) ? true : false,
            },
            720: {
                items: 3,
                margin: 15,
            },
            1000: {
                items: 3
            }
        }
    });
    jQuery('.team-memberlist').owlCarousel({
        items: 3,
        loop: true,
        dots: false,
        nav: true,
        margin: 30,
        responsiveRefreshRate: 500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    jQuery(".single-slider").owlCarousel({
        navigation: true,
        singleItem: true,
        dots: false,
        nav: true,
        items: 1,
        loop: (jQuery(".single-slider .item").length > 1) ? true : false,
    });
    homeglobal_script();
    jQuery(".slider .slider-main.mobile").owlCarousel({
        navigation: true,
        singleItem: true,
        dots: false,
        nav: true,
        items: 1,        
        responsiveRefreshRate: 500,
        responsive: {
            0: {
                items: 1
            },            
            768: {
                items: 3,
                navigation:false,
                nav: false,
                autoWidth: true
            }
        },
        loop: (jQuery(this).find('.slider .slider-main li').length > 1) ? false : true,
        onResized: function() {
            homeglobal_script();
        }
    });
    jQuery(document).on("click touchstart", function(event) {
        if (jQuery(event.target).parents(".menu-header-container").length < 1 && !jQuery(event.target).hasClass("menu-header-container")) {
            jQuery("body").removeClass("menu-open");
            jQuery(".menu-header-container ul li").removeClass("open");
        }
    });
    jQuery('#back-down').click(function(event) {
        jQuery('body,html').animate({
            scrollTop: jQuery(".main-content").offset().top
        }, 1000);
        return false;
    });
    jQuery(".mobile-icon a").on("click touchstart", function(event) {
        event.preventDefault();
        event.stopPropagation();
        jQuery("body").toggleClass("menu-open");
    });
    if (jQuery(window).width() < 1025) {
        jQuery(".menu-header-container ul li > a").on("click touchstart", function(event) {
            if (!jQuery(this).parent().hasClass("open") && jQuery(this).parent().has("ul").length > 0) {
                event.preventDefault();
                event.stopPropagation();
                jQuery(this).parent().addClass("open").siblings().removeClass("open");
            }
        });
    }
    if (jQuery(".single-slider div.item").length) {
        var itemCount = jQuery(".single-slider div.item").length;
        if (itemCount <= 1) {
            jQuery('.owl-prev, .owl-next').hide();
        }
    }
    if (jQuery("#dob").length > 0) {
        jQuery("#dob").datepicker({
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-80:+0",
            dateFormat: 'dd/mm/yy',
        }).attr('readonly', 'readonly');
    }
    if (jQuery("#start-date, #end-date").length > 0) {
        jQuery("#start-date").datepicker({
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-80:+0",
            onSelect: function(date) {
                var date2 = jQuery('#start-date').datepicker('getDate');
                var end = jQuery('#end-date').datepicker('getDate');
                date2.setDate(date2.getDate());
                jQuery('#end-date').datepicker('option', 'minDate', date2);
            },
        }).attr('readonly', 'readonly');
        jQuery("#end-date").datepicker({
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-80:+0",
            onSelect: function(date) {
                var date1 = jQuery('#end-date').datepicker('getDate');
                var start = jQuery('#start-date').datepicker('getDate');
                date1.setDate(date1.getDate());
                if (!start) {
                    jQuery('#start-date').datepicker('setDate', date1);
                }
                jQuery('#start-date').datepicker('option', 'maxDate', date1);
                generateUrl();
            }
        }).attr('readonly', 'readonly');
    }
    if (jQuery("#event-start-date, #event-end-date").length > 0) {
        jQuery("#event-start-date").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: 0,
            dateFormat: 'dd/mm/yy',
            yearRange: "0:+80",
            onSelect: function(date) {
                var date2 = jQuery('#event-start-date').datepicker('getDate');
                var end = jQuery('#event-end-date').datepicker('getDate');
                date2.setDate(date2.getDate());
                jQuery('#event-end-date').datepicker('option', 'minDate', date2);
            },
        }).attr('readonly', 'readonly');
        jQuery("#event-end-date").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: 0,
            dateFormat: 'dd/mm/yy',
            yearRange: "0:+80",
            onSelect: function(date) {
                var date1 = jQuery('#event-end-date').datepicker('getDate');
                var start = jQuery('#event-start-date').datepicker('getDate');
                date1.setDate(date1.getDate());
                if (!start) {
                    jQuery('#event-start-date').datepicker('setDate', date1);
                }
                jQuery('#event-start-date').datepicker('option', 'maxDate', date1);
                generateUrl();
            }
        }).attr('readonly', 'readonly');
    }
    jQuery('#subForm').submit(function(e) {
        e.preventDefault();
        jQuery('.submit-btn').html('Loading <i class="fa fa-spinner fa-spin"></i>');
        jQuery('.error-li').remove();
        jQuery('.success-li').remove();
        var newsName = jQuery('#newsName').val();
        var newsEmail = jQuery('#newsEmail').val();
        if (newsName && newsEmail) {
            jQuery.ajax({
                type: "GET",
                url: adminurl,
                data: {
                    action: 'newsSubscribe',
                    newsName: newsName,
                    newsEmail: newsEmail
                },
                success: function(result) {
                    var responseData = JSON.parse(result);
                    jQuery('.sub-form-error').empty().append('<span class="' + responseData.msgclass + '">' + responseData.Success + '</span>');
                }
            });
            jQuery(this)[0].reset();
        } else {
            jQuery('.sub-form-error').empty().append('<span class="error-msg">Please Fill Details.</span>');
        }
        jQuery('.submit-btn').html('<button type="submit" class="wpcf7-submit wpcf7-form-control "><span>Subscribe</span></button>');
    });
    jQuery("#regiter-form").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg").show();
        jQuery('form#regiter-form span.error-msg').remove();
        jQuery('form#regiter-form span.success-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#regiter-form');
        jQuery('form#regiter-form').find('input,select').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'emailaddress' || field.name == 'confirmemail') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter email.</span>');
                    if (popError == false)
                        popError = true;
                } else if (!filter.test(field.value)) {
                    formTag.find('input[name="' + field.name + '"]').val('').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter a valid email.</span>');
                    if (popError == false)
                        popError = true;
                } else if (jQuery("#emailaddress").val() != jQuery("#confirmemail").val()) {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Email are not matach.</span>');
                    if (popError == false)
                        popError = true;
                }
            } else if (field.name == 'firstname' || field.name == 'lastname' || field.name == 'dob' || field.name == 'membershipnumber') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please fill in the required field.</span>');
                    if (popError == false)
                        popError = true;
                }
            } else if (field.name == 'password' || field.name == 'confirmpassword') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter password</span>');
                    if (popError == false)
                        popError = true;
                } else if (field.value.length < 6) {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Password should be minimum 6 character long.</span>');
                    if (popError == false)
                        popError = true;
                } else if (jQuery("#password").val() != jQuery("#confirmpassword").val()) {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Password are not matach.</span>');
                    if (popError == false)
                        popError = true;
                }
            }
        });
        if (popError == true) {
            formTag.addClass('invalid');
            jQuery(".loadmoreimg").hide();
            jQuery(".error-message").show();
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#regiter-form').serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('.register-form-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        jQuery('.register-form-error').empty().append('<span class="success-msg">' + responseData.message + '</span>');
                        setTimeout(function() {
                            window.location.href = responseData.redirect;
                        }, 3000);
                    }
                    jQuery(".loadmoreimg").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try again.")
                }
            });
        }
    });
    jQuery("#profile-form").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg").show();
        jQuery('form#profile-form span.error-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#profile-form');
        jQuery('form#profile-form').find('input,select').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'firstname' || field.name == 'lastname' || field.name == 'dob' || field.name == 'membershipnumber') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please fill in the required field.</span>');
                    if (popError == false)
                        popError = true;
                }
            }
        });
        if (popError == true) {
            formTag.addClass('invalid');
            jQuery(".loadmoreimg").hide();
            jQuery(".error-message").show();
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#profile-form').serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('.profile-form-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        window.location.href = responseData.redirect;
                    }
                    jQuery(".loadmoreimg").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try again.");
                }
            });
        }
    });
    jQuery("#password-form").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg2").show();
        jQuery('form#password-form span.error-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#password-form');
        jQuery('form#password-form').find('input,select').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'password' || field.name == 'confirmpassword' || field.name == 'oldpassword') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please fill in the required field.</span>');
                    if (popError == false)
                        popError = true;
                }
            }
            if (jQuery('#oldpassword').val() != '') {
                if (field.name == 'password' || field.name == 'confirmpassword') {
                    if (field.value == '') {
                        formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter password</span>');
                        if (popError == false)
                            popError = true;
                    } else if (field.value.length < 6) {
                        formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Password should be minimum 6 character long.</span>');
                        if (popError == false)
                            popError = true;
                    } else if (jQuery("#password").val() != jQuery("#confirmpassword").val()) {
                        formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Password are not matach.</span>');
                        if (popError == false)
                            popError = true;
                    }
                }
            }
        });
        if (popError == true) {
            formTag.addClass('invalid');
            jQuery(".loadmoreimg2").hide();
            jQuery(".error-message").show();
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#password-form').serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('.password-form-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        jQuery('.password-form-error').empty().append('<span class="success-msg">' + responseData.message + '</span>');
                        window.location.href = responseData.redirect;
                    }
                    jQuery(".loadmoreimg2").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try again.");
                }
            });
        }
    });
    jQuery("#login, #login-form").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg").show();
        jQuery('form#' + this.id + ' span.error-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#' + this.id);
        jQuery('form#' + this.id).find('input').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'emailaddress') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter <strong>email</strong></span>');
                    if (popError == false)
                        popError = true;
                } else if (!filter.test(field.value)) {
                    formTag.find('input[name="' + field.name + '"]').val('').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter a valid <strong>email </strong></span>');
                    if (popError == false)
                        popError = true;
                }
            } else if (field.name == 'password') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter <strong>Password</strong></span>');
                    if (popError == false)
                        popError = true;
                }
            }
        });
        if (popError == true) {
            jQuery(".loadmoreimg").hide();
            jQuery(".error-message").show();
            formTag.addClass('invalid');
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#' + this.id).serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('.login-form, .wpcf7-form').find('.login-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        window.location.href = responseData.redirect;
                    }
                    jQuery(".loadmoreimg").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try agian.")
                }
            });
        }
    });
    jQuery("#forgotpassword").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg").show();
        jQuery('form#forgotpassword span.error-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#forgotpassword');
        jQuery('form#forgotpassword').find('input').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'emailaddress') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter <strong>email</strong></span>');
                    if (popError == false)
                        popError = true;
                } else if (!filter.test(field.value)) {
                    formTag.find('input[name="' + field.name + '"]').val('').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter a valid <strong>email </strong></span>');
                    if (popError == false)
                        popError = true;
                }
            }
        });
        if (popError == true) {
            formTag.addClass('invalid');
            jQuery(".loadmoreimg").hide();
            jQuery(".error-message").show();
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#forgotpassword').serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('#forgotpassword').find('.forgotpassword-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        jQuery('#forgotpassword').find('.forgotpassword-error').empty().append('<span class="success-message">' + responseData.message + '</span>');
                    }
                    jQuery('#forgotpassword')[0].reset();
                    jQuery(".loadmoreimg").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try agian.")
                }
            });
        }
    });
    jQuery("#resetpassword").submit(function(event) {
        event.preventDefault();
        jQuery(".loadmoreimg").show();
        jQuery('form#resetpassword span.error-msg').remove();
        var data = {};
        var fieldName = '';
        var popMsg = '';
        var popError = false;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var formTag = jQuery('form#resetpassword');
        jQuery('form#resetpassword').find('input').each(function(i, field) {
            data[field.name] = field.value;
            fieldName = field.name;
            fieldName = fieldName.replace(/_/gi, " ");
            fieldName = fieldName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            if (field.name == 'password' || field.name == 'confirmpassword') {
                if (field.value == '') {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Please enter password.</span>');
                    if (popError == false)
                        popError = true;
                } else if (jQuery("#newpassword").val() != jQuery("#confirmpassword").val()) {
                    formTag.find('input[name="' + field.name + '"]').addClass('error wpcf7-not-valid').after('<span class="error-msg">Password are not matach.</span>');
                    if (popError == false)
                        popError = true;
                }
            }
        });
        if (popError == true) {
            formTag.addClass('invalid');
            jQuery(".loadmoreimg").hide();
            jQuery(".error-message").show();
            return false;
        } else {
            formTag.removeClass('invalid');
            jQuery(".error-message").hide();
            var form = jQuery('#resetpassword').serialize();
            jQuery.ajax({
                type: 'POST',
                url: adminurl,
                data: form,
                beforeSend: function() {},
                success: function(data) {
                    var responseData = JSON.parse(data);
                    if (responseData.result == 'fail') {
                        jQuery('#resetpassword').find('.resetpassword-error').empty().append('<span class="error-msg">' + responseData.message + '</span>');
                    } else {
                        jQuery('#resetpassword').find('.resetpassword-error').empty().append('<span class="success-message">' + responseData.message + '</span>');
                    }
                    jQuery('#resetpassword')[0].reset();
                    jQuery(".loadmoreimg").hide();
                },
                error: function() {
                    alert("Error: There is some issue please try agian.")
                }
            });
        }
    });
    jQuery(".post-list").on("click", '.load-more-btn', function(event) {
        event.preventDefault();
        jQuery('.load-more-btn').html('<a class="readmore" href="#">Loading <i class="fa fa-spinner fa-spin"></i></a>');
        var postsLength = jQuery('.newsletter-block, .listing-block, .noticeboard-list').length;
        var posttype = jQuery('#posttype').val();
        var loadlimit = jQuery('#loadlimit').val();
        var catstr = jQuery('#catstr').val();
        var keystr = jQuery('#keystr').val();
        var startdate = jQuery('#startdate').val();
        var enddate = jQuery('#enddate').val();
        var year = jQuery('#year').val();
        var monthnum = jQuery('#monthnum').val();
        jQuery.ajax({
            type: "GET",
            url: adminurl,
            data: {
                action: 'loadPost',
                postsLength: postsLength,
                posttype: posttype,
                loadlimit: loadlimit,
                catstr: catstr,
                keystr: keystr,
                startdate: startdate,
                enddate: enddate,
                year: year,
                monthnum: monthnum
            },
            success: function(result) {
                jQuery('.load-more-cnt').remove();
                var responseData = JSON.parse(result);
                if (responseData.nomore && responseData.nomore == 'nomore') {
                    jQuery(".post-list > .row").addClass('all-loaded');
                }
                jQuery(".post-list > .row").append(responseData.data);
                equalBlockHeight();
            }
        });
    })
    jQuery(".search-load").on("click", '.load', function(event) {
        event.preventDefault();
        var searchKey = jQuery('.search-load').attr('data-search');
        var articleLength = jQuery('article').length;
        jQuery.ajax({
            type: "GET",
            url: adminurl,
            data: {
                action: 'loadSearch',
                searchKey: searchKey,
                articleLength: articleLength
            },
            success: function(result) {
                var responseData = JSON.parse(result);
                jQuery(".serach-list").append(responseData.data);
                if (responseData.status_val != "Y") {
                    jQuery(".search-load").show();
                } else {
                    jQuery(".search-load").hide();
                }
            }
        });
    });
    var searchVal = getQueryVariable("s");
    jQuery('#s').val(searchVal);
    jQuery(".archiveOption").change(function() {
        window.location.href = jQuery(this).val();
    });
    jQuery(".shop-type-filters, .contact-type-filters, .loc-type-filters, .age-type-filters, .event-type-filters, .div-type-filters").change(function() {
        if (!jQuery(this).val()) {
            jQuery('.typecheck').prop("checked", false);
        } else {
            jQuery('.all-type').prop("checked", false);
        }
        generateUrl();
    });
    jQuery('.all-type').change(function() {
        jQuery('.shop-type-filters').prop("checked", false);
        generateUrl();
    });
    jQuery("#contactfilter").submit(function(event) {
        event.preventDefault();
        generateUrl();
    });
    jQuery(".custom-select").change(function(event) {
        event.preventDefault();
        generateUrl(jQuery(this));
    });
    jQuery(".clear-date").on('click', function() {
        generateUrl('clear_date');
    });
    jQuery('.searchform_main').submit(function() {
        search_value_main = jQuery.trim(jQuery('.searchform_main #s').val());
        if (search_value_main == "") {
            return false;
        }
    });
    jQuery("#uploadBtn").on("change", function() {
        document.getElementById("uploadFile").value = this.value;
    });
});
jQuery(window).resize(function() {
    equalheight('.full-height');
    equalheight('.eventshop-content h3');
    equalBlockHeight();
    homeglobal_script();
});
jQuery(window).load(function() {
    equalheight('.full-height');
    equalheight('.eventshop-content h3');
    equalBlockHeight();
    homeglobal_script();
    var script = document.createElement('script');
    script.setAttribute('src', '//w.sharethis.com/button/buttons.js');
    script.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(script);
});
function equalBlockHeight() {
    equalheight('.latest-post-block > h3');
    equalheight('.letest-newsslider .col-sm-6');
    equalheight('.letest-newsslider .col-sm-6 h3');
    equalheight('.event-list .event-block h3');
    equalheight('.person-block h3, .team-member h3');
    equalheight('.eventshop-block figure');
    equalheight('.eventshop-block h3');
    equalheight('.eventshop-content > .row');
    equalheight('.eventshop-block');
    equalheight('.listing-block > h3');
    equalheight('.listing-block');
    equalheight('.noticeboard-list > h3');
    equalheight('.noticeboard-list');
    equalheight('.shop_rows .business-block','h3');
    equalheight('.shop_rows .business-block','p');
    equalheight('.shop_rows .business-block');
    equalheight('.contact-dir-right .business-block > h3');
    equalheight('.contact-dir-right .business-block > span');
    equalheight('.contact-dir-right .business-block');
    equalheight('.country-right .person-block > span');
    equalheight('.country-right .person-block p');
    setTimeout(function() {
        equalheight('.country-right .person-block');
    }, 300)
    equalheight('.team-memberlist .team-member p');
    equalheight('.team-memberlist .team-member');
}
equalheight = function(container,child) {
    if (jQuery(window).width() > 767) {
        var currentTallest = 0, currentRowStart = 0, rowDivs = new Array(), $el, topPosition = 0;
        if (typeof(child)==='undefined' || child==null){
            jQuery(container).not(":hidden").each(function() {
                $el = jQuery(this);
                jQuery($el).height('auto')
                topPostion = $el.offset().top;
                if (currentRowStart != topPostion) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].innerHeight(currentTallest);
                    }
                    rowDivs.length = 0;
                    currentRowStart = topPostion;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.innerHeight()) ? ($el.innerHeight()) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].innerHeight(currentTallest);
                }
            });
        } else {
            jQuery(container).not(":hidden").find(child).each(function() {
                $el = jQuery(this);
                jQuery($el).height('auto')
                topPostion = $el.offset().top;
                if (currentRowStart != topPostion) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].innerHeight(currentTallest);
                    }
                    rowDivs.length = 0;
                    currentRowStart = topPostion;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.innerHeight()) ? ($el.innerHeight()) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].innerHeight(currentTallest);
                }
            });
        }
    } else {
        jQuery('.full-height').height('auto')
    }
}

function homeglobal_script() {
    /*var width=jQuery(".home-slider").width()/4;
    if (jQuery(window).width() > 767){
        jQuery(".slider-col-1").width(width);
        jQuery(".slider-col-2").width(width*2);
    }else{        
        jQuery(".slider-col-1").width("100%");
        jQuery(".slider-col-2").width("100%");
    }*/
    var mainHeight = jQuery(".home-slider .full-image").height();
    var sliderHeight = (mainHeight - 12) / 3;
    var doubleHeight = jQuery(".home .slider-main .double-height").outerHeight();
    var sliderhaftHeight = (doubleHeight - 6) / 2;
    console.log("mainHeight: " + mainHeight + ", sliderHeight: " + sliderHeight + ", doubleH: " + doubleHeight + ", sliderhaft: " + sliderhaftHeight);
    
    if (jQuery(window).width() > 767) {
        jQuery(".home .slider-main .double-height").height(doubleHeight);
        jQuery('.home-slider .haft figure').height(sliderhaftHeight);
        jQuery('.home .slider-main .three-block .single-height figure').height(sliderhaftHeight);
    } else {
        jQuery(".home .slider-main .double-height").height(150);
        jQuery('.home-slider .haft figure').height(150);
        jQuery('.home .slider-main .three-block .single-height figure').height(150);
    }
}
function generateUrl(thisVar) {
    var parem = new Array();
    var checboxes = jQuery('.contact-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var shopchecboxes = jQuery('.shop-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var locchecboxes = jQuery('.loc-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var agechecboxes = jQuery('.age-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var eventchecboxes = jQuery('.event-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var divchecboxes = jQuery('.div-type-filters:checked').map(function() {
        return this.value;
    }).get().join(',');
    var textinput = jQuery('#keyword').val();
    if (!thisVar && thisVar != 'clear_date') {
        var start_date = jQuery('#start-date').val();
        var end_date = jQuery('#end-date').val();
        var event_start_date = jQuery('#event-start-date').val();
        var event_end_date = jQuery('#event-end-date').val();
    }
    if (thisVar && thisVar != 'clear_date') {
        var select = thisVar.val();
    }
    if (checboxes || eventchecboxes || shopchecboxes) {
        if (eventchecboxes) {
            checboxes = eventchecboxes;
        }
        if (shopchecboxes) {
            checboxes = shopchecboxes;
        }
        parem.push('type=' + checboxes);
    }
    if (locchecboxes) {
        parem.push('loc=' + locchecboxes);
    }
    if (agechecboxes) {
        parem.push('age=' + agechecboxes);
    }
    if (divchecboxes) {
        parem.push('div=' + divchecboxes);
    }
    if (textinput) {
        parem.push('keyword=' + textinput);
    }
    if (select) {
        parem.push('per_page=' + select);
    }
    if (start_date && end_date) {
        parem.push('start=' + start_date);
        parem.push('end=' + end_date);
    }
    if (event_start_date && event_end_date) {
        parem.push('start=' + event_start_date);
        parem.push('end=' + event_end_date);
    }
    var finalStr = parem.join('&');
    var pageURl = jQuery('#pageURl').val();
    if (finalStr) {
        var finalurl = pageURl + '?' + finalStr;
    } else {
        var finalurl = pageURl;
    }
    window.location.href = finalurl;
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}
