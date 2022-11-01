class Order {
    email;
    name;
    girls = [];
    #items = JSON.stringify([
        { "award": "bronze", "type": "certificate", "description": "Bronze Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "bronze", "type": "woven", "description": "Bronze Award - Woven", "price": 1.1, "quantity": 0 },
        { "award": "bronze", "type": "metal", "description": "Bronze Award - Metal", "price": 2.15, "quantity": 0 },
        { "award": "silver", "type": "certificate", "description": "Silver Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "silver", "type": "woven", "description": "Silver Award - Woven", "price": 1.1, "quantity": 0 },
        { "award": "silver", "type": "metal", "description": "Silver Award - Metal", "price": 2.15, "quantity": 0 },
        { "award": "gold", "type": "certificate", "description": "Gold Award - Certificate", "price": 0.7, "quantity": 0 },
        { "award": "gold", "type": "woven", "description": "Gold Award - Woven", "price": 1.1, "quantity": 0 },
        { "award": "gold", "type": "metal", "description": "Gold Award - Metal", "price": 2.15, "quantity": 0 }
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
            <input type="tel" class="form-control" pattern="[0-9]{5,10}" minlength="5" maxlength="10" id="girlsNumber${counter}"
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
        <div class="col-auto align-self-end"><button type="button" class="btn btn-sm btn-outline-dark js-delete" id="girlsDelete${counter}" title="Remove recipient"><i class="fa fa-trash-o" aria-hidden="true"></i><span class="d-lg-none"> Remove</span</button>
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
            console.log(awards);
            const items = orderItems[section];
            if (awards["bronze"] > 0 || awards["silver"] > 0 || awards["gold"] > 0) {
                order += sectionRow(section);
            }
            for (const item of items) {
                if (awards[item.award] == 0) {
                    continue;
                }
                console.log(item);
                order += itemRow(item.description, item.award + "." + item.type, item.price, item.quantity);
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
            case "Badge Secretary":
            case "West Herts Depot":
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
        const row = id.substring(id.length - 1);
        const field = id.replace(row, "");
        console.log(`Field: ${field}, row: ${row}: ${value}`)
        this.girls[row][field] = value;
        console.log(this.girls);
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
            console.log(typeof (items));
            for (const sku of items) {
                if (sku.type !== 'woven') {
                    sku.quantity = awards[sku.award];
                } else {
                    sku.quantity = clearWoven ? 0 : sku.quantity;
                }
            }
        });
        console.log(this.orderItems);
    }
    updateQuantity(id, value) {
        console.log(`${id} - ${value}`);
        const item = id.split(".");
        const sku = this.items.find(i => i.award == item[0] && i.type == item[1]);
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
    constructor(name, membershipNumber, isComplete, awardLevel, unit) {
        this.name = name;
        this.membershipNumber = membershipNumber;
        this.isComplete = isComplete;
        this.awardLevel = awardLevel;
        this.unit = unit;
    }
}


(function ($) {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    const order = new Order();
    const $recipients = $("#awardRecipients");
    $recipients.append(order.girlRow());
    $("#customer").on("change", function () {
        console.log(`changes...${$("#order_name").val()} - ${$("#order_email").val()}`);
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
                console.log(`Gold awards ${section.gold}`);
                if (section.gold > 0) {
                    $("#goldAward").removeClass("d-none");
                }
            })
            console.log(`Incomplete awards? ${order.hasIncompleteAwards}`);
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
    $("#deliveryDetails .form-check input").on("change", function (event) {
        console.log(event.target.id);
        const deliveryMethod = $(this).val();
        order.deliveryMethod = deliveryMethod;
        switch (order.deliveryMethod) {
            case "Posted":
                $("#postalAddress").prop("required", true);
                $(".js-collection").addClass("d-none");
                $(".js-posted").removeClass("d-none");
                break;
            case "Badge Secretary":
            case "West Herts Depot":
                $("#postalAddress").prop("required", false);
                $(".js-collection").removeClass("d-none");
                $(".js-posted").addClass("d-none");
                break;
            default:
                throw new Error("Invalid operation");
        }
    });
    $("#postalAddress").on("change",function(){
        order.Address=$(this).val();
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
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    // eslint-disable-next-line no-undef
})(jQuery)