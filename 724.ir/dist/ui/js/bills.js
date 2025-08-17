"use strict";

$(document).ready(function () {
    const billInquiryUrl = "http://localhost:43197/api/v1/bill-inquiry";
    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }

    function showBillDetails(callback, element) {
        const data = {
            PaymentDate: hasValue(callback.paymentDate) ? callback.paymentDate.trim() : null,
            PayId: hasValue(callback.paymentID) ? callback.paymentID.toString().trim() : null,
            Address: hasValue(callback.address) ? callback.address.trim() : null,
        };

        const schema = [
            {
                key: "PayId",
                label: "شناسه پرداخت",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left fontface-vazir-fa",
                attrs: { dir: "ltr" }
            },
            {
                key: "PaymentDate",
                label: "مهلت پرداخت",
                labelClass: "uk-text-muted ",
                valueClass: "uk-text-left fontface-vazir-fa",
                attrs: { dir: "ltr" }
            },
            {
                key: "Address",
                label: "آدرس",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" }
            }
        ];

        const $table = $("<table>").addClass("uk-table uk-table-divider uk-margin-remove-bottom uk-margin-top");
        const $tbody = $("<tbody>").appendTo($table);

        schema.forEach((col) => {
            const raw = data[col.key];
            if (raw != null) {
                const formatted = col.formatter ? col.formatter(raw) : raw;
                if (formatted != null) {
                    const $tr = $("<tr>");
                    $("<td>").addClass(col.labelClass).text(col.label).appendTo($tr);

                    const $td = $("<td>").addClass(col.valueClass).appendTo($tr);
                    if (col.attrs) {
                        Object.entries(col.attrs).forEach(([key, val]) => $td.attr(key, val));
                    }
                    $td.text(formatted);

                    $tbody.append($tr);
                }
            }
        });

        element.find(".ui-bills-details").empty().append($table);
    }


    function billsHandler(callback, billType) {
        if (!callback.hasOwnProperty("parameters") || !callback.parameters.hasOwnProperty("amount")) {
            UIkit.notification(langs.requirementsError, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });
            return false;
        }

        if (callback.parameters.amount == 0) {
            UIkit.notification(langs.noBillDebt, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });

            return false;
        }
        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : "قبض";
        const fullName = callback?.parameters?.fullName?.trim() || "";
        const billId = callback?.parameters?.billID?.toString().trim() || "";
        const payId = callback?.parameters?.paymentID?.toString().trim() || "";
        const amount = callback?.parameters?.amount?.toString().trim() || "";
        $("#BillInfoTitle").text(`${billName}`);

        const $template = $($("#BillInfoTemplate").html());
        $template.find("#BillName").text(`${billName} ${fullName}`);
        $template.find("#BillInfoId").text(`شناسه قبض: ${billId}`);
        $template.find("#BillAmount").text(commaSeparator(amount));
        $template.find("#BillPayButton button").attr("data-billid", billId).attr("data-payid", payId);
        $template.find(".ui-bill-amount-icon img").attr("src", `./dist/ui/img/icon/app/${billsIcons[billType]}.svg`);
        $("#BillInfoContainer").html($template);
        showBillDetails(callback.parameters, $template);
        toggleWizard("third-card");
    }

    function phoneBillsHandler(callback, billType, number) {
        const midTerm = callback?.parameters?.midTerm;
        const finalTerm = callback?.parameters?.finalTerm;
        const checkTerms = !hasValue(midTerm) && !hasValue(finalTerm);
        const checkTermsAmount = midTerm?.amount == 0 && finalTerm?.amount == 0;

        if (checkTerms || checkTermsAmount) {
            UIkit.notification(langs.noBillDebt, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });
            return false;
        }

        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : "قبض";
        $("#BillInfoTitle").text(billName);

        const $template = $($("#PhoneBillInfoTemplate").html());
        $template.find("#BillName").text(billName);
        $template.find("#BillNumber").text(`شماره ${billType == 4 ? "تلفن" : "موبایل"}: ${number}`);
        $template.find(".ui-bill-amount-icon img").attr("src", `./dist/ui/img/icon/app/${billsIcons[billType]}.svg`);
        $template.find("#BillPayButton button").attr("data-billid", midTerm?.billID || "");

        if (!midTerm?.amount || midTerm?.amount == 0) {
            $template.find("#MidTermAmount").text("0" + " " + langs.irr);
            $template.find("#MidTermInput").attr("disabled", true).attr("checked", false);
        } else {
            $template.find('label[for="MidTermInput"]').attr("data-payid", midTerm?.paymentID || "");
            $template.find("#MidTermInput").removeAttr("disabled").attr("checked", true);
            $template.find("#MidTermAmount").text(commaSeparator(midTerm?.amount) + " " + langs.irr);
            $template.find("#BillPayButton button").attr("data-payid", midTerm?.paymentID || "");
        }

        if (!finalTerm?.amount || finalTerm?.amount == 0) {
            $template.find("#FinalTermAmount").text("0" + " " + langs.irr);
            $template.find("#FinalTermInput").attr("disabled", true);
        } else {
            $template.find('label[for="FinalTermInput"]').attr("data-payid", finalTerm?.paymentID || "");
            $template.find("#FinalTermAmount").text(commaSeparator(finalTerm?.amount) + " " + langs.irr);
            $template.find("#FinalTermInput").removeAttr("disabled");
        }

        $("#BillInfoContainer").html($template);
        toggleWizard("third-card");
    }

    function paperBillsHandler(billParams) {
        var billResult = getBillData(toCamel(billParams).billId, toCamel(billParams).payId);

        if (billResult.verificationBillId == false) {
            UIkit.notification(langs.invalidBillId, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });
            return false;
        }
        if (billResult.verificationBillPayment == false) {
            UIkit.notification(langs.invalidPaymentId, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });
            return false;
        }
        if (billResult.validationBill == false) {
            UIkit.notification(langs.invalidBill, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
            });
            return false;
        }

        ajaxHandler(
            asmxUrl + "/api/v1/bill/get-bill-info",
            "GET",
            toCamel(billParams),
            null,
            function (callback) {
                callback = toCamel(callback);
                if (hasValue(callback) && callback.isSuccess) {
                    if (!callback.data.billAmount || callback.data.billAmount === 0) {
                        UIkit.notification(langs.noBillDebt, {
                            status: "danger",
                            pos: "bottom-center",
                            timeout: 7000,
                        });
                        return;
                    }

                    const billName = hasValue(callback.data?.billType) ? callback.data?.billType : "قبض";
                    const billTypeId = hasValue(callback.data?.billTypeId) ? callback.data?.billTypeId : null;
                    const billId = callback?.data?.billId?.toString().trim() || "";
                    const payId = callback?.data?.payId?.toString().trim() || "";
                    const amount = callback?.data?.billAmount?.toString().trim() || "";

                    $("#BillInfoTitle").text(`${billName}`);
                    const $template = $($("#BillInfoTemplate").html());
                    $template.find("#BillName").text(`${billName}`);
                    $template.find("#BillInfoId").text(`شناسه قبض: ${billId}`);
                    $template.find("#BillAmount").text(commaSeparator(amount) + " " + langs.irr);
                    $template.find(".ui-bill-amount-icon img").attr("src", `./dist/ui/img/icon/app/${billsIcons[billTypeId] ? billsIcons[billTypeId] : "ic-paper-bill"}.svg`);
                    $template.find("#BillPayButton button").attr("data-billid", billId).attr("data-payid", payId);

                    $("#BillInfoContainer").html($template);
                    toggleWizard("third-card");
                } else {
                    const message = hasValue(callback?.status?.description) ? callback.status.description : langs.serviceException;
                    UIkit.notification(message, {
                        status: "danger",
                        pos: "bottom-center",
                        timeout: 7000,
                    });
                }
            },
            true
        );
    }

    $.validator.addMethod(
        "cellNumber",
        function (value, element) {
            return this.optional(element) || validateCellNumber(value);
        },
        validationMessage.cellNumber
    );

    $.validator.addMethod(
        "mciPostPaidNumber",
        function (value, element) {
            return this.optional(element) || validateMciPostPaidNumber(value);
        },
        validationMessage.mciPostPaidNumbers
    );

    $.validator.setDefaults({
        errorElement: "div",
        errorClass: "uk-text-danger uk-text-small uk-margin-small-top",
        ignore: ".ignore",
        onkeyup: function (element) {
            this.element(element);
        },
        highlight: function (element) {
            $(element).addClass("uk-form-danger");
        },
        unhighlight: function (element) {
            $(element).removeClass("uk-form-danger");
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest("div"));
        },
    });

    $("#BillForm").validate();

    $(document).on("click", ".uk-button, .uk-link", function (e) {
        if (!$(this).hasClass("on-progress")) {
            const selfThis = $(this);
            const action = hasValue(selfThis.attr("data-action")) ? selfThis.attr("data-action").trim() : null;
            const billType = hasValue(selfThis.attr("data-bill-type")) ? selfThis.attr("data-bill-type").trim() : null;

            if (action) {
                switch (action) {
                    case "showSecondCard": {
                        let billName, billIdLabel;
                        if (billType == 6) {
                            billIdLabel = "شناسه قبض";
                            billName = "پرداخت با شناسه";
                            $("#BillPaymentInput").removeClass("uk-hidden");
                            $("#BillPaymentInput input").val("");
                            $("#BillIdInput label").attr("for", billsInputId[billType]);
                            $("#BillIdInput input").attr("id", billsInputId[billType]).attr("name", billsInputId[billType]);
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]).attr("data-bill-type", billType);
                        } else {
                            $("#BillPaymentInput").addClass("uk-hidden");
                            billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : "قبض";
                            $("#BillIdInput label").attr("for", billsInputId[billType]);
                            $("#BillIdInput input").attr("id", billsInputId[billType]).attr("name", billsInputId[billType]);
                            $("#BillInquiryButton button").attr("data-action", billsActions[billType]).attr("data-bill-type", billType);
                            if (billType <= 3) {
                                billIdLabel = "شناسه قبض";
                            } else {
                                billIdLabel = hasValue(billType) ? billLableEnum[billType] : "شناسه قبض";
                            }
                        }

                        $("#BillFormTitle").text(`${billName}`);
                        $("#BillIdInput label").text(`${billIdLabel}  رو وارد کن`);
                        $("#BillIdInput input").attr("data-bill-type", billType).val("").attr("placeholder", billIdLabel);

                        toggleWizard("second-card");

                        $("#BillIdInput input").rules("remove");
                        if (billType == 4) {
                            $("#BillIdInput input").attr("maxlength", "11");
                            $("#BillIdInput input").rules("add", { digits: true, minlength: 11 });
                        } else if (billType == 5) {
                            $("#BillIdInput input").attr("maxlength", "11");
                            $("#BillIdInput input").rules("add", { digits: true, cellNumber: true, minlength: 11 });
                        } else if (billType == 6) {
                            $("#BillIdInput input").rules("add", { digits: true, minlength: 5 });
                            $("#BillPaymentInput input").rules("add", { digits: true, minlength: 5 });
                            $("#BillIdInput input").removeAttr("maxlength");
                        } else {
                            $("#BillIdInput input").rules("add", { digits: true, minlength: 5 });
                            $("#BillIdInput input").removeAttr("maxlength");
                        }

                        e.preventDefault();
                        break;
                    }
                    case "returnFirstCard": {
                        toggleWizard("first-card");
                        $("#BillForm").validate().resetForm();
                        e.preventDefault();
                        break;
                    }
                    case "returnSecondCard": {
                        toggleWizard("second-card");
                        e.preventDefault();
                        break;
                    }
                    case "getElectricityBill": {
                        if ($("#BarghBillId").valid()) {
                            let billParams = $("#BarghBillId").serializeArray();
                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                            ajaxHandler(
                                billInquiryUrl + "/electricity",
                                "POST",
                                toCamel(billParams),
                                null,
                                function (callback) {
                                    if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                        billsHandler(toCamel(callback.d), billType);
                                    } else {
                                        const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                        UIkit.notification(message, {
                                            status: "danger",
                                            pos: "bottom-center",
                                            timeout: 7000,
                                        });
                                    }
                                },
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "getWaterBill": {
                        if ($("#WatterBillId").valid()) {
                            let billParams = $("#WatterBillId").serializeArray();
                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                            ajaxHandler(
                                billInquiryUrl + "/water",
                                "POST",
                                toCamel(billParams),
                                null,
                                function (callback) {
                                    if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                        billsHandler(toCamel(callback.d), billType);
                                    } else {
                                        const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                        UIkit.notification(message, {
                                            status: "danger",
                                            pos: "bottom-center",
                                            timeout: 7000,
                                        });
                                    }
                                },
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "getGasBill": {
                        if ($("#GazParticipateCode").valid()) {
                            let billParams = $("#GazParticipateCode").serializeArray();
                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                            ajaxHandler(
                                billInquiryUrl + "/gaz",
                                "POST",
                                toCamel(billParams),
                                null,
                                function (callback) {
                                    if (hasValue(callback) && callback.hasOwnProperty("d") && callback?.d?.Status?.IsSuccess) {
                                        billsHandler(toCamel(callback.d), billType);
                                    } else {
                                        const message = hasValue(callback?.d?.Status?.Description) ? callback.d.Status.Description : langs.serviceException;
                                        UIkit.notification(message, {
                                            status: "danger",
                                            pos: "bottom-center",
                                            timeout: 7000,
                                        });
                                    }
                                },
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "getMciBill": {
                        if ($("#Mobile").valid()) {
                            let billParams = $("#Mobile").serializeArray();

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            if (validateCellNumber(toCamel(billParams).mobile) != 1) {
                                UIkit.notification(messageReFormat(langs.invalidOperatorNumber, langs.mci), {
                                    status: "danger",
                                    pos: "bottom-center",
                                    timeout: 7000,
                                });
                                return false;
                            }
                            ajaxHandler(
                                billInquiryUrl + "/mci-mobile",
                                "POST",
                                toCamel(billParams),
                                null,
                                function (callback) {
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
                                },
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "getPhoneBill": {
                        if ($("#Phone").valid()) {
                            let billParams = $("#Phone").serializeArray();

                            billParams = hasValue(billParams) ? convertJSON(billParams) : null;

                            if (validateCellNumber(toCamel(billParams).phone)) {
                                UIkit.notification(messageReFormat(langs.invalidOperatorNumber, langs.tci), {
                                    status: "danger",
                                    pos: "bottom-center",
                                    timeout: 7000,
                                });
                                return false;
                            }

                            ajaxHandler(
                                billInquiryUrl + "/fixed-line",
                                "POST",
                                toCamel(billParams),
                                null,
                                function (callback) {
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
                                },
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "getPaperBill": {
                        if ($("#BillForm").valid()) {
                            var billParams = $("#BillForm").serializeArray(),
                                billParams = hasValue(billParams) ? convertJSON(billParams) : null;
                            paperBillsHandler(billParams);
                        }
                        e.preventDefault();
                        break;
                    }
                    case "payBill": {
                        const billId = hasValue(selfThis.attr("data-billid")) ? selfThis.attr("data-billid").trim() : null;
                        const payId = hasValue(selfThis.attr("data-payid")) ? selfThis.attr("data-payid").trim() : null;

                        if (billId && payId) {
                            const tokenParams = {
                                billId,
                                payId,
                                ThirdPartyCallBack: ThirdPartyCallBackUrl,
                            };

                            ajaxHandler(
                                "http://localhost:43197/api/v1/bill/get-token",
                                "GET",
                                tokenParams,
                                null,
                                function (response) {
                                    if (response && response.IsSuccess && response.Data) {
                                        const { IpgUrl, Token } = response.Data;

                                        $.redirect(IpgUrl, { token: Token, GetMethod: true }, "POST");
                                    } else {
                                        UIkit.notification(langs.serviceException, {
                                            status: "danger",
                                            pos: "bottom-center",
                                            timeout: 7000,
                                        });
                                    }
                                },
                                true,
                                true,
                                true
                            );
                        }
                        e.preventDefault();
                        break;
                    }
                    case "selectPhoneBill": {
                        const payId = hasValue(selfThis.attr("data-payid")) ? selfThis.attr("data-payid").trim() : null;
                        if (payId) {
                            $("#BillPayButton button").attr("data-payid", payId);
                        }
                        break;
                    }
                    case "toggleBillDetails": {
                        $(".ui-bills-details").slideToggle(500);
                        break;
                    }
                }
            }
        }
    });
});
