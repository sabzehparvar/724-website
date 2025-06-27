"use strict";

const asmxUrl = "https://shop.sep.ir/controllers";
const operatorsList = [
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 1,
    Name: "MCI",
    Description: "همراه اول",
  },
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 2,
    Name: "MTN",
    Description: "ایرانسل",
  },
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 3,
    Name: "RighTel",
    Description: "رایتل",
  },
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 4,
    Name: "Samantel",
    Description: "سامانتل",
  },
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 5,
    Name: "Shatel",
    Description: "شاتل",
  },
  {
    __type: "Sep.SamanEpay.Domain.Entity.TelecomOperator",
    Code: 6,
    Name: "TeleKish",
    Description: "تله کیش",
  },
];
const topupPackages=  [
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 121,
            "Description": "10000",
            "Amount": 11000.0,
            "AmountWithoutVAT": 10000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 125,
            "Description": "20000",
            "Amount": 22000.0,
            "AmountWithoutVAT": 20000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 128,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 129,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 132,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 133,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 136,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 4219,
            "Description": "500000",
            "Amount": 550000.0,
            "AmountWithoutVAT": 500000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 4220,
            "Description": "1000000",
            "Amount": 1100000.0,
            "AmountWithoutVAT": 1000000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 4083,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5799,
            "Description": "10000",
            "Amount": 11000.0,
            "AmountWithoutVAT": 10000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5803,
            "Description": "20000",
            "Amount": 22000.0,
            "AmountWithoutVAT": 20000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5806,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5807,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5810,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5811,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5756,
            "Description": "10000",
            "Amount": 11000.0,
            "AmountWithoutVAT": 10000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5757,
            "Description": "20000",
            "Amount": 22000.0,
            "AmountWithoutVAT": 20000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5758,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5759,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5760,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5761,
            "Description": "50000",
            "Amount": 55000.0,
            "AmountWithoutVAT": 50000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5762,
            "Description": "100000",
            "Amount": 110000.0,
            "AmountWithoutVAT": 100000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5763,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": false
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 6910,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Wow",
            "ChargeType": 1,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 6967,
            "Description": "500000",
            "Amount": 550000.0,
            "AmountWithoutVAT": 500000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 6968,
            "Description": "1000000",
            "Amount": 1100000.0,
            "AmountWithoutVAT": 1000000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        },
        {
            "__type": "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
            "SepChargeCode": 5814,
            "Description": "200000",
            "Amount": 220000.0,
            "AmountWithoutVAT": 200000.0,
            "Duration": null,
            "DurationType": null,
            "IsPrepaid": true,
            "ChargeTypeDescription": "Normal",
            "ChargeType": 0,
            "OperatorId": 2,
            "ProviderID": 4,
            "IsAPP": true
        }
    ]
$(document).ready(function () {
  const operatorIcons = {
    1: "ic-hamrah-aval",
    2: "ic-irancell",
    3: "ic-rightel",
    4: "ic-samantel",
    5: "ic-shatel",
    6: "ic-telekish",
  };

  if (document.getElementById("Topup")) {
    getOperators();
    $("#Topup").validate({
      rules: {
        CellNumber: { digits: true, cellNumber: true },
      },
    });

    $("#CellNumber").keyup(function (e) {
      var value = normalize($(this).val());
      if (value.length >= 4) {
        var operatorId = validateCellNumber(value, true);
        if (operatorId) {
          var operatorActiveItem = $("#TopupOperator")
            .children()
            .find("[data-value=" + operatorId + "]");
          if (!operatorActiveItem.hasClass("uc-active-operator")) {
            $("#Operator").val(operatorId) &
              removeOperatorActiveItem() &
              getTopupPackages() &
              operatorActiveItem.addClass("uc-active-operator");
          }
        }
      } else if (value.length < 4) {
        $("#Operator").val(operatorId) &
          removeOperatorActiveItem() &
          $("#TopupPackage").addClass("uc-hidden") &
          $("#TopupPackageSwitcher").empty() &
          $("#TopupType").addClass("uc-hidden");
      }
    });

    $("#TopupAmazing").change(function () {
      $("#PackageItem").removeClass("uc-amazing-package");
      if (this.checked) {
        document.querySelectorAll("#PackageItem").forEach((item) => {
          item.classList.contains("uc-amazing-package")
            ? (item.style.display = "block")
            : (item.style.display = "none");
        });
      } else {
        document.querySelectorAll("#PackageItem").forEach((item) => {
          item.classList.contains("uc-normal-package")
            ? (item.style.display = "block")
            : (item.style.display = "none");
        });
      }
    });
  }

  $(document).on("click", ".uk-button, .uk-link", function (e) {
    if (!$(this).hasClass("on-progress")) {
      var selfThis = $(this),
        action = hasValue($(this).attr("data-action"))
          ? $(this).attr("data-action").trim()
          : null;
      if (action) {
        switch (action) {
          case "changeTopupOperator":
            var cellNumber = hasValue($("#CellNumber").val())
              ? normalize($("#CellNumber").val().trim())
              : null;
            if ($("#Topup").valid()) {
              var value = hasValue($(this).attr("data-value"))
                ? $(this).attr("data-value").trim()
                : null;
              $("#Operator").val(value) &
                removeOperatorActiveItem() &
                getTopupPackages() &
                selfThis.addClass("uc-active-operator");
            } else {
              if (!cellNumber || !validateCellNumber(cellNumber)) {
                UIkit.notification(
                  !cellNumber
                    ? langs.requiredCellNumber
                    : langs.invalidCellNumber,
                  {
                    status: "primary",
                    pos: "bottom-center",
                    timeout: 7000,
                  }
                );
                return false;
              }
            }
            e.preventDefault();
            break;
          case "getTopupPackage":
            var cellNumber = hasValue($("#CellNumber").val())
                ? normalize($("#CellNumber").val().trim())
                : null,
              operatorId = null,
              chargeCode = null,
              packageAmount = 0,
              packageText = null;
            if ($("#Topup").valid()) {
              document.querySelectorAll("#PackageItem").forEach((item) => {
                if (item.classList.contains("uk-active")) {
                  operatorId = hasValue(item.getAttribute("data-operator"))
                    ? item.getAttribute("data-operator")
                    : null;
                  chargeCode = hasValue(item.getAttribute("data-charge"))
                    ? item.getAttribute("data-charge")
                    : null;
                  packageAmount = hasValue(item.getAttribute("data-amount"))
                    ? item.getAttribute("data-amount")
                    : null;
                  packageText = hasValue(item.getAttribute("data-text"))
                    ? item.getAttribute("data-text")
                    : null;
                  return false;
                }
              });
              if (operatorId && chargeCode && packageText) {
                var formData = new FormData();

                formData.append(
                  "CellNumberListFile",
                  new Blob([cellNumber], { type: "text/plain" }),
                  cellNumber + ".txt"
                );
                formData.append("ChargeCode", chargeCode);
                formData.append("ChargeOperatorCode", operatorId);
                formData.append("ChargeDescription", packageText);

                ajaxHandler(
                  asmxUrl + "/eChargeController.asmx/CreateBatchChargeOrder",
                  "POST",
                  formData,
                  selfThis,
                  function (callback) {
                    var fileIdentifier = callback.data.userFileIdentifier;
                    ajaxHandler(
                      serviceUrl + "/ipg-top-up/create-token",
                      "POST",
                      {
                        amount: packageAmount,
                        cellNumber,
                        operatorId,
                        sepChargeCode: chargeCode,
                        topUpType: "Charge",
                        fileIdentifier,
                      },
                      selfThis,
                      function (callback) {
                        UIkit.modal("#iPGModal").show();
                        setTimeout(function () {
                          $.redirect(
                            callback.data.ipgUrl,
                            {
                              GetMethod: callback.data.getMethod,
                              FriendsCellNumber:
                                callback.data.friendsCellNumber,
                              Amount: callback.data.amount,
                              RedirectUrl: callback.data.redirectUrl,
                              SepChargeCode: callback.data.sepChargeCode,
                              ResNum: callback.data.resNum,
                              ResNum1: callback.data.resNum1,
                              TerminalId: callback.data.terminalId,
                              TranType: callback.data.tranType,
                              MID: callback.data.mID,
                              OperatorID: callback.data.operatorID,
                              OtherCellNumber: callback.data.otherCellNumber,
                            },
                            "POST"
                          );
                        }, 2000);
                      }
                    );
                  },
                  false,
                  true,
                  true
                );
              } else {
                UIkit.notification(langs.selectingTopupPackage, {
                  status: "danger",
                  pos: "bottom-center",
                  timeout: 7000,
                });
              }
            } else {
              if (!cellNumber || !validateCellNumber(cellNumber)) {
                UIkit.notification(
                  !cellNumber
                    ? langs.requiredCellNumber
                    : langs.invalidCellNumber,
                  {
                    status: "primary",
                    pos: "bottom-center",
                    timeout: 7000,
                  }
                );
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
    // ajaxHandler(asmxUrl + '/eChargeController.asmx/getOperators', 'GET', null, null, function (callback) {
    //   var items = '';
    //   $.each(callback, function (index, item) {
    //     var iconUrl = appUrl + '/dist/app/icn/' + operatorIcons[item.code] + '.svg?v=new';
    //     items += $('#Operators').html().replaceAll('%Code%', item.code).replace('%IconSrc%', iconUrl).replace('%Name%', item.description);
    //   });
    //   $('#TopupOperator').removeClass('uc-hidden') & $('#TopupOperatorSwitcher').empty().append(items);
    // });
    var items = "";
    $.each(operatorsList, function (index, item) {
      var iconUrl =
        "./dist/ui/img/icon/operators/" + operatorIcons[item.Code] + ".svg";
      items += $("#Operators")
        .html()
        .replace("%Code%", item.Code)
        .replace("%IconSrc%", iconUrl)
        .replaceAll("%Name%", item.Description);
    });
    $("#Topup").removeClass("ui-hidden") & $("#Topup ul").empty().append(items);
  }

  function getTopupPackages() {
    var operatorId = hasValue($("#Operator").val())
        ? $("#Operator").val().trim()
        : null,
      currentOperator = hasValue(
        $("#TopupPackageSwitcher").attr("data-operator")
      )
        ? $("#TopupPackageSwitcher").attr("data-operator").trim()
        : null;
    if (currentOperator != operatorId) {
      // ajaxHandler(
      //   asmxUrl + "/eChargeController.asmx/getNormalPackages",
      //   "GET",
      //   {
      //     chargeOperatorCode: operatorId,
      //   },
      //   null,
      //   function (callback) {
      //     var items = "",
      //       hasAmazing = 0,
      //       amazingLabel =
      //         operatorId == 3 ? langs.topupExcitingPkg : langs.topupAmazingPkg;
      //     $("#TopupAmazing").prop("checked", false);
      //     if (callback.length) {
      //       $.each(callback.sort(sortByType), function (index, item) {
      //         if (hasValue(item.amount)) {
      //           var className =
      //               item.chargeType == 0
      //                 ? "uc-normal-package"
      //                 : "uc-amazing-package",
      //             chargeType =
      //               item.chargeType == 0 ? langs.topupNormalPkg : amazingLabel;
      //           item.chargeType == 1 ? hasAmazing++ : undefined;
      //           items += $("#Packages")
      //             .html()
      //             .replace("%Class%", className)
      //             .replace("%Operator%", operatorId)
      //             .replaceAll("%Code%", item.sepChargeCode)
      //             .replace("%OperatorName%", operatorTypes[operatorId])
      //             .replaceAll("%Type%", chargeType)
      //             .replaceAll(
      //               "%Description%",
      //               commaSeparator(
      //                 hasValue(item.amountWithoutVAT)
      //                   ? item.amountWithoutVAT
      //                   : item.amount
      //               )
      //             )
      //             .replace("%Amount%", commaSeparator(item.amount))
      //             .replace("%ChargeAmount%", item.amount);
      //         }
      //       });
      //       $("#TopupPackage").removeClass("uc-hidden") &
      //         $("#TopupPackageSwitcher")
      //           .empty()
      //           .attr("data-operator", operatorId)
      //           .append(items);
      //     } else {
      //       $("#TopupPackage").removeClass("uc-hidden") &
      //         $("#TopupPackageSwitcher")
      //           .empty()
      //           .removeAttr("data-operator")
      //           .append($("#EmptyTopup").html());
      //     }
      //     hasAmazing
      //       ? $("#TopupType").removeClass("uc-hidden") &
      //         $("#ValTopupType").text(amazingLabel)
      //       : $("#TopupType").addClass("uc-hidden");
      //   }
      // );
     var items = "",
            hasAmazing = 0,
            amazingLabel =
              operatorId == 3 ? langs.topupExcitingPkg : langs.topupAmazingPkg;
          $("#TopupAmazing").prop("checked", false);
          if (topupPackages.length) {
            $.each(topupPackages.sort(sortByType), function (index, item) {
              if (hasValue(item.amount)) {
                var className =
                    item.chargeType == 0
                      ? "uc-normal-package"
                      : "uc-amazing-package",
                  chargeType =
                    item.chargeType == 0 ? langs.topupNormalPkg : amazingLabel;
                item.chargeType == 1 ? hasAmazing++ : undefined;
                items += $("#Packages")
                  .html()
                  .replace("%Class%", className)
                  .replace("%Operator%", operatorId)
                  .replaceAll("%Code%", item.sepChargeCode)
                  .replace("%OperatorName%", operatorTypes[operatorId])
                  .replaceAll("%Type%", chargeType)
                  .replaceAll(
                    "%Description%",
                    commaSeparator(
                      hasValue(item.amountWithoutVAT)
                        ? item.amountWithoutVAT
                        : item.amount
                    )
                  )
                  .replace("%Amount%", commaSeparator(item.amount))
                  .replace("%ChargeAmount%", item.amount);
              }
            });
            $("#TopupPackage").removeClass("uc-hidden") &
              $("#TopupPackageSwitcher")
                .empty()
                .attr("data-operator", operatorId)
                .append(items);
          } else {
            $("#TopupPackage").removeClass("uc-hidden") &
              $("#TopupPackageSwitcher")
                .empty()
                .removeAttr("data-operator")
                .append($("#EmptyTopup").html());
          }
          hasAmazing
            ? $("#TopupType").removeClass("uc-hidden") &
              $("#ValTopupType").text(amazingLabel)
            : $("#TopupType").addClass("uc-hidden");
    }
  }

  function sortByType(firstList, secondList) {
    var firstFilter = firstList.chargeType,
      secondFilter = secondList.chargeType;
    return firstFilter < secondFilter ? -1 : firstFilter > secondFilter ? 1 : 0;
  }

  function removeOperatorActiveItem() {
    $("#TopupOperator").children().find("a").removeClass("uc-active-operator");
  }
});
