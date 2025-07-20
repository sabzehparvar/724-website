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
            const billName = hasValue(selfThis.attr("data-bill-name")) ? selfThis.attr("data-bill-name").trim() : null;
            const inputId = hasValue(selfThis.attr("data-input-id")) ? selfThis.attr("data-input-id").trim() : null;
            const inputLabel = hasValue(selfThis.attr("data-input-label")) ? selfThis.attr("data-input-label").trim() : null;
            if (action) {
                switch (action) {

                    case "toggle": {
                        $("#billFormTitle").text(`انتخاب: ${billName}`);
                        $("#billNumberLabel")
                            .attr("for", inputId)
                            .text(inputLabel);
                        $("#billNumberInput")
                            .attr("id", inputId)
                            .val("")                  // clear any old value
                            .attr("placeholder", `لطفا ${billName} را وارد کنید`);

                        // 3️⃣ show the second card
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
