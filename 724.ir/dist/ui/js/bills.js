"use strict";

$(document).ready(function () {

    const billInquiryUrl = 'http://localhost:43197/api/v1/bill-inquiry'
    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }

    const billsInputId = {
        1: "WatterBillId",
        2: "BarghBillId",
        3: "GazParticipateCode",
        4: "Phone",
        5: "Mobile",
    }
    const billsActions = {
        1: "getWaterBill",
        2: "getElectricityBill",
        3: "getGasBill",
        4: "getPhoneBill",
        5: "getMciBill",
    }
    const billsValidationRules = {
        1: "getWaterBill",
        2: "getElectricityBill",
        3: "getGasBill",
        4: "getPhoneBill",
        5: "getMciBill",
    }
    $('#BillForm').validate();
    $(document).on("click", ".uk-button, .uk-link", function (e) {
        if (!$(this).hasClass("on-progress")) {
            const selfThis = $(this);
            const action = hasValue(selfThis.attr("data-action")) ? selfThis.attr("data-action").trim() : null;
            const billType = hasValue(selfThis.attr("data-bill-type")) ? selfThis.attr("data-bill-type").trim() : null;

            if (action) {
                switch (action) {

                    case "showSecondCard": {
                        let billName, billIdLabel
                        if (billType === 'paper-bill') {

                            $('#BillPayment').removeClass('uk-hidden')
                            billName = 'پرداخت با شناسه قبض';
                            billIdLabel = 'شناسه قبض'
                        } else {
                            $('#BillPayment').addClass('uk-hidden')
                            billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
                            $("#BillId label").attr('for', billsInputId[billType]);
                            $("#BillId input").attr("id", billsInputId[billType]);
                            $("#BillId input").attr("name", billsInputId[billType]);
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]);
                            if (billType <= 3) {
                                billIdLabel = 'شناسه قبض'
                            } else {
                                billIdLabel = hasValue(billType) ? billLableEnum[billType] : 'شناسه قبض';
                            }
                        }

                        $("#BillFormTitle").text(`${billName}`);
                        $("#BillId label").text(`${billIdLabel}  رو وارد کن`);
                        $("#BillId input").attr("data-bill-type", billType).val("").attr("placeholder", billIdLabel);
                        toggleWizard("second-card");

                        $("#BillId input").rules('remove');

                        if (billType == 5) {
                            $("#BillId input").attr("maxlength", '11')
                            $("#BillId input").rules('add', { digits: true, cellNumber: true, rangelength: [11, 11] });
                        } else {
                            $("#BillId input").rules('add', { digits: true, minlength: 5 });
                            $("#BillId input").removeAttr("maxlength")
                        }

                        e.preventDefault();
                        break;
                    }
                    case "returnFirstCard": {
                        toggleWizard("first-card");
                        $('#BillForm').validate().resetForm()
                        e.preventDefault();
                        break;
                    }
                    case "returnSecondCard": {
                        toggleWizard("second-card");
                        e.preventDefault();
                        break;
                    }
                    case 'getElectricityBill':
                        if ($('#BillForm').valid()) {
                            const billParams = $('#BarghBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/electricity', 'POST', toCamel(billParams), null, function (callback) {

                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                    function showBillResponse(callback) {

                                    }

                                } else {
                                    const message = hasValue(callback.d.Status.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }
                            });
                        }
                        e.preventDefault();
                        break;
                    case 'getWaterBill':
                        if ($('#BillForm').valid()) {
                            const billParams = $('#WatterBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/water', 'POST', toCamel(billParams), null, function (callback) {
                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                    console.log(callback)
                                } else {
                                    const message = hasValue(callback.d.Status.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }

                            });
                        }
                        e.preventDefault();
                        break;
                }
            }
        }
    });

});
