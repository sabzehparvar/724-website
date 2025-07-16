function showSuccessReceipt(detail, transaction) {

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
    };

    const schema = [
        {
            key: 'Amount',
            label: 'مبلغ',
            labelClass: 'uk-text-muted',
            valueClass: 'uk-text-left',
            attrs: {},
            formatter: value => commaSeparator(value) + ' ' + langs.irr
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
        const val = data[col.key];
        if (val != null) {
            const tr = $('<tr>');
            $('<td>').addClass(col.labelClass).text(col.label).appendTo(tr);

            const td = $('<td>').addClass(col.valueClass).appendTo(tr);
            Object.entries(col.attrs).forEach(([key, value]) => td.attr(key, value));
            td.text(col.formatter ? col.formatter(val) : val);

            tr.insertBefore(tableBody.find('#ReceiptAppDownload'));
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
            formatter: value => commaSeparator(value) + ' ' + langs.irr
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
            Object.entries(col.attrs).forEach(([attr, value]) => valTd.attr(attr, value));
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
            const { Detail, Transaction } = callback.Data;
            if (Detail.TopUpSuccess) {
                showSuccessReceipt(Detail, Transaction);

            } else {
                showFailedReceipt(Detail);
            }
        } else {
            showFailedParamReceipt();
        }

    }, true, true, true);
}
