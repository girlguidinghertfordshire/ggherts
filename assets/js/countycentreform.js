 (function($, url, key){
    var errorGroup="has-error";
    $("#hgcForm").validate({
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element.form).find("label[for=" + element.id + "]").closest(".form-group")
            .addClass(errorGroup);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element.form).find("label[for=" + element.id + "]").closest(".form-group")
            .removeClass(errorGroup);
        },
        showErrors: function(){
            $(".error-summary").remove();
            if (this.numberOfInvalids()>0){
               $("form .row").prepend(`<div class="col-sm-12 error-summary"><div class="alert alert-danger"><i class="fa fa-warning"></i> There ${(this.numberOfInvalids()===1?"is":"are")} ${ this.numberOfInvalids()} fields which need your attention, see details below.</div></div>`); 
            }            
            this.defaultShowErrors();
        },
        errorClass: "help-block"
    });
    function updateForm(msg, canHideForm, isError){
        if (canHideForm){
            $("form").hide();
        }
        $("form").before(`<div class="alert alert-${(isError?"danger":"success")}">${msg}</div>`);
    }
    $(window).on("recaptchaSubmit", function(e){   
        console.log("event received...");
        $(".submit-btn").prop("disabled",true);
        $(".error-summary").remove();
        if (!$("#hgcForm").valid()){
            return;
        }
        var data= {
            name: $("#name").val(),
            email: $("#email_address").val(),
            phone: $("#phone_number").val(),
            message: $("#enquiry").val(),
            specialMessage: $("#enquirydetail").val(),
            recaptchaToken: e.detail.token
        };
        console.log(data,url,key);
        
        $.post(`${url}contactus?apikey=${key}`, JSON.stringify(data))
            .done(function(result){
                updateForm(result.statusMessage,true,false);
            })
            .fail(function(result){
                console.log(result);
                if (Object.prototype.hasOwnProperty.call(result, "status")) {
                    switch (result.status) {
                        case 400:
                            if (Object.prototype.hasOwnProperty.call(result, "responseJSON") && Object.prototype.hasOwnProperty.call(result.responseJSON, "hasValidationError")) {
                                updateForm(`An error occurred when processing your form: <ul><li>${result.responseJSON.statusMessage}</li></ul>`, false, true);
                                break;
                            }
                        // eslint-disable-next-line no-fallthrough
                        case 401:
                        case 404:
                            updateForm("Sorry, an error is preventing us from sending your form. Please contact us by email. We apologise for any inconvenience caused.", true, true);
                            break;
                        default:
                            alert(`${result.status}: ${result.statusText}`);
                    }
                    if (Object.prototype.hasOwnProperty.call(result, "responseJSON") && Object.prototype.hasOwnProperty.call(result.responseJSON, "statusMessage")) {
                        console.log(`${result.status}: ${result.statusText} - ${result.responseJSON.statusMessage}`);
                    } else {
                        console.log(`${result.status}: ${result.statusText}`);
                    }
                }
            });   
    })
 // eslint-disable-next-line no-undef
 })(jQuery, baseUrl, apikey);
    
    
// eslint-disable-next-line no-unused-vars
function onSubmit(token){
    const event=new CustomEvent("recaptchaSubmit",{bubbles:true, detail:{token:token}});
    console.log(event, this);
    this.dispatchEvent(event); 
}