class Order {
    email;
    name;
    unit;
    district;
    shop;
    #countyItems = JSON.stringify([
        { "award": "county", "type": "silks", "description": "County badges - silks", "price": 0.20, "quantity": 0 },
        { "award": "county", "type": "woven", "description": "County badges - woven (standard)", "price": 2, "quantity": 0 },
        { "award": "county", "type": "metal", "description": "County badges - metal", "price": 2.25, "quantity": 0 }
    ]);
    #ecoItems = JSON.stringify([
        { "award": "rainbows", "type": "metal", "description": "Rainbows Eco award - metal badge", "price": 3.00, "quantity": 0 },
        { "award": "rainbows", "type": "certificate", "description": "Rainbows Eco award - certificate", "price": 0.60, "quantity": 0 },
        { "award": "brownies", "type": "metal", "description": "Brownies Eco award - metal badge", "price": 3.00, "quantity": 0 },
        { "award": "brownies", "type": "certificate", "description": "Brownies Eco award - certificate", "price": 0.60, "quantity": 0 },
        { "award": "guides", "type": "metal", "description": "Guides Eco award - metal badge", "price": 3.00, "quantity": 0 },
        { "award": "guides", "type": "certificate", "description": "Guides Eco award - certificate", "price": 0.60, "quantity": 0 },
        { "award": "rangers", "type": "metal", "description": "Rangers Eco award - metal badge", "price": 3.00, "quantity": 0 },
        { "award": "rangers", "type": "certificate", "description": "Rangers Eco award - certificate", "price": 0.60, "quantity": 0 }
    ]);
    orderItems;
    deliveryOption = "Posted1";
    deliveryAddress;
    message;
    orderTotal = 0;

    orderDetails(sections) {
        let orderTotal = 0;
        let order = "";
        const orderItems = this.orderItems;
        const sectionRow = this.sectionRow;
        const itemRow = this.itemRow;
        Object.keys(sections).forEach(function (section) {
            const items = orderItems[section];
            order += sectionRow(section);
            for (const item of items) {
                order += itemRow(item.description, `${section}.${item.award}.${item.type}`, item.price, item.quantity);
                orderTotal += item.price * item.quantity;
            }
        });
        this.orderTotal = orderTotal.toFixed(2);
        return order;
    }
    sectionRow(section) {
        if (section === "county") {
            section = "County badges";
        } else if (section === "ecoaward") {
            section = "Eco awards";
        } else {
            section = section[0].toUpperCase() + section.slice(1);
        }
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
    get Message() { return this.message; }
    set Message(value) {
        this.message = value;
        this.save();
    }
    updateCustomer(name, email, unit, district, shop) {
        this.name = name;
        this.email = email;
        this.unit = unit;
        this.district = district;
        this.shop = shop;
        this.save();
    }
    resetItems(awards) {
        this.updateItems(awards, true);
    }
    updateItems(sections, clearWoven) {
        const orderItems = this.orderItems;
        console.log(sections, orderItems);
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
        const section = this.orderItems[item[0]];
        const sku = section.find(i => i.award == item[1] && i.type == item[2]);
        sku.quantity = value;
        this.save();
    }
    constructor() {
        this.orderItems = {
            "county": JSON.parse(this.#countyItems),
            "ecoaward": JSON.parse(this.#ecoItems)
        };
        this.save();
    }
}

const order = new Order();

(function ($) {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    $("#customer").on("change", function () {
        order.updateCustomer($("#order_name").val(), $("#order_email").val(), $("#order_unit").val(), $("#order_district").val(), $("#order_shop").val());
    });
    function girlsAwards() {
        const awardCount = { rainbows: 0, brownies: 0, guides: 0, rangers: 0 };
        const sections = {
            "county": { county: 0 },
            "ecoaward": { ...awardCount },
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
        if (order.orderTotal > 20) {
            /* only tracked options are available for postal */
            $("#deliveryDetails .form-check").eq(0).hide();
            $("#deliveryDetails .form-check").eq(1).hide();
            $("#deliveryDetails .form-check").eq(2).find("input").prop("checked", true);
        } else {
            $("#deliveryDetails .form-check").eq(0).show();
            $("#deliveryDetails .form-check").eq(1).show();
            $("#deliveryDetails .form-check").eq(0).find("input").prop("checked", true);
        }
    }
    const awards = girlsAwards();
    order.updateItems(awards);
    updateOrders(awards);

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
    $("#message").on("change", function () {
        order.Message = $(this).val();
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

    const data = {
        name: order.name,
        email: order.email,
        unit: order.unit,
        district: order.district,
        shop: order.shop,
        orderItems: order.orderItems,
        deliveryOption: order.deliveryOption,
        deliveryAddress: order.deliveryAddress,
        message: order.message,
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