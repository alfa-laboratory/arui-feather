/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import Icon from './icon';

import IconActionPhotoOrFile from './action/action-photo-or-file';
import IconAdd from './action/add';
import IconAddFilled from './action/add-filled';
import IconAnalytics from './action/analytics';
import IconAndroidDocument from './action/android-document';
import IconAndroidFlash from './action/android-flash';
import IconAndroidPhoto from './action/android-photo';
import IconArrowBack from './action/arrow-back';
import IconArrowBackBold from './action/arrow-back-bold';
import IconAttachment from './action/attachment';
import IconBack from './action/back';
import IconCall from './action/call';
import IconCamera from './action/camera';
import IconCardPinChange from './action/card-pin-change';
import IconChat from './action/chat';
import IconChatMessageError from './action/chat-message-error';
import IconChatSend from './action/chat-send';
import IconContactless from './action/contactless';
import IconConvertRubToUsd from './action/convert-rub-to-usd';
import IconCopy from './action/copy';
import IconDelete from './action/delete';
import IconDislike from './action/dislike';
import IconDislikeFilled from './action/dislike-filled';
import IconDots from './action/dots';
import IconDownload from './action/download';
import IconEdit from './action/edit';
import IconEmail from './action/email';
import IconErase from './action/erase';
import IconFilter from './action/filter';
import IconFlash from './action/flash';
import IconGalleryInCamera from './action/gallery-in-camera';
import IconLike from './action/like';
import IconLikeFilled from './action/like-filled';
import IconLock from './action/lock';
import IconLockFilled from './action/lock-filled';
import IconLogout from './action/logout';
import IconMore from './action/more';
import IconNavigationChat from './action/navigation-chat';
import IconNavigationHistory from './action/navigation-history';
import IconNavigationHome from './action/navigation-home';
import IconNavigationMarketplace from './action/navigation-marketplace';
import IconNavigationPayment from './action/navigation-payment';
import IconNext from './action/next';
import IconPasswordChange from './action/password-change';
import IconPasswordHide from './action/password-hide';
import IconPasswordShow from './action/password-show';
import IconPause from './action/pause';
import IconPhotoCard from './action/photo-card';
import IconPin from './action/pin';
import IconPinUnpin from './action/pin-unpin';
import IconPower from './action/power';
import IconPowerCard from './action/power-card';
import IconPrinter from './action/printer';
import IconRepeat from './action/repeat';
import IconReply from './action/reply';
import IconSearch from './action/search';
import IconSelfemloyedReg from './action/selfemloyed-reg';
import IconSentDone from './action/sent-done';
import IconSettings from './action/settings';
import IconShareAndroid from './action/share-android';
import IconShareIos from './action/share-ios';
import IconSign from './action/sign';
import IconUnlock from './action/unlock';
import IconAccountAdd from './banking/account-add';
import IconAccountDefault from './banking/account-default';
import IconAccountShared from './banking/account-shared';
import IconAttentionBold from './banking/attention-bold';
import IconBalanceTransfer from './banking/balance-transfer';
import IconCard from './banking/card';
import IconCardAccountsList from './banking/card-accounts-list';
import IconCardActivate from './banking/card-activate';
import IconCardActivation from './banking/card-activation';
import IconCardAdd from './banking/card-add';
import IconCardClose from './banking/card-close';
import IconCardExpences from './banking/card-expences';
import IconCardList from './banking/card-list';
import IconCardToCard from './banking/card-to-card';
import IconCardUnknown from './banking/card-unknown';
import IconCash from './banking/cash';
import IconConvert from './banking/convert';
import IconCosts from './banking/costs';
import IconCostsCard from './banking/costs-card';
import IconCredit from './banking/credit';
import IconCreditCard from './banking/credit-card';
import IconCrown from './banking/crown';
import IconCrownPremium from './banking/crown-premium';
import IconCvv from './banking/cvv';
import IconDeposit from './banking/deposit';
import IconExpences from './banking/expences';
import IconExpencesPlanner from './banking/expences-planner';
import IconGoals from './banking/goals';
import IconIncome from './banking/income';
import IconInsurance from './banking/insurance';
import IconInvestments from './banking/investments';
import IconInvoiceForPayment from './banking/invoice-for-payment';
import IconLimits from './banking/limits';
import IconMarketplace from './banking/marketplace';
import IconOffer from './banking/offer';
import IconOfferFill from './banking/offer-fill';
import IconOutcome from './banking/outcome';
import IconOverdraft from './banking/overdraft';
import IconPayBack from './banking/pay-back';
import IconPaymentByPhoto from './banking/payment-by-photo';
import IconPaymentError from './banking/payment-error';
import IconPaymentOutbox from './banking/payment-outbox';
import IconPaymentPlus from './banking/payment-plus';
import IconPaymentRoundedPlus from './banking/payment-rounded-plus';
import IconPaymentRoundedPlusBig from './banking/payment-rounded-plus-big';
import IconPaymentToCompany from './banking/payment-to-company';
import IconPaymentToPerson from './banking/payment-to-person';
import IconPaymentToSelf from './banking/payment-to-self';
import IconPaymentToState from './banking/payment-to-state';
import IconPercent from './banking/percent';
import IconPlanExpenses from './banking/plan-expenses';
import IconReadyToSend from './banking/ready-to-send';
import IconRequestMoney from './banking/request-money';
import IconSent from './banking/sent';
import IconSubscrption from './banking/subscrption';
import IconTransferAnyBank from './banking/transfer-any-bank';
import IconTransferAnyBankCredit from './banking/transfer-any-bank-credit';
import IconTransferBetweenAccounts from './banking/transfer-between-accounts';
import IconTransferByPhone from './banking/transfer-by-phone';
import IconTransferByPhoneAndroid from './banking/transfer-by-phone-android';
import IconTransferByPhoneIos from './banking/transfer-by-phone-ios';
import IconTransferCard from './banking/transfer-card';
import IconTransferExternal from './banking/transfer-external';
import IconTransferIn from './banking/transfer-in';
import IconTransferInternal from './banking/transfer-internal';
import IconTransferOut from './banking/transfer-out';
import IconTransferOuter from './banking/transfer-outer';
import IconTransferSelf from './banking/transfer-self';
import IconTransferToCard from './banking/transfer-to-card';
import IconUserAdd from './banking/user-add';
import IconWallet from './banking/wallet';
import IconBankAlfa from './brand/bank-alfa';
import IconBankBaltiyskiy from './brand/bank-baltiyskiy';
import IconBankBinbank from './brand/bank-binbank';
import IconBankEurope from './brand/bank-europe';
import IconBankGazprombank from './brand/bank-gazprombank';
import IconBankHomeCredit from './brand/bank-home-credit';
import IconBankMdm from './brand/bank-mdm';
import IconBankMkb from './brand/bank-mkb';
import IconBankMoscow from './brand/bank-moscow';
import IconBankMts from './brand/bank-mts';
import IconBankOtkritie from './brand/bank-otkritie';
import IconBankOtp from './brand/bank-otp';
import IconBankPsb from './brand/bank-psb';
import IconBankQiwi from './brand/bank-qiwi';
import IconBankRaiffeisen from './brand/bank-raiffeisen';
import IconBankRussianStandard from './brand/bank-russian-standard';
import IconBankSaintPetersburg from './brand/bank-saint-petersburg';
import IconBankSber from './brand/bank-sber';
import IconBankSkb from './brand/bank-skb';
import IconBankSocieteGenerale from './brand/bank-societe-generale';
import IconBankTinkoff from './brand/bank-tinkoff';
import IconBankTrust from './brand/bank-trust';
import IconBankUnicredit from './brand/bank-unicredit';
import IconBankUralsib from './brand/bank-uralsib';
import IconBankUralskiy from './brand/bank-uralskiy';
import IconBankVozrozhdenie from './brand/bank-vozrozhdenie';
import IconBankVtb from './brand/bank-vtb';
import IconBankYandexmoney from './brand/bank-yandexmoney';
import IconBeeline from './brand/beeline';
import IconCardBelkart from './brand/card-belkart';
import IconCardGooglepay from './brand/card-googlepay';
import IconCardMaestro from './brand/card-maestro';
import IconCardMastercard from './brand/card-mastercard';
import IconCardMastero from './brand/card-mastero';
import IconCardMir from './brand/card-mir';
import IconCardVisa from './brand/card-visa';
import IconCardVisaElectron from './brand/card-visa-electron';
import IconFifaTrophy from './brand/fifa-trophy';
import IconForex from './brand/forex';
import IconLogoAlfabank from './brand/logo-alfabank';
import IconMaestro from './brand/maestro';
import IconMastercard from './brand/mastercard';
import IconMir from './brand/mir';
import IconNetworkFacebook from './brand/network-facebook';
import IconNetworkTwitter from './brand/network-twitter';
import IconNetworkVk from './brand/network-vk';
import IconSbp from './brand/sbp';
import IconUnionpay from './brand/unionpay';
import IconVisa from './brand/visa';
import IconCategoryAppliances from './category/category-appliances';
import IconCategoryAtm from './category/category-atm';
import IconCategoryAuto from './category/category-auto';
import IconCategoryAutoLoan from './category/category-auto-loan';
import IconCategoryBooksMovies from './category/category-books-movies';
import IconCategoryBudget from './category/category-budget';
import IconCategoryBusiness from './category/category-business';
import IconCategoryBusinessActivity from './category/category-business-activity';
import IconCategoryCards from './category/category-cards';
import IconCategoryCash from './category/category-cash';
import IconCategoryCashback from './category/category-cashback';
import IconCategoryCharity from './category/category-charity';
import IconCategoryConsulting from './category/category-consulting';
import IconCategoryDefault from './category/category-default';
import IconCategoryDress from './category/category-dress';
import IconCategoryEducation from './category/category-education';
import IconCategoryEntertainment from './category/category-entertainment';
import IconCategoryExperiments from './category/category-experiments';
import IconCategoryFamily from './category/category-family';
import IconCategoryFinance from './category/category-finance';
import IconCategoryFines from './category/category-fines';
import IconCategoryGaming from './category/category-gaming';
import IconCategoryGasoline from './category/category-gasoline';
import IconCategoryGibddFines from './category/category-gibdd-fines';
import IconCategoryGuard from './category/category-guard';
import IconCategoryHealth from './category/category-health';
import IconCategoryHobby from './category/category-hobby';
import IconCategoryHouse from './category/category-house';
import IconCategoryHousekeeping from './category/category-housekeeping';
import IconCategoryInvestments from './category/category-investments';
import IconCategoryLoans from './category/category-loans';
import IconCategoryMedicine from './category/category-medicine';
import IconCategoryMortgage from './category/category-mortgage';
import IconCategoryOther from './category/category-other';
import IconCategoryPerson from './category/category-person';
import IconCategoryPets from './category/category-pets';
import IconCategoryPlane from './category/category-plane';
import IconCategoryRent from './category/category-rent';
import IconCategoryRepairs from './category/category-repairs';
import IconCategoryRestaurants from './category/category-restaurants';
import IconCategorySalary from './category/category-salary';
import IconCategoryScholarship from './category/category-scholarship';
import IconCategoryShield from './category/category-shield';
import IconCategoryShopping from './category/category-shopping';
import IconCategoryState from './category/category-state';
import IconCategoryTelecom from './category/category-telecom';
import IconCategoryTransfer from './category/category-transfer';
import IconCategoryTransport from './category/category-transport';
import IconCategoryTravel from './category/category-travel';
import IconCategoryTroika from './category/category-troika';
import IconCategoryTv from './category/category-tv';
import IconCategoryUnknown from './category/category-unknown';
import IconCategoryUser from './category/category-user';
import IconCategoryVacation from './category/category-vacation';
import IconCategoryVipManager from './category/category-vip-manager';
import IconCategoryVipRoom from './category/category-vip-room';
import IconCategoryWallet from './category/category-wallet';
import IconUtilities from './category/utilities';
import IconCurrencyChf from './currency/currency-chf';
import IconCurrencyEur from './currency/currency-eur';
import IconCurrencyEurUsd from './currency/currency-eur-usd';
import IconCurrencyGbp from './currency/currency-gbp';
import IconCurrencyJpy from './currency/currency-jpy';
import IconCurrencyRub from './currency/currency-rub';
import IconCurrencyRubUsd from './currency/currency-rub-usd';
import IconCurrencyUsd from './currency/currency-usd';
import IconAlfacheck from './entity/alfacheck';
import IconAlfadialogue from './entity/alfadialogue';
import IconAlfamobile from './entity/alfamobile';
import IconApcBonus from './entity/APC-bonus';
import IconAtm from './entity/atm';
import IconBag from './entity/bag';
import IconCalendar from './entity/calendar';
import IconCardVoid from './entity/card-void';
import IconCashback from './entity/cashback';
import IconCashbackBonus from './entity/cashback-bonus';
import IconChatPhoto from './entity/chat-photo';
import IconClock from './entity/clock';
import IconClockFilled from './entity/clock-filled';
import IconContactList from './entity/contact-list';
import IconContactlessOff from './entity/contactless-off';
import IconContactlessOn from './entity/contactless-on';
import IconDirections from './entity/directions';
import IconDiscount from './entity/discount';
import IconDraft from './entity/draft';
import IconEmoney from './entity/emoney';
import IconFault from './entity/fault';
import IconFingerprint from './entity/fingerprint';
import IconHistory from './entity/history';
import IconHold from './entity/hold';
import IconInbox from './entity/inbox';
import IconInternet from './entity/internet';
import IconKeyboard from './entity/keyboard';
import IconKeyboardHide from './entity/keyboard-hide';
import IconManager from './entity/manager';
import IconMessage from './entity/message';
import IconMetro from './entity/metro';
import IconMobile from './entity/mobile';
import IconMobileAndroid from './entity/mobile-android';
import IconMobileIos from './entity/mobile-ios';
import IconMoneybox from './entity/moneybox';
import IconMypayments from './entity/mypayments';
import IconNews from './entity/news';
import IconNotificationBadge from './entity/notification-badge';
import IconNotifications from './entity/notifications';
import IconOffice from './entity/office';
import IconPerson from './entity/person';
import IconPhoto from './entity/photo';
import IconPillow from './entity/pillow';
import IconPredictions from './entity/predictions';
import IconPresent from './entity/present';
import IconQr from './entity/qr';
import IconRegistry from './entity/registry';
import IconSecurity from './entity/security';
import IconSite from './entity/site';
import IconSixty from './entity/sixty';
import IconTemplates from './entity/templates';
import IconTodo from './entity/todo';
import IconWaiting from './entity/waiting';
import IconAccount from './file/account';
import IconAccountEuro from './file/account-euro';
import IconAccountInfo from './file/account-info';
import IconAccountRub from './file/account-rub';
import IconAccountText from './file/account-text';
import IconAccountUsd from './file/account-usd';
import IconFormat1c from './file/format-1c';
import IconFormatAttach from './file/format-attach';
import IconFormatCsv from './file/format-csv';
import IconFormatDefault from './file/format-default';
import IconFormatDoc from './file/format-doc';
import IconFormatJpg from './file/format-jpg';
import IconFormatPdf from './file/format-pdf';
import IconFormatPng from './file/format-png';
import IconFormatPpt from './file/format-ppt';
import IconFormatRar from './file/format-rar';
import IconFormatSketch from './file/format-sketch';
import IconFormatSvg from './file/format-svg';
import IconFormatTxt from './file/format-txt';
import IconFormatUnknown from './file/format-unknown';
import IconFormatXls from './file/format-xls';
import IconFormatXml from './file/format-xml';
import IconFormatZip from './file/format-zip';
import IconAndroidReorder from './ui/android-reorder';
import IconArrowBottom from './ui/arrow-bottom';
import IconArrowCollapse from './ui/arrow-collapse';
import IconArrowDouble from './ui/arrow-double';
import IconArrowDown from './ui/arrow-down';
import IconArrowExpand from './ui/arrow-expand';
import IconArrowLeft from './ui/arrow-left';
import IconArrowLeftDouble from './ui/arrow-left-double';
import IconArrowRight from './ui/arrow-right';
import IconArrowRightDouble from './ui/arrow-right-double';
import IconArrowTop from './ui/arrow-top';
import IconArrowUp from './ui/arrow-up';
import IconAttention from './ui/attention';
import IconAttentionMark from './ui/attention-mark';
import IconAutopayment from './ui/autopayment';
import IconBackspace from './ui/backspace';
import IconBuy from './ui/buy';
import IconCancel from './ui/cancel';
import IconCheck from './ui/check';
import IconCheckBold from './ui/check-bold';
import IconCheckChat from './ui/check-chat';
import IconCheckIndeterminate from './ui/check-indeterminate';
import IconCheckboxDisabled from './ui/checkbox-disabled';
import IconChevronRight from './ui/chevron-right';
import IconClose from './ui/close';
import IconCloseCircle from './ui/close-circle';
import IconDone from './ui/done';
import IconDown from './ui/down';
import IconError from './ui/error';
import IconExchange from './ui/exchange';
import IconExpandDown from './ui/expand-down';
import IconFail from './ui/fail';
import IconFavorite from './ui/favorite';
import IconFeature from './ui/feature';
import IconFingerPointing from './ui/finger-pointing';
import IconGeolocation from './ui/geolocation';
import IconGeolocationMap from './ui/geolocation-map';
import IconHelp from './ui/help';
import IconHelpFilled from './ui/help-filled';
import IconHome from './ui/home';
import IconInfo from './ui/info';
import IconLeft from './ui/left';
import IconList from './ui/list';
import IconLocation from './ui/location';
import IconMetroMap from './ui/metro-map';
import IconOk from './ui/ok';
import IconOkFilled from './ui/ok-filled';
import IconOutside from './ui/outside';
import IconPlay from './ui/play';
import IconRight from './ui/right';
import IconSell from './ui/sell';
import IconSliderArrowDouble from './ui/slider-arrow-double';
import IconStar from './ui/star';
import IconStarActive from './ui/star-active';
import IconStarInactive from './ui/star-inactive';
import IconStatusUrgent from './ui/status-urgent';
import IconSubmit from './ui/submit';
import IconSystemBack from './ui/system-back';
import IconSystemHelp from './ui/system-help';
import IconSystemHideArrow from './ui/system-hide-arrow';
import IconTable from './ui/table';
import IconTick from './ui/tick';
import IconUp from './ui/up';
import IconVerifying from './ui/verifying';
import IconBank2449 from './brand/bank-2449';
import IconBankNsipf1326 from './brand/bank-nsipf-1326';
import IconBank3308 from './brand/bank-3308';
import IconBankNsipf128 from './brand/bank-nsipf-128';
import IconBankNsipf323 from './brand/bank-nsipf-323';
import IconBank10223 from './brand/bank-10223';
import IconBankNsipf3311 from './brand/bank-nsipf-3311';
import IconBankNsipf354 from './brand/bank-nsipf-354';
import IconBank439 from './brand/bank-439';
import IconBankNsipf316 from './brand/bank-nsipf-316';
import IconBank9908 from './brand/bank-9908';
import IconBankNsipf2361 from './brand/bank-nsipf-2361';
import IconBank3001 from './brand/bank-3001';
import IconBankNsipf2524 from './brand/bank-nsipf-2524';
import IconBank5475 from './brand/bank-5475';
import IconBankNsipf2748 from './brand/bank-nsipf-2748';
import IconBank1490 from './brand/bank-1490';
import IconBankNsipf2268 from './brand/bank-nsipf-2268';
import IconBank4267 from './brand/bank-4267';
import IconBankNsipf2209 from './brand/bank-nsipf-2209';
import IconBank7311 from './brand/bank-7311';
import IconBankNsipf2766 from './brand/bank-nsipf-2766';
import IconBank1516 from './brand/bank-1516';
import IconBankNsipf3251 from './brand/bank-nsipf-3251';
import IconBank1309 from './brand/bank-1309';
import IconBankNsipf2241 from './brand/bank-nsipf-2241';
import IconBank8967 from './brand/bank-8967';
import IconBankNsipf3292 from './brand/bank-nsipf-3292';
import IconBank6415 from './brand/bank-6415';
import IconBankNsipf2289 from './brand/bank-nsipf-2289';
import IconBank285 from './brand/bank-285';
import IconBankNsipf436 from './brand/bank-nsipf-436';
import IconBank4924 from './brand/bank-4924';
import IconBankNsipf1481 from './brand/bank-nsipf-1481';
import IconBank5030 from './brand/bank-5030';
import IconBankNsipf705 from './brand/bank-nsipf-705';
import IconBank351 from './brand/bank-351';
import IconBankNsipf1792 from './brand/bank-nsipf-1792';
import IconBank256 from './brand/bank-256';
import IconBankNsipf2673 from './brand/bank-nsipf-2673';
import IconBank1415 from './brand/bank-1415';
import IconBankNsipf3279 from './brand/bank-nsipf-3279';
import IconBank7687 from './brand/bank-7687';
import IconBankNsipf1 from './brand/bank-nsipf-1';
import IconBank7686 from './brand/bank-7686';
import IconBankNsipf2275 from './brand/bank-nsipf-2275';
import IconBank2377 from './brand/bank-2377';
import IconBankNsipf429 from './brand/bank-nsipf-429';
import IconBank244 from './brand/bank-244';
import IconBankNsipf1439 from './brand/bank-nsipf-1439';
import IconBank404 from './brand/bank-404';
import IconBankNsipf1000 from './brand/bank-nsipf-1000';

describe('icon', () => {
    it('renders without problems', () => {
        let icon = shallow(<Icon />);
        expect(icon).toMatchSnapshot();
    });

    (() => {
        let icons = [
            { componentName: IconActionPhotoOrFile, name: 'action-photo-or-file' },
            { componentName: IconAdd, name: 'add' },
            { componentName: IconAddFilled, name: 'add-filled' },
            { componentName: IconAnalytics, name: 'analytics' },
            { componentName: IconAndroidDocument, name: 'android-document' },
            { componentName: IconAndroidFlash, name: 'android-flash' },
            { componentName: IconAndroidPhoto, name: 'android-photo' },
            { componentName: IconArrowBack, name: 'arrow-back' },
            { componentName: IconArrowBackBold, name: 'arrow-back-bold' },
            { componentName: IconAttachment, name: 'attachment' },
            { componentName: IconBack, name: 'back' },
            { componentName: IconCall, name: 'call' },
            { componentName: IconCamera, name: 'camera' },
            { componentName: IconCardPinChange, name: 'card-pin-change' },
            { componentName: IconChat, name: 'chat' },
            { componentName: IconChatMessageError, name: 'chat-message-error' },
            { componentName: IconChatSend, name: 'chat-send' },
            { componentName: IconContactless, name: 'contactless' },
            { componentName: IconConvertRubToUsd, name: 'convert-rub-to-usd' },
            { componentName: IconCopy, name: 'copy' },
            { componentName: IconDelete, name: 'delete' },
            { componentName: IconDislike, name: 'dislike' },
            { componentName: IconDislikeFilled, name: 'dislike-filled' },
            { componentName: IconDots, name: 'dots' },
            { componentName: IconDownload, name: 'download' },
            { componentName: IconEdit, name: 'edit' },
            { componentName: IconEmail, name: 'email' },
            { componentName: IconErase, name: 'erase' },
            { componentName: IconFilter, name: 'filter' },
            { componentName: IconFlash, name: 'flash' },
            { componentName: IconGalleryInCamera, name: 'gallery-in-camera' },
            { componentName: IconLike, name: 'like' },
            { componentName: IconLikeFilled, name: 'like-filled' },
            { componentName: IconLock, name: 'lock' },
            { componentName: IconLockFilled, name: 'lock-filled' },
            { componentName: IconLogout, name: 'logout' },
            { componentName: IconMore, name: 'more' },
            { componentName: IconNavigationChat, name: 'navigation-chat' },
            { componentName: IconNavigationHistory, name: 'navigation-history' },
            { componentName: IconNavigationHome, name: 'navigation-home' },
            { componentName: IconNavigationMarketplace, name: 'navigation-marketplace' },
            { componentName: IconNavigationPayment, name: 'navigation-payment' },
            { componentName: IconNext, name: 'next' },
            { componentName: IconPasswordChange, name: 'password-change' },
            { componentName: IconPasswordHide, name: 'password-hide' },
            { componentName: IconPasswordShow, name: 'password-show' },
            { componentName: IconPause, name: 'pause' },
            { componentName: IconPhotoCard, name: 'photo-card' },
            { componentName: IconPin, name: 'pin' },
            { componentName: IconPinUnpin, name: 'pin-unpin' },
            { componentName: IconPower, name: 'power' },
            { componentName: IconPowerCard, name: 'power-card' },
            { componentName: IconPrinter, name: 'printer' },
            { componentName: IconRepeat, name: 'repeat' },
            { componentName: IconReply, name: 'reply' },
            { componentName: IconSearch, name: 'search' },
            { componentName: IconSelfemloyedReg, name: 'selfemloyed-reg' },
            { componentName: IconSentDone, name: 'sent-done' },
            { componentName: IconSettings, name: 'settings' },
            { componentName: IconShareAndroid, name: 'share-android' },
            { componentName: IconShareIos, name: 'share-ios' },
            { componentName: IconSign, name: 'sign' },
            { componentName: IconUnlock, name: 'unlock' },
            { componentName: IconAccountAdd, name: 'account-add' },
            { componentName: IconAccountDefault, name: 'account-default' },
            { componentName: IconAccountShared, name: 'account-shared' },
            { componentName: IconAttentionBold, name: 'attention-bold' },
            { componentName: IconBalanceTransfer, name: 'balance-transfer' },
            { componentName: IconCard, name: 'card' },
            { componentName: IconCardAccountsList, name: 'card-accounts-list' },
            { componentName: IconCardActivate, name: 'card-activate' },
            { componentName: IconCardActivation, name: 'card-activation' },
            { componentName: IconCardAdd, name: 'card-add' },
            { componentName: IconCardClose, name: 'card-close' },
            { componentName: IconCardExpences, name: 'card-expences' },
            { componentName: IconCardList, name: 'card-list' },
            { componentName: IconCardToCard, name: 'card-to-card' },
            { componentName: IconCardUnknown, name: 'card-unknown' },
            { componentName: IconCash, name: 'cash' },
            { componentName: IconConvert, name: 'convert' },
            { componentName: IconCosts, name: 'costs' },
            { componentName: IconCostsCard, name: 'costs-card' },
            { componentName: IconCredit, name: 'credit' },
            { componentName: IconCreditCard, name: 'credit-card' },
            { componentName: IconCrown, name: 'crown' },
            { componentName: IconCrownPremium, name: 'crown-premium' },
            { componentName: IconCvv, name: 'cvv' },
            { componentName: IconDeposit, name: 'deposit' },
            { componentName: IconExpences, name: 'expences' },
            { componentName: IconExpencesPlanner, name: 'expences-planner' },
            { componentName: IconGoals, name: 'goals' },
            { componentName: IconIncome, name: 'income' },
            { componentName: IconInsurance, name: 'insurance' },
            { componentName: IconInvestments, name: 'investments' },
            { componentName: IconInvoiceForPayment, name: 'invoice-for-payment' },
            { componentName: IconLimits, name: 'limits' },
            { componentName: IconMarketplace, name: 'marketplace' },
            { componentName: IconOffer, name: 'offer' },
            { componentName: IconOfferFill, name: 'offer-fill' },
            { componentName: IconOutcome, name: 'outcome' },
            { componentName: IconOverdraft, name: 'overdraft' },
            { componentName: IconPayBack, name: 'pay-back' },
            { componentName: IconPaymentByPhoto, name: 'payment-by-photo' },
            { componentName: IconPaymentError, name: 'payment-error' },
            { componentName: IconPaymentOutbox, name: 'payment-outbox' },
            { componentName: IconPaymentPlus, name: 'payment-plus' },
            { componentName: IconPaymentRoundedPlus, name: 'payment-rounded-plus' },
            { componentName: IconPaymentRoundedPlusBig, name: 'payment-rounded-plus-big' },
            { componentName: IconPaymentToCompany, name: 'payment-to-company' },
            { componentName: IconPaymentToPerson, name: 'payment-to-person' },
            { componentName: IconPaymentToSelf, name: 'payment-to-self' },
            { componentName: IconPaymentToState, name: 'payment-to-state' },
            { componentName: IconPercent, name: 'percent' },
            { componentName: IconPlanExpenses, name: 'plan-expenses' },
            { componentName: IconReadyToSend, name: 'ready-to-send' },
            { componentName: IconRequestMoney, name: 'request-money' },
            { componentName: IconSent, name: 'sent' },
            { componentName: IconSubscrption, name: 'subscrption' },
            { componentName: IconTransferAnyBank, name: 'transfer-any-bank' },
            { componentName: IconTransferAnyBankCredit, name: 'transfer-any-bank-credit' },
            { componentName: IconTransferBetweenAccounts, name: 'transfer-between-accounts' },
            { componentName: IconTransferByPhone, name: 'transfer-by-phone' },
            { componentName: IconTransferByPhoneAndroid, name: 'transfer-by-phone-android' },
            { componentName: IconTransferByPhoneIos, name: 'transfer-by-phone-ios' },
            { componentName: IconTransferCard, name: 'transfer-card' },
            { componentName: IconTransferExternal, name: 'transfer-external' },
            { componentName: IconTransferIn, name: 'transfer-in' },
            { componentName: IconTransferInternal, name: 'transfer-internal' },
            { componentName: IconTransferOut, name: 'transfer-out' },
            { componentName: IconTransferOuter, name: 'transfer-outer' },
            { componentName: IconTransferSelf, name: 'transfer-self' },
            { componentName: IconTransferToCard, name: 'transfer-to-card' },
            { componentName: IconUserAdd, name: 'user-add' },
            { componentName: IconWallet, name: 'wallet' },
            { componentName: IconBankAlfa, name: 'bank-alfa' },
            { componentName: IconBankBaltiyskiy, name: 'bank-baltiyskiy' },
            { componentName: IconBankBinbank, name: 'bank-binbank' },
            { componentName: IconBankEurope, name: 'bank-europe' },
            { componentName: IconBankGazprombank, name: 'bank-gazprombank' },
            { componentName: IconBankHomeCredit, name: 'bank-home-credit' },
            { componentName: IconBankMdm, name: 'bank-mdm' },
            { componentName: IconBankMkb, name: 'bank-mkb' },
            { componentName: IconBankMoscow, name: 'bank-moscow' },
            { componentName: IconBankMts, name: 'bank-mts' },
            { componentName: IconBankOtkritie, name: 'bank-otkritie' },
            { componentName: IconBankOtp, name: 'bank-otp' },
            { componentName: IconBankPsb, name: 'bank-psb' },
            { componentName: IconBankQiwi, name: 'bank-qiwi' },
            { componentName: IconBankRaiffeisen, name: 'bank-raiffeisen' },
            { componentName: IconBankRussianStandard, name: 'bank-russian-standard' },
            { componentName: IconBankSaintPetersburg, name: 'bank-saint-petersburg' },
            { componentName: IconBankSber, name: 'bank-sber' },
            { componentName: IconBankSkb, name: 'bank-skb' },
            { componentName: IconBankSocieteGenerale, name: 'bank-societe-generale' },
            { componentName: IconBankTinkoff, name: 'bank-tinkoff' },
            { componentName: IconBankTrust, name: 'bank-trust' },
            { componentName: IconBankUnicredit, name: 'bank-unicredit' },
            { componentName: IconBankUralsib, name: 'bank-uralsib' },
            { componentName: IconBankUralskiy, name: 'bank-uralskiy' },
            { componentName: IconBankVozrozhdenie, name: 'bank-vozrozhdenie' },
            { componentName: IconBankVtb, name: 'bank-vtb' },
            { componentName: IconBankYandexmoney, name: 'bank-yandexmoney' },
            { componentName: IconBeeline, name: 'beeline' },
            { componentName: IconCardBelkart, name: 'card-belkart' },
            { componentName: IconCardGooglepay, name: 'card-googlepay' },
            { componentName: IconCardMaestro, name: 'card-maestro' },
            { componentName: IconCardMastercard, name: 'card-mastercard' },
            { componentName: IconCardMastero, name: 'card-mastero' },
            { componentName: IconCardMir, name: 'card-mir' },
            { componentName: IconCardVisa, name: 'card-visa' },
            { componentName: IconCardVisaElectron, name: 'card-visa-electron' },
            { componentName: IconFifaTrophy, name: 'fifa-trophy' },
            { componentName: IconForex, name: 'forex' },
            { componentName: IconLogoAlfabank, name: 'logo-alfabank' },
            { componentName: IconMaestro, name: 'maestro' },
            { componentName: IconMastercard, name: 'mastercard' },
            { componentName: IconMir, name: 'mir' },
            { componentName: IconNetworkFacebook, name: 'network-facebook' },
            { componentName: IconNetworkTwitter, name: 'network-twitter' },
            { componentName: IconNetworkVk, name: 'network-vk' },
            { componentName: IconSbp, name: 'sbp' },
            { componentName: IconUnionpay, name: 'unionpay' },
            { componentName: IconVisa, name: 'visa' },
            { componentName: IconCategoryAppliances, name: 'category-appliances' },
            { componentName: IconCategoryAtm, name: 'category-atm' },
            { componentName: IconCategoryAuto, name: 'category-auto' },
            { componentName: IconCategoryAutoLoan, name: 'category-auto-loan' },
            { componentName: IconCategoryBooksMovies, name: 'category-books-movies' },
            { componentName: IconCategoryBudget, name: 'category-budget' },
            { componentName: IconCategoryBusiness, name: 'category-business' },
            { componentName: IconCategoryBusinessActivity, name: 'category-business-activity' },
            { componentName: IconCategoryCards, name: 'category-cards' },
            { componentName: IconCategoryCash, name: 'category-cash' },
            { componentName: IconCategoryCashback, name: 'category-cashback' },
            { componentName: IconCategoryCharity, name: 'category-charity' },
            { componentName: IconCategoryConsulting, name: 'category-consulting' },
            { componentName: IconCategoryDefault, name: 'category-default' },
            { componentName: IconCategoryDress, name: 'category-dress' },
            { componentName: IconCategoryEducation, name: 'category-education' },
            { componentName: IconCategoryEntertainment, name: 'category-entertainment' },
            { componentName: IconCategoryExperiments, name: 'category-experiments' },
            { componentName: IconCategoryFamily, name: 'category-family' },
            { componentName: IconCategoryFinance, name: 'category-finance' },
            { componentName: IconCategoryFines, name: 'category-fines' },
            { componentName: IconCategoryGaming, name: 'category-gaming' },
            { componentName: IconCategoryGasoline, name: 'category-gasoline' },
            { componentName: IconCategoryGibddFines, name: 'category-gibdd-fines' },
            { componentName: IconCategoryGuard, name: 'category-guard' },
            { componentName: IconCategoryHealth, name: 'category-health' },
            { componentName: IconCategoryHobby, name: 'category-hobby' },
            { componentName: IconCategoryHouse, name: 'category-house' },
            { componentName: IconCategoryHousekeeping, name: 'category-housekeeping' },
            { componentName: IconCategoryInvestments, name: 'category-investments' },
            { componentName: IconCategoryLoans, name: 'category-loans' },
            { componentName: IconCategoryMedicine, name: 'category-medicine' },
            { componentName: IconCategoryMortgage, name: 'category-mortgage' },
            { componentName: IconCategoryOther, name: 'category-other' },
            { componentName: IconCategoryPerson, name: 'category-person' },
            { componentName: IconCategoryPets, name: 'category-pets' },
            { componentName: IconCategoryPlane, name: 'category-plane' },
            { componentName: IconCategoryRent, name: 'category-rent' },
            { componentName: IconCategoryRepairs, name: 'category-repairs' },
            { componentName: IconCategoryRestaurants, name: 'category-restaurants' },
            { componentName: IconCategorySalary, name: 'category-salary' },
            { componentName: IconCategoryScholarship, name: 'category-scholarship' },
            { componentName: IconCategoryShield, name: 'category-shield' },
            { componentName: IconCategoryShopping, name: 'category-shopping' },
            { componentName: IconCategoryState, name: 'category-state' },
            { componentName: IconCategoryTelecom, name: 'category-telecom' },
            { componentName: IconCategoryTransfer, name: 'category-transfer' },
            { componentName: IconCategoryTransport, name: 'category-transport' },
            { componentName: IconCategoryTravel, name: 'category-travel' },
            { componentName: IconCategoryTroika, name: 'category-troika' },
            { componentName: IconCategoryTv, name: 'category-tv' },
            { componentName: IconCategoryUnknown, name: 'category-unknown' },
            { componentName: IconCategoryUser, name: 'category-user' },
            { componentName: IconCategoryVacation, name: 'category-vacation' },
            { componentName: IconCategoryVipManager, name: 'category-vip-manager' },
            { componentName: IconCategoryVipRoom, name: 'category-vip-room' },
            { componentName: IconCategoryWallet, name: 'category-wallet' },
            { componentName: IconUtilities, name: 'utilities' },
            { componentName: IconCurrencyChf, name: 'currency-chf' },
            { componentName: IconCurrencyEur, name: 'currency-eur' },
            { componentName: IconCurrencyEurUsd, name: 'currency-eur-usd' },
            { componentName: IconCurrencyGbp, name: 'currency-gbp' },
            { componentName: IconCurrencyJpy, name: 'currency-jpy' },
            { componentName: IconCurrencyRub, name: 'currency-rub' },
            { componentName: IconCurrencyRubUsd, name: 'currency-rub-usd' },
            { componentName: IconCurrencyUsd, name: 'currency-usd' },
            { componentName: IconAlfacheck, name: 'alfacheck' },
            { componentName: IconAlfadialogue, name: 'alfadialogue' },
            { componentName: IconAlfamobile, name: 'alfamobile' },
            { componentName: IconApcBonus, name: 'APC-bonus' },
            { componentName: IconAtm, name: 'atm' },
            { componentName: IconBag, name: 'bag' },
            { componentName: IconCalendar, name: 'calendar' },
            { componentName: IconCardVoid, name: 'card-void' },
            { componentName: IconCashback, name: 'cashback' },
            { componentName: IconCashbackBonus, name: 'cashback-bonus' },
            { componentName: IconChatPhoto, name: 'chat-photo' },
            { componentName: IconClock, name: 'clock' },
            { componentName: IconClockFilled, name: 'clock-filled' },
            { componentName: IconContactList, name: 'contact-list' },
            { componentName: IconContactlessOff, name: 'contactless-off' },
            { componentName: IconContactlessOn, name: 'contactless-on' },
            { componentName: IconDirections, name: 'directions' },
            { componentName: IconDiscount, name: 'discount' },
            { componentName: IconDraft, name: 'draft' },
            { componentName: IconEmoney, name: 'emoney' },
            { componentName: IconFault, name: 'fault' },
            { componentName: IconFingerprint, name: 'fingerprint' },
            { componentName: IconHistory, name: 'history' },
            { componentName: IconHold, name: 'hold' },
            { componentName: IconInbox, name: 'inbox' },
            { componentName: IconInternet, name: 'internet' },
            { componentName: IconKeyboard, name: 'keyboard' },
            { componentName: IconKeyboardHide, name: 'keyboard-hide' },
            { componentName: IconManager, name: 'manager' },
            { componentName: IconMessage, name: 'message' },
            { componentName: IconMetro, name: 'metro' },
            { componentName: IconMobile, name: 'mobile' },
            { componentName: IconMobileAndroid, name: 'mobile-android' },
            { componentName: IconMobileIos, name: 'mobile-ios' },
            { componentName: IconMoneybox, name: 'moneybox' },
            { componentName: IconMypayments, name: 'mypayments' },
            { componentName: IconNews, name: 'news' },
            { componentName: IconNotificationBadge, name: 'notification-badge' },
            { componentName: IconNotifications, name: 'notifications' },
            { componentName: IconOffice, name: 'office' },
            { componentName: IconPerson, name: 'person' },
            { componentName: IconPhoto, name: 'photo' },
            { componentName: IconPillow, name: 'pillow' },
            { componentName: IconPredictions, name: 'predictions' },
            { componentName: IconPresent, name: 'present' },
            { componentName: IconQr, name: 'qr' },
            { componentName: IconRegistry, name: 'registry' },
            { componentName: IconSecurity, name: 'security' },
            { componentName: IconSite, name: 'site' },
            { componentName: IconSixty, name: 'sixty' },
            { componentName: IconTemplates, name: 'templates' },
            { componentName: IconTodo, name: 'todo' },
            { componentName: IconWaiting, name: 'waiting' },
            { componentName: IconAccount, name: 'account' },
            { componentName: IconAccountEuro, name: 'account-euro' },
            { componentName: IconAccountInfo, name: 'account-info' },
            { componentName: IconAccountRub, name: 'account-rub' },
            { componentName: IconAccountText, name: 'account-text' },
            { componentName: IconAccountUsd, name: 'account-usd' },
            { componentName: IconFormat1c, name: 'format-1c' },
            { componentName: IconFormatAttach, name: 'format-attach' },
            { componentName: IconFormatCsv, name: 'format-csv' },
            { componentName: IconFormatDefault, name: 'format-default' },
            { componentName: IconFormatDoc, name: 'format-doc' },
            { componentName: IconFormatJpg, name: 'format-jpg' },
            { componentName: IconFormatPdf, name: 'format-pdf' },
            { componentName: IconFormatPng, name: 'format-png' },
            { componentName: IconFormatPpt, name: 'format-ppt' },
            { componentName: IconFormatRar, name: 'format-rar' },
            { componentName: IconFormatSketch, name: 'format-sketch' },
            { componentName: IconFormatSvg, name: 'format-svg' },
            { componentName: IconFormatTxt, name: 'format-txt' },
            { componentName: IconFormatUnknown, name: 'format-unknown' },
            { componentName: IconFormatXls, name: 'format-xls' },
            { componentName: IconFormatXml, name: 'format-xml' },
            { componentName: IconFormatZip, name: 'format-zip' },
            { componentName: IconAndroidReorder, name: 'android-reorder' },
            { componentName: IconArrowBottom, name: 'arrow-bottom' },
            { componentName: IconArrowCollapse, name: 'arrow-collapse' },
            { componentName: IconArrowDouble, name: 'arrow-double' },
            { componentName: IconArrowDown, name: 'arrow-down' },
            { componentName: IconArrowExpand, name: 'arrow-expand' },
            { componentName: IconArrowLeft, name: 'arrow-left' },
            { componentName: IconArrowLeftDouble, name: 'arrow-left-double' },
            { componentName: IconArrowRight, name: 'arrow-right' },
            { componentName: IconArrowRightDouble, name: 'arrow-right-double' },
            { componentName: IconArrowTop, name: 'arrow-top' },
            { componentName: IconArrowUp, name: 'arrow-up' },
            { componentName: IconAttention, name: 'attention' },
            { componentName: IconAttentionMark, name: 'attention-mark' },
            { componentName: IconAutopayment, name: 'autopayment' },
            { componentName: IconBackspace, name: 'backspace' },
            { componentName: IconBuy, name: 'buy' },
            { componentName: IconCancel, name: 'cancel' },
            { componentName: IconCheck, name: 'check' },
            { componentName: IconCheckBold, name: 'check-bold' },
            { componentName: IconCheckChat, name: 'check-chat' },
            { componentName: IconCheckIndeterminate, name: 'check-indeterminate' },
            { componentName: IconCheckboxDisabled, name: 'checkbox-disabled' },
            { componentName: IconChevronRight, name: 'chevron-right' },
            { componentName: IconClose, name: 'close' },
            { componentName: IconCloseCircle, name: 'close-circle' },
            { componentName: IconDone, name: 'done' },
            { componentName: IconDown, name: 'down' },
            { componentName: IconError, name: 'error' },
            { componentName: IconExchange, name: 'exchange' },
            { componentName: IconExpandDown, name: 'expand-down' },
            { componentName: IconFail, name: 'fail' },
            { componentName: IconFavorite, name: 'favorite' },
            { componentName: IconFeature, name: 'feature' },
            { componentName: IconFingerPointing, name: 'finger-pointing' },
            { componentName: IconGeolocation, name: 'geolocation' },
            { componentName: IconGeolocationMap, name: 'geolocation-map' },
            { componentName: IconHelp, name: 'help' },
            { componentName: IconHelpFilled, name: 'help-filled' },
            { componentName: IconHome, name: 'home' },
            { componentName: IconInfo, name: 'info' },
            { componentName: IconLeft, name: 'left' },
            { componentName: IconList, name: 'list' },
            { componentName: IconLocation, name: 'location' },
            { componentName: IconMetroMap, name: 'metro-map' },
            { componentName: IconOk, name: 'ok' },
            { componentName: IconOkFilled, name: 'ok-filled' },
            { componentName: IconOutside, name: 'outside' },
            { componentName: IconPlay, name: 'play' },
            { componentName: IconRight, name: 'right' },
            { componentName: IconSell, name: 'sell' },
            { componentName: IconSliderArrowDouble, name: 'slider-arrow-double' },
            { componentName: IconStar, name: 'star' },
            { componentName: IconStarActive, name: 'star-active' },
            { componentName: IconStarInactive, name: 'star-inactive' },
            { componentName: IconStatusUrgent, name: 'status-urgent' },
            { componentName: IconSubmit, name: 'submit' },
            { componentName: IconSystemBack, name: 'system-back' },
            { componentName: IconSystemHelp, name: 'system-help' },
            { componentName: IconSystemHideArrow, name: 'system-hide-arrow' },
            { componentName: IconTable, name: 'table' },
            { componentName: IconTick, name: 'tick' },
            { componentName: IconUp, name: 'up' },
            { componentName: IconVerifying, name: 'verifying' },
            { componentName: IconBank2449, name: 'bank-2449' },
            { componentName: IconBankNsipf1326, name: 'bank-nsipf-1326' },
            { componentName: IconBank3308, name: 'bank-3308' },
            { componentName: IconBankNsipf128, name: 'bank-nsipf-128' },
            { componentName: IconBankNsipf323, name: 'bank-nsipf-323' },
            { componentName: IconBank10223, name: 'bank-10223' },
            { componentName: IconBankNsipf3311, name: 'bank-nsipf-3311' },
            { componentName: IconBankNsipf354, name: 'bank-nsipf-354' },
            { componentName: IconBank439, name: 'bank-439' },
            { componentName: IconBankNsipf316, name: 'bank-nsipf-316' },
            { componentName: IconBank9908, name: 'bank-9908' },
            { componentName: IconBankNsipf2361, name: 'bank-nsipf-2361' },
            { componentName: IconBank3001, name: 'bank-3001' },
            { componentName: IconBankNsipf2524, name: 'bank-nsipf-2524' },
            { componentName: IconBank5475, name: 'bank-5475' },
            { componentName: IconBankNsipf2748, name: 'bank-nsipf-2748' },
            { componentName: IconBank1490, name: 'bank-1490' },
            { componentName: IconBankNsipf2268, name: 'bank-nsipf-2268' },
            { componentName: IconBank4267, name: 'bank-4267' },
            { componentName: IconBankNsipf2209, name: 'bank-nsipf-2209' },
            { componentName: IconBank7311, name: 'bank-7311' },
            { componentName: IconBankNsipf2766, name: 'bank-nsipf-2766' },
            { componentName: IconBank1516, name: 'bank-1516' },
            { componentName: IconBankNsipf3251, name: 'bank-nsipf-3251' },
            { componentName: IconBank1309, name: 'bank-1309' },
            { componentName: IconBankNsipf2241, name: 'bank-nsipf-2241' },
            { componentName: IconBank8967, name: 'bank-8967' },
            { componentName: IconBankNsipf3292, name: 'bank-nsipf-3292' },
            { componentName: IconBank6415, name: 'bank-6415' },
            { componentName: IconBankNsipf2289, name: 'bank-nsipf-2289' },
            { componentName: IconBank285, name: 'bank-285' },
            { componentName: IconBankNsipf436, name: 'bank-nsipf-436' },
            { componentName: IconBank4924, name: 'bank-4924' },
            { componentName: IconBankNsipf1481, name: 'bank-nsipf-1481' },
            { componentName: IconBank5030, name: 'bank-5030' },
            { componentName: IconBankNsipf705, name: 'bank-nsipf-705' },
            { componentName: IconBank351, name: 'bank-351' },
            { componentName: IconBankNsipf1792, name: 'bank-nsipf-1792' },
            { componentName: IconBank256, name: 'bank-256' },
            { componentName: IconBankNsipf2673, name: 'bank-nsipf-2673' },
            { componentName: IconBank1415, name: 'bank-1415' },
            { componentName: IconBankNsipf3279, name: 'bank-nsipf-3279' },
            { componentName: IconBank7687, name: 'bank-7687' },
            { componentName: IconBankNsipf1, name: 'bank-nsipf-1' },
            { componentName: IconBank7686, name: 'bank-7686' },
            { componentName: IconBankNsipf2275, name: 'bank-nsipf-2275' },
            { componentName: IconBank2377, name: 'bank-2377' },
            { componentName: IconBankNsipf429, name: 'bank-nsipf-429' },
            { componentName: IconBank244, name: 'bank-244' },
            { componentName: IconBankNsipf1439, name: 'bank-nsipf-1439' },
            { componentName: IconBank404, name: 'bank-404' },
            { componentName: IconBankNsipf1000, name: 'bank-nsipf-1000' }
        ];

        return icons.map((icon, index) => (
            it(`render ${icon.componentName.name} without problems`, () => {
                let CurrentComponent = icons[index].componentName;
                let renderedIcon = shallow(<CurrentComponent />);
                expect(renderedIcon).toMatchSnapshot(icon.componentName.name);
            })
        ));
    })();
});
