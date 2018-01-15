```jsx
const IconAdd = require('./action/add').default;
const IconAttachment = require('./action/attachment').default;
const IconBack = require('./action/back').default;
const IconCall = require('./action/call').default;
const IconCardPinChange = require('./action/card-pin-change').default;
const IconChat = require('./action/chat').default;
const IconConvert = require('./action/convert').default;
const IconDelete = require('./action/delete').default;
const IconDislike = require('./action/dislike').default;
const IconDislikeFilled = require('./action/dislike-filled').default;
const IconEdit = require('./action/edit').default;
const IconEmail = require('./action/email').default;
const IconErase = require('./action/erase').default;
const IconFilter = require('./action/filter').default;
const IconLike = require('./action/like').default;
const IconLikeFilled = require('./action/like-filled').default;
const IconLock = require('./action/lock').default;
const IconLockUnlock = require('./action/lock-unlock').default;
const IconLogout = require('./action/logout').default;
const IconNext = require('./action/next').default;
const IconPasswordChange = require('./action/password-change').default;
const IconPasswordHide = require('./action/password-hide').default;
const IconPasswordShow = require('./action/password-show').default;
const IconPause = require('./action/pause').default;
const IconPin = require('./action/pin').default;
const IconPinUnpin = require('./action/pin-unpin').default;
const IconPower = require('./action/power').default;
const IconPowerCard = require('./action/power-card').default;
const IconPrinter = require('./action/printer').default;
const IconRepeat = require('./action/repeat').default;
const IconReply = require('./action/reply').default;
const IconSearch = require('./action/search').default;
const IconShareAndroid = require('./action/share-android').default;
const IconShareIos = require('./action/share-ios').default;
const IconSign = require('./action/sign').default;
const IconUserLogout = require('./action/user-logout').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAdd size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAttachment size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBack size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCall size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardPinChange size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconChat size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconConvert size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDelete size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDislike size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconDislike size='m' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDislikeFilled size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconEdit size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconEmail size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconErase size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFilter size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLike size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconLike size='m' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLikeFilled size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLock size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLockUnlock size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLogout size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNext size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPasswordChange size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPasswordHide size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPasswordShow size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPause size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPin size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPinUnpin size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPower size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPowerCard size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPrinter size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconRepeat size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconReply size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSearch size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconShareAndroid size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconShareIos size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSign size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconUserLogout size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconAccountAdd = require('./banking/account-add').default;
const IconAccountDefault = require('./banking/account-default').default;
const IconAccountShared = require('./banking/account-shared').default;
const IconCard = require('./banking/card').default;
const IconCardAccountsList = require('./banking/card-accounts-list').default;
const IconCardActivation = require('./banking/card-activation').default;
const IconCardAdd = require('./banking/card-add').default;
const IconCardExpences = require('./banking/card-expences').default;
const IconCardList = require('./banking/card-list').default;
const IconCardUnknown = require('./banking/card-unknown').default;
const IconCash = require('./banking/cash').default;
const IconCosts = require('./banking/costs').default;
const IconCostsCard = require('./banking/costs-card').default;
const IconCredit = require('./banking/credit').default;
const IconCvv = require('./banking/cvv').default;
const IconDeposit = require('./banking/deposit').default;
const IconExpences = require('./banking/expences').default;
const IconExpencesPlanner = require('./banking/expences-planner').default;
const IconGoals = require('./banking/goals').default;
const IconIncome = require('./banking/income').default;
const IconInvestments = require('./banking/investments').default;
const IconInvoiceForPayment = require('./banking/invoice-for-payment').default;
const IconLimits = require('./banking/limits').default;
const IconOutcome = require('./banking/outcome').default;
const IconPaymentByPhoto = require('./banking/payment-by-photo').default;
const IconPaymentError = require('./banking/payment-error').default;
const IconPaymentOutbox = require('./banking/payment-outbox').default;
const IconPaymentPlus = require('./banking/payment-plus').default;
const IconPaymentRoundedPlus = require('./banking/payment-rounded-plus').default;
const IconPaymentToCompany = require('./banking/payment-to-company').default;
const IconPaymentToPerson = require('./banking/payment-to-person').default;
const IconPaymentToSelf = require('./banking/payment-to-self').default;
const IconPaymentToState = require('./banking/payment-to-state').default;
const IconPlanExpenses = require('./banking/plan-expenses').default;
const IconPlansByCategory = require('./banking/plans-by-category').default;
const IconReadyToSend = require('./banking/ready-to-send').default;
const IconRequestMoney = require('./banking/request-money').default;
const IconSent = require('./banking/sent').default;
const IconSubscrption = require('./banking/subscrption').default;
const IconTransferAnyBank = require('./banking/transfer-any-bank').default;
const IconTransferAnyBankCredit = require('./banking/transfer-any-bank-credit').default;
const IconTransferBetweenAccounts = require('./banking/transfer-between-accounts').default;
const IconTransferCard = require('./banking/transfer-card').default;
const IconTransferExternal = require('./banking/transfer-external').default;
const IconTransferIn = require('./banking/transfer-in').default;
const IconTransferInternal = require('./banking/transfer-internal').default;
const IconTransferOut = require('./banking/transfer-out').default;
const IconTransferSelf = require('./banking/transfer-self').default;
const IconTransferToCard = require('./banking/transfer-to-card').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountAdd size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountDefault size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountShared size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCard size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardAccountsList size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardActivation size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardAdd size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardExpences size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardList size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardUnknown size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCash size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCosts size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCostsCard size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCredit size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCvv size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDeposit size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconExpences size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconExpencesPlanner size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconGoals size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconIncome size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconInvestments size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconInvoiceForPayment size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLimits size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconOutcome size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentByPhoto size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentError size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentOutbox size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentPlus size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentRoundedPlus size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentToCompany size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentToPerson size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentToSelf size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPaymentToState size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPlanExpenses size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPlansByCategory size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconReadyToSend size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconRequestMoney size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSent size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSubscrption size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferAnyBank size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferAnyBankCredit size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferBetweenAccounts size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferCard size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferExternal size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferIn size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferInternal size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferOut size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferSelf size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconTransferToCard size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconBank2449 = require('./brand/bank-2449').default;
const IconBank3308 = require('./brand/bank-3308').default;
const IconBank10223 = require('./brand/bank-10223').default;
const IconBank439 = require('./brand/bank-439').default;
const IconBank9908 = require('./brand/bank-9908').default;
const IconBank3001 = require('./brand/bank-3001').default;
const IconBank5475 = require('./brand/bank-5475').default;
const IconBank1490 = require('./brand/bank-1490').default;
const IconBank4267 = require('./brand/bank-4267').default;
const IconBank7311 = require('./brand/bank-7311').default;
const IconBank1516 = require('./brand/bank-1516').default;
const IconBank1309 = require('./brand/bank-1309').default;
const IconBank8967 = require('./brand/bank-8967').default;
const IconBank6415 = require('./brand/bank-6415').default;
const IconBank285 = require('./brand/bank-285').default;
const IconBank4924 = require('./brand/bank-4924').default;
const IconBank5030 = require('./brand/bank-5030').default;
const IconBank351 = require('./brand/bank-351').default;
const IconBank256 = require('./brand/bank-256').default;
const IconBank1415 = require('./brand/bank-1415').default;
const IconBank7687 = require('./brand/bank-7687').default;
const IconBank7686 = require('./brand/bank-7686').default;
const IconBank2377 = require('./brand/bank-2377').default;
const IconBank244 = require('./brand/bank-244').default;
const IconBank404 = require('./brand/bank-404').default;
const IconCardBelkart = require('./brand/card-belkart').default;
const IconCardMaestro = require('./brand/card-maestro').default;
const IconCardMastercard = require('./brand/card-mastercard').default;
const IconCardMir = require('./brand/card-mir').default;
const IconCardVisa = require('./brand/card-visa').default;
const IconCardVisaElectron = require('./brand/card-visa-electron').default;
const IconLogoAlfabank = require('./brand/logo-alfabank').default;
const IconMaestro = require('./brand/maestro').default;
const IconMastercard = require('./brand/mastercard').default;
const IconMir = require('./brand/mir').default;
const IconNetworkFacebook = require('./brand/network-facebook').default;
const IconNetworkTwitter = require('./brand/network-twitter').default;
const IconNetworkVk = require('./brand/network-vk').default;
const IconVisa = require('./brand/visa').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank2449 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank2449 size='s' colored={ true } /></span>
        <span className='column l'><IconBank2449 size='m' colored={ true } /></span>
        <span className='column l'><IconBank2449 size='l' colored={ true } /></span>
        <span className='column l'><IconBank2449 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank3308 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank3308 size='s' colored={ true } /></span>
        <span className='column l'><IconBank3308 size='m' colored={ true } /></span>
        <span className='column l'><IconBank3308 size='l' colored={ true } /></span>
        <span className='column l'><IconBank3308 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank10223 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank10223 size='s' colored={ true } /></span>
        <span className='column l'><IconBank10223 size='m' colored={ true } /></span>
        <span className='column l'><IconBank10223 size='l' colored={ true } /></span>
        <span className='column l'><IconBank10223 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank439 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank439 size='s' colored={ true } /></span>
        <span className='column l'><IconBank439 size='m' colored={ true } /></span>
        <span className='column l'><IconBank439 size='l' colored={ true } /></span>
        <span className='column l'><IconBank439 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank9908 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank9908 size='s' colored={ true } /></span>
        <span className='column l'><IconBank9908 size='m' colored={ true } /></span>
        <span className='column l'><IconBank9908 size='l' colored={ true } /></span>
        <span className='column l'><IconBank9908 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank3001 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank3001 size='s' colored={ true } /></span>
        <span className='column l'><IconBank3001 size='m' colored={ true } /></span>
        <span className='column l'><IconBank3001 size='l' colored={ true } /></span>
        <span className='column l'><IconBank3001 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank5475 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank5475 size='s' colored={ true } /></span>
        <span className='column l'><IconBank5475 size='m' colored={ true } /></span>
        <span className='column l'><IconBank5475 size='l' colored={ true } /></span>
        <span className='column l'><IconBank5475 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank1490 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank1490 size='s' colored={ true } /></span>
        <span className='column l'><IconBank1490 size='m' colored={ true } /></span>
        <span className='column l'><IconBank1490 size='l' colored={ true } /></span>
        <span className='column l'><IconBank1490 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank4267 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank4267 size='s' colored={ true } /></span>
        <span className='column l'><IconBank4267 size='m' colored={ true } /></span>
        <span className='column l'><IconBank4267 size='l' colored={ true } /></span>
        <span className='column l'><IconBank4267 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank7311 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank7311 size='s' colored={ true } /></span>
        <span className='column l'><IconBank7311 size='m' colored={ true } /></span>
        <span className='column l'><IconBank7311 size='l' colored={ true } /></span>
        <span className='column l'><IconBank7311 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank1516 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank1516 size='s' colored={ true } /></span>
        <span className='column l'><IconBank1516 size='m' colored={ true } /></span>
        <span className='column l'><IconBank1516 size='l' colored={ true } /></span>
        <span className='column l'><IconBank1516 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank1309 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank1309 size='s' colored={ true } /></span>
        <span className='column l'><IconBank1309 size='m' colored={ true } /></span>
        <span className='column l'><IconBank1309 size='l' colored={ true } /></span>
        <span className='column l'><IconBank1309 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank8967 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank8967 size='s' colored={ true } /></span>
        <span className='column l'><IconBank8967 size='m' colored={ true } /></span>
        <span className='column l'><IconBank8967 size='l' colored={ true } /></span>
        <span className='column l'><IconBank8967 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank6415 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank6415 size='s' colored={ true } /></span>
        <span className='column l'><IconBank6415 size='m' colored={ true } /></span>
        <span className='column l'><IconBank6415 size='l' colored={ true } /></span>
        <span className='column l'><IconBank6415 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank285 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank285 size='s' colored={ true } /></span>
        <span className='column l'><IconBank285 size='m' colored={ true } /></span>
        <span className='column l'><IconBank285 size='l' colored={ true } /></span>
        <span className='column l'><IconBank285 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank4924 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank4924 size='s' colored={ true } /></span>
        <span className='column l'><IconBank4924 size='m' colored={ true } /></span>
        <span className='column l'><IconBank4924 size='l' colored={ true } /></span>
        <span className='column l'><IconBank4924 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank5030 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank5030 size='s' colored={ true } /></span>
        <span className='column l'><IconBank5030 size='m' colored={ true } /></span>
        <span className='column l'><IconBank5030 size='l' colored={ true } /></span>
        <span className='column l'><IconBank5030 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank351 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank351 size='s' colored={ true } /></span>
        <span className='column l'><IconBank351 size='m' colored={ true } /></span>
        <span className='column l'><IconBank351 size='l' colored={ true } /></span>
        <span className='column l'><IconBank351 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank256 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank256 size='s' colored={ true } /></span>
        <span className='column l'><IconBank256 size='m' colored={ true } /></span>
        <span className='column l'><IconBank256 size='l' colored={ true } /></span>
        <span className='column l'><IconBank256 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank1415 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank1415 size='s' colored={ true } /></span>
        <span className='column l'><IconBank1415 size='m' colored={ true } /></span>
        <span className='column l'><IconBank1415 size='l' colored={ true } /></span>
        <span className='column l'><IconBank1415 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank7687 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank7687 size='s' colored={ true } /></span>
        <span className='column l'><IconBank7687 size='m' colored={ true } /></span>
        <span className='column l'><IconBank7687 size='l' colored={ true } /></span>
        <span className='column l'><IconBank7687 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank7686 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank7686 size='s' colored={ true } /></span>
        <span className='column l'><IconBank7686 size='m' colored={ true } /></span>
        <span className='column l'><IconBank7686 size='l' colored={ true } /></span>
        <span className='column l'><IconBank7686 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank2377 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank2377 size='s' colored={ true } /></span>
        <span className='column l'><IconBank2377 size='m' colored={ true } /></span>
        <span className='column l'><IconBank2377 size='l' colored={ true } /></span>
        <span className='column l'><IconBank2377 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank244 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank244 size='s' colored={ true } /></span>
        <span className='column l'><IconBank244 size='m' colored={ true } /></span>
        <span className='column l'><IconBank244 size='l' colored={ true } /></span>
        <span className='column l'><IconBank244 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBank404 size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconBank404 size='s' colored={ true } /></span>
        <span className='column l'><IconBank404 size='m' colored={ true } /></span>
        <span className='column l'><IconBank404 size='l' colored={ true } /></span>
        <span className='column l'><IconBank404 size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardBelkart size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconCardBelkart size='s' colored={ true } /></span>
        <span className='column l'><IconCardBelkart size='m' colored={ true } /></span>
        <span className='column l'><IconCardBelkart size='l' colored={ true } /></span>
        <span className='column l'><IconCardBelkart size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardMaestro size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconCardMaestro size='s' colored={ true } /></span>
        <span className='column l'><IconCardMaestro size='m' colored={ true } /></span>
        <span className='column l'><IconCardMaestro size='l' colored={ true } /></span>
        <span className='column l'><IconCardMaestro size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardMastercard size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconCardMastercard size='s' colored={ true } /></span>
        <span className='column l'><IconCardMastercard size='m' colored={ true } /></span>
        <span className='column l'><IconCardMastercard size='l' colored={ true } /></span>
        <span className='column l'><IconCardMastercard size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardMir size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardVisa size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconCardVisa size='s' colored={ true } /></span>
        <span className='column l'><IconCardVisa size='m' colored={ true } /></span>
        <span className='column l'><IconCardVisa size='l' colored={ true } /></span>
        <span className='column l'><IconCardVisa size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCardVisaElectron size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconCardVisaElectron size='s' colored={ true } /></span>
        <span className='column l'><IconCardVisaElectron size='m' colored={ true } /></span>
        <span className='column l'><IconCardVisaElectron size='l' colored={ true } /></span>
        <span className='column l'><IconCardVisaElectron size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLogoAlfabank size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconLogoAlfabank size='s' colored={ true } /></span>
        <span className='column l'><IconLogoAlfabank size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconMaestro size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconMaestro size='s' colored={ true } /></span>
        <span className='column l'><IconMaestro size='l' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconMastercard size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconMastercard size='s' colored={ true } /></span>
        <span className='column l'><IconMastercard size='l' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconMir size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconMir size='l' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNetworkFacebook size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNetworkTwitter size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNetworkVk size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconVisa size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconCategoryAppliances = require('./category/category-appliances').default;
const IconCategoryAtm = require('./category/category-atm').default;
const IconCategoryAuto = require('./category/category-auto').default;
const IconCategoryAward = require('./category/category-award').default;
const IconCategoryBooksMovies = require('./category/category-books-movies').default;
const IconCategoryBudget = require('./category/category-budget').default;
const IconCategoryBusiness = require('./category/category-business').default;
const IconCategoryBusinessActivity = require('./category/category-business-activity').default;
const IconCategoryBusinessTrip = require('./category/category-business-trip').default;
const IconCategoryCar = require('./category/category-car').default;
const IconCategoryCash = require('./category/category-cash').default;
const IconCategoryCashback = require('./category/category-cashback').default;
const IconCategoryCharity = require('./category/category-charity').default;
const IconCategoryClothing = require('./category/category-clothing').default;
const IconCategoryDefault = require('./category/category-default').default;
const IconCategoryDepts = require('./category/category-depts').default;
const IconCategoryDress = require('./category/category-dress').default;
const IconCategoryDunno = require('./category/category-dunno').default;
const IconCategoryEducation = require('./category/category-education').default;
const IconCategoryEntertainment = require('./category/category-entertainment').default;
const IconCategoryFamily = require('./category/category-family').default;
const IconCategoryFarmacy = require('./category/category-farmacy').default;
const IconCategoryFinance = require('./category/category-finance').default;
const IconCategoryFines = require('./category/category-fines').default;
const IconCategoryForgot = require('./category/category-forgot').default;
const IconCategoryGas = require('./category/category-gas').default;
const IconCategoryGasoline = require('./category/category-gasoline').default;
const IconCategoryGibddFines = require('./category/category-gibdd-fines').default;
const IconCategoryGrocery = require('./category/category-grocery').default;
const IconCategoryHealth = require('./category/category-health').default;
const IconCategoryHobby = require('./category/category-hobby').default;
const IconCategoryHoliday = require('./category/category-holiday').default;
const IconCategoryHouse = require('./category/category-house').default;
const IconCategoryInvestments = require('./category/category-investments').default;
const IconCategoryLoans = require('./category/category-loans').default;
const IconCategoryMedia = require('./category/category-media').default;
const IconCategoryMedicine = require('./category/category-medicine').default;
const IconCategoryMobileInternet = require('./category/category-mobile-internet').default;
const IconCategoryMortgage = require('./category/category-mortgage').default;
const IconCategoryOther = require('./category/category-other').default;
const IconCategoryPerson = require('./category/category-person').default;
const IconCategoryPets = require('./category/category-pets').default;
const IconCategoryRegistry = require('./category/category-registry').default;
const IconCategoryRent = require('./category/category-rent').default;
const IconCategoryRepairs = require('./category/category-repairs').default;
const IconCategoryRestaurants = require('./category/category-restaurants').default;
const IconCategorySalary = require('./category/category-salary').default;
const IconCategoryScholarship = require('./category/category-scholarship').default;
const IconCategoryShopping = require('./category/category-shopping').default;
const IconCategoryState = require('./category/category-state').default;
const IconCategoryTaxFines = require('./category/category-tax-fines').default;
const IconCategoryTelecom = require('./category/category-telecom').default;
const IconCategoryTourism = require('./category/category-tourism').default;
const IconCategoryTrafficFine = require('./category/category-traffic-fine').default;
const IconCategoryTransfer = require('./category/category-transfer').default;
const IconCategoryTransport = require('./category/category-transport').default;
const IconCategoryTravel = require('./category/category-travel').default;
const IconCategoryTroika = require('./category/category-troika').default;
const IconCategoryUser = require('./category/category-user').default;
const IconCategoryVacation = require('./category/category-vacation').default;
const IconUtilities = require('./category/utilities').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryAppliances size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryAtm size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryAuto size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryAward size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryBooksMovies size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryBudget size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryBusiness size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryBusinessActivity size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryBusinessTrip size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryCar size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryCash size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryCashback size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryCharity size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryClothing size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryDefault size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryDepts size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryDress size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryDunno size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryEducation size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryEntertainment size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryFamily size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryFarmacy size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryFinance size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryFines size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryForgot size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryGas size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryGasoline size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryGibddFines size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryGrocery size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryHealth size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryHobby size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryHoliday size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryHouse size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryInvestments size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryLoans size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryMedia size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryMedicine size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryMobileInternet size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryMortgage size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryOther size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryPerson size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryPets size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryRegistry size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryRent size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryRepairs size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryRestaurants size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategorySalary size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryScholarship size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryShopping size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryState size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTaxFines size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTelecom size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTourism size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTrafficFine size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTransfer size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTransport size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTravel size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryTroika size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryUser size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCategoryVacation size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconUtilities size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconCurrency = require('./currency/currency').default;
const IconCurrencyChf = require('./currency/currency-chf').default;
const IconCurrencyEur = require('./currency/currency-eur').default;
const IconCurrencyGbp = require('./currency/currency-gbp').default;
const IconCurrencyJpy = require('./currency/currency-jpy').default;
const IconCurrencyRub = require('./currency/currency-rub').default;
const IconCurrencyUsd = require('./currency/currency-usd').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrency size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyChf size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyEur size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyGbp size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyJpy size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyRub size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCurrencyUsd size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconAddressBook = require('./entity/address-book').default;
const IconAlfacheck = require('./entity/alfacheck').default;
const IconAlfadialogue = require('./entity/alfadialogue').default;
const IconAlfamobile = require('./entity/alfamobile').default;
const IconAtm = require('./entity/atm').default;
const IconBag = require('./entity/bag').default;
const IconCalendar = require('./entity/calendar').default;
const IconClock = require('./entity/clock').default;
const IconContactList = require('./entity/contact-list').default;
const IconContactless = require('./entity/contactless').default;
const IconContactlessOff = require('./entity/contactless-off').default;
const IconContactlessOn = require('./entity/contactless-on').default;
const IconDirections = require('./entity/directions').default;
const IconDiscount = require('./entity/discount').default;
const IconDraft = require('./entity/draft').default;
const IconEmoney = require('./entity/emoney').default;
const IconHistory = require('./entity/history').default;
const IconInbox = require('./entity/inbox').default;
const IconInternet = require('./entity/internet').default;
const IconMobile = require('./entity/mobile').default;
const IconMoneybox = require('./entity/moneybox').default;
const IconNews = require('./entity/news').default;
const IconNotifications = require('./entity/notifications').default;
const IconOffice = require('./entity/office').default;
const IconPerson = require('./entity/person').default;
const IconPhoto = require('./entity/photo').default;
const IconPredictions = require('./entity/predictions').default;
const IconPresent = require('./entity/present').default;
const IconQr = require('./entity/qr').default;
const IconRegistry = require('./entity/registry').default;
const IconSecurity = require('./entity/security').default;
const IconSettings = require('./entity/settings').default;
const IconSite = require('./entity/site').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAddressBook size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAlfacheck size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAlfadialogue size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAlfamobile size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAtm size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBag size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCalendar size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconClock size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconContactList size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconContactless size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconContactlessOff size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconContactlessOn size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDirections size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDiscount size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDraft size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconEmoney size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconHistory size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconInbox size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconInternet size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconMobile size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconMoneybox size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNews size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconNotifications size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconOffice size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPerson size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPhoto size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPredictions size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPresent size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconQr size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconRegistry size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSecurity size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSettings size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSite size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconAccount = require('./file/account').default;
const IconAccountEuro = require('./file/account-euro').default;
const IconAccountInfo = require('./file/account-info').default;
const IconAccountMain = require('./file/account-main').default;
const IconAccountRub = require('./file/account-rub').default;
const IconAccountText = require('./file/account-text').default;
const IconAccountUsd = require('./file/account-usd').default;
const IconFormat1c = require('./file/format-1c').default;
const IconFormatAttach = require('./file/format-attach').default;
const IconFormatCsv = require('./file/format-csv').default;
const IconFormatDefault = require('./file/format-default').default;
const IconFormatDoc = require('./file/format-doc').default;
const IconFormatPdf = require('./file/format-pdf').default;
const IconFormatPng = require('./file/format-png').default;
const IconFormatPpt = require('./file/format-ppt').default;
const IconFormatSketch = require('./file/format-sketch').default;
const IconFormatSvg = require('./file/format-svg').default;
const IconFormatTxt = require('./file/format-txt').default;
const IconFormatXls = require('./file/format-xls').default;
const IconFormatXml = require('./file/format-xml').default;
const IconFormatZip = require('./file/format-zip').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccount size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountEuro size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountInfo size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountMain size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountRub size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountText size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconAccountUsd size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormat1c size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatAttach size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatCsv size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatDefault size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatDoc size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatPdf size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatPng size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatPpt size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatSketch size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatSvg size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatTxt size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatXls size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatXml size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFormatZip size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconArrowDown = require('./ui/arrow-down').default;
const IconBackspace = require('./ui/backspace').default;
const IconBuy = require('./ui/buy').default;
const IconCheck = require('./ui/check').default;
const IconCheckBold = require('./ui/check-bold').default;
const IconCheckIndeterminate = require('./ui/check-indeterminate').default;
const IconClose = require('./ui/close').default;
const IconDone = require('./ui/done').default;
const IconDown = require('./ui/down').default;
const IconError = require('./ui/error').default;
const IconExpandDown = require('./ui/expand-down').default;
const IconFail = require('./ui/fail').default;
const IconFavorite = require('./ui/favorite').default;
const IconFavoriteActive = require('./ui/favorite-active').default;
const IconFavourites = require('./ui/favourites').default;
const IconFeature = require('./ui/feature').default;
const IconFeedback = require('./ui/feedback').default;
const IconFeedbackStar = require('./ui/feedback-star').default;
const IconFeedbackStarSelected = require('./ui/feedback-star-selected').default;
const IconGeolocation = require('./ui/geolocation').default;
const IconHelp = require('./ui/help').default;
const IconHelpFilled = require('./ui/help-filled').default;
const IconInfo = require('./ui/info').default;
const IconLeft = require('./ui/left').default;
const IconLocation = require('./ui/location').default;
const IconOk = require('./ui/ok').default;
const IconOkFilled = require('./ui/ok-filled').default;
const IconPlay = require('./ui/play').default;
const IconRight = require('./ui/right').default;
const IconSell = require('./ui/sell').default;
const IconSubmit = require('./ui/submit').default;
const IconSystemBack = require('./ui/system-back').default;
const IconSystemClose = require('./ui/system-close').default;
const IconSystemHelp = require('./ui/system-help').default;
const IconUp = require('./ui/up').default;
const IconVerifying = require('./ui/verifying').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconArrowDown size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBackspace size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconBuy size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCheck size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCheckBold size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconCheckIndeterminate size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconClose size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDone size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconDown size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconError size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconError size='s' colored={ true } /></span>
        <span className='column l'><IconError size='m' colored={ true } /></span>
        <span className='column l'><IconError size='l' colored={ true } /></span>
        <span className='column l'><IconError size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconExpandDown size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFail size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFavorite size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFavoriteActive size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFavourites size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconFavourites size='m' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFeature size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFeedback size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFeedbackStar size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconFeedbackStarSelected size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconFeedbackStarSelected size='m' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconGeolocation size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconHelp size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconHelpFilled size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconInfo size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLeft size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconLocation size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconOk size={ size } />
                </span>
            ))
        }
        <span className='column l'><IconOk size='s' colored={ true } /></span>
        <span className='column l'><IconOk size='m' colored={ true } /></span>
        <span className='column l'><IconOk size='l' colored={ true } /></span>
        <span className='column l'><IconOk size='xl' colored={ true } /></span>
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconOkFilled size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconPlay size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconRight size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSell size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSubmit size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSystemBack size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSystemClose size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconSystemHelp size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconUp size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconVerifying size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
```jsx
const IconManager = require('./user/manager').default;
const IconUser = require('./user/user').default;

<div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconManager size={ size } />
                </span>
            ))
        }
    </div>
    <div className='row'>
        {
            ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
                <span className='column l' key={ size }>
                    <IconUser size={ size } />
                </span>
            ))
        }
    </div>
</div>
```
