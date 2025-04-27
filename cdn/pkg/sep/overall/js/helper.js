'use strict'

var hasValue = function (value) {
  if (value == null || value == undefined || value.length == 0 || value == '') {
    return false
  }
  return true
}

let normalize = function (value) {
  if (hasValue(value)) {
    let farsi = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'], arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'], replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], cacheChar = value

    for (let i = 0; i < 10; i++) {
      let regexFa = new RegExp(farsi[i], 'g'), regexAr = new RegExp(arabic[i], 'g')

      cacheChar = cacheChar.replace(regexFa, replace[i])
      cacheChar = cacheChar.replace(regexAr, replace[i])
    }
    return cacheChar
  }
  return value
}

let getUrlParams = function (value) {
  let location = window.location.search.substring(1), variables = location.split('&'), params, i
  for (i = 0; i < variables.length; i++) {
    params = variables[i].split('=')

    if (params[0] === value) {
      return params[1] === undefined ? true : decodeURIComponent(params[1])
    }
  }
  return false
}

function toCamelCase(data) {
  let output, origKey, newKey, value

  if (data instanceof Array) {
    return data.map(function (value) {
      if (typeof value === 'object') {
        value = toCamelCase(value)
      }
      return value
    })
  } else {
    output = {}
    for (origKey in data) {
      if (data.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString(), value = data[origKey]

        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamelCase(value)
        }
        output[newKey] = value
      }
    }
  }
  return output
}

let ajaxHandler = function (url, method = 'GET', params, element, callback, loader = false, freeze = true, async = true) {
  $.ajax({
    url: url,
    type: method,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: hasValue(params) ? method == 'GET' ? new URLSearchParams(params).toString() : JSON.stringify(params) : null,
    async: async ? true : false,
    timeout: 100000,
    beforeSend: function () {
      freeze ? $('body').addClass('is-freeze') : undefined
      element ? element.addClass('on-progress') : undefined

      loader ? $('#loader').hasClass('uk-hidden') ? $('#loader').removeClass('uk-hidden') : undefined : undefined
    },
    success: function (response) {
      callback(response)
    },
    error: function (xhr, error) {
      callback(xhr)
    },
    complete: function () {
      freeze ? $('body').removeClass('is-freeze') : undefined
      element ? element.removeClass('on-progress') : undefined

      loader ? setTimeout(function () {
        $('#loader').hasClass('uk-hidden') ? undefined : $('#loader').addClass('uk-hidden')
      }, 100) : undefined
    }
  })
}
