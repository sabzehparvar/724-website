"use strict";

document.addEventListener("DOMContentLoaded", onLoadFunctions);

$(document).ready(function () {
  $(document).on("click", ".uk-button, .uk-link", function (e) {
    if (!$(this).hasClass("on-progress")) {
      var selfThis = $(this),
        action = hasValue($(this).attr("data-action"))
          ? $(this).attr("data-action").trim()
          : null;
      if (action) {
        switch (action) {
          case "download-links":
            UIkit.notification("این ویژگی در حال حاضر برای شما غیرفعال است", {
              status: "primary",
              pos: "top-center",
              timeout: 5000,
            });
            e.preventDefault();
            break;
        }
      }
    }
  });

  $(document).on(
    "click touchstart mouseover",
    ".ui-showcase-item",
    function (e) {
      var selfThis = $(this),
        showcaseItem = hasValue($(this).attr("data-item"))
          ? $(this).attr("data-item").trim()
          : null,
        serviceItem = hasValue($(this).attr("data-service"))
          ? $(this).attr("data-service").trim()
          : null;
      if (showcaseItem && serviceItem) {
        $(".ui-showcase-context").addClass("uk-hidden");
        $(".ui-showcase-item").removeClass("ui-current");
        $(".ui-showcase-item[data-item=" + showcaseItem + "]").addClass(
          "ui-current"
        );
        $(".ui-showcase-shining")
          .removeClass()
          .addClass("ui-showcase-shining ui-shining-" + serviceItem);
        $(
          ".ui-showcase-context[data-showcase=" + showcaseItem + "]"
        ).removeClass("uk-hidden");
      }
    }
  );

  $(document).on("click", ".ui-wizard-title", function (e) {
    var selfThis = $(this),
      wizardItem = hasValue($(this).attr("data-item"))
        ? $(this).attr("data-item").trim()
        : null;
    if (wizardItem) {
      $(".ui-wizard-img").addClass("uk-hidden");
      $(".ui-wizard-img[data-wizard=" + wizardItem + "]").removeClass(
        "uk-hidden"
      );
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function updateParentBorder(parent) {
    const openSubDropdown = parent.querySelector(
      ".ui-navbar-sub-dropdown.uk-open"
    );
    if (openSubDropdown) {
      parent.style.borderRadius = "0 25px 25px 0";
    } else {
      parent.style.borderRadius = "";
    }
  }

  const parentDropdowns = document.querySelectorAll(
    ".ui-navbar-dropdown:not(.ui-navbar-sub-dropdown)"
  );

  parentDropdowns.forEach((parent) => {
    updateParentBorder(parent);
    const subDropdowns = parent.querySelectorAll(".ui-navbar-sub-dropdown");
    subDropdowns.forEach((subDropdown) => {
      const observer = new MutationObserver(() => {
        updateParentBorder(parent);
      });

      observer.observe(subDropdown, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });
  });

  const subNavbars = document.querySelectorAll(".ui-navbar-sub-dropdown");

  subNavbars.forEach((subNavbar) => {
    const observer = new MutationObserver(() => {
      subNavbar.style.left = "-" + (subNavbar.offsetWidth - 1) + "px";
    });

    observer.observe(subNavbar, {
      attributes: true,
      attributeFilter: ["style"],
    });
  });
});

function onLoadFunctions() {
  removePageNumberForNews();
}

function removePageNumberForNews() {
  if (
    document
      .getElementById("es-content")
      .childNodes[0].textContent.search("لیست اخبار") == 0
  ) {
    document.getElementById("es-content").childNodes[0].nodeValue = "";
  }
}

var operatorIcons = {
  1: "ic-hamrah-aval",
  2: "ic-irancell",
  3: "ic-rightel",
  4: "ic-samantel",
  5: "ic-shatel",
  6: "ic-telekish",
};
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
const baseUrl = "https://shop.sep.ir/";

function getOperators() {
  // ajaxHandler(
  //   "https://shop.sep.ir/controllers/eChargeController.asmx/getOperators",
  //   "GET",
  //   null,
  //   null,
  //   function (callback) {
  //     console.log(callback);
  //   }
  // );
  var items = '';
      $.each(operatorsList, function (index, item) {
        var iconUrl = './dist/ui/img/icon/operators/' + operatorIcons[item.Code] + '.svg';
        console.log(iconUrl)
        console.log(item.Description)
        console.log(item.Code)

        items += $('#Operators').html().replace('%Code%', item.Code).replace('%IconSrc%', iconUrl).replaceAll('%Name%', item.Description);
      });
      $('.ui-topup-operator').removeClass('ui-hidden') & $('.ui-topup-operator ul').empty().append(items);
}
getOperators();


