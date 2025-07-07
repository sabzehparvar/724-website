'use strict';

$(document).ready(function () {
  let operatorId;
  function toggleWizard(currentWizard) {
    $(".ui-card-wizard").hide();
    $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
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
  if (document.getElementById('InternetPackageForm')) {
    getOperators();
    $('#InternetPackageForm').validate({
      rules: {
        CellNumber: { digits: true, cellNumber: true }
      }
    });

    $('#InternetPackageForm #CellNumber').keyup(function (e) {
      const value = normalize($(this).val());
      if (value.length >= 4) {
        operatorId = validateCellNumber(value, true);
        if (operatorId) {
          const operatorActiveItem = $('#InternetOperator').children().find('[data-value=' + operatorId + ']');
          if (!operatorActiveItem.hasClass('ui-active-operator')) {
            $('#InternetOperator').val(operatorId) & removeOperatorActiveItem() & operatorActiveItem.addClass('ui-active-operator');
          }
        };
      } else if (value.length < 4) {
        $('#InternetOperator').val('') & removeOperatorActiveItem() & $('#InternetPackageList ul').empty();
      }
    });
  }

  $(document).on('click', '.uk-button, .uk-link', function (e) {
    if (!$(this).hasClass('on-progress')) {
      const selfThis = $(this), action = hasValue($(this).attr('data-action')) ? $(this).attr('data-action').trim() : null;
      if (action) {
        const cellNumber = hasValue($('#CellNumber').val()) ? normalize($('#CellNumber').val().trim()) : null;
        switch (action) {
          case 'changeInternetOperator': {
            if ($('#InternetPackageForm').valid()) {
              removeOperatorActiveItem() & selfThis.addClass('ui-active-operator');
              $('#InternetOperator').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null);
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
          case 'changeInternetType': {
            $('#InternetSimType').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null);
            e.preventDefault();
            break;
          }
          case 'changeInternetDuration': {
            $('#InternetDuration').val(hasValue($(this).attr('data-value')) ? $(this).attr('data-value').trim() : null) & getInternetPackages();
            e.preventDefault();
            break;
          }
          case 'buyInternetPackage': {
            let operatorId = null,
              chargeCode = null,
              packageAmount = 0,
              packageText = null;
            const items = document.querySelectorAll("#InternetPackageItem");
            for (const item of items) {
              if (item.classList.contains("uk-active")) {
                operatorId = hasValue(item.getAttribute("data-operator")) ? item.getAttribute("data-operator") : null;
                chargeCode = hasValue(item.getAttribute("data-charge")) ? item.getAttribute("data-charge") : null;
                packageAmount = hasValue(item.getAttribute("data-amount")) ? normalize(item.getAttribute("data-amount")) : null;
                packageText = hasValue(item.getAttribute("data-text")) ? item.getAttribute("data-text") : null;
                break;
              }
            }


            if (operatorId && chargeCode && packageText && cellNumber && packageAmount) {

              const tokenParams = {
                CellNumber: cellNumber,
                ChargeCode: chargeCode,
                ChargeOperatorCode: operatorId,
                ChargeDescription: packageText,
                Amount: packageAmount,
                TopUpType: "InternetPackage",
                ThirdPartyCallBack: "https://724.ir"
              };

              ajaxHandler(asmxUrl + '/api/v1/ipg-top-up/get-token', 'GET', tokenParams, null, function (response) {

                if (response && response.IsSuccess && response.Data) {
                  const { IpgUrl, GetMethod, Value, ResNum } = response.Data;

                  $.redirect(IpgUrl, { token: Value, ResNum: ResNum }, 'POST');

                } else {
                  UIkit.notification(langs.serviceException, {
                    status: "danger",
                    pos: "bottom-center",
                    timeout: 7000,
                  });
                }
              }, false, true, true);
            } else {
              UIkit.notification(langs.selectingTopupPackage, {
                status: 'danger', pos: 'bottom-center', timeout: 7000
              });
            }
            e.preventDefault();
            break;
          }

          case 'getInternetPackages': {
            if ($('#InternetPackageForm').valid()) {
              getDurations()
              getInternetPackages()
            }

            e.preventDefault();
            break;
          }
          case "returnFirstCard": {
            toggleWizard("first-card");
            $('#InternetDuration').val('')
            $('#InternetPackageList ul').empty()
            e.preventDefault();
            break;
          }

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
      if (hasValue(callback) && callback.hasOwnProperty("d") && hasValue(callback.d)) {
        const response = callback.d
        let items = '';
        $.each(response, function (index, item) {
          var className = item.Code == 1 ? 'uk-active' : '';
          items += $('#SimTypes').html().replace('%Class%', className).replaceAll('%Code%', item.Code).replace('%Name%', item.Description);
        });
        $('#InternetSimTypeList ul').empty().append(items);
      } else {
        UIkit.notification(langs.serviceException, {
          status: "danger",
          pos: "bottom-center",
          timeout: 7000,
        });
      }

    }, true);
  }

  function getDurations() {
    ajaxHandler(asmxUrl + '/controllers/eChargeController.asmx/getPackageDurationTypes', 'GET', null, null, function (callback) {
      if (hasValue(callback) && callback.hasOwnProperty("d") && hasValue(callback.d)) {
        const response = callback.d
        let items = '';
        $.each(response, function (index, item) {
          const className = item.Code == 4 ? 'uk-active' : '';
          items += $('#InternetDurations').html().replace('%Class%', className).replaceAll('%Code%', item.Code).replace('%Duration%', item.Name).replace('%Name%', item.Description);
        });
        $('#InternetDurationList ul').empty().append(items);
        toggleWizard("second-card");

      } else {
        UIkit.notification(langs.serviceException, {
          status: "danger",
          pos: "bottom-center",
          timeout: 7000,
        });
      }

    }, true);
  }
  function getInternetPackages() {
    const operatorId = hasValue($('#InternetOperator').val()) ? $('#InternetOperator').val().trim() : null,
      typeId = hasValue($('#InternetSimType').val()) ? $('#InternetSimType').val().trim() : 1,
      durationId = hasValue($('#InternetDuration').val()) ? $('#InternetDuration').val().trim() : 4,
      currentOperator = hasValue($('#InternetPackage ul').attr('data-operator')) ? $('#InternetPackage ul').attr('data-operator').trim() : null,
      currentType = hasValue($('#InternetSimTypeList ul').attr('data-type')) ? $('#InternetSimTypeList ul').attr('data-type').trim() : 1,
      currentDuration = hasValue($('#InternetDurationList ul').attr('data-duration')) ? $('#InternetDurationList ul').attr('data-duration').trim() : null;

    if (operatorId && (currentOperator != operatorId || currentType != typeId || currentDuration != durationId)) {
      ajaxHandler(asmxUrl + '/controllers//eChargeController.asmx/getInternetPackages', 'GET', {
        chargeOperatorCode: operatorId,
        simCardType: typeId,
        durationType: durationId
      }, null, function (callback) {
        if (hasValue(callback) && callback.hasOwnProperty("d")) {
          if (hasValue(callback.d)) {
            const response = callback.d;
            let grouped = {};

            response.forEach(item => {
              if (!grouped[item.Duration]) {
                grouped[item.Duration] = [];
              }
              grouped[item.Duration].push(item);
            });
            const sortedDurations = Object.keys(grouped).map(Number).sort((a, b) => a - b);
            let items = '';

            sortedDurations.forEach(duration => {
              const labelText = `${duration} ${durationTypes[durationId]}`;
              items += `<li class="uk-disabled"><div class="uk-padding-small">${labelText}</div></li>`;

              grouped[duration].sort(sortByDuration).forEach(item => {
                if (hasValue(item.Amount)) {

                  const iconUrl = "./dist/ui/img/icon/app/" + operatorIcons[operatorId] + ".svg";

                  items += $('#InternetPackages').html()
                    .replace('%Operator%', operatorId)
                    .replace("%IconSrc%", iconUrl)
                    .replaceAll("%Name%", operatorTypes[operatorId])
                    .replaceAll('%Code%', item.SepChargeCode)
                    .replace('%OperatorName%', operatorTypes[operatorId])
                    .replace('%Duration%', item.Duration)
                    .replace('%DurationType%', durationTypes[item.DurationType])
                    .replaceAll('%Description%', item.Description)
                    .replaceAll('%Amount%', commaSeparator(item.Amount))
                    .replace('%ChargeAmount%', item.Amount);
                }
              });
            });

            $('#InternetPackageList ul')
              .empty()
              .append(items)
              .attr('data-operator', operatorId)
              .attr('data-type', typeId)
              .attr('data-duration', durationId);
          } else {
            $('#InternetPackageList ul').removeAttr('data-operator data-type data-duration').empty();
            UIkit.notification(langs.internetNoMatchFound, {
              status: "primary",
              pos: "bottom-center",
              timeout: 7000,
            });
          }

        } else {
          UIkit.notification(langs.serviceException, {
            status: "danger",
            pos: "bottom-center",
            timeout: 7000,
          });
        }
      }, true);
    }
  }

  function sortByDuration(firstList, secondList) {
    var firstFilter = firstList.duration, secondFilter = secondList.duration;
    return ((firstFilter < secondFilter) ? -1 : ((firstFilter > secondFilter) ? 1 : 0));
  }

  function removeOperatorActiveItem() {
    $('#InternetOperator').parents().find('a').removeClass('ui-active-operator');
  }
});
