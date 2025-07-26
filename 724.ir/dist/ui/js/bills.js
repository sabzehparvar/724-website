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
                            $("#BillId input").attr("id", billsInputId[billType])
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
                        e.preventDefault();
                        break;
                    }
                    case "returnFirstCard": {
                        toggleWizard("first-card");
                        e.preventDefault();
                        break;
                    }
                    case "returnSecondCard": {
                        toggleWizard("second-card");
                        e.preventDefault();
                        break;
                    }
                    // case "billInquiry": {

                    //     if (billType <= 3) {
                    //         $('#BillFormContainer').html($('#BillFormTemplate').html())
                    //     } else {

                    //         $('#BillFormContainer').html($('#PhoneBillFormTemplate').html())
                    //     }
                    //     e.preventDefault();
                    //     break;
                    // }
                    case 'billInquiry':
                        if ($('#BillForm').valid()) {
                            var billParams = $('#BarghBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/electricity', 'POST', toCamel(billParams), null, function (callback) {
                                console.log(callback)
                                toggleWizard("third-card");
                            });
                        }
                        e.preventDefault();
                        break;
                }
            }
        }
    });

});
