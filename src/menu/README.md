```
const MENU_1 = [
    {
        type: 'item',
        content: 'MenuItem 1',
        value: 'value1',
        props: {
            url: '#1'
        }
    },
    {
        type: 'item',
        content: 'MenuItem 2',
        value: 'value2',
        props: {
            url: '#2'
        }
    },
    {
        type: 'item',
        content: 'MenuItem 3',
        value: 'value3',
        props: {
            url: '#3',
            disabled: true
        }
    }
];

const MENU_2 = [
    {
        type: 'item',
        content: 'MenuItem 1',
        value: '1',
        props: {
            url: '#1'
        }
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                type: 'item',
                content: 'MenuItem 2',
                value: '2',
                props: {
                    url: '#2'
                }
            },
            {
                type: 'item',
                content: 'MenuItem 3',
                value: '3',
                props: {
                    url: '#3'
                }
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                type: 'item',
                content: 'MenuItem 4',
                value: '4',
                props: {
                    url: '#4'
                }
            },
            {
                type: 'item',
                content: 'MenuItem 5',
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
                {`Горизонтальное меню с множественным выбором (mode='check')`}
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
                {`Вертикальное меню с множественным выбором (mode='check')`}
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
                {`Горизонтальное меню с одиночным обязательным выбором (mode='radio')`}
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
                {`Вертикальное меню с одиночным обязательным выбором (mode='radio')`}
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
                {`Горизонтальное меню с одиночным необязательным выбором (mode='radio-check')`}
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
                {`Вертикальное меню с одиночным необязательным выбором (mode='radio-check')`}
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
