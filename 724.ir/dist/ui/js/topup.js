"use strict";

$(document).ready(function () {
  let operatorId;
  const asmxUrl = "http://172.31.51.12:43197";

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

  if (document.getElementById("TopupNumber")) {
    getOperators();
    $("#TopupNumber").validate({
      rules: {
        CellNumber: { digits: true, cellNumber: true },
      },
    });
    $("#CellNumber").keyup(function (e) {
      const value = normalize($(this).val());

      if (value.length >= 4) {
        operatorId = validateCellNumber(value, true);
        if (operatorId) {
          const operatorActiveItem = $("#TopupOperator")
            .children()
            .find("[data-value=" + operatorId + "]");
          if (!operatorActiveItem.hasClass("ui-active-operator")) {
            $("#Operator").val(operatorId) &
              removeOperatorActiveItem() &
              operatorActiveItem.addClass("ui-active-operator");
          }
        }
      } else if (value.length < 4) {
        $("#Operator").val('');
        removeOperatorActiveItem();
        $("#NormalTopup ul").empty();
        $("#AmazingTopup ul").empty();
      }
    });
  }

  $(document).on("click", ".uk-button, .uk-link", function (e) {
    if (!$(this).hasClass("on-progress")) {
      const selfThis = $(this),
        action = hasValue($(this).attr("data-action")) ? $(this).attr("data-action").trim() : null;
      if (action) {
        switch (action) {
          case "changeTopupOperator": {

            const cellNumber = hasValue($("#CellNumber").val()) ? normalize($("#CellNumber").val().trim()) : null;
            if ($("#TopupNumber").valid()) {
              const value = hasValue($(this).attr("data-value")) ? $(this).attr("data-value").trim() : null;
              $("#Operator").val(value) & removeOperatorActiveItem() & selfThis.addClass("ui-active-operator");

            } else {

              if (!cellNumber || !validateCellNumber(cellNumber)) {
                UIkit.notification(!cellNumber ? langs.requiredCellNumber : langs.invalidCellNumber, {
                  status: "primary",
                  pos: "bottom-center",
                  timeout: 7000,
                });
                return false;
              }
            }
            e.preventDefault();
            break;
          }

          case "buyTopupPackage": {

            const cellNumber = hasValue($("#CellNumber").val()) ? normalize($("#CellNumber").val().trim()) : null;
            let operatorId = null,
              chargeCode = null,
              packageAmount = 0,
              packageText = null;

            const items = document.querySelectorAll("#PackageItem");
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
                TopUpType: "Charge",
                // ThirdPartyCallBack: "https://724.ir"
              };

              ajaxHandler(
                asmxUrl + '/api/v1/ipg-top-up/get-token', 'GET', tokenParams, null, function (response) {

                  if (response && response.IsSuccess && response.Data) {
                    console.log(response)
                    const { IpgUrl, GetMethod, Value, ResNum } = response.Data;

                    setTimeout(function () {
                      $.redirect(
                        IpgUrl,
                        { token: Value, ResNum: ResNum },
                        GetMethod ? 'GET' : 'POST'
                      );
                    }, 2000);

                  } else {
                    UIkit.notification(langs.serviceException, {
                      status: "danger",
                      pos: "bottom-center",
                      timeout: 7000,
                    });
                  }
                }, true, true, true);


            } else {
              UIkit.notification(langs.selectingTopupPackage, {
                status: "danger",
                pos: "bottom-center",
                timeout: 7000,
              });
            }

            e.preventDefault();
            break;
          }
          case "getTopupPackage": {
            if ($("#TopupNumber").valid()) {
              getTopupPackages();
            }
            e.preventDefault();
            break;
          }
          case "returnFirstCard": {
            toggleWizard("first-card");
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
          items += $("#Operators").html().replace("%Code%", item.Code).replace("%IconSrc%", iconUrl).replaceAll("%Name%", item.Description);
        });
        $("#TopupOperator").removeClass("ui-hidden") & $("#TopupOperator ul").empty().append(items);
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

  function getTopupPackages() {
    const operatorId = hasValue($("#Operator").val()) ? $("#Operator").val().trim() : null,
      currentOperator = hasValue($("#TopupPackageSwitcher").attr("data-operator")) ? $("#TopupPackageSwitcher").attr("data-operator").trim() : null;

    if (currentOperator === operatorId) {
      return toggleWizard("second-card");
    }

    ajaxHandler(asmxUrl + "/controllers/eChargeController.asmx/getNormalPackages", "GET", { chargeOperatorCode: operatorId, }, null, function (callback) {
      if (hasValue(callback) && callback.hasOwnProperty("d")) {
        if (hasValue(callback.d)) {

          let normalItems = "", amazingItems = "",
            amazingLabel = operatorId == 3 ? langs.topupExcitingPkg : langs.topupAmazingPkg;
          const topupPackages = callback.d
          if (topupPackages.length) {
            $.each(topupPackages.sort(sortByType), function (index, item) {

              if (hasValue(item.Amount)) {
                const chargeType = item.ChargeType == 0 ? langs.topupNormalPkg : amazingLabel;
                const html = $("#Packages").html()
                  .replace("%Operator%", operatorId)
                  .replaceAll("%Code%", item.SepChargeCode)
                  .replace("%OperatorName%", operatorTypes[operatorId])
                  .replaceAll("%Type%", chargeType)
                  .replaceAll("%Description%",
                    commaSeparator(hasValue(item.AmountWithoutVAT) ? item.AmountWithoutVAT : item.Amount))
                  .replace("%ChargeAmount%", item.Amount);

                if (item.ChargeType == 1) {
                  amazingItems += html;
                } else {
                  normalItems += html;
                }
              }
            });
            $("#TopupPackageSwitcher").attr("data-operator", operatorId);
            $("#NormalTopup ul").empty().append(normalItems);
            $("#AmazingTopup ul").empty().append(amazingItems);
          }
          amazingItems.length ? $(".ui-topup-type-title").removeClass("ui-hidden") & $("#ValTopupType").text(amazingLabel) : $(".ui-topup-type-title").addClass("ui-hidden");
          toggleWizard("second-card");

        } else {
          return UIkit.notification(langs.topupNoMatchFound, {
            status: "primary",
            pos: "bottom-center",
            timeout: 7000,
          });
        }

      } else {
        return UIkit.notification(langs.serviceException, {
          status: "danger",
          pos: "bottom-center",
          timeout: 7000,
        });
      }

    }, true
    );


  }

  function sortByType(firstList, secondList) {
    var firstFilter = firstList.ChargeType,
      secondFilter = secondList.ChargeType;
    return firstFilter < secondFilter ? -1 : firstFilter > secondFilter ? 1 : 0;
  }

  function removeOperatorActiveItem() {
    $("#TopupOperator").children().find("a").removeClass("ui-active-operator");
  }
});
