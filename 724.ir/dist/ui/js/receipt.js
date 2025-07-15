
      function showSuccessReceipt(detail, transaction) {
       const data = {
            PackageFullTitle: hasValue(detail.TopUpDescription) ? detail.TopUpDescription.trim() : '-',
            Amount: hasValue(detail.Amount) ? detail.Amount : '-',
            CellNumber: hasValue(detail.CellNumber) ? detail.CellNumber.trim() : '-',
            OperatorName: hasValue(operatorTypes[detail.OperatorCode]) ? operatorTypes[detail.OperatorCode].trim() : '-',
            SecurePan: hasValue(transaction.SecurePan) ? transaction.SecurePan.trim() : '-',
            PayedOn: hasValue(transaction.PayedOn) ? transaction.PayedOn.trim() : '-',
            TraceNo: hasValue(transaction.TraceNo) ? transaction.TraceNo.trim() : '-',
            };

        const html = $("#SuccessReceiptTemplate").html();
        const $template = $("<div>").html(html);
        $template.find('p[data-field="PackageFullTitle"]').text(data.PackageFullTitle);
        $template.find('td[data-field="Amount"]').text(data.Amount);
        $template.find('td[data-field="CellNumber"]').text(data.CellNumber);
        $template.find('td[data-field="OperatorName"]').text(data.OperatorName);
        $template.find('td[data-field="SecurePan"]').text(data.SecurePan);
        $template.find('td[data-field="PayedOn"]').text(data.PayedOn);
        $template.find('td[data-field="TraceNo"]').text(data.TraceNo);

        $("#ReceiptContainer").empty().append($template.children());
      }

      function showFailedReceipt(detail = null) { 

        const data = {
            PackageFullTitle: hasValue(detail?.TopUpDescription) ? detail.TopUpDescription.trim() : '-',
            Amount: hasValue(detail?.Amount) ? detail.Amount : '-',
            };

        const html = $("#FailedReceiptTemplate").html();
        const $template = $("<div>").html(html);
        $template.find('p[data-field="PackageFullTitle"]').text(data.PackageFullTitle);
        $template.find('td[data-field="Amount"]').text(data.Amount);

        $("#ReceiptContainer").empty().append($template.children());

       }
        function showFailedParamReceipt(detail = null) { 

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
                showFailedReceipt();
              }
            } else {
              showFailedReceipt();
            }
          
              }, true, true, true);
      }
