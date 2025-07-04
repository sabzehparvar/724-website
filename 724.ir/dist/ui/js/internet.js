'use strict';

$(document).ready(function () {
  const asmxUrl = "http://172.31.51.12:43197";
  let operatorId;

//   var operatorIcons = {
//     1: 'icHamrahAvalSimcard', 2: 'icIrancellSimcard', 3: 'icRightelSimcard', 4: 'icSamantelSimcard', 5: 'icShatelMobileSimcard', 6: 'icTelekishSimcard'
//   };

  if (document.getElementById('InternetPackage')) {
    getOperators();
    $('#InternetPackage').validate({
      rules: {
        CellNumber: { digits: true, cellNumber: true }
      }
    });

    $('#CellNumber').keyup(function (e) {
      var value = normalize($(this).val());
      if (value.length >= 4) {
         operatorId = validateCellNumber(value, true);
        if (operatorId) {
          var operatorActiveItem = $('#InternetOperator').children().find('[data-value=' + operatorId + ']');
          if (!operatorActiveItem.hasClass('ui-active-operator')) {
            $('#Operator').val(operatorId) & removeOperatorActiveItem() & operatorActiveItem.addClass('ui-active-operator');
          }
        };
      } else if (value.length < 4) {
        $('#Operator').val('') & removeOperatorActiveItem() & $('#InternetPackageSwitcher').empty();
      }
    });
  }

  $(document).on('click', '.uk-button, .uk-link', function (e) {
    if (!$(this).hasClass('on-progress')) {
      var selfThis = $(this), action = hasValue($(this).attr('data-action')) ? $(this).attr('data-action').trim() : null;
      if (action) {
        var cellNumber = hasValue($('#CellNumber').val()) ? normalize($('#CellNumber').val().trim()) : null;
        switch (action) {
          case 'changeInternetOperator':
            if ($('#InternetPackage').valid()) {
              removeOperatorActiveItem() & selfThis.addClass('ui-active-operator');
              $('#Operator').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null);
            } else {
              if (!cellNumber || !validateCellNumber(cellNumber)) {
                UIkit.notification(!cellNumber ? langs.requiredCellNumber : langs.invalidCellNumber, {
                  status: 'primary', pos: 'bottom-center', timeout: 7000
                });
                return false;
              }
            }
            e.preventDefault();
            break;
          case 'changeInternetType':
            $('#Type').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null) & getInternetPackages();
            e.preventDefault();
            break;
          case 'changeInternetDuration':
            $('#Duration').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null) & getInternetPackages();
            e.preventDefault();
            break;
          case 'getInternetPackage':
            var cellNumber = hasValue($('#CellNumber').val()) ? normalize($('#CellNumber').val().trim()) : null,
              operatorId = null, chargeCode = null, packageAmount = 0, packageText = null;
            if ($('#Internet').valid()) {
              document.querySelectorAll('#PackageItem').forEach((item) => {
                if (item.classList.contains('uk-active')) {
                  operatorId = hasValue(item.getAttribute('data-operator')) ? item.getAttribute('data-operator') : null;
                  chargeCode = hasValue(item.getAttribute('data-charge')) ? item.getAttribute('data-charge') : null;
                  packageAmount = hasValue(item.getAttribute('data-amount')) ? item.getAttribute('data-amount') : null;
                  packageText = hasValue(item.getAttribute('data-text')) ? item.getAttribute('data-text') : null;
                  return false;
                }
              });
              if (operatorId && chargeCode && packageText) {
                var formData = new FormData();

                formData.append('CellNumberListFile', new Blob([cellNumber], { type: 'text/plain' }), cellNumber + '.txt');
                formData.append('ChargeCode', chargeCode);
                formData.append('ChargeOperatorCode', operatorId);
                formData.append('ChargeDescription', packageText);

                ajaxHandler(asmxUrl + '/eChargeController.asmx/CreateBatchChargeOrder', 'POST', formData, selfThis, function (callback) {
                  var fileIdentifier = callback.data.userFileIdentifier;
                  ajaxHandler(serviceUrl + '/ipg-top-up/create-token', 'POST', {
                    amount: packageAmount, cellNumber, operatorId, sepChargeCode: chargeCode, topUpType: 'InternetPackage', fileIdentifier
                  }, selfThis, function (callback) {
                    UIkit.modal('#iPGModal').show();
                    setTimeout(function () {
                      $.redirect(callback.data.ipgUrl, {
                        GetMethod: callback.data.getMethod,
                        FriendsCellNumber: callback.data.friendsCellNumber,
                        Amount: callback.data.amount,
                        RedirectUrl: callback.data.redirectUrl,
                        SepChargeCode: callback.data.sepChargeCode,
                        ResNum: callback.data.resNum,
                        ResNum1: callback.data.resNum1,
                        TerminalId: callback.data.terminalId,
                        TranType: callback.data.tranType,
                        MID: callback.data.mID,
                        OperatorID: callback.data.operatorID,
                        OtherCellNumber: callback.data.otherCellNumber
                      }, 'POST');
                    }, 2000);
                  });
                }, false, true, true);
              } else {
                UIkit.notification(langs.selectingTopupPackage, {
                  status: 'danger', pos: 'bottom-center', timeout: 7000
                });
              }
            } else {
              if (!cellNumber || !validateCellNumber(cellNumber)) {
                UIkit.notification(!cellNumber ? langs.requiredCellNumber : langs.invalidCellNumber, {
                  status: 'primary', pos: 'bottom-center', timeout: 7000
                });
                return false;
              }
            }
            e.preventDefault();
            break;
        }
      }
    }
  });

  function getOperators() {
 
    ajaxHandler(asmxUrl + "/controllers/eChargeController.asmx/getOperators", "GET", null, null, function (callback) {
      if (hasValue(callback) && callback.hasOwnProperty("d") && hasValue(callback.d)) {
        let items = "";
        $.each(callback.d, function (index, item) {
          const iconUrl = "./dist/ui/img/icon/operators/" + operatorIcons[item.Code] + ".svg";
          items += $("#InternetOperators").html().replace("%Code%", item.Code).replace("%IconSrc%", iconUrl).replaceAll("%Name%", item.Description);
        });
      getTypes();

        $("#InternetOperator").removeClass("ui-hidden") & $("#InternetOperator ul").empty().append(items);
      } else {
        UIkit.notification(langs.serviceException, {
          status: "danger",
          pos: "bottom-center",
          timeout: 7000,
        });
      }
    },
      true
    );
  }

  function getTypes() {
    ajaxHandler(asmxUrl + '/controllers/eChargeController.asmx/getSimCardTypes', 'GET', null, null, function (callback) {
      var items = '';
      $.each(callback, function (index, item) {
        var icon = '';
        switch (item.code) {
          case 0: icon = 'ri-sim-card-line'; break;
          case 1: icon = 'ri-sim-card-2-line'; break;
          case 2: icon = 'ri-wifi-line'; break;
        }
        var className = item.code == 1 ? 'uk-active' : '';
        items += $('#Types').html().replace('%Class%', className).replaceAll('%Code%', item.code).replace('%Icon%', icon).replace('%Name%', item.description);
      });
      getDurations();
      $('#InternetType').removeClass('uc-hidden') & $('#InternetTypeSwitcher').empty().append(items);
    });
  }

  function getDurations() {
    ajaxHandler(asmxUrl + '/eChargeController.asmx/getPackageDurationTypes', 'GET', null, null, function (callback) {
      var items = '';
      $.each(callback, function (index, item) {
        var className = item.code == 4 ? 'uk-active' : '';
        items += $('#Durations').html().replace('%Class%', className).replaceAll('%Code%', item.code).replace('%Duration%', item.name).replace('%Name%', item.description);
      });
      $('#InternetDuration').removeClass('uc-hidden') & $('#InternetDurationSwitcher').empty().append(items);
    });
  }

  function getInternetPackages() {
    var operatorId = hasValue($('#Operator').val()) ? $('#Operator').val().trim() : null, typeId = hasValue($('#Type').val()) ? $('#Type').val().trim() : 1,
    durationId = hasValue($('#Duration').val()) ? $('#Duration').val().trim() : 4;

    var currentOperator = hasValue($('#InternetPackageSwitcher').attr('data-operator')) ? $('#InternetPackageSwitcher').attr('data-operator').trim() : null,
    currentType = hasValue($('#InternetTypeSwitcher').attr('data-type')) ? $('#InternetTypeSwitcher').attr('data-type').trim() : 1,
    currentDuration = hasValue($('#InternetDurationSwitcher').attr('data-duration')) ? $('#InternetDurationSwitcher').attr('data-duration').trim() : null;

    if (operatorId && (currentOperator != operatorId || currentType != typeId || currentDuration != durationId)) {
      ajaxHandler(asmxUrl + '/eChargeController.asmx/getInternetPackages', 'GET', {
        chargeOperatorCode: operatorId, simCardType: typeId, durationType: durationId
      }, null, function (callback) {
        var items = '';
        if (callback.length) {
          $.each(callback.sort(sortByDuration), function (index, item) {
            if (hasValue(item.amount)) {
              items += $('#Packages').html().replace('%Operator%', operatorId).replaceAll('%Code%', item.sepChargeCode).replace('%OperatorName%', operatorTypes[operatorId]).replace('%Duration%', item.duration).replace('%DurationType%', durationTypes[item.durationType]).replaceAll('%Description%', item.description).replaceAll('%Amount%', commaSeparator(item.amount)).replace('%ChargeAmount%', item.amount);
            }
          });
          $('#InternetPackage').removeClass('uc-hidden') & $('#InternetPackageSwitcher').empty().append(items);
          $('#InternetPackageSwitcher').attr('data-operator', operatorId).attr('data-type', typeId).attr('data-duration', durationId);
        } else {
          $('#InternetPackageSwitcher').removeAttr('data-operator').removeAttr('data-type').removeAttr('data-duration');
          $('#InternetPackage').removeClass('uc-hidden') & $('#InternetPackageSwitcher').empty().removeAttr('data-operator').append($('#EmptyInternet').html());
        }
      });
    }
  }

  function sortByDuration(firstList, secondList) {
    var firstFilter = firstList.duration, secondFilter = secondList.duration;
    return ((firstFilter < secondFilter) ? -1 : ((firstFilter > secondFilter) ? 1 : 0));
  }

  function removeOperatorActiveItem() {
    $('#InternetOperator').parents().find('a').removeClass('uc-active-operator');
  }
});
