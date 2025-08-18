"use strict";

$(document).ready(function () {
    function showPackageSuccessReceipt(detail, transaction, packageInfo) {
        const data = {
            PackageFullTitle: hasValue(detail.topUpDescription) ? detail.topUpDescription.trim() : null,
            Amount: hasValue(detail.amount) ? detail.amount : null,
            CellNumber: hasValue(detail.cellNumber) ? detail.cellNumber.trim() : null,
            OperatorName: hasValue(operatorTypes[detail.operatorCode]) ? operatorTypes[detail.operatorCode].trim() : null,
            SecurePan: hasValue(transaction.securePan) ? transaction.securePan.trim() : null,
            PersianPayedOn: hasValue(transaction.persianPayedOn) ? transaction.persianPayedOn.trim() : null,
            TraceNo: hasValue(transaction.traceNo) ? transaction.traceNo.trim() : null,
            DurationType: packageInfo && hasValue(packageInfo.durationType) ? packageInfo.durationType : null,
            ChargeTypeDescription: packageInfo && hasValue(packageInfo.chargeTypeDescription) ? packageInfo.chargeTypeDescription : null,
        };

        const schema = [
            {
                key: "Amount",
                label: "مبلغ",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => commaSeparator(val) + " " + langs.irr,
            },
            {
                key: "CellNumber",
                label: "برای شماره",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "OperatorName",
                label: "اپراتور",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
            },
            {
                key: "DurationType",
                label: "مدت",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => {
                    const dur = packageInfo.duration;
                    const typeLabel = durationTypes[val] || "";
                    return dur + " " + typeLabel;
                },
            },
            {
                key: "ChargeTypeDescription",
                label: "نوع شارژ",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => {
                    switch (val) {
                        case "Shoorangiz":
                            return langs.topupExcitingPkg;
                        case "Wow":
                            return langs.topupAmazingPkg;
                        case "Normal":
                            return langs.topupNormalPkg;
                        default:
                            return null;
                    }
                },
            },
            {
                key: "SecurePan",
                label: "پرداخت با کارت",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "PersianPayedOn",
                label: "تاریخ و زمان",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "TraceNo",
                label: "شماره پیگیری",
                labelClass: "uk-text-muted uk-text-nowrap",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
        ];
        const templateHtml = $("#SuccessReceiptTemplate").html();
        const template = $("<div>").html(templateHtml);

        template.find('p[data-field="PackageFullTitle"]').text(data?.PackageFullTitle || "-");

        const tableBody = template.find(".ui-receipt-table table tbody");
        tableBody.find("tr").not("#ReceiptAppDownload").remove();

        schema.forEach((col) => {
            const raw = data[col.key];
            if (raw != null) {
                const formatted = col.formatter ? col.formatter(raw) : raw;
                if (formatted != null) {
                    const tr = $("<tr>");
                    $("<td>").addClass(col.labelClass).text(col.label).appendTo(tr);

                    const td = $("<td>").addClass(col.valueClass).appendTo(tr);
                    Object.entries(col.attrs).forEach(([key, val]) => td.attr(key, val));
                    td.text(formatted);

                    tr.insertBefore(tableBody.find("#ReceiptAppDownload"));
                }
            }
        });

        $("#ReceiptContainer").empty().append(template.children());
    }

    function showPackageFailedReceipt(detail) {
        const data = {
            PackageFullTitle: hasValue(detail.topUpDescription) ? detail.topUpDescription.trim() : null,
            Amount: hasValue(detail.amount) ? detail.amount : null,
            CellNumber: hasValue(detail.cellNumber) ? detail.cellNumber.trim() : null,
        };
        const schema = [
            {
                key: "Amount",
                label: "مبلغ",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => commaSeparator(val) + " " + langs.irr,
            },
            {
                key: "CellNumber",
                label: "برای شماره",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
        ];

        const templateHtml = $("#FailedReceiptTemplate").html();
        const template = $("<div>").html(templateHtml);

        template.find('p[data-field="PackageFullTitle"]').text(data.PackageFullTitle || "-");

        const tableBody = template.find(".ui-receipt-table table tbody");

        tableBody.find("tr").not("#ReceiptAppDownload").remove();

        schema.forEach((col) => {
            const val = data[col.key];
            if (val != null) {
                const tr = $("<tr>");

                $("<td>").addClass(col.labelClass).text(col.label).appendTo(tr);

                const valTd = $("<td>").addClass(col.valueClass).appendTo(tr);
                Object.entries(col.attrs).forEach(([attr, val]) => valTd.attr(attr, val));
                valTd.text(col.formatter ? col.formatter(val) : val);

                tr.insertBefore(tableBody.find("#ReceiptAppDownload"));
            }
        });

        $("#ReceiptContainer").empty().append(template.children());
    }

    function showReceiptError() {
        $("#ReceiptContainer").empty().append($("#ReceiptErrorTemplate").html());
    }

    function showBillSuccessReceipt(callback) {
        const data = {
            PackageFullTitle: "پرداخت قبض موفق",
            Amount: hasValue(callback.amount) ? callback.amount.toString().trim() : null,
            PersianPayedOn: hasValue(callback.persianPayedOn) ? callback.persianPayedOn.trim() : null,
            PayId: hasValue(callback.payId) ? callback.payId.toString().trim() : null,
            BillId: hasValue(callback.billId) ? callback.billId.toString().trim() : null,
            TraceNo: hasValue(callback.traceNo) ? callback.traceNo.toString().trim() : null,
            Rrn: hasValue(callback.rrn) ? callback.rrn.toString().trim() : null,

        };

        const schema = [
            {
                key: "Amount",
                label: "مبلغ",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => commaSeparator(val) + " " + langs.irr,
            },
            {
                key: "BillId",
                label: "شناسه قبض",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "PayId",
                label: "شناسه پرداخت",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "PersianPayedOn",
                label: "تاریخ و زمان",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "TraceNo",
                label: "شماره پیگیری",
                labelClass: "uk-text-muted uk-text-nowrap",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "Rrn",
                label: "شماره مرجع",
                labelClass: "uk-text-muted uk-text-nowrap",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
        ];
        const templateHtml = $("#SuccessReceiptTemplate").html();
        const template = $("<div>").html(templateHtml);

        template.find('p[data-field="PackageFullTitle"]').text(data?.PackageFullTitle || "-");

        const tableBody = template.find(".ui-receipt-table table tbody");
        tableBody.find("tr").not("#ReceiptAppDownload").remove();

        schema.forEach((col) => {
            const raw = data[col.key];
            if (raw != null) {
                const formatted = col.formatter ? col.formatter(raw) : raw;
                if (formatted != null) {
                    const tr = $("<tr>");
                    $("<td>").addClass(col.labelClass).text(col.label).appendTo(tr);

                    const td = $("<td>").addClass(col.valueClass).appendTo(tr);
                    Object.entries(col.attrs).forEach(([key, val]) => td.attr(key, val));
                    td.text(formatted);

                    tr.insertBefore(tableBody.find("#ReceiptAppDownload"));
                }
            }
        });

        $("#ReceiptContainer").empty().append(template.children());
    }

    function showBillFailedReceipt(callback) {
        const data = {
            PackageFullTitle: "پرداخت قبض ناموفق",
            Amount: hasValue(callback.amount) ? callback.amount.toString().trim() : null,
            PayId: hasValue(callback.payId) ? callback.payId.toString().trim() : null,
            BillId: hasValue(callback.billId) ? callback.billId.toString().trim() : null,
            TraceNo: hasValue(callback.traceNo) ? callback.traceNo.toString().trim() : null,
        };
        const schema = [
            {
                key: "Amount",
                label: "مبلغ",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: {},
                formatter: (val) => commaSeparator(val) + " " + langs.irr,
            },
            {
                key: "BillId",
                label: "شناسه قبض",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "PayId",
                label: "شناسه پرداخت",
                labelClass: "uk-text-muted",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
            {
                key: "TraceNo",
                label: "شماره پیگیری",
                labelClass: "uk-text-muted uk-text-nowrap",
                valueClass: "uk-text-left",
                attrs: { dir: "ltr" },
            },
        ];

        const templateHtml = $("#FailedReceiptTemplate").html();
        const template = $("<div>").html(templateHtml);

        template.find('p[data-field="PackageFullTitle"]').text(data.PackageFullTitle || "-");

        const tableBody = template.find(".ui-receipt-table table tbody");

        tableBody.find("tr").not("#ReceiptAppDownload").remove();

        schema.forEach((col) => {
            const val = data[col.key];
            if (val != null) {
                const tr = $("<tr>");

                $("<td>").addClass(col.labelClass).text(col.label).appendTo(tr);

                const valTd = $("<td>").addClass(col.valueClass).appendTo(tr);
                Object.entries(col.attrs).forEach(([attr, val]) => valTd.attr(attr, val));
                valTd.text(col.formatter ? col.formatter(val) : val);

                tr.insertBefore(tableBody.find("#ReceiptAppDownload"));
            }
        });

        $("#ReceiptContainer").empty().append(template.children());
    }
    const queryString = new URLSearchParams(window.location.search);
    const token = queryString.get("token");
    const resNum = queryString.get("resNum");
    const rNum = queryString.get("r");
    const tid = queryString.get("tid");

    if (token && resNum) {
        ajaxHandler(
            asmxUrl + "/api/v1/ipg-top-up/get-receipt",
            "GET",
            {
                token,
                resNum,
            },
            null,
            function (callback) {
                callback = toCamel(callback);

                if (hasValue(callback) && callback?.isSuccess && callback?.code === 2000 && hasValue(callback?.data)) {
                    const detail = callback.data?.detail;
                    const transaction = callback.data?.transaction;
                    const topUpPackage = callback.data?.topUpPackage;
                    if (detail) {
                        if (transaction && topUpPackage && detail?.topUpSuccess) {
                            showPackageSuccessReceipt(detail, transaction, topUpPackage);
                            return;
                        } else {
                            showPackageFailedReceipt(detail);
                        }
                    } else {
                        showReceiptError();
                    }
                } else {
                    showReceiptError();
                }
            },
            true,
            true,
            true
        );
    } else if (rNum && tid) {
        ajaxHandler(
            asmxUrl + "/api/v1/bill/get-receipt-by-tid",
            "GET",
            {
                tid,
                resNum: rNum,
            },
            null,
            function (callback) {
                callback = toCamel(callback);

                if (hasValue(callback) && callback?.isSuccess && callback?.code === 2000 && hasValue(callback?.data)) {
                    if (callback.data[0].state === "OK") {
                        showBillSuccessReceipt(callback.data[0]);
                        return;
                    }
                    if (callback.data[0].state === "Failed") {
                        showBillFailedReceipt(callback.data[0]);
                        return;
                    }
                } else {
                    showReceiptError();
                }
            },
            true,
            true,
            true
        );
    } else {
        showReceiptError();
    }
});
