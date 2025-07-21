"use strict";

$(document).ready(function () {

    function toggleWizard(currentWizard) {
        $(".ui-card-wizard").hide();
        $(`.ui-card-wizard[data-wizard="${currentWizard}"]`).fadeIn();
    }

    $(document).on("click", ".uk-button, .uk-link", function (e) {
        if (!$(this).hasClass("on-progress")) {
            const selfThis = $(this);
            const action = hasValue(selfThis.attr("data-action")) ? selfThis.attr("data-action").trim() : null;


            if (action) {
                switch (action) {

                    case "toggleBillCard": {

                        const billType = hasValue(selfThis.attr("data-bill-type")) ? selfThis.attr("data-bill-type").trim() : null;
                     
                        const billName = hasValue(billType) ? `قبض ${billTypesEnum[billType]}` : 'قبض';
                        let inputIdLabel;
                        if (billType <= 3) {
                            inputIdLabel = 'شناسه قبض'
                        } else {
                            inputIdLabel = hasValue(billType) ? billLableEnum[billType] : 'شناسه قبض';
                        }

                        $("#billFormTitle").text(`${billName}`);
                        $("#billIdLabel").text(`${inputIdLabel}  رو وارد کن`);
                        $("#billIdInput").attr("data-bill-type", billType).val("").attr("placeholder", inputIdLabel);
                        toggleWizard("second-card");
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
});
