"use strict";

$(document).ready(function () {

    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }


    $(document).on("click", ".uk-button, .uk-link", function (e) {
        if (!$(this).hasClass("on-progress")) {
            const selfThis = $(this);
            const action = hasValue(selfThis.attr("data-action")) ? selfThis.attr("data-action").trim() : null;
            const billType = hasValue(selfThis.attr("data-bill-type")) ? selfThis.attr("data-bill-type").trim() : null;

            if (action) {
                switch (action) {

                    case "toggleBillCard": {
                        let billName, billIdLabel
                        if (billType === 'paper-bill') {

                            $('#BillPayment').removeClass('uk-hidden')
                            billName = 'پرداخت با شناسه قبض';
                            billIdLabel = 'شناسه قبض'
                        } else {
                            $('#BillPayment').addClass('uk-hidden')
                            billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
                            if (billType <= 3) {
                                billIdLabel = 'شناسه قبض'
                            } else {
                                billIdLabel = hasValue(billType) ? billLableEnum[billType] : 'شناسه قبض';
                            }

                        }
                        $("#BillFormTitle").text(`${billName}`);
                        $("#BillIdLabel").text(`${billIdLabel}  رو وارد کن`);
                        $("#BillIdInput").attr("data-bill-type", billType).val("").attr("placeholder", billIdLabel);
                        toggleWizard("second-card");
                        e.preventDefault();
                        break;
                    }
                    case "returnFirstCard": {
                        toggleWizard("first-card");
                        e.preventDefault();
                        break;
                    }
                    case "billInquiry": {

                        if (billType <= 3) {
                            $('#BillFormContainer').html($('#BillFormTemplate').html())
                        } else {

                            $('#BillFormContainer').html($('#PhoneBillFormTemplate').html())
                        }
                        e.preventDefault();
                        break;
                    }
                    // case 'getElectricityBill':
                    //     if ($('#ElectricityBill').valid()) {
                    //         var billParams = $('#ElectricityBill').find(':input').not('#addToBillsManagement').serializeArray()
                    //         if ($("#addToBillsManagement").is(":checked")) {
                    //             billParams.push({ name: 'SaveInquiryResult', value: true });
                    //         }
                    //         billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                    //         var apiToken = { 'Token': getGhabzinoToken() }, combinedParams = $.extend(true, {}, billParams, apiToken);
                    //         ajaxHandler(billInquiryUrl + '/electricity', 'POST', toCamel(combinedParams), null, function (callback) {
                    //             billsHandler(billParams, callback, 'electricityBill');
                    //         });
                    //     }
                    //     e.preventDefault();
                    //     break;
                }
            }
        }
    });


    var combinedParams = {
        barghBillId: "9963197104126",
        token: "sdfsadfsdf"
    }
    ajaxHandler('https://shop.sep.ir/api/v1/bill-inquiry/electricity', 'POST', combinedParams, null, function (callback) {
        console.log(combinedParams)
    });
});
