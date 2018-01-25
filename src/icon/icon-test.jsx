/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';
import Icon from './icon';

import IconAdd from './action/add';
import IconAttachment from './action/attachment';
import IconBack from './action/back';
import IconCall from './action/call';
import IconCardPinChange from './action/card-pin-change';
import IconChat from './action/chat';
import IconConvert from './action/convert';
import IconDelete from './action/delete';
import IconDislike from './action/dislike';
import IconDislikeFilled from './action/dislike-filled';
import IconEdit from './action/edit';
import IconEmail from './action/email';
import IconErase from './action/erase';
import IconFilter from './action/filter';
import IconLike from './action/like';
import IconLikeFilled from './action/like-filled';
import IconLock from './action/lock';
import IconLockUnlock from './action/lock-unlock';
import IconLogout from './action/logout';
import IconNext from './action/next';
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
import IconShareAndroid from './action/share-android';
import IconShareIos from './action/share-ios';
import IconSign from './action/sign';
import IconUserLogout from './action/user-logout';
import IconAccountAdd from './banking/account-add';
import IconAccountDefault from './banking/account-default';
import IconAccountShared from './banking/account-shared';
import IconCard from './banking/card';
import IconCardAccountsList from './banking/card-accounts-list';
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
import IconBank10223 from './brand/bank-10223';
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
import IconCardMaestro from './brand/card-maestro';
import IconCardMastercard from './brand/card-mastercard';
import IconCardMir from './brand/card-mir';
import IconCardVisa from './brand/card-visa';
import IconCardVisaElectron from './brand/card-visa-electron';
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
import IconCategoryAward from './category/category-award';
import IconCategoryBooksMovies from './category/category-books-movies';
import IconCategoryBudget from './category/category-budget';
import IconCategoryBusiness from './category/category-business';
import IconCategoryBusinessActivity from './category/category-business-activity';
import IconCategoryBusinessTrip from './category/category-business-trip';
import IconCategoryCar from './category/category-car';
import IconCategoryCash from './category/category-cash';
import IconCategoryCashback from './category/category-cashback';
import IconCategoryCharity from './category/category-charity';
import IconCategoryClothing from './category/category-clothing';
import IconCategoryDefault from './category/category-default';
import IconCategoryDepts from './category/category-depts';
import IconCategoryDress from './category/category-dress';
import IconCategoryDunno from './category/category-dunno';
import IconCategoryEducation from './category/category-education';
import IconCategoryEntertainment from './category/category-entertainment';
import IconCategoryFamily from './category/category-family';
import IconCategoryFarmacy from './category/category-farmacy';
import IconCategoryFinance from './category/category-finance';
import IconCategoryFines from './category/category-fines';
import IconCategoryForgot from './category/category-forgot';
import IconCategoryGas from './category/category-gas';
import IconCategoryGasoline from './category/category-gasoline';
import IconCategoryGibddFines from './category/category-gibdd-fines';
import IconCategoryGrocery from './category/category-grocery';
import IconCategoryHealth from './category/category-health';
import IconCategoryHobby from './category/category-hobby';
import IconCategoryHoliday from './category/category-holiday';
import IconCategoryHouse from './category/category-house';
import IconCategoryInvestments from './category/category-investments';
import IconCategoryLoans from './category/category-loans';
import IconCategoryMedia from './category/category-media';
import IconCategoryMedicine from './category/category-medicine';
import IconCategoryMobileInternet from './category/category-mobile-internet';
import IconCategoryMortgage from './category/category-mortgage';
import IconCategoryOther from './category/category-other';
import IconCategoryPerson from './category/category-person';
import IconCategoryPets from './category/category-pets';
import IconCategoryRegistry from './category/category-registry';
import IconCategoryRent from './category/category-rent';
import IconCategoryRepairs from './category/category-repairs';
import IconCategoryRestaurants from './category/category-restaurants';
import IconCategorySalary from './category/category-salary';
import IconCategoryScholarship from './category/category-scholarship';
import IconCategoryShopping from './category/category-shopping';
import IconCategoryState from './category/category-state';
import IconCategoryTaxFines from './category/category-tax-fines';
import IconCategoryTelecom from './category/category-telecom';
import IconCategoryTourism from './category/category-tourism';
import IconCategoryTrafficFine from './category/category-traffic-fine';
import IconCategoryTransfer from './category/category-transfer';
import IconCategoryTransport from './category/category-transport';
import IconCategoryTravel from './category/category-travel';
import IconCategoryTroika from './category/category-troika';
import IconCategoryUser from './category/category-user';
import IconCategoryVacation from './category/category-vacation';
import IconUtilities from './category/utilities';
import IconCurrency from './currency/currency';
import IconCurrencyChf from './currency/currency-chf';
import IconCurrencyEur from './currency/currency-eur';
import IconCurrencyGbp from './currency/currency-gbp';
import IconCurrencyJpy from './currency/currency-jpy';
import IconCurrencyRub from './currency/currency-rub';
import IconCurrencyUsd from './currency/currency-usd';
import IconAddressBook from './entity/address-book';
import IconAlfacheck from './entity/alfacheck';
import IconAlfadialogue from './entity/alfadialogue';
import IconAlfamobile from './entity/alfamobile';
import IconAtm from './entity/atm';
import IconBag from './entity/bag';
import IconCalendar from './entity/calendar';
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
import IconMobile from './entity/mobile';
import IconMoneybox from './entity/moneybox';
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
import IconSettings from './entity/settings';
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
import IconArrowDown from './ui/arrow-down';
import IconArrowLeft from './ui/arrow-left';
import IconArrowRight from './ui/arrow-right';
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
            { componentName: IconAttachment, name: 'attachment' },
            { componentName: IconBack, name: 'back' },
            { componentName: IconCall, name: 'call' },
            { componentName: IconCardPinChange, name: 'card-pin-change' },
            { componentName: IconChat, name: 'chat' },
            { componentName: IconConvert, name: 'convert' },
            { componentName: IconDelete, name: 'delete' },
            { componentName: IconDislike, name: 'dislike' },
            { componentName: IconDislikeFilled, name: 'dislike-filled' },
            { componentName: IconEdit, name: 'edit' },
            { componentName: IconEmail, name: 'email' },
            { componentName: IconErase, name: 'erase' },
            { componentName: IconFilter, name: 'filter' },
            { componentName: IconLike, name: 'like' },
            { componentName: IconLikeFilled, name: 'like-filled' },
            { componentName: IconLock, name: 'lock' },
            { componentName: IconLockUnlock, name: 'lock-unlock' },
            { componentName: IconLogout, name: 'logout' },
            { componentName: IconNext, name: 'next' },
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
            { componentName: IconShareAndroid, name: 'share-android' },
            { componentName: IconShareIos, name: 'share-ios' },
            { componentName: IconSign, name: 'sign' },
            { componentName: IconUserLogout, name: 'user-logout' },
            { componentName: IconAccountAdd, name: 'account-add' },
            { componentName: IconAccountDefault, name: 'account-default' },
            { componentName: IconAccountShared, name: 'account-shared' },
            { componentName: IconCard, name: 'card' },
            { componentName: IconCardAccountsList, name: 'card-accounts-list' },
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
            { componentName: IconBank10223, name: 'bank-10223' },
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
            { componentName: IconCardMaestro, name: 'card-maestro' },
            { componentName: IconCardMastercard, name: 'card-mastercard' },
            { componentName: IconCardMir, name: 'card-mir' },
            { componentName: IconCardVisa, name: 'card-visa' },
            { componentName: IconCardVisaElectron, name: 'card-visa-electron' },
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
            { componentName: IconCategoryAward, name: 'category-award' },
            { componentName: IconCategoryBooksMovies, name: 'category-books-movies' },
            { componentName: IconCategoryBudget, name: 'category-budget' },
            { componentName: IconCategoryBusiness, name: 'category-business' },
            { componentName: IconCategoryBusinessActivity, name: 'category-business-activity' },
            { componentName: IconCategoryBusinessTrip, name: 'category-business-trip' },
            { componentName: IconCategoryCar, name: 'category-car' },
            { componentName: IconCategoryCash, name: 'category-cash' },
            { componentName: IconCategoryCashback, name: 'category-cashback' },
            { componentName: IconCategoryCharity, name: 'category-charity' },
            { componentName: IconCategoryClothing, name: 'category-clothing' },
            { componentName: IconCategoryDefault, name: 'category-default' },
            { componentName: IconCategoryDepts, name: 'category-depts' },
            { componentName: IconCategoryDress, name: 'category-dress' },
            { componentName: IconCategoryDunno, name: 'category-dunno' },
            { componentName: IconCategoryEducation, name: 'category-education' },
            { componentName: IconCategoryEntertainment, name: 'category-entertainment' },
            { componentName: IconCategoryFamily, name: 'category-family' },
            { componentName: IconCategoryFarmacy, name: 'category-farmacy' },
            { componentName: IconCategoryFinance, name: 'category-finance' },
            { componentName: IconCategoryFines, name: 'category-fines' },
            { componentName: IconCategoryForgot, name: 'category-forgot' },
            { componentName: IconCategoryGas, name: 'category-gas' },
            { componentName: IconCategoryGasoline, name: 'category-gasoline' },
            { componentName: IconCategoryGibddFines, name: 'category-gibdd-fines' },
            { componentName: IconCategoryGrocery, name: 'category-grocery' },
            { componentName: IconCategoryHealth, name: 'category-health' },
            { componentName: IconCategoryHobby, name: 'category-hobby' },
            { componentName: IconCategoryHoliday, name: 'category-holiday' },
            { componentName: IconCategoryHouse, name: 'category-house' },
            { componentName: IconCategoryInvestments, name: 'category-investments' },
            { componentName: IconCategoryLoans, name: 'category-loans' },
            { componentName: IconCategoryMedia, name: 'category-media' },
            { componentName: IconCategoryMedicine, name: 'category-medicine' },
            { componentName: IconCategoryMobileInternet, name: 'category-mobile-internet' },
            { componentName: IconCategoryMortgage, name: 'category-mortgage' },
            { componentName: IconCategoryOther, name: 'category-other' },
            { componentName: IconCategoryPerson, name: 'category-person' },
            { componentName: IconCategoryPets, name: 'category-pets' },
            { componentName: IconCategoryRegistry, name: 'category-registry' },
            { componentName: IconCategoryRent, name: 'category-rent' },
            { componentName: IconCategoryRepairs, name: 'category-repairs' },
            { componentName: IconCategoryRestaurants, name: 'category-restaurants' },
            { componentName: IconCategorySalary, name: 'category-salary' },
            { componentName: IconCategoryScholarship, name: 'category-scholarship' },
            { componentName: IconCategoryShopping, name: 'category-shopping' },
            { componentName: IconCategoryState, name: 'category-state' },
            { componentName: IconCategoryTaxFines, name: 'category-tax-fines' },
            { componentName: IconCategoryTelecom, name: 'category-telecom' },
            { componentName: IconCategoryTourism, name: 'category-tourism' },
            { componentName: IconCategoryTrafficFine, name: 'category-traffic-fine' },
            { componentName: IconCategoryTransfer, name: 'category-transfer' },
            { componentName: IconCategoryTransport, name: 'category-transport' },
            { componentName: IconCategoryTravel, name: 'category-travel' },
            { componentName: IconCategoryTroika, name: 'category-troika' },
            { componentName: IconCategoryUser, name: 'category-user' },
            { componentName: IconCategoryVacation, name: 'category-vacation' },
            { componentName: IconUtilities, name: 'utilities' },
            { componentName: IconCurrency, name: 'currency' },
            { componentName: IconCurrencyChf, name: 'currency-chf' },
            { componentName: IconCurrencyEur, name: 'currency-eur' },
            { componentName: IconCurrencyGbp, name: 'currency-gbp' },
            { componentName: IconCurrencyJpy, name: 'currency-jpy' },
            { componentName: IconCurrencyRub, name: 'currency-rub' },
            { componentName: IconCurrencyUsd, name: 'currency-usd' },
            { componentName: IconAddressBook, name: 'address-book' },
            { componentName: IconAlfacheck, name: 'alfacheck' },
            { componentName: IconAlfadialogue, name: 'alfadialogue' },
            { componentName: IconAlfamobile, name: 'alfamobile' },
            { componentName: IconAtm, name: 'atm' },
            { componentName: IconBag, name: 'bag' },
            { componentName: IconCalendar, name: 'calendar' },
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
            { componentName: IconMobile, name: 'mobile' },
            { componentName: IconMoneybox, name: 'moneybox' },
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
            { componentName: IconSettings, name: 'settings' },
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
            { componentName: IconArrowDown, name: 'arrow-down' },
            { componentName: IconArrowLeft, name: 'arrow-left' },
            { componentName: IconArrowRight, name: 'arrow-right' },
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
