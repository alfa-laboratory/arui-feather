/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';
import Icon from './icon';

import IconAdd from './action/add';
import IconAnalytics from './action/analytics';
import IconArrowBack from './action/arrow-back';
import IconAttachment from './action/attachment';
import IconBack from './action/back';
import IconCall from './action/call';
import IconCamera from './action/camera';
import IconCardPinChange from './action/card-pin-change';
import IconChat from './action/chat';
import IconChatSend from './action/chat-send';
import IconConvertRubToUsd from './action/convert-rub-to-usd';
import IconCopy from './action/copy';
import IconDelete from './action/delete';
import IconDislike from './action/dislike';
import IconDislikeFilled from './action/dislike-filled';
import IconDots from './action/dots';
import IconEdit from './action/edit';
import IconEmail from './action/email';
import IconErase from './action/erase';
import IconFilter from './action/filter';
import IconLike from './action/like';
import IconLikeFilled from './action/like-filled';
import IconLock from './action/lock';
import IconLockFilled from './action/lock-filled';
import IconLockUnlock from './action/lock-unlock';
import IconLogout from './action/logout';
import IconMore from './action/more';
import IconNext from './action/next';
import IconNfs from './action/nfs';
import IconPasswordChange from './action/password-change';
import IconPasswordHide from './action/password-hide';
import IconPasswordShow from './action/password-show';
import IconPause from './action/pause';
import IconPin from './action/pin';
import IconPinUnpin from './action/pin-unpin';
import IconPower from './action/power';
import IconPowerCard from './action/power-card';
import IconPrinter from './action/printer';
import IconRepeat from './action/repeat';
import IconReply from './action/reply';
import IconSearch from './action/search';
import IconSettings from './action/settings';
import IconShareAndroid from './action/share-android';
import IconShareIos from './action/share-ios';
import IconSign from './action/sign';
import IconUnlock from './action/unlock';
import IconUserLogout from './action/user-logout';
import IconAccountAdd from './banking/account-add';
import IconAccountDefault from './banking/account-default';
import IconAccountShared from './banking/account-shared';
import IconCard from './banking/card';
import IconCardAccountsList from './banking/card-accounts-list';
import IconCardActivate from './banking/card-activate';
import IconCardActivation from './banking/card-activation';
import IconCardAdd from './banking/card-add';
import IconCardExpences from './banking/card-expences';
import IconCardList from './banking/card-list';
import IconCardUnknown from './banking/card-unknown';
import IconCash from './banking/cash';
import IconCosts from './banking/costs';
import IconCostsCard from './banking/costs-card';
import IconCredit from './banking/credit';
import IconCvv from './banking/cvv';
import IconDeposit from './banking/deposit';
import IconExpences from './banking/expences';
import IconExpencesPlanner from './banking/expences-planner';
import IconGoals from './banking/goals';
import IconIncome from './banking/income';
import IconInvestments from './banking/investments';
import IconInvoiceForPayment from './banking/invoice-for-payment';
import IconLimits from './banking/limits';
import IconOutcome from './banking/outcome';
import IconOverdraft from './banking/overdraft';
import IconPaymentByPhoto from './banking/payment-by-photo';
import IconPaymentError from './banking/payment-error';
import IconPaymentOutbox from './banking/payment-outbox';
import IconPaymentPlus from './banking/payment-plus';
import IconPaymentRoundedPlus from './banking/payment-rounded-plus';
import IconPaymentToCompany from './banking/payment-to-company';
import IconPaymentToPerson from './banking/payment-to-person';
import IconPaymentToSelf from './banking/payment-to-self';
import IconPaymentToState from './banking/payment-to-state';
import IconPlanExpenses from './banking/plan-expenses';
import IconPlansByCategory from './banking/plans-by-category';
import IconReadyToSend from './banking/ready-to-send';
import IconRequestMoney from './banking/request-money';
import IconSent from './banking/sent';
import IconSubscrption from './banking/subscrption';
import IconTransferAnyBank from './banking/transfer-any-bank';
import IconTransferAnyBankCredit from './banking/transfer-any-bank-credit';
import IconTransferBetweenAccounts from './banking/transfer-between-accounts';
import IconTransferCard from './banking/transfer-card';
import IconTransferExternal from './banking/transfer-external';
import IconTransferIn from './banking/transfer-in';
import IconTransferInternal from './banking/transfer-internal';
import IconTransferOut from './banking/transfer-out';
import IconTransferSelf from './banking/transfer-self';
import IconTransferToCard from './banking/transfer-to-card';
import IconBank2449 from './brand/bank-2449';
import IconBank3308 from './brand/bank-3308';
import IconBankBinbank from './brand/bank-binbank';
import IconBank10223 from './brand/bank-10223';
import IconBankGazprombank from './brand/bank-gazprombank';
import IconBank439 from './brand/bank-439';
import IconBank9908 from './brand/bank-9908';
import IconBank3001 from './brand/bank-3001';
import IconBank5475 from './brand/bank-5475';
import IconBank1490 from './brand/bank-1490';
import IconBank4267 from './brand/bank-4267';
import IconBank7311 from './brand/bank-7311';
import IconBank1516 from './brand/bank-1516';
import IconBank1309 from './brand/bank-1309';
import IconBank8967 from './brand/bank-8967';
import IconBank6415 from './brand/bank-6415';
import IconBank285 from './brand/bank-285';
import IconBank4924 from './brand/bank-4924';
import IconBank5030 from './brand/bank-5030';
import IconBank351 from './brand/bank-351';
import IconBank256 from './brand/bank-256';
import IconBank1415 from './brand/bank-1415';
import IconBank7687 from './brand/bank-7687';
import IconBank7686 from './brand/bank-7686';
import IconBank2377 from './brand/bank-2377';
import IconBank244 from './brand/bank-244';
import IconBank404 from './brand/bank-404';
import IconCardBelkart from './brand/card-belkart';
import IconCardGooglepay from './brand/card-googlepay';
import IconCardMaestro from './brand/card-maestro';
import IconCardMastercard from './brand/card-mastercard';
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
import IconVisa from './brand/visa';
import IconCategoryAppliances from './category/category-appliances';
import IconCategoryAtm from './category/category-atm';
import IconCategoryAuto from './category/category-auto';
import IconCategoryBooksMovies from './category/category-books-movies';
import IconCategoryBudget from './category/category-budget';
import IconCategoryBusiness from './category/category-business';
import IconCategoryBusinessActivity from './category/category-business-activity';
import IconCategoryBusinessTrip from './category/category-business-trip';
import IconCategoryCash from './category/category-cash';
import IconCategoryCashback from './category/category-cashback';
import IconCategoryCharity from './category/category-charity';
import IconCategoryDefault from './category/category-default';
import IconCategoryDress from './category/category-dress';
import IconCategoryDunno from './category/category-dunno';
import IconCategoryEducation from './category/category-education';
import IconCategoryEntertainment from './category/category-entertainment';
import IconCategoryFamily from './category/category-family';
import IconCategoryFinance from './category/category-finance';
import IconCategoryFines from './category/category-fines';
import IconCategoryForgot from './category/category-forgot';
import IconCategoryGasoline from './category/category-gasoline';
import IconCategoryGibddFines from './category/category-gibdd-fines';
import IconCategoryHealth from './category/category-health';
import IconCategoryHobby from './category/category-hobby';
import IconCategoryHousekeeping from './category/category-housekeeping';
import IconCategoryInvestments from './category/category-investments';
import IconCategoryLoans from './category/category-loans';
import IconCategoryMedicine from './category/category-medicine';
import IconCategoryMobileInternet from './category/category-mobile-internet';
import IconCategoryMortgage from './category/category-mortgage';
import IconCategoryMortgaget from './category/category-mortgaget';
import IconCategoryOther from './category/category-other';
import IconCategoryPerson from './category/category-person';
import IconCategoryPets from './category/category-pets';
import IconCategoryRent from './category/category-rent';
import IconCategoryRepairs from './category/category-repairs';
import IconCategoryRestaurants from './category/category-restaurants';
import IconCategorySalary from './category/category-salary';
import IconCategoryScholarship from './category/category-scholarship';
import IconCategoryShopping from './category/category-shopping';
import IconCategoryState from './category/category-state';
import IconCategoryTaxFines from './category/category-tax-fines';
import IconCategoryTelecom from './category/category-telecom';
import IconCategoryTransfer from './category/category-transfer';
import IconCategoryTransport from './category/category-transport';
import IconCategoryTravel from './category/category-travel';
import IconCategoryTroika from './category/category-troika';
import IconCategoryUser from './category/category-user';
import IconCategoryVacation from './category/category-vacation';
import IconUtilities from './category/utilities';
import IconCurrencyChf from './currency/currency-chf';
import IconCurrencyEur from './currency/currency-eur';
import IconCurrencyEurUsd from './currency/currency-eur-usd';
import IconCurrencyGbp from './currency/currency-gbp';
import IconCurrencyJpy from './currency/currency-jpy';
import IconCurrencyRub from './currency/currency-rub';
import IconCurrencyRubUsd from './currency/currency-rub-usd';
import IconCurrencyUsd from './currency/currency-usd';
import IconAddressBook from './entity/address-book';
import IconAlfacheck from './entity/alfacheck';
import IconAlfadialogue from './entity/alfadialogue';
import IconAlfamobile from './entity/alfamobile';
import IconAtm from './entity/atm';
import IconBag from './entity/bag';
import IconCalendar from './entity/calendar';
import IconCashbackBonus from './entity/cashback-bonus';
import IconClock from './entity/clock';
import IconContactList from './entity/contact-list';
import IconContactless from './entity/contactless';
import IconContactlessOff from './entity/contactless-off';
import IconContactlessOn from './entity/contactless-on';
import IconDirections from './entity/directions';
import IconDiscount from './entity/discount';
import IconDraft from './entity/draft';
import IconEmoney from './entity/emoney';
import IconFingerprint from './entity/fingerprint';
import IconHistory from './entity/history';
import IconInbox from './entity/inbox';
import IconInternet from './entity/internet';
import IconKeyboard from './entity/keyboard';
import IconMessage from './entity/message';
import IconMobile from './entity/mobile';
import IconMoneybox from './entity/moneybox';
import IconMypayments from './entity/mypayments';
import IconNews from './entity/news';
import IconNotifications from './entity/notifications';
import IconOffice from './entity/office';
import IconPerson from './entity/person';
import IconPhoto from './entity/photo';
import IconPredictions from './entity/predictions';
import IconPresent from './entity/present';
import IconQr from './entity/qr';
import IconRegistry from './entity/registry';
import IconSecurity from './entity/security';
import IconSite from './entity/site';
import IconAccount from './file/account';
import IconAccountEuro from './file/account-euro';
import IconAccountInfo from './file/account-info';
import IconAccountMain from './file/account-main';
import IconAccountRub from './file/account-rub';
import IconAccountText from './file/account-text';
import IconAccountUsd from './file/account-usd';
import IconFormat1c from './file/format-1c';
import IconFormatAttach from './file/format-attach';
import IconFormatCsv from './file/format-csv';
import IconFormatDefault from './file/format-default';
import IconFormatDoc from './file/format-doc';
import IconFormatPdf from './file/format-pdf';
import IconFormatPng from './file/format-png';
import IconFormatPpt from './file/format-ppt';
import IconFormatSketch from './file/format-sketch';
import IconFormatSvg from './file/format-svg';
import IconFormatTxt from './file/format-txt';
import IconFormatXls from './file/format-xls';
import IconFormatXml from './file/format-xml';
import IconFormatZip from './file/format-zip';
import IconArrowBottom from './ui/arrow-bottom';
import IconArrowDouble from './ui/arrow-double';
import IconArrowDown from './ui/arrow-down';
import IconArrowLeft from './ui/arrow-left';
import IconArrowRight from './ui/arrow-right';
import IconArrowTop from './ui/arrow-top';
import IconArrowUp from './ui/arrow-up';
import IconBackspace from './ui/backspace';
import IconBuy from './ui/buy';
import IconCheck from './ui/check';
import IconCheckBold from './ui/check-bold';
import IconCheckIndeterminate from './ui/check-indeterminate';
import IconClose from './ui/close';
import IconDone from './ui/done';
import IconDown from './ui/down';
import IconError from './ui/error';
import IconExpandDown from './ui/expand-down';
import IconFail from './ui/fail';
import IconFavorite from './ui/favorite';
import IconFavoriteActive from './ui/favorite-active';
import IconFavourites from './ui/favourites';
import IconFeature from './ui/feature';
import IconFeedback from './ui/feedback';
import IconFeedbackStar from './ui/feedback-star';
import IconFeedbackStarSelected from './ui/feedback-star-selected';
import IconGeolocation from './ui/geolocation';
import IconHelp from './ui/help';
import IconHelpFilled from './ui/help-filled';
import IconInfo from './ui/info';
import IconLeft from './ui/left';
import IconLocation from './ui/location';
import IconOk from './ui/ok';
import IconOkFilled from './ui/ok-filled';
import IconPlay from './ui/play';
import IconRight from './ui/right';
import IconSell from './ui/sell';
import IconSubmit from './ui/submit';
import IconSystemBack from './ui/system-back';
import IconSystemClose from './ui/system-close';
import IconSystemHelp from './ui/system-help';
import IconSystemHideArrow from './ui/system-hide-arrow';
import IconUp from './ui/up';
import IconVerifying from './ui/verifying';
import IconManager from './user/manager';
import IconUser from './user/user';

describe('icon', () => {
    afterEach(cleanUp);

    it('renders without problems', () => {
        let icon = render(<Icon />);
        expect(icon.node).to.have.exist;
    });

    (() => {
        let icons = [
            { componentName: IconAdd, name: 'add' },
            { componentName: IconAnalytics, name: 'analytics' },
            { componentName: IconArrowBack, name: 'arrow-back' },
            { componentName: IconAttachment, name: 'attachment' },
            { componentName: IconBack, name: 'back' },
            { componentName: IconCall, name: 'call' },
            { componentName: IconCamera, name: 'camera' },
            { componentName: IconCardPinChange, name: 'card-pin-change' },
            { componentName: IconChat, name: 'chat' },
            { componentName: IconChatSend, name: 'chat-send' },
            { componentName: IconConvertRubToUsd, name: 'convert-rub-to-usd' },
            { componentName: IconCopy, name: 'copy' },
            { componentName: IconDelete, name: 'delete' },
            { componentName: IconDislike, name: 'dislike' },
            { componentName: IconDislikeFilled, name: 'dislike-filled' },
            { componentName: IconDots, name: 'dots' },
            { componentName: IconEdit, name: 'edit' },
            { componentName: IconEmail, name: 'email' },
            { componentName: IconErase, name: 'erase' },
            { componentName: IconFilter, name: 'filter' },
            { componentName: IconLike, name: 'like' },
            { componentName: IconLikeFilled, name: 'like-filled' },
            { componentName: IconLock, name: 'lock' },
            { componentName: IconLockFilled, name: 'lock-filled' },
            { componentName: IconLockUnlock, name: 'lock-unlock' },
            { componentName: IconLogout, name: 'logout' },
            { componentName: IconMore, name: 'more' },
            { componentName: IconNext, name: 'next' },
            { componentName: IconNfs, name: 'nfs' },
            { componentName: IconPasswordChange, name: 'password-change' },
            { componentName: IconPasswordHide, name: 'password-hide' },
            { componentName: IconPasswordShow, name: 'password-show' },
            { componentName: IconPause, name: 'pause' },
            { componentName: IconPin, name: 'pin' },
            { componentName: IconPinUnpin, name: 'pin-unpin' },
            { componentName: IconPower, name: 'power' },
            { componentName: IconPowerCard, name: 'power-card' },
            { componentName: IconPrinter, name: 'printer' },
            { componentName: IconRepeat, name: 'repeat' },
            { componentName: IconReply, name: 'reply' },
            { componentName: IconSearch, name: 'search' },
            { componentName: IconSettings, name: 'settings' },
            { componentName: IconShareAndroid, name: 'share-android' },
            { componentName: IconShareIos, name: 'share-ios' },
            { componentName: IconSign, name: 'sign' },
            { componentName: IconUnlock, name: 'unlock' },
            { componentName: IconUserLogout, name: 'user-logout' },
            { componentName: IconAccountAdd, name: 'account-add' },
            { componentName: IconAccountDefault, name: 'account-default' },
            { componentName: IconAccountShared, name: 'account-shared' },
            { componentName: IconCard, name: 'card' },
            { componentName: IconCardAccountsList, name: 'card-accounts-list' },
            { componentName: IconCardActivate, name: 'card-activate' },
            { componentName: IconCardActivation, name: 'card-activation' },
            { componentName: IconCardAdd, name: 'card-add' },
            { componentName: IconCardExpences, name: 'card-expences' },
            { componentName: IconCardList, name: 'card-list' },
            { componentName: IconCardUnknown, name: 'card-unknown' },
            { componentName: IconCash, name: 'cash' },
            { componentName: IconCosts, name: 'costs' },
            { componentName: IconCostsCard, name: 'costs-card' },
            { componentName: IconCredit, name: 'credit' },
            { componentName: IconCvv, name: 'cvv' },
            { componentName: IconDeposit, name: 'deposit' },
            { componentName: IconExpences, name: 'expences' },
            { componentName: IconExpencesPlanner, name: 'expences-planner' },
            { componentName: IconGoals, name: 'goals' },
            { componentName: IconIncome, name: 'income' },
            { componentName: IconInvestments, name: 'investments' },
            { componentName: IconInvoiceForPayment, name: 'invoice-for-payment' },
            { componentName: IconLimits, name: 'limits' },
            { componentName: IconOutcome, name: 'outcome' },
            { componentName: IconOverdraft, name: 'overdraft' },
            { componentName: IconPaymentByPhoto, name: 'payment-by-photo' },
            { componentName: IconPaymentError, name: 'payment-error' },
            { componentName: IconPaymentOutbox, name: 'payment-outbox' },
            { componentName: IconPaymentPlus, name: 'payment-plus' },
            { componentName: IconPaymentRoundedPlus, name: 'payment-rounded-plus' },
            { componentName: IconPaymentToCompany, name: 'payment-to-company' },
            { componentName: IconPaymentToPerson, name: 'payment-to-person' },
            { componentName: IconPaymentToSelf, name: 'payment-to-self' },
            { componentName: IconPaymentToState, name: 'payment-to-state' },
            { componentName: IconPlanExpenses, name: 'plan-expenses' },
            { componentName: IconPlansByCategory, name: 'plans-by-category' },
            { componentName: IconReadyToSend, name: 'ready-to-send' },
            { componentName: IconRequestMoney, name: 'request-money' },
            { componentName: IconSent, name: 'sent' },
            { componentName: IconSubscrption, name: 'subscrption' },
            { componentName: IconTransferAnyBank, name: 'transfer-any-bank' },
            { componentName: IconTransferAnyBankCredit, name: 'transfer-any-bank-credit' },
            { componentName: IconTransferBetweenAccounts, name: 'transfer-between-accounts' },
            { componentName: IconTransferCard, name: 'transfer-card' },
            { componentName: IconTransferExternal, name: 'transfer-external' },
            { componentName: IconTransferIn, name: 'transfer-in' },
            { componentName: IconTransferInternal, name: 'transfer-internal' },
            { componentName: IconTransferOut, name: 'transfer-out' },
            { componentName: IconTransferSelf, name: 'transfer-self' },
            { componentName: IconTransferToCard, name: 'transfer-to-card' },
            { componentName: IconBank2449, name: 'bank-2449' },
            { componentName: IconBank3308, name: 'bank-3308' },
            { componentName: IconBankBinbank, name: 'bank-binbank' },
            { componentName: IconBank10223, name: 'bank-10223' },
            { componentName: IconBankGazprombank, name: 'bank-gazprombank' },
            { componentName: IconBank439, name: 'bank-439' },
            { componentName: IconBank9908, name: 'bank-9908' },
            { componentName: IconBank3001, name: 'bank-3001' },
            { componentName: IconBank5475, name: 'bank-5475' },
            { componentName: IconBank1490, name: 'bank-1490' },
            { componentName: IconBank4267, name: 'bank-4267' },
            { componentName: IconBank7311, name: 'bank-7311' },
            { componentName: IconBank1516, name: 'bank-1516' },
            { componentName: IconBank1309, name: 'bank-1309' },
            { componentName: IconBank8967, name: 'bank-8967' },
            { componentName: IconBank6415, name: 'bank-6415' },
            { componentName: IconBank285, name: 'bank-285' },
            { componentName: IconBank4924, name: 'bank-4924' },
            { componentName: IconBank5030, name: 'bank-5030' },
            { componentName: IconBank351, name: 'bank-351' },
            { componentName: IconBank256, name: 'bank-256' },
            { componentName: IconBank1415, name: 'bank-1415' },
            { componentName: IconBank7687, name: 'bank-7687' },
            { componentName: IconBank7686, name: 'bank-7686' },
            { componentName: IconBank2377, name: 'bank-2377' },
            { componentName: IconBank244, name: 'bank-244' },
            { componentName: IconBank404, name: 'bank-404' },
            { componentName: IconCardBelkart, name: 'card-belkart' },
            { componentName: IconCardGooglepay, name: 'card-googlepay' },
            { componentName: IconCardMaestro, name: 'card-maestro' },
            { componentName: IconCardMastercard, name: 'card-mastercard' },
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
            { componentName: IconVisa, name: 'visa' },
            { componentName: IconCategoryAppliances, name: 'category-appliances' },
            { componentName: IconCategoryAtm, name: 'category-atm' },
            { componentName: IconCategoryAuto, name: 'category-auto' },
            { componentName: IconCategoryBooksMovies, name: 'category-books-movies' },
            { componentName: IconCategoryBudget, name: 'category-budget' },
            { componentName: IconCategoryBusiness, name: 'category-business' },
            { componentName: IconCategoryBusinessActivity, name: 'category-business-activity' },
            { componentName: IconCategoryBusinessTrip, name: 'category-business-trip' },
            { componentName: IconCategoryCash, name: 'category-cash' },
            { componentName: IconCategoryCashback, name: 'category-cashback' },
            { componentName: IconCategoryCharity, name: 'category-charity' },
            { componentName: IconCategoryDefault, name: 'category-default' },
            { componentName: IconCategoryDress, name: 'category-dress' },
            { componentName: IconCategoryDunno, name: 'category-dunno' },
            { componentName: IconCategoryEducation, name: 'category-education' },
            { componentName: IconCategoryEntertainment, name: 'category-entertainment' },
            { componentName: IconCategoryFamily, name: 'category-family' },
            { componentName: IconCategoryFinance, name: 'category-finance' },
            { componentName: IconCategoryFines, name: 'category-fines' },
            { componentName: IconCategoryForgot, name: 'category-forgot' },
            { componentName: IconCategoryGasoline, name: 'category-gasoline' },
            { componentName: IconCategoryGibddFines, name: 'category-gibdd-fines' },
            { componentName: IconCategoryHealth, name: 'category-health' },
            { componentName: IconCategoryHobby, name: 'category-hobby' },
            { componentName: IconCategoryHousekeeping, name: 'category-housekeeping' },
            { componentName: IconCategoryInvestments, name: 'category-investments' },
            { componentName: IconCategoryLoans, name: 'category-loans' },
            { componentName: IconCategoryMedicine, name: 'category-medicine' },
            { componentName: IconCategoryMobileInternet, name: 'category-mobile-internet' },
            { componentName: IconCategoryMortgage, name: 'category-mortgage' },
            { componentName: IconCategoryMortgaget, name: 'category-mortgaget' },
            { componentName: IconCategoryOther, name: 'category-other' },
            { componentName: IconCategoryPerson, name: 'category-person' },
            { componentName: IconCategoryPets, name: 'category-pets' },
            { componentName: IconCategoryRent, name: 'category-rent' },
            { componentName: IconCategoryRepairs, name: 'category-repairs' },
            { componentName: IconCategoryRestaurants, name: 'category-restaurants' },
            { componentName: IconCategorySalary, name: 'category-salary' },
            { componentName: IconCategoryScholarship, name: 'category-scholarship' },
            { componentName: IconCategoryShopping, name: 'category-shopping' },
            { componentName: IconCategoryState, name: 'category-state' },
            { componentName: IconCategoryTaxFines, name: 'category-tax-fines' },
            { componentName: IconCategoryTelecom, name: 'category-telecom' },
            { componentName: IconCategoryTransfer, name: 'category-transfer' },
            { componentName: IconCategoryTransport, name: 'category-transport' },
            { componentName: IconCategoryTravel, name: 'category-travel' },
            { componentName: IconCategoryTroika, name: 'category-troika' },
            { componentName: IconCategoryUser, name: 'category-user' },
            { componentName: IconCategoryVacation, name: 'category-vacation' },
            { componentName: IconUtilities, name: 'utilities' },
            { componentName: IconCurrencyChf, name: 'currency-chf' },
            { componentName: IconCurrencyEur, name: 'currency-eur' },
            { componentName: IconCurrencyEurUsd, name: 'currency-eur-usd' },
            { componentName: IconCurrencyGbp, name: 'currency-gbp' },
            { componentName: IconCurrencyJpy, name: 'currency-jpy' },
            { componentName: IconCurrencyRub, name: 'currency-rub' },
            { componentName: IconCurrencyRubUsd, name: 'currency-rub-usd' },
            { componentName: IconCurrencyUsd, name: 'currency-usd' },
            { componentName: IconAddressBook, name: 'address-book' },
            { componentName: IconAlfacheck, name: 'alfacheck' },
            { componentName: IconAlfadialogue, name: 'alfadialogue' },
            { componentName: IconAlfamobile, name: 'alfamobile' },
            { componentName: IconAtm, name: 'atm' },
            { componentName: IconBag, name: 'bag' },
            { componentName: IconCalendar, name: 'calendar' },
            { componentName: IconCashbackBonus, name: 'cashback-bonus' },
            { componentName: IconClock, name: 'clock' },
            { componentName: IconContactList, name: 'contact-list' },
            { componentName: IconContactless, name: 'contactless' },
            { componentName: IconContactlessOff, name: 'contactless-off' },
            { componentName: IconContactlessOn, name: 'contactless-on' },
            { componentName: IconDirections, name: 'directions' },
            { componentName: IconDiscount, name: 'discount' },
            { componentName: IconDraft, name: 'draft' },
            { componentName: IconEmoney, name: 'emoney' },
            { componentName: IconFingerprint, name: 'fingerprint' },
            { componentName: IconHistory, name: 'history' },
            { componentName: IconInbox, name: 'inbox' },
            { componentName: IconInternet, name: 'internet' },
            { componentName: IconKeyboard, name: 'keyboard' },
            { componentName: IconMessage, name: 'message' },
            { componentName: IconMobile, name: 'mobile' },
            { componentName: IconMoneybox, name: 'moneybox' },
            { componentName: IconMypayments, name: 'mypayments' },
            { componentName: IconNews, name: 'news' },
            { componentName: IconNotifications, name: 'notifications' },
            { componentName: IconOffice, name: 'office' },
            { componentName: IconPerson, name: 'person' },
            { componentName: IconPhoto, name: 'photo' },
            { componentName: IconPredictions, name: 'predictions' },
            { componentName: IconPresent, name: 'present' },
            { componentName: IconQr, name: 'qr' },
            { componentName: IconRegistry, name: 'registry' },
            { componentName: IconSecurity, name: 'security' },
            { componentName: IconSite, name: 'site' },
            { componentName: IconAccount, name: 'account' },
            { componentName: IconAccountEuro, name: 'account-euro' },
            { componentName: IconAccountInfo, name: 'account-info' },
            { componentName: IconAccountMain, name: 'account-main' },
            { componentName: IconAccountRub, name: 'account-rub' },
            { componentName: IconAccountText, name: 'account-text' },
            { componentName: IconAccountUsd, name: 'account-usd' },
            { componentName: IconFormat1c, name: 'format-1c' },
            { componentName: IconFormatAttach, name: 'format-attach' },
            { componentName: IconFormatCsv, name: 'format-csv' },
            { componentName: IconFormatDefault, name: 'format-default' },
            { componentName: IconFormatDoc, name: 'format-doc' },
            { componentName: IconFormatPdf, name: 'format-pdf' },
            { componentName: IconFormatPng, name: 'format-png' },
            { componentName: IconFormatPpt, name: 'format-ppt' },
            { componentName: IconFormatSketch, name: 'format-sketch' },
            { componentName: IconFormatSvg, name: 'format-svg' },
            { componentName: IconFormatTxt, name: 'format-txt' },
            { componentName: IconFormatXls, name: 'format-xls' },
            { componentName: IconFormatXml, name: 'format-xml' },
            { componentName: IconFormatZip, name: 'format-zip' },
            { componentName: IconArrowBottom, name: 'arrow-bottom' },
            { componentName: IconArrowDouble, name: 'arrow-double' },
            { componentName: IconArrowDown, name: 'arrow-down' },
            { componentName: IconArrowLeft, name: 'arrow-left' },
            { componentName: IconArrowRight, name: 'arrow-right' },
            { componentName: IconArrowTop, name: 'arrow-top' },
            { componentName: IconArrowUp, name: 'arrow-up' },
            { componentName: IconBackspace, name: 'backspace' },
            { componentName: IconBuy, name: 'buy' },
            { componentName: IconCheck, name: 'check' },
            { componentName: IconCheckBold, name: 'check-bold' },
            { componentName: IconCheckIndeterminate, name: 'check-indeterminate' },
            { componentName: IconClose, name: 'close' },
            { componentName: IconDone, name: 'done' },
            { componentName: IconDown, name: 'down' },
            { componentName: IconError, name: 'error' },
            { componentName: IconExpandDown, name: 'expand-down' },
            { componentName: IconFail, name: 'fail' },
            { componentName: IconFavorite, name: 'favorite' },
            { componentName: IconFavoriteActive, name: 'favorite-active' },
            { componentName: IconFavourites, name: 'favourites' },
            { componentName: IconFeature, name: 'feature' },
            { componentName: IconFeedback, name: 'feedback' },
            { componentName: IconFeedbackStar, name: 'feedback-star' },
            { componentName: IconFeedbackStarSelected, name: 'feedback-star-selected' },
            { componentName: IconGeolocation, name: 'geolocation' },
            { componentName: IconHelp, name: 'help' },
            { componentName: IconHelpFilled, name: 'help-filled' },
            { componentName: IconInfo, name: 'info' },
            { componentName: IconLeft, name: 'left' },
            { componentName: IconLocation, name: 'location' },
            { componentName: IconOk, name: 'ok' },
            { componentName: IconOkFilled, name: 'ok-filled' },
            { componentName: IconPlay, name: 'play' },
            { componentName: IconRight, name: 'right' },
            { componentName: IconSell, name: 'sell' },
            { componentName: IconSubmit, name: 'submit' },
            { componentName: IconSystemBack, name: 'system-back' },
            { componentName: IconSystemClose, name: 'system-close' },
            { componentName: IconSystemHelp, name: 'system-help' },
            { componentName: IconSystemHideArrow, name: 'system-hide-arrow' },
            { componentName: IconUp, name: 'up' },
            { componentName: IconVerifying, name: 'verifying' },
            { componentName: IconManager, name: 'manager' },
            { componentName: IconUser, name: 'user' }
        ];

        return icons.map((icon, index) => (
            it(`render ${icon.componentName.name} without problems`, () => {
                let CurrentComponent = icons[index].componentName;
                let renderedIcon = render(<CurrentComponent />);
                expect(renderedIcon.node).to.have.class(`icon_name_${icon.name}`);
            })
        ));
    })();
});
