'use strict';

document.addEventListener('DOMContentLoaded', onLoadFunctions);

$(document).ready(function () {
  $(document).on('click', '.uk-button, .uk-link', function (e) {
    if (!$(this).hasClass('on-progress')) {
      var selfThis = $(this), action = hasValue($(this).attr('data-action')) ? $(this).attr('data-action').trim() : null;
      if (action) {
        switch (action) {
          case 'download-links':
            UIkit.notification('این ویژگی در حال حاضر برای شما غیرفعال است', {
              status: 'primary', pos: 'top-center', timeout: 5000
            });
            e.preventDefault();
            break;
        }
      }
    }
  });

  $(document).on('click touchstart mouseover', '.ui-showcase-item', function (e) {
    var selfThis = $(this), showcaseItem = hasValue($(this).attr('data-item')) ? $(this).attr('data-item').trim() : null,
      serviceItem = hasValue($(this).attr('data-service')) ? $(this).attr('data-service').trim() : null;
    if (showcaseItem && serviceItem) {
      $('.ui-showcase-context').addClass('uk-hidden');
      $('.ui-showcase-item').removeClass('ui-current');
      $('.ui-showcase-item[data-item=' + showcaseItem + ']').addClass('ui-current');
      $('.ui-showcase-shining').removeClass().addClass('ui-showcase-shining ui-shining-' + serviceItem);
      $('.ui-showcase-context[data-showcase=' + showcaseItem + ']').removeClass('uk-hidden');
    }
  });

  $(document).on('click', '.ui-wizard-title', function (e) {
    var selfThis = $(this), wizardItem = hasValue($(this).attr('data-item')) ? $(this).attr('data-item').trim() : null;
    if (wizardItem) {
      $('.ui-wizard-img').addClass('uk-hidden');
      $('.ui-wizard-img[data-wizard=' + wizardItem + ']').removeClass('uk-hidden');
    }
  });
});

function onLoadFunctions() {
  removePageNumberForNews();
}

function removePageNumberForNews() {
  if (document.getElementById('es-content').childNodes[0].textContent.search('لیست اخبار') == 0) {
    document.getElementById('es-content').childNodes[0].nodeValue = '';
  }
}
