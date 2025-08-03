"use strict";

$(document).ready(function () {

    const billInquiryUrl = 'http://localhost:43197/api/v1/bill-inquiry'
    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }


    function billsHandler(callback, billType) {

        if (!callback.hasOwnProperty('parameters') || !callback.parameters.hasOwnProperty('amount')) {
            UIkit.notification(langs.requirementsError, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }

        if (callback.parameters.amount == 0) {
            UIkit.notification(langs.noBillDebt, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });

            return false;
        }

        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
        const fullName = callback?.parameters?.fullName?.trim() || '';
        const billID = callback?.parameters?.billID?.toString().trim() || '';
        const amount = callback?.parameters?.amount?.toString().trim() || '';
        $("#BillInfoTitle").text(`${billName}`);

        const $template = $($('#BillInfoTemplate').html());
        $template.find('#BillName').text(`${billName} ${fullName}`);
        $template.find('#BillInfoId').text(`شناسه قبض: ${billID}`);
        $template.find('#BillAmount').text(commaSeparator(amount));
        $('#BillInfoContainer').html($template);
        toggleWizard('third-card')
    }

    function phoneBillsHandler(callback, billType, number) {

        const midTerm = callback?.parameters?.midTerm;
        const finalTerm = callback?.parameters?.finalTerm;
        const checkTerms = (!hasValue(midTerm) && !hasValue(finalTerm));
        const checkTermsAmount = (midTerm?.amount == 0 && finalTerm?.amount == 0);

        if (checkTerms || checkTermsAmount) {
            UIkit.notification(langs.noBillDebt, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }

        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
        $("#BillInfoTitle").text(billName);

        const $template = $($('#PhoneBillInfoTemplate').html());
        $template.find('#BillName').text(billName);
        $template.find('#BillNumber').text(`شماره ${billType == 4 ? 'تلفن' : 'موبایل'}: ${number}`);

        if (!midTerm?.amount || midTerm?.amount == 0) {
            $template.find('#BillMidAmount').text('0' + ' ' + langs.irr);
            $template.find('#MidtermAmount').attr('disabled', true);
        } else {
            $template.find('#BillMidAmount').text(commaSeparator(midTerm?.amount) + ' ' + langs.irr);
            $template.find('#MidtermAmount').removeAttr('disabled');
        }

        if (!finalTerm?.amount || finalTerm?.amount == 0) {
            $template.find('#BillFinalAmount').text('0' + ' ' + langs.irr);
            $template.find('#FinalTermAmount').attr('disabled', true);
        } else {
            $template.find('#BillFinalAmount').text(commaSeparator(finalTerm?.amount) + ' ' + langs.irr);
            $template.find('#FinalTermAmount').removeAttr('disabled');
        }

        $('#BillInfoContainer').html($template);
        toggleWizard('third-card');
    }

    function paperBillsHandler(billParams) {
        var billResult = getBillData(toCamel(billParams).billId, toCamel(billParams).payId);


        if (billResult.verificationBillId == false) {
            UIkit.notification(langs.invalidBillId, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }
        if (billResult.verificationBillPayment == false) {
            UIkit.notification(langs.invalidPaymentId, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }
        if (billResult.validationBill == false) {
            UIkit.notification(langs.invalidBill, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
            });
            return false;
        }

        ajaxHandler(asmxUrl + '/api/v1/bill/get-bill-info', 'GET', toCamel(billParams), null, function (callback) {

            if (callback.billAmount == 0) {
                UIkit.modal('#NoDebtModal').show();
                return false;
            }


        });
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
                        if (billType == 6) {

                            $('#BillPaymentInput').removeClass('uk-hidden')
                            billIdLabel = 'شناسه قبض'

                            billName = 'پرداخت با شناسه قبض و پرداخت';
                            $("#BillIdInput label").attr('for', billsInputId[billType]);
                            $("#BillIdInput input").attr("id", billsInputId[billType]).attr("name", billsInputId[billType]);
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]).attr("data-bill-type", billType);
                        } else {
                            $('#BillPaymentInput').addClass('uk-hidden')
                            billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
                            $("#BillIdInput label").attr('for', billsInputId[billType]);
                            $("#BillIdInput input").attr("id", billsInputId[billType]).attr("name", billsInputId[billType]);
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]).attr("data-bill-type", billType);
                            if (billType <= 3) {
                                billIdLabel = 'شناسه قبض'
                            } else {
                                billIdLabel = hasValue(billType) ? billLableEnum[billType] : 'شناسه قبض';
                            }
                        }

                        $("#BillFormTitle").text(`${billName}`);
                        $("#BillIdInput label").text(`${billIdLabel}  رو وارد کن`);
                        $("#BillIdInput input").attr("data-bill-type", billType).val("").attr("placeholder", billIdLabel);

                        toggleWizard("second-card");

                        $("#BillIdInput input").rules('remove');
                        if (billType == 4) {
                            $("#BillIdInput input").attr("maxlength", '11')
                            $("#BillIdInput input").rules('add', { digits: true, minlength: 11 });
                        } else if (billType == 5) {
                            $("#BillIdInput input").attr("maxlength", '11')
                            $("#BillIdInput input").rules('add', { digits: true, cellNumber: true, minlength: 11 });
                        } else if (billType == 6) {

                            $("#BillIdInput input").rules('add', { digits: true, minlength: 5 });
                            $("#BillPaymentInput input").rules('add', { digits: true, minlength: 5 });
                            $("#BillIdInput input").removeAttr("maxlength")

                        } else {
                            $("#BillIdInput input").rules('add', { digits: true, minlength: 5 });
                            $("#BillIdInput input").removeAttr("maxlength")
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
                                    billsHandler(toCamel(callback.d), billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }
                            }, true);
                        }
                        e.preventDefault();
                        break;
                    case 'getWaterBill':

                        if ($('#WatterBillId').valid()) {

                            let billParams = $('#WatterBillId').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/water', 'POST', toCamel(billParams), null, function (callback) {
                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                    billsHandler(toCamel(callback.d), billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }

                            }, true);
                        }
                        e.preventDefault();
                        break;
                    case 'getGasBill':
                        if ($('#GazParticipateCode').valid()) {

                            let billParams = $('#GazParticipateCode').serializeArray()

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            ajaxHandler(billInquiryUrl + '/gaz', 'POST', toCamel(billParams), null, function (callback) {
                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {

                                    billsHandler(toCamel(callback.d), billType)

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }
                            }, true);
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

                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {

                                    phoneBillsHandler(toCamel(callback.d), billType, billParams.Mobile);

                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }

                            }, true);
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

                                if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {

                                    phoneBillsHandler(toCamel(callback.d), billType, billParams.Phone);


                                } else {
                                    const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                    UIkit.notification(message, {
                                        status: "danger",
                                        pos: "bottom-center",
                                        timeout: 7000,
                                    });
                                }

                            }, true);
                        }
                        e.preventDefault();
                        break;
                    case 'getPaperBill':
                        if ($('#BillForm').valid()) {
                            var billParams = $('#BillForm').serializeArray(), billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                            paperBillsHandler(billParams)
                        }
                        e.preventDefault();
                        break;
                }
            }
        }
    });

});
