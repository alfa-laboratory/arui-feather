```jsx
import Heading from 'arui-feather/heading';

const MENU_1 = [
    {
        type: 'item',
        content: 'Тарифы',
        value: 'value1',
        props: {
            url: '#1',
            view: 'underlined'
        }
    },
    {
        type: 'item',
        content: 'Депозиты',
        value: 'value2',
        props: {
            url: '#2',
            view: 'underlined'
        }
    },
    {
        type: 'item',
        content: 'Овердрафты',
        value: 'value3',
        props: {
            url: '#3',
            disabled: true,
            view: 'underlined'
        }
    }
];

const MENU_2 = [
    {
        type: 'item',
        content: 'Компании',
        value: '1',
        props: {
            url: '#1'
        }
    },
    {
        type: 'group',
        title: 'Платежи и переводы',
        content: [
            {
                type: 'item',
                content: 'Новый платёж',
                value: '2',
                props: {
                    url: '#2'
                }
            },
            {
                type: 'item',
                content: 'Платежи в работе',
                value: '3',
                props: {
                    url: '#3'
                }
            }
        ]
    },
    {
        type: 'group',
        title: 'Текущая деятельность',
        content: [
            {
                type: 'item',
                content: 'Счета и депозиты',
                value: '4',
                props: {
                    url: '#4'
                }
            },
            {
                type: 'item',
                content: 'Депозиты',
                value: '5',
                props: {
                    url: '#5',
                    type: 'dropdown',
                    popup: 'Popup Menu'
                }
            }
        ]
    }
];

const MENU_3 = [
    {
        type: 'group',
        title: ' ',
        content: [
            {
                type: 'item',
                content: 'Москва',
                value: 'moscow'
            },
            {
                type: 'item',
                content: 'Санкт-Петербург',
                value: 'peterburg'
            }
        ]
    },
    {
        type: 'group',
        title: 'А',
        content: [
            {
                type: 'item',
                content: 'Абакан',
                value: 'abakan'
            },
            {
                type: 'item',
                content: 'Альметьевск',
                value: 'almetyevsk'
            },
            {
                type: 'item',
                content: 'Ангарск',
                value: 'angarsk'
            }
        ]
    },
    {
        type: 'group',
        title: 'Б',
        content: [
            {
                type: 'item',
                content: 'Балашиха',
                value: 'balashiha'
            },
            {
                type: 'item',
                content: 'Барнаул',
                value: 'barnaul'
            },
            {
                type: 'item',
                content: 'Белгород',
                value: 'belgorod'
            }
        ]
    }
];

<div>
    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Базовое горизонтальное меню
            </Heading>
            <Menu
                view='horizontal'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Базовое вертикальное меню
            </Heading>
            <Menu
                content={ MENU_2 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Вертикальное меню с короткими заголовками групп
            </Heading>
            <Menu
                groupView='line'
                content={ MENU_3 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Горизонтальное меню с множественным выбором mode check
            </Heading>
            <Menu
                mode='check'
                view='horizontal'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Вертикальное меню с множественным выбором mode check
            </Heading>
            <Menu
                mode='check'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Горизонтальное меню с одиночным обязательным выбором mode radio
            </Heading>
            <Menu
                mode='radio'
                view='horizontal'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Вертикальное меню с одиночным обязательным выбором mode radio
            </Heading>
            <Menu
                mode='radio'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Горизонтальное меню с одиночным необязательным выбором mode radio-check
            </Heading>
            <Menu
                mode='radio-check'
                view='horizontal'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Вертикальное меню с одиночным необязательным выбором mode radio-check
            </Heading>
            <Menu
                mode='radio-check'
                content={ MENU_1 }
            />
        </div>
    </div>

    <div className='row'>
        <div className='column'>
            <Heading size='s'>
                Неактивное меню
            </Heading>
            <Menu
                mode='check'
                view='horizontal'
                disabled={ true }
                checkedItems={ ['value1', 'value3'] }
                content={ MENU_1 }
            />
        </div>
    </div>
</div>
```
