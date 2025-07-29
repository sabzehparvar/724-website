"use strict";

$(document).ready(function () {

    const billInquiryUrl = 'http://localhost:43197/api/v1/bill-inquiry'
    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }


    function billsHandler(callback, billType) {

        if (!callback.hasOwnProperty('Parameters') || !callback.Parameters.hasOwnProperty('Amount') || !callback.Parameters.hasOwnProperty('ValidForPayment')) {
            UIkit.notification(langs.requirementsError, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }

        if (callback.Parameters.Amount == 0) {
            UIkit.notification(langs.noBillDebt, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });

            return false;
        }

        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
        $("#BillInfoTitle").text(`${billName}`);

        let $template = $($('#BillInfoTemplate').html());
        $template.find('#BillName').text(billName + ' ' + callback.Parameters.FullName.trim());
        $template.find('#BillInfoId').text(`شناسه قبض: ${callback.Parameters.BillID.trim()}`);
        $template.find('#BillAmount').text(commaSeparator(callback.Parameters.Amount))
        $('#BillInfoContainer').html($template);

        toggleWizard('third-card')
    }

    function phoneBillsHandler(callback, billType, number) {


        if (!callback?.parameters?.midTerm || !callback?.parameters?.finalTerm) {

            UIkit.notification(callback.status.description ? callback.status.description : langs.requirementsError, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }
        var checkTerms = (!hasValue(callback.parameters.midTerm) && !hasValue(callback.parameters.finalTerm)),
            checkTermsAmount = (callback.parameters.midTerm.amount == 0 && callback.parameters.finalTerm.amount == 0)

        if (checkTerms || checkTermsAmount) {
            UIkit.notification(langs.noBillDebt, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }

        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
        $("#BillInfoTitle").text(`${billName}`);

        let $template = $($('#PhoneBillInfoTemplate').html());
        $template.find('#BillName').text(billName);
        $template.find('#BillNumber').text(`شماره ${billType == 4 ? 'تلفن' : 'موبایل'}: ${number}`);
        $template.find('#BillMidAmount').text(commaSeparator(callback.parameters.midTerm.amount ? callback.parameters.midTerm.amount : '0') + ' ' + langs.irr)
        $template.find('#BillFinalAmount').text(commaSeparator(callback.parameters.finalTerm.amount ? callback.parameters.finalTerm.amount : '0') + ' ' + langs.irr)

        $('#BillInfoContainer').html($template);

        toggleWizard('third-card')
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
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]).attr("data-bill-type", billType);
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
                        } if (billType == 4) {
                            $("#BillId input").attr("maxlength", '11')
                            $("#BillId input").rules('add', { digits: true, rangelength: [11, 11] });
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

                        if ($('#BarghBillId').valid()) {

                            let billParams = $('#BarghBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/electricity', 'POST', toCamel(billParams), null, function (callback) {

                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                    billsHandler(callback.d, billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
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

                        if ($('#WatterBillId').valid()) {

                            let billParams = $('#WatterBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/water', 'POST', toCamel(billParams), null, function (callback) {
                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                    billsHandler(callback.d, billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
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
                    case 'getGasBill':
                        if ($('#GazParticipateCode').valid()) {

                            let billParams = $('#GazParticipateCode').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/gaz', 'POST', toCamel(billParams), null, function (callback) {
                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {

                                    billsHandler(callback.d, billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
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
                    case 'getMciBill':
                        if ($('#Mobile').valid()) {
                            let billParams = $('#Mobile').serializeArray();

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            if (validateCellNumber(toCamel(billParams).mobile) != 1) {
                                UIkit.notification(messageReFormat(langs.invalidOperatorNumber, langs.mci), {
                                    status: 'danger', pos: 'bottom-center', timeout: 7000
                                });
                                return false;
                            }
                            ajaxHandler(billInquiryUrl + '/mci-mobile', 'POST', toCamel(billParams), null, function (callback) {
                                phoneBillsHandler(toCamel(callback.d), billType, billParams.Mobile);
                            });
                        }
                        e.preventDefault();
                        break;
                    case 'getPhoneBill':
                        if ($('#Phone').valid()) {
                            let billParams = $('#Phone').serializeArray();

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null

                            if (validateCellNumber(toCamel(billParams).phone)) {
                                UIkit.notification(messageReFormat(langs.invalidOperatorNumber, langs.tci), {
                                    status: 'danger', pos: 'bottom-center', timeout: 7000
                                });
                                return false;
                            }

                            ajaxHandler(billInquiryUrl + '/fixed-line', 'POST', toCamel(billParams), null, function (callback) {
                                phoneBillsHandler(toCamel(callback.d), billType, billParams.Phone);
                            });
                        }
                        e.preventDefault();
                        break;
                }
            }
        }
    });

});
