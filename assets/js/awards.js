class Order {
    email;
    name;
    girls = [];
    #items = JSON.stringify([
        { "award": "bronze", "type": "certificate", "description": "Bronze Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "bronze", "type": "woven", "description": "Bronze Award - Woven Badge", "price": 1.1, "quantity": 0 },
        { "award": "bronze", "type": "metal", "description": "Bronze Award - Metal Badge", "price": 2.15, "quantity": 0 },
        { "award": "silver", "type": "certificate", "description": "Silver Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "silver", "type": "woven", "description": "Silver Award - Woven Badge", "price": 1.1, "quantity": 0 },
        { "award": "silver", "type": "metal", "description": "Silver Award - Metal Badge", "price": 2.15, "quantity": 0 },
        { "award": "gold", "type": "certificate", "description": "Gold Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "gold", "type": "woven", "description": "Gold Award - Woven Badge", "price": 1.1, "quantity": 0 },
        { "award": "gold", "type": "metal", "description": "Gold Award - Metal Badge", "price": 2.15, "quantity": 0 }
    ]);
    orderItems;
    deliveryOption = "Posted1";
    deliveryAddress;
    orderTotal = 0;

    girlRow() {
        const counter = this.girls.length - 1;
        return `<div class="row mb-3">
        <div class="col-1 col-lg-auto align-self-end">${counter + 1}.</div>
        <div class="col-7 col-md-4 col-lg">
            <label for="girlsName${counter}" class="form-label">Name:</label>
            <input type="text" class="form-control" minlength="3" maxlength="50" id="girlsName${counter}"
                name="girls_name_${counter}" required />
            <div class="invalid-feedback">Girls name is required</div>
        </div>
        <div class="col-4 col-md-2">
            <label for="girlsNumber${counter}" class="form-label">Memb<span class="d-none d-xxl-inline">ership</span> number:</label>
            <input type="tel" class="form-control" pattern="[0-9]{5,15}" minlength="5" maxlength="10" id="girlsNumber${counter}"
                name="girls_number_${counter}" required />
            <div class="invalid-feedback">Membership number is required</div>
        </div>
        <div class="col-1 d-md-none"></div>
        <div class="col-11 col-md-5 col-lg">
            <label for="girlsUnit${counter}" class="form-label">Unit:</label>
            <input type="text" class="form-control" minlength="3" id="girlsUnit${counter}" name="girls_number_${counter}" required />
            <div class="invalid-feedback">Unit name is required</div>
        </div>
        <div class="col-1 d-lg-none"></div>
        <div class="col-6 col-md-3 col-lg">
            <label for="girlsSection${counter}" class="form-label">Section:</label>
            <select id="girlsSection${counter}" class="form-select js-section">
                <option value="rainbows">Rainbows</option>
                <option value="brownies">Brownies</option>
                <option value="guides">Guides</option>
                <option value="rangers">Rangers</option>
            </select>
        </div>
        <div class="col-5 col-md-3 col-lg">
            <label for="girlsAward${counter}" class="form-label">Award:</label>
            <select id="girlsAward${counter}" class="form-select js-award">
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
            </select>
        </div>       
        <div class="col-1 d-md-none"></div>
        <div class="col-6 col-md-3 col-lg-auto mt-3 mt-lg-0">
            <div class="form-check">
                <label for="girlsComplete${counter}" class="form-check-label">Award completed?</label>
                <input type="checkbox" class="form-check-input mt-lg-2" id="girlsComplete${counter}" value="yes" />
            </div>
        </div>
        <div class="col-auto align-self-end d-none"><button type="button" class="btn btn-sm btn-outline-dark js-delete" id="girlsDelete${counter}" title="Remove recipient"><i class="fa fa-trash-o" aria-hidden="true"></i><span class="d-lg-none"> Remove</span</button>
    </div>`;
    }

    orderDetails(sections) {
        let orderTotal = 0;
        let order = "";
        const orderItems = this.orderItems;
        const sectionRow = this.sectionRow;
        const itemRow = this.itemRow;
        Object.keys(sections).forEach(function (section) {
            const awards = sections[section];
            const items = orderItems[section];
            if (awards["bronze"] > 0 || awards["silver"] > 0 || awards["gold"] > 0) {
                order += sectionRow(section);
            }
            for (const item of items) {
                if (awards[item.award] == 0) {
                    continue;
                }
                order += itemRow(item.description, `${section}.${item.award}.${item.type}`, item.price, item.quantity);
                orderTotal += item.price * item.quantity;
            }
        });
        this.orderTotal = orderTotal.toFixed(2);
        return order;
    }
    sectionRow(section) {
        section = section[0].toUpperCase() + section.slice(1);
        return `
        <tr>
            <th colspan="4" scope="colspan" class="bg-light-blue">${section}</th>
        </tr>`;
    }
    itemRow(description, id, price, quantity) {
        return `
        <tr>
            <th scope="row">${description}</th>
            <td class="text-end">${price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })}</td>
            <td><input type="number" id="${id}" value="${quantity}" class="form-control pull-right text-end" min="0" style="width:5em" /></td>
            <td class="text-end">${(price * quantity).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })}</td>
        </tr>`
    }
    save() {
        localStorage.setItem("awards", JSON.stringify(this));
    }

    get girlCount() {
        return this.girls.length;
    }
    get hasIncompleteAwards() {
        for (const girl of this.girls) {
            if (!girl.isComplete) {
                return true;
            }
        }
        return false;
    }
    get deliveryMethod() { return this.deliveryOption; }
    set deliveryMethod(value) {
        switch (value) {
            case "Posted1":
            case "Posted2":
            case "Posted3":
            case "Posted4":
            case "BadgeSecretary":
            case "WestHertsDepot":
                this.deliveryOption = value;
                break;
            default:
                throw new Error("Invalid delivery method");
        }
    }
    get Address() { return this.deliveryAddress; }
    set Address(value) {
        this.deliveryAddress = value;
        this.save();
    }
    addGirl() {
        this.girls.push(new Girl());
    }
    updateCustomer(name, email) {
        this.name = name;
        this.email = email;
        this.save();
    }
    updateGirls(id, value) {
        id = id.replace("girls", "");
        const row = id.replace(/\D+/,"");
        const field = id.replace(row, "");
        this.girls[row][field] = value;
        this.save();
    }
    resetItems(awards) {
        this.updateItems(awards, true);
    }
    updateItems(sections, clearWoven) {
        const orderItems = this.orderItems;
        Object.keys(sections).forEach(function (section) {
            const awards = sections[section];
            const items = orderItems[section];
            for (const sku of items) {
                if (sku.type !== 'woven') {
                    sku.quantity = awards[sku.award];
                } else {
                    sku.quantity = clearWoven ? 0 : sku.quantity;
                }
            }
        });
    }
    updateQuantity(id, value) {
        const item = id.split(".");
        var section = this.orderItems[item[0]];
        const sku = section.find(i => i.award == item[1] && i.type == item[2]);
        sku.quantity = value;
        this.save();
    }
    constructor() {
        this.girls.push(new Girl());
        this.orderItems = {
            "rainbows": JSON.parse(this.#items),
            "brownies": JSON.parse(this.#items),
            "guides": JSON.parse(this.#items),
            "rangers": JSON.parse(this.#items)
        };
        this.save();
    }
}

class Girl {
    name = "";
    membershipNumber = 0;
    isComplete = false;
    awardLevel = "Bronze"
    unit = "";
    section = "rainbows";

    /**
     * @param {string} value
     */
    set Name(value) {
        this.name = value;
    }
    /**
     * @param {number} value
     */
    set Number(value) {
        this.membershipNumber = value;
    }
    /**
     * @param {string} value
     */
    set Unit(value) {
        this.unit = value;
    }
    /**
     * @param {string} value
     */
    set Award(value) {
        this.awardLevel = value;
    }
    /**
     * @param {boolean} value
     */
    set Complete(value) {
        this.isComplete = value;
    }    
    /**
     * @param {string} value
     */
    set Section(value){
        this.section = value;
    }
    constructor(name, membershipNumber, isComplete, awardLevel, unit, section) {
        if (isComplete == null) {
            isComplete = false;
        }
        if (awardLevel == null) {
            awardLevel = "Bronze";
        }
        if (section == null){
            section="Rainbows";
        }
        this.name = name;
        this.membershipNumber = membershipNumber;
        this.isComplete = isComplete;
        this.awardLevel = awardLevel;
        this.unit = unit;
        this.section=section;
    }
}

const order = new Order();

(function ($) {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    const $recipients = $("#awardRecipients");
    $recipients.append(order.girlRow());
    $("#customer").on("change", function () {
        order.updateCustomer($("#order_name").val(), $("#order_email").val());
    });
    function isValid(fieldName) {
        const field = document.getElementById(fieldName);
        return field.checkValidity();
    }
    function girlsAwards() {
        const awardCount = { bronze: 0, silver: 0, gold: 0 };
        const sections = {
            "rainbows": Object.assign({}, awardCount),
            "brownies": Object.assign({}, awardCount),
            "guides": Object.assign({}, awardCount),
            "rangers": Object.assign({}, awardCount)
        };
        $(".js-award").each(function () {
            sections[$(this).closest(".row").find(".js-section").val()][$(this).val()]++;
        });
        return sections;
    }
    function updateOrders(awardCount) {
        $("#orderItems tr").remove();
        $("#orderItems").append(order.orderDetails(awardCount));
        $("#orderTotal").text(order.orderTotal.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }));
        if (order.orderTotal>20){
            /* only tracked options are available for postal */
            $("#deliveryDetails .form-check").eq(0).hide();
            $("#deliveryDetails .form-check").eq(1).hide();
            $("#deliveryDetails .form-check").eq(2).find("input").prop("checked",true);
        }else {
            $("#deliveryDetails .form-check").eq(0).show();
            $("#deliveryDetails .form-check").eq(1).show();
            $("#deliveryDetails .form-check").eq(0).find("input").prop("checked",true);
        }
    }
    $recipients.on("change", function (event) {
        const value = event.target.id.indexOf("Complete") > -1 ? $(event.target).prop("checked") : $(event.target).val();
        order.updateGirls(event.target.id, value);
        const lastRow = order.girlCount - 1;
        $("#incompleteNote").addClass("d-none");
        $("#goldAward").addClass("d-none");
        if (isValid(`girlsName${lastRow}`) && isValid(`girlsNumber${lastRow}`) && isValid(`girlsUnit${lastRow}`)) {
            $("#addGirl").prop("disabled", false);
            $("#sendOrder").prop("disabled", false);
            const awards = girlsAwards();
            if (event.target.id.indexOf("Award") > -1) {
                order.resetItems(awards);
            }
            $(".js-no-girls").hide();
            $(".js-has-girls").removeClass("d-none");
            Object.keys(awards).forEach(function (key) {
                const section = awards[key];
                if (section.gold > 0) {
                    $("#goldAward").removeClass("d-none");
                }
            })
            if (order.hasIncompleteAwards) {
                $("#incompleteNote").removeClass("d-none");
            }
            $("#orderDetails table").removeClass("d-none");
            order.updateItems(awards);
            updateOrders(awards);
        }
    });
    const $orderDetails = $("#orderDetails");
    $orderDetails.on("change", function (event) {
        order.updateQuantity(event.target.id, $(event.target).val());
        updateOrders(girlsAwards());
    });
    $("#deliveryDetails .form-check input").on("change", function () {
        const deliveryMethod = $(this).val();
        order.deliveryMethod = deliveryMethod;
        switch (order.deliveryMethod) {
            case "Posted1":
            case "Posted2":
            case "Posted3":
            case "Posted4":
                $("#postalAddress").prop("required", true);
                $(".js-collection").addClass("d-none");
                $(".js-posted").removeClass("d-none");
                break;
            case "BadgeSecretary":
            case "WestHertsDepot":
                $("#postalAddress").prop("required", false);
                $(".js-collection").removeClass("d-none");
                $(".js-posted").addClass("d-none");
                break;
            default:
                throw new Error("Invalid operation");
        }
    });
    $("#postalAddress").on("change", function () {
        order.Address = $(this).val();
    });
    $("#addGirl").on("click", function () {
        order.addGirl();
        $recipients.append(order.girlRow());
        $("#addGirl").prop("disabled", true);
        $("#sendOrder").prop("disabled", true);
    });
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!validateForm(form)) {
                    event.preventDefault();
                    event.stopPropagation();
                }

            }, false)
        })
    // eslint-disable-next-line no-undef
})(jQuery)

function validateForm(form) {
    $(".error-summary").remove();
    console.log(form);
    if (!form.checkValidity()) {
        console.log("form invalid");
        let errors = $(".form-control:invalid").length;
        if (errors > 0) {
            $("form .row").prepend(`<div class="col-sm-12 error-summary"><div class="alert alert-danger"><i class="fa fa-warning"></i> There ${(errors === 1 ? "is" : "are")} ${errors} fields which need your attention, see details below.</div></div>`);
            $(".error-summary").trigger("focus");
        }
        form.classList.add('was-validated');
        return false;
    }
    console.log("form valid");
    form.classList.add('was-validated');
    return true;
}
// eslint-disable-next-line no-unused-vars
function onSubmit(token) { // function is called by Recaptcha callback.
    $("#sendOrder").prop("disabled", true);
    if (!validateForm(document.forms[0])) {
        console.log("invalid form");
        return;
    }

    var data = {
        name: order.name,
        email: order.email,
        girls: order.girls,
        orderItems: order.orderItems,
        deliveryOption: order.deliveryOption,
        deliveryAddress: order.deliveryAddress,
        specialMessage: $("#enquirydetail").val(),
        recaptchaToken: token
    };
    console.log(data);

    function updateForm(msg, canHideForm, isError) {
        if (canHideForm) {
            $("form").hide();
        }
        $("form").before(`<div class="alert alert-${(isError ? "danger" : "success")}">${msg}</div>`);
    }
    // eslint-disable-next-line no-undef
    $.post(`${baseUrl}badgeorders?apikey=${apikey}`, JSON.stringify(data))
        .done(function (result) {
            updateForm(result.statusMessage, true, false);
        })
        .fail(function (result) {
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
}