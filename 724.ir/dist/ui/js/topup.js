"use strict";

$(document).ready(function () {
  let operatorId;
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
  const topupPackages = [
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 121,
      Description: "10000",
      Amount: 11000.0,
      AmountWithoutVAT: 10000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 125,
      Description: "20000",
      Amount: 22000.0,
      AmountWithoutVAT: 20000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 128,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 129,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 132,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 133,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 136,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 4219,
      Description: "500000",
      Amount: 550000.0,
      AmountWithoutVAT: 500000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 4220,
      Description: "1000000",
      Amount: 1100000.0,
      AmountWithoutVAT: 1000000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 4083,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5799,
      Description: "10000",
      Amount: 11000.0,
      AmountWithoutVAT: 10000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5803,
      Description: "20000",
      Amount: 22000.0,
      AmountWithoutVAT: 20000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5806,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5807,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5810,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5811,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5756,
      Description: "10000",
      Amount: 11000.0,
      AmountWithoutVAT: 10000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5757,
      Description: "20000",
      Amount: 22000.0,
      AmountWithoutVAT: 20000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5758,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5759,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5760,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5761,
      Description: "50000",
      Amount: 55000.0,
      AmountWithoutVAT: 50000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5762,
      Description: "100000",
      Amount: 110000.0,
      AmountWithoutVAT: 100000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5763,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: false,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 6910,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Wow",
      ChargeType: 1,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 6967,
      Description: "500000",
      Amount: 550000.0,
      AmountWithoutVAT: 500000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 6968,
      Description: "1000000",
      Amount: 1100000.0,
      AmountWithoutVAT: 1000000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
    {
      __type: "WebApplication1.ECharge.Models.ChargePackages.TopUpPackage",
      SepChargeCode: 5814,
      Description: "200000",
      Amount: 220000.0,
      AmountWithoutVAT: 200000.0,
      Duration: null,
      DurationType: null,
      IsPrepaid: true,
      ChargeTypeDescription: "Normal",
      ChargeType: 0,
      OperatorId: 2,
      ProviderID: 4,
      IsAPP: true,
    },
  ];
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
    irr: "ریالmain",
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

  if (document.getElementById("Topup")) {
    getOperators();
    $("#Topup").validate({
      rules: {
        CellNumber: { digits: true, cellNumber: true },
      },
    });
    $("#CellNumber").keyup(function (e) {
      const value = normalize($(this).val());

      if (value.length >= 4) {
        operatorId = validateCellNumber(value, true);
        if (operatorId) {
          var operatorActiveItem = $("#TopupOperator")
            .children()
            .find("[data-value=" + operatorId + "]");
          if (!operatorActiveItem.hasClass("ui-active-operator")) {
            $("#Operator").val(operatorId) &
              removeOperatorActiveItem() &
              getTopupPackages() &
              operatorActiveItem.addClass("ui-active-operator");
          }
        }
      } else if (value.length < 4) {
        $("#Operator").val(operatorId) &
          removeOperatorActiveItem() &
          // $("#TopupPackage").addClass("ui-hidden") &
          $("#TopupPackageSwitcher").empty();
        // $("#TopupType").addClass("ui-hidden");
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

          case "getPackages":
            toggleWizard("second-card");
            getTopupPackages()
            e.preventDefault();
            break;
          case "returnFirstCard":
            toggleWizard("first-card");
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
    $("#TopupOperator").removeClass("ui-hidden") &
      $("#TopupOperator ul").empty().append(items);
  }

  function getTopupPackages() {
    console.log('1111')
    var operatorId = hasValue($("#Operator").val())
        ? $("#Operator").val().trim()
        : null,
      currentOperator = hasValue(
        $("#TopupPackageSwitcher").attr("data-operator")
      )
        ? $("#TopupPackageSwitcher").attr("data-operator").trim()
        : null;
    console.log(operatorId)
        
    console.log(currentOperator)

    if (currentOperator != operatorId) {
      console.log('222')
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
        console.log('hhh')
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
              // .replace("%Amount%", commaSeparator(item.amount))
              .replace("%ChargeAmount%", item.amount);
          }
        });
        // $("#TopupPackage").removeClass("uc-hidden") &
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
      hasAmazing ? $("#TopupType").removeClass("ui-hidden") 
      // & $("#ValTopupType").text(amazingLabel)
        : $("#TopupType").addClass("ui-hidden");
    }
  }

  function sortByType(firstList, secondList) {
    var firstFilter = firstList.chargeType,
      secondFilter = secondList.chargeType;
    return firstFilter < secondFilter ? -1 : firstFilter > secondFilter ? 1 : 0;
  }

  function removeOperatorActiveItem() {
    $("#TopupOperator").children().find("a").removeClass("ui-active-operator");
  }
});
