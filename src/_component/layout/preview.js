$(document).ready(function() {
	$('#country-popup-modal').on('shown.bs.modal', function () {
		ACC.helper.init();
		var countryMappingData = {"selectedCountryMapping":{"catalog":"8796158591576","country":{"isocode":"US","name":"United States"},"flagUrl":"https://cdn.media.amplience.net/i/drmartens/USA_44px.png","selectedCountry":true,"selectedLanguageIso":"en","languageSiteMappings":[{"isoCode":"en","name":"English","redirectionURL":"https://www.drmartens.com/us/en","paymentTypes":[{"name":"Apple Pay","paymentType":"applepay"},{"name":"discover","paymentType":"discover","cardType":true},{"name":"diners","paymentType":"diners","cardType":true},{"name":"visa","paymentType":"visa","cardType":true},{"name":"mc","paymentType":"mc","cardType":true},{"name":"amex","paymentType":"amex","cardType":true},{"name":"Afterpay","paymentType":"afterpaytouch"},{"name":"Givex","paymentType":"giftcard"},{"name":"Pay over time with Klarna.","paymentType":"klarna_account"},{"name":"PayPal","paymentType":"paypal"},{"name":"Google Pay","paymentType":"paywithgoogle"}],"currencyIso":"USD","currencyName":"US Dollar","currencySign":"$","defaultLanguage":true}],"singleLanguage":true,"visibleBenefitBox":true,"external":false},"currentLanguage":"en","componentText":{"headerInfo":"Please confirm where  you are shipping to","shippingInfo":"Shipping To","languageInfo":"Language","checkoutInfo":"Secure checkout","deliveryContent":"Free Standard Delivery orders over \u003cb\u003e$50\u003c/b\u003e","confirmButtonText":"Confirm"}};
		ACC.langcurrency.initCountryPopupSelectJson(countryMappingData);
		ACC.langcurrency.setCurrentCountryVariables(countryMappingData);
	});
	
		if(ACC.global.getCookieVal("siteCookie") !== "/us/en"){
			$('#country-popup-modal').modal('show');
		} else if(typeof(ACC.recentlyViewed) !== 'undefined' &&
				  ACC.recentlyViewed.getRecentlyViewedItems().length > 0 &&
				  localStorage.getItem(ACC.recentlyViewed.showRecentlyViewedPopupFlagType1Shown) === 'true' &&
				  sessionStorage.getItem(ACC.recentlyViewed.showRecentlyViewedPopupFlagType2Shown) !== 'true') {
			localStorage.setItem(ACC.recentlyViewed.showRecentlyViewedPopupFlagType1, false);
			sessionStorage.setItem(ACC.recentlyViewed.showRecentlyViewedPopupFlagType2, true);
		}
	
});
/*<![CDATA[*/
		
var ACC = { config: {} };
ACC.config.buildVersion = "202310041030";
ACC.config.sitePath = "/us/en";
ACC.config.site = 'dm-us';

	ACC.config.sitesIsUS = true;

ACC.config.language = "en";
ACC.config.contextPath = "/us/en";
ACC.config.encodedContextPath = "/us/en";
ACC.config.commonResourcePath = "/_ui/responsive/common";
ACC.config.themeResourcePath = "/_ui/responsive/theme-dm";
ACC.config.siteResourcePath = "/_ui/responsive/site-dm-us";
ACC.config.rootPath = "/_ui/responsive";	
ACC.config.CSRFToken = "954e630e-39a1-48b8-a1b1-a4ba9dbf9126";
ACC.config.OAuth2AccessToken = "";
ACC.config.OAuth2RefreshToken = "";

ACC.config.googleApiVersion="3.7";
ACC.config.postcodeLookupLanguage="English";
ACC.config.inStore="";
ACC.config.loqateFindUrl="https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws";
ACC.config.loqateRetrieveUrl="https://api.addressy.com/Capture/Interactive/Retrieve/v1/json3.ws";
ACC.config.loqateValidateEmailUrl="https://api.addressy.com/EmailValidation/Interactive/Validate/v2.00/json3.ws";
ACC.config.loqateValidatePhoneUrl="https://api.addressy.com/PhoneNumberValidation/Interactive/Validate/v2.2/json3.ws";
ACC.config.loqateGeoLocationUrl="https://api.addressy.com/Capture/Interactive/GeoLocation/v1/json3.ws";

ACC.config.loqateValidateEmailKey="TY92-JX16-UT14-UT54";
ACC.config.loqateValidatePhoneKey="FG18-UC99-XT44-NW78";
ACC.config.enableAttraqtTrackerAndAB=true;
ACC.config.loqateResponseTimeout=5000;
ACC.config.loqateRecordsCount=12;
ACC.config.loqateLanguage="en";
ACC.config.loqateEmailValidationEnabled=false;
ACC.config.loqatePhoneValidationEnabled=false;
ACC.config.locateMeEnabled=false;
ACC.config.nextDayDeliveryCutOffTime=15;
ACC.config.saturdayDeliveryCutOffTime=14;
ACC.config.yotpoEnabled=true;
ACC.config.googleAnalyticsEnabled=true;
ACC.config.googleAnalyticsProductViewEnabled=true;
ACC.config.googleAnalyticsProductImpressionEnabled=true;
ACC.config.browserConsoleLogsEnabled = false;
ACC.config.soldOutText = "SOLD OUT";
ACC.config.wishlistThreshold = "32";
ACC.config.multiTabSite = true;
ACC.config.backInStockEmailEnabled = "true";
ACC.config.isKlaviyoEnabled = "true";
ACC.config.singleOrderFetchUrl = "/us/en/my-account/omsorder?orderNumber=";
ACC.config.singleOrderProductImageUrlPrefix = "https://i1.adis.ws/i/drmartens/";
ACC.config.singleOrderProductImageUrlPostfix = ".80?$mini$";
ACC.config.recaptchaEnabled = true;
ACC.config.priceStyleDisplay = "WAS_NOW_SAVINGS_ABSOLUTE";
ACC.config.priceStyleDisplayAbsolute = "WAS_NOW_SAVINGS_ABSOLUTE";
ACC.config.priceStyleDisplayPercentage = "WAS_NOW_SAVINGS_PERCENTAGE";
ACC.config.enableOmniBusPriceChanges = false;
ACC.config.pdpStoreStockCheckSizeWithTeritory = "";
ACC.config.pdpStoreStockCheckInputLocation = "";
ACC.config.pdpStoreStockCheckNearestStoreArr = [];
ACC.config.pdpStoreStockCheckNearestStoreErr = "";
ACC.config.pdpStoreStockCheckInvalidFormErr = "";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_1 = "Check_Availability";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_2 = "Nearest_Store_View_More_Success";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_3 = "Nearest_Store_View_More_Failure";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_4 = "Invalid_Popup_Form";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_5 = "Nearest_Store_Fetch_Success";
ACC.config.pdpStoreStockCheckDataLayerPublishEventType_6 = "Nearest_Store_Fetch_Failure";
ACC.config.oneTrustCoockieInjectFunctionName = "OptanonWrapper";
ACC.config.enableStickyBannerWithChooseSize = true;


ACC.config.singleOrderStatusType = function(shipmentsCount) {
	return shipmentsCount <= 0 ? "1" : "2";
};
ACC.config.singleOrderStatusText = {
	"1": "processing",
	"2": "SHIPPED"
}

	ACC.config.minimumReviews="5";

ACC.config.isUserIdentified = "false";

ACC.autocompleteUrl = '/us/en/search/autocompleteSecure';


ACC.config.loginUrl = '/us/en/login';


ACC.config.authenticationStatusUrl = '/us/en/authentication/status';



ACC.config.discountPopUp = {
	"klaviyoKeyDesktop": "",
	"klaviyoKeyMobile": ""
}

ACC.config.giftcard = {
	"codeMax": 21,
	"codeMin": 5,
	"pin": 4
}

ACC.config.labels = {
	"viewMore": "View more",
	"viewLess": "View less",
	"readmore": "Read more",
	"readless": "Read less",
	"cvvTooltipTitle": "CVV",
	"cvvTooltipText": "3 digit card security code located on the back of your card",
	"cvvTooltipAmexTitle": "4 DIGIT SECURITY CODE",
	"cvvTooltipAmexText": "4-DIGITS, LOCATED ON THE FRONT OF YOUR CARD",
	"adyenErrorPaymentMethod": "Please select a payment method",
	"adyenRrrorCardType": "Invalid card details, please check the fields",
	"adyenErrorHolderNameEmpty": "Please fill your cardholder name",
	"adyenErrorCard": "This credit card is not allowed",
	"adyenErrorIssuer": "Please select an issuer",
	"adyenErrorTerminal": "Please select a terminal",
	"select": "Select",
	"viewAllAddresses": "View all addresses",
	"required": "Required",
	"emailFormatError": "Please enter a valid email address in the following format: hello@drmartens.com",
	"emailValidationError": "We could not validate your email address, please check and try again.",
	"emailMatchError": "Email addresses do not match",
	"selectLaterDateMsg": "Selected date is in the past, please select a future date",
	"wishlistAddProductError": "Sorry, we couldn't add this product to your Wishlist",
	"unkownError": "Unknown error occurred",
	"outOfStock": "Out of Stock",
	"lowStock": "Low in Stock",
	"size-prefix": "US",
	"size-male": "MEN",
	"size-female": "WOMEN",
	"size-kids": "KIDS",
	"size-juniors": "JUNIORS",
	"atbLoading": "Please wait while we add your<br>item to your cart",
	"atbNoStockError": "Sorry, this product is now out of stock",
	"plpMidPageFilterCategorySizeLabel": "Quick filter bysize:",
	"plpMidPageFilterCategoryColorLabel": "Quick filter bysize:",
	"recentlyViewedPopupTextOne": "Check out your recently viewed items",
	"recentlyViewedPopupTextTwoLabelOne": "Pick up where you left off.",
	"recentlyViewedPopupTextTwoLabelTwo": "Check out your last viewed items",
	"singleOrderFetchError": "Your order is being processed. Check back later to see your latest order history",
	"newsLetterSignUpErrorEmptyEmail": "Enter your email address",
	"newsLetterSignUpErrorInvalidEmail": "Invalid email address",
	"newsLetterSignUpErrorEmptyGender": "Select your preference",
	"orderDetailsFetchError": "Failed to retrieve the order details",
	"orderReturnInfoFetchError": "Failed to retrieve the order return details",
	"searchOrderNotFound": "Your order ID or email address is incorrect",
	"searchOrderContactSupport": "Your order details can't be retrieved due to a system update. Please contact customer service.",
	"processReturnOMSError": "Sorry, something went wrong. We are unable to find your order",
	"savingsAbsoluteTranslation": "SAVE 0",
	"savingsPercentageTranslation": "SAVE 0",
	"quantityIncreased": 'Increased',
	"quantityDecreased": 'Decreased',
	"pdpStoreStockCheckSizeWithTeritory": "",
	"pdpStoreStockCheckInputLocation": "",
	"storeNotFound": "Location not found",
	"pdpStoreStockCheckNearestStoreArr": [],
	"pdpStoreStockCheckNearestStoreErr": "",
	"productOmnibusOriginal": "Originally:",
	"productOmnibusLastLowest": "Last lowest price:",
	"pdpChooseYourSizeLabel": "Choose your size",
	"pdpAddToBasketLabel": "Add to Bag",
	"clickAndCollectStorNotavailableMsg": "Selected store is no longer available, please select another",
	"pdpChooseYourSizeLabel": "Choose your size",
	"pdpAddToBasketLabel": "Add to Bag",
	"errorAddtoBag":"ERROR ADDING ITEM TO BAG – PLEASE TRY AGAIN",
	"errorWishlistLoad":"ERROR LOADING WISHLIST – PLEASE TRY AGAIN",
	"errorWishlistRemove":"ERROR REMOVING ITEM – PLEASE TRY AGAIN",
	"errorBackInStockRegister":"BACK IN STOCK REGISTRATION FAILED – PLEASE TRY AGAIN",
	"errorPaymentFailed":"PAYMENT FAILED – PLEASE TRY ANOTHER PAYMENT METHOD",
	"removeWishlistItem":"cart.wishlist.item.remove"
}
/*]]>*/

ACC.config.userLogged = false;

/*<![CDATA[*/
ACC.addons = {};	//JS holder for addons properties
			
	
ACC.addons.assistedservicepromotionaddon = [];

ACC.addons.textfieldconfiguratortemplateaddon = [];

ACC.addons.smarteditaddon = [];

ACC.addons.customerticketingaddon = [];

ACC.addons.assistedservicestorefront = [];

		ACC.addons.assistedservicestorefront['asm.timer.min'] = 'min';
	
/*]]>*/
var mediator = window.mediator || {
	publish: function(){
		console.log("mediator.js not loaded, no ga events are published")
	}
};
var _learnq = _learnq || [];
window.mediator.subscribe('trackUpdateCart', function(data) {
	if (data.productCode && data.initialCartQuantity && data.newCartQuantity)
	{
		trackUpdateCart_GTM(data.productCode, data.initialCartQuantity, data.newCartQuantity, data.cartData.productName, data.cartData.productPrice);
	}
  });

$(document).ready(function() {
	ACC.track.subscribeAddToCartEvent();
	ACC.track.subscribeRemoveFromCartEvent();
	ACC.track.subscribeTrackProductViewEvent();
	ACC.track.subscribeTrackCheckoutEvent();
	ACC.track.subscribeTrackSearchEvent();
	ACC.track.subscribeProductClickEvent();
	ACC.track.subscribeProductImpressionsEvent();
	ACC.track.subscribeTrackLoginFailedEvent();
	ACC.track.subscribeTrackLogoutEvent();
	ACC.track.subscribeTrackAddToWishlistEvent();
	ACC.track.subscribeTrackSignupEvent();
	ACC.track.subscribeTrackLoginEvent();
	ACC.track.subscribeTrackSignupFailEvent();
	ACC.track.subscribeTrackPDPStockCheckAvailabilityEvent();
	ACC.track.subscribeTrackPDPStockCheckNearestStoreSuccessEvent();
	ACC.track.subscribeTrackPDPStockCheckNearestStoreFailureEvent();
	ACC.track.publishTrackLogoutEvent();
	
});

$(function() {
    $.cookie('dm-country','US',{
        expires: 7,
        path: '/',
        domain: '.drmartens.com'
    });
});