"use strict";

$(document).ready(function () {
    
    function showSuccessReceipt(detail, transaction, packageInfo) {

        const data = {
            PackageFullTitle: hasValue(detail.TopUpDescription) ? detail.TopUpDescription.trim() : null,
            Amount: hasValue(detail.Amount) ? detail.Amount : null,
            CellNumber: hasValue(detail.CellNumber) ? detail.CellNumber.trim() : null,
            OperatorName: hasValue(operatorTypes[detail.OperatorCode])
                ? operatorTypes[detail.OperatorCode].trim()
                : null,
            SecurePan: hasValue(transaction.SecurePan) ? transaction.SecurePan.trim() : null,
            PersianPayedOn: hasValue(transaction.PersianPayedOn)
                ? transaction.PersianPayedOn.trim()
                : null,
            TraceNo: hasValue(transaction.TraceNo) ? transaction.TraceNo.trim() : null,
            DurationType: packageInfo && hasValue(packageInfo.DurationType) ? packageInfo.DurationType : null,
            ChargeTypeDescription: packageInfo && hasValue(packageInfo.ChargeTypeDescription) ? packageInfo.ChargeTypeDescription : null
        };

        const schema = [
            {
                key: 'Amount',
                label: 'مبلغ',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: {},
                formatter: val => commaSeparator(val) + ' ' + langs.irr
            },
            {
                key: 'CellNumber',
                label: 'برای شماره',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: { dir: 'ltr' },
            },
            {
                key: 'OperatorName',
                label: 'اپراتور',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: {}
            },
            {
                key: 'DurationType',
                label: 'مدت',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: {},
                formatter: val => {
                    const dur = packageInfo.Duration;
                    const typeLabel = durationTypes[val] || '';
                    return dur + ' ' + typeLabel;
                }
            },
            {
                key: 'ChargeTypeDescription',
                label: 'نوع شارژ',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: {},
                formatter: val => {
                    switch (val) {
                        case 'Shoorangiz': return langs.topupExcitingPkg;
                        case 'Wow': return langs.topupAmazingPkg;
                        case 'Normal': return langs.topupNormalPkg;
                        default: return null;
                    }
                }
            },
            {
                key: 'SecurePan',
                label: 'پرداخت با کارت',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: { dir: 'ltr' }
            },
            {
                key: 'PersianPayedOn',
                label: 'تاریخ و زمان',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: { dir: 'ltr' }
            },
            {
                key: 'TraceNo',
                label: 'شماره پیگیری',
                labelClass: 'uk-text-muted uk-text-nowrap',
                valueClass: 'uk-text-left',
                attrs: { dir: 'ltr' }
            }

        ];

        const templateHtml = $('#SuccessReceiptTemplate').html();
        const template = $('<div>').html(templateHtml);

        template.find('p[data-field="PackageFullTitle"]').text(data.PackageFullTitle || '-');

        const tableBody = template.find('.ui-receipt-table table tbody');
        tableBody.find('tr').not('#ReceiptAppDownload').remove();

        schema.forEach(col => {
            const raw = data[col.key];
            if (raw != null) {
                const formatted = col.formatter ? col.formatter(raw) : raw;
                if (formatted != null) {
                    const tr = $('<tr>');
                    $('<td>').addClass(col.labelClass).text(col.label).appendTo(tr);

                    const td = $('<td>').addClass(col.valueClass).appendTo(tr);
                    Object.entries(col.attrs).forEach(([key, val]) => td.attr(key, val));
                    td.text(formatted);

                    tr.insertBefore(tableBody.find('#ReceiptAppDownload'));
                }
            }
        });

        $('#ReceiptContainer').empty().append(template.children());
    }

    function showFailedReceipt(detail = {}) {

        const data = {
            PackageFullTitle: hasValue(detail.TopUpDescription) ? detail.TopUpDescription.trim() : null,
            Amount: hasValue(detail.Amount) ? detail.Amount : null,
            CellNumber: hasValue(detail.CellNumber) ? detail.CellNumber.trim() : null,
        };
        const schema = [
            {
                key: 'Amount',
                label: 'مبلغ',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: {},
                formatter: val => commaSeparator(val) + ' ' + langs.irr
            },
            {
                key: 'CellNumber',
                label: 'برای شماره',
                labelClass: 'uk-text-muted',
                valueClass: 'uk-text-left',
                attrs: { dir: 'ltr' }
            }
        ];


        const templateHtml = $('#FailedReceiptTemplate').html();
        const template = $('<div>').html(templateHtml);


        template
            .find('p[data-field="PackageFullTitle"]')
            .text(data.PackageFullTitle || '-');


        const tableBody = template.find('.ui-receipt-table table tbody');


        tableBody.find('tr').not('#ReceiptAppDownload').remove();


        schema.forEach(col => {
            const val = data[col.key];
            if (val != null) {
                const tr = $('<tr>');

                $('<td>')
                    .addClass(col.labelClass)
                    .text(col.label)
                    .appendTo(tr);

                const valTd = $('<td>')
                    .addClass(col.valueClass)
                    .appendTo(tr);
                Object.entries(col.attrs).forEach(([attr, val]) => valTd.attr(attr, val));
                valTd.text(col.formatter ? col.formatter(val) : val);

                tr.insertBefore(tableBody.find('#ReceiptAppDownload'));
            }
        });


        $('#ReceiptContainer').empty().append(template.children());
    }

    function showFailedParamReceipt() {

        $("#ReceiptContainer").empty().append($("#FailedParamReceiptTemplate").html());
    }

    const queryString = new URLSearchParams(window.location.search);
    const token = queryString.get("token");
    const resNum = queryString.get("resNum");
    const getReceiptParam = {
        token,
        resNum
    };
    if (!token || !resNum) {
        showFailedParamReceipt()
    } else {
        ajaxHandler(asmxUrl + '/api/v1/ipg-top-up/get-receipt', 'GET', getReceiptParam, null, function (callback) {

            if (callback.IsSuccess && callback.Code === 2000) {
                const { Detail, Transaction, TopUpPackage } = callback.Data;
                if (Detail.TopUpSuccess) {
                    showSuccessReceipt(Detail, Transaction, TopUpPackage);

                } else {
                    showFailedReceipt(Detail);
                }
            } else {
                showFailedParamReceipt();
            }

        }, true, true, true);
    }

})

