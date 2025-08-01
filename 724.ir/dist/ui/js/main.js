const operatorTypes = {
  1: "همراه اول",
  2: "ایرانسل",
  3: "رایتل",
  4: "سامانتل",
  5: "شاتل",
  6: "تله کیش",
};
const langs = {
  success: "درخواست شما با موفقیت انجام شد",
  confrim: "تایید",
  cancel: "انصراف",
  serviceUnavailable: "خطا در برقراری ارتباط با سرویس وب",
  somethingWentWrong: "خطایی در انجام فرآیند رخ داده است",
  successBillConflict:
    "درخواست بررسی مغایرت قبض با موفقیت ارسال شد، در صورت لزوم با شما تماس خواهیم گرفت",
  serviceException: "خطا در دریافت پاسخ از سرویس وب",
  serviceTimeout: "پاسخ از سرویس وب در محدوده زمانی مجاز دریافت نشد",
  validationError: "خطا در اعتبارسنجی مقادیر ارسالی",
  tokenError: "خطا در دریافت توکن از سرویس وب",
  requirementsError: "خطا در دریافت مقادیر اطلاعاتی مورد نیاز",
  temporarilyDeactivate:
    "این سرویس به دلیل به‌روز‌رسانی موقتا از دسترس خارج است",
  irr: "ریال",
  billType: "نوع قبض",
  billId: "شناسه قبض",
  paymentId: "شناسه پرداخت",
  billCompany: "شرکت صادر کننده",
  fileNo: "شماره پرونده",
  traceNo: "شماره رهگیری",
  payDate: "زمان پرداخت",
  payableAmount: "مبلغ قابل پرداخت",
  cashin: "افزایش اعتبار",
  cashinSuccess: "افزایش اعتبار موفق",
  cashinFailed: "افزایش اعتبار ناموفق",
  downloadExcel: "دریافت اکسل",
  burn: "برداشت اعتبار",
  burnSuccess: "برداشت موفق",
  burnCredit: "کسر {0} ریال",
  plateNumber: "شماره پلاک",
  viewTrafficFines: "نمایش خلافی",
  emptyTrafficFines: "هیچ جریمه‌ای برای پلاک وارد شده یافت نشد",
  emptyBill: "جزئیات قابل نمایشی برای این قبض یافت نشد",
  trafficFinesTotalAmount: "مبلغ کل خلافی",
  invalidBillId: "شناسه قبض وارد شده صحیح نیست",
  orderProcess: "پرداخت",
  invalidPaymentId: "شناسه پرداخت وارد شده صحیح نیست",
  invalidBill: "اطلاعات قبض وارد شده صحیح نیست",
  tci: "مخابرات",
  mci: "همراه اول",
  mtn: "ایرانسل",
  rightel: "رایتل",
  samantel: "سامانتل",
  shatel: "شاتل موبایل",
  telekish: "تله کیش",
  invalidOperatorNumber: "شماره وارد شده متعلق به {0} نیست",
  orderReport: "جزئیات",
  subscriberInvalid:
    "امکان استعلام بدهی و پرداخت برای سیم‌کارت‌های اعتباری وجود ندارد",
  municipalityTypeInvalid: "قبض وارد شده متعلق به شهرداری نیست",
  inquiryDebt: "استعلام",
  conformRemoveBill:
    "آیا از حذف قبض <em>{0}</em> با شناسه <em>{1}</em> از سبد پرداخت مطمئن هستید؟",
  requiredCellNumber: "لطفا شماره تلفن همراه را وارد کنید",
  inavilableInquiryDate: "تاکنون استعلام نشده",
  invalidCellNumber: "شماره تلفن همراه وارد شده معتبر نیست",
  topupNormalPkg: "عادی",
  topupAmazingPkg: "شگفت انگیز",
  topupExcitingPkg: "شور انگیز",
  package: "بسته",
  selectingOne: "انتخاب کنید",
  topupPackageName:
    "شارژ {0} {1} ریالی (مبلغ با احتساب مالیات: {2} ریال) (کد: {3})",
  topupPackageText: "شارژ {0} {1} ریالی {2} (کد: {3})",
  successProccessOrder: "پردازش سفارش با موفقیت انجام شد",
  internetPackageName:
    "بسته اینترنت {0} (مبلغ با احتساب مالیات: {1} ریال) (کد: {2})",
  internetPackageText: "بسته اینترنت {0} {1} (کد: {2})",
  topupNoMatchFound: "هیچ شارژی برای اپراتور انتخاب شده یافت نشد",
  internetNoMatchFound:
    "هیچ بسته اینترنتی برای اپراتور با فیلتر انتخاب شده یافت نشد",
  orderDetail: "مشاهده جزئبات",
  orderState: "وضعیت سفارش",
  orderStateDone: "انجام شده",
  orderStatePend: "در انتظار پرداخت",
  orderStateProgress: "در حال پردازش",
  orderStateUnknown: "نامشخص",
  orderStatePreOrder: "پیش سفارش",
  orderDate: "تاریخ سفارش",
  orderTransactionCount: "نتیجه درخواست",
  orderTransactionResult:
    'موفق: <em class="uk-text-success">{0}</em> | ناموفق: <em class="uk-text-danger">{1}</em>',
  orderSuccessCreate: "پردازش و ثبت سفارش با موفقیت انجام شد",
  orderId: "شناسه سفارش",
  orderDescription: "عنوان سفارش",
  orderFreewayResult:
    'مجموع: <em class="uk-text-muted">{0}</em> | موفق: <em class="uk-text-success">{1}</em> | ناموفق: <em class="uk-text-danger">{2}</em>',
  selectingTopupPackage: "لطفا نوع شارژ را برای خرید انتخاب کنید",
  selectingInternetPackage: "لطفا نوع بسته را برای خرید انتخاب کنید",
  emptyBasket: "سبد پرداخت قبض شما خالی می‌باشد",
  billNotPayed:
    "قبض وارد شده توسط سامانه‌های پرداخت الکترونیک سامان تا این لحظه پرداخت نشده است.",
  undefined: "تعریف نشده",
  billSuccess: "موفق",
  billFailed: "ناموفق",
  billPayed: "پرداخت شده",
  conformRemovePlateNumber:
    "آیا از حذف پلاک <em>{0}</em> از لیست خودروهای خود مطمئن هستید؟",
  conformRemoveAllPlateNumber:
    "آیا از حذف پلاک‌های انتخاب شده از لیست خودروهای خود مطمئن هستید؟",
  emptyFreewayToll: "هیچ گزارشی برای عوارض آزادراهی یافت نشد",
  iran: "ایران",
  successRemove: "رکورد با موفقیت حذف/غیرفعال شد",
  notEnoughForMultipleDelete:
    "تعداد موارد انتخاب شده برای حذف گروهی کافی نیست",
  notEnoughForMultipleAction:
    "تعداد موارد انتخاب شده برای این عملیات گروهی کافی نیست",
  freewayTollInquiryNoMatch:
    "هیچ پلاکی انتخاب نشده است، لطفا حداقل پلاک یک وسیله نقلیه را انتخاب کنید",
  freewayTollInquiryFailed: "خطا در استعلام بدهی عوارض آزادراهی",
  notEnoughForInquiry: "تعداد موارد انتخاب شده برای استعلام کافی نیست",
  notEnoughForPaymentFreewayToll:
    "هیچ پلاکی انتخاب نشده و یا پلاک‌های انتخاب شده بدهی عوارض آزادراهی ندارند",
  freewayTollOrder: "سند پرداخت عوارض آزادراهی",
  freewayTollOrderError: "خطا در اقلام اطلاعاتی سفارش",
  walletNotAllowed: "امکان پرداخت این قبض با کیف پول وجود ندارد.",
  successSubmitFile: "فایل با موفقیت ارسال شد",
  callbackRequirementsError:
    "مقادیر اطلاعاتی مورد نیاز با پاسخ دریافتی از سرویس مطابقت ندارد",
  removeError: "حذف با خطا مواجه شد",
  fileProgressCompleted: "پردازش فایل با موفقیت به اتمام رسید",
  fileProgressFailed:
    "پردازش فایل با تکمیل نشد، ممکن است تعدادی از قبوض شما پردازش نشده باشد",
  itemDontAddToBasket: "موردی برای افزودن به سبد قبض یافت نشد",
  itemAddToBasket: "قبض با موفقیت به سبد قبض اضافه شد",
  noItemIsSelected: "قبضی انتخاب نشده است",
  duplicateBill: "قبض وارد شده تکراری است",
  wrongNationalId: "شماره موبایل و کد ملی با یکدیگر تطابق ندارند",
  invalidDateFromDateTo: "بازه جستجو (از تاریخ تا تاریخ) باید مشخص شود",
  dateGreaterThan: "محدوده تاریخ انتخاب شده معتبر نمی‌باشد",
  diffInDays: "تاریخ شروع و پایان جستجو نمی‌تواند بیشتر از ۳۱ روز باشد",
  wrongFileType: "فرمت فایل آپلود شده اشتباه است",
  invalidDateFromDateTo: "بازه جستجو (از تاریخ تا تاریخ) باید مشخص شود",
  dateGreaterThan: "محدوده تاریخ انتخاب شده معتبر نمی‌باشد",
  diffInDays: "تاریخ شروع و پایان جستجو نمی‌تواند بیشتر از ۳۱ روز باشد",
  confirmRemoveAllCategories: "آیا از حذف دسته‌های انتخاب شده مطمئن هستید؟",
  confirmRemoveAllBills:
    "تمامی قبوض انتخاب شده و اطلاعات مربوط به آن‌ها حذف خواهد شد، آیا مطمئن هستید؟",
  conformRemoveBill:
    'آیا از حذف قبض <em uk-tooltip="title:{1}; pos:bottom">{0}</em> از لیست قبوض خود مطمئن هستید؟',
  theRecordWasDeleted: "با موفقیت حذف شد",
  theRecordWasUpdated: "با موفقیت به‌رو‌زرسانی شد",
  billIsUnpayable: "قبض قابل پرداخت نیست و یا قبلا پرداخت شده",
  pleaseWaitForProcessingToComplete:
    "لطفا کمی صبر کنید تا درخواست‌های در حال انجام به اتمام برسد",
  unSuccessfullyAddedToBsket: "به سبد قبض اضافه نشد",
  categoryStatus: "نتیجه پردازش",
  billsAreUnpayable:
    "قبوض انتخاب شده قابل پرداخت نیست و یا قبلا پرداخت شده است",
  ajaxRequestNotFinished: "صبر کنید تا تمام قبوض استعلام شود",
  duplicateCategory: "نام دسته بندی تکراری است",
  fileTypeError: "فرمت فایل آپلود شده اشتباه است",
  fileEmptyError: "فایل آپلود شده محتوایی ندارد",
  fileContentLenghtError: "فایل آپلود شده با فایل نمونه مطابقت ندارد",
  noBillDebt: "برای قبض وارد شده بدهی یافت نشد"
};
const validationMessage = {
  nationalId: "کد ملی وارد شده معتبر نیست.",
  legalId: "شناسه حقوقی وارد شده معتبر نیست.",
  cardNumber: "شماره کارت وارد شده معتبر نیست.",
  sheba: "شماره شبا وارد شده معتبر نیست.",
  sheba: "شماره شبا وارد شده معتبر نیست.",
  cellNumber: "شماره تلفن همراه وارد شده معتبر نیست.",
  mciPostPaidNumbers: "شماره تلفن همراه وارد شده از نوع دائمی نیست.",
};
const operatorIcons = {
  1: "ic-hamrah-aval",
  2: "ic-irancell",
  3: "ic-rightel",
  4: "ic-samantel",
  5: "ic-shatel",
  6: "ic-telekish",
};
var durationTypes = {
  1: "ساعته",
  2: "روزه",
  3: "هفته",
  4: "ماهه",
  5: "ساله",
};
var billTypes = {
  water: "آب",
  electricity: "برق",
  gas: "گاز",
  phone: "تلفن",
  hamrahAval: "همراه اول",
  municipality: "شهرداری",
  traffic: "راهنمایی رانندگی",
};

var billTypesEnum = {
  1: "آب",
  2: "برق",
  3: "گاز",
  4: "تلفن",
  5: "همراه اول",
  6: "شهرداری",
  7: "راهنمایی رانندگی",
};

var billTypesEnumEng = {
  1: "water",
  2: "electricity",
  3: "gas",
  4: "phone",
  5: "hamrahAval",
  6: "municipality",
  7: "traffic",
};

var billLableEnum = {
  1: "شناسه قبض آب",
  2: "شناسه قبض برق",
  3: "شماره اشتراک قبض گاز",
  4: "شماره تلفن",
  5: "شماره تلفن همراه",
  6: "شناسه قبض",
  7: "شماره پلاک خودرو",
};
const billsInputId = {
  1: "WatterBillId",
  2: "BarghBillId",
  3: "GazParticipateCode",
  4: "Phone",
  5: "Mobile",
}
const billsActions = {
  1: "getWaterBill",
  2: "getElectricityBill",
  3: "getGasBill",
  4: "getPhoneBill",
  5: "getMciBill",
}
function validateCellNumber(value, checkRegex = false) {
  var value = normalize(value.trim()).toString(),
    regex = {
      1: /^091|0990|0991|0992|0993|0994/,
      2: /^0900|0901|0902|0903|0904|0905|0930|0933|0935|0936|0937|0938|0939|0941/,
      3: /^0920|0921|0922|0923/,
      4: /^0999|099998|099999/,
      5: /^09981/,
      6: /^0934/,
    };
  for (var operator in regex) {
    if (checkRegex) {
      if (value.match(regex[operator])) {
        return operator;
      }
    } else {
      if (
        value.length == 11 &&
        value.match(regex[operator]) &&
        !/(.)\1{6,}/.test(value)
      ) {
        return operator;
      }
    }
  }
  return false;
}
function validateMciPostPaidNumber(value) {
  var value = normalize(value.trim()).toString().padStart(11, "0"),
    regex = {
      1: /^0910|0911|0912|0913|0914|0915|0916|0917|0918|0919$/,
    };
  for (var operator in regex) {
    if (
      value.length == 11 &&
      value.match(regex[operator]) &&
      !/(.)\1{6,}/.test(value)
    ) {
      return true;
    }
  }
  return false;
}
function commaSeparator(value) {
  while (/(\d+)(\d{3})/.test(value.toString())) {
    value = value.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return value;
}
function convertJSON(array) {
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}
function toCamel(data) {
  var output, origKey, newKey, value;
  if (data instanceof Array) {
    return data.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    output = {};
    for (origKey in data) {
      if (data.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
        value = data[origKey];
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value);
        }
        output[newKey] = value;
      }
    }
  }
  return output;
}
function messageReFormat(message, bracZero, bracOne = null, bracTwo = null, bracThree = null) {
  var message = message.replace("{0}", bracZero).replace("{1}", bracOne).replace("{2}", bracTwo).replace("{3}", bracThree);
  return message;
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
