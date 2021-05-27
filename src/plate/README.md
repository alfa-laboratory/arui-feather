Виды плашек:

```jsx
import { OkSColorIcon, ErrorSColorIcon, CategoryCashMColorIcon } from '@alfalab/icons-classic';

<div>
    <div style={ { margin: '20px' } }>
        <Plate
            title='Основной'
            hasCloser={ true }
        >
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
            <Button>default</Button>
        </Plate>
    </div>
    <div style={ { margin: '20px' } }>
        <Plate
            title='Обычный'
            type='common'
            hasCloser={ true }
            icon={ <CategoryCashMColorIcon /> }
        >
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
            <Button>default</Button>
            <Button view='extra'>special</Button>
            <Button pseudo={ true }>pseudo</Button>
        </Plate>
    </div>
    <div style={ { margin: '20px' } }>
        <Plate
            title='Ошибочный'
            type='error'
            hasCloser={ true }
            icon={ <ErrorSColorIcon /> }
            style={ {
                padding: '20px'
            } }
        />
    </div>
    <div style={ { margin: '20px' } }>
        <Plate
            title='Успешный'
            type='success'
            hasCloser={ true }
            icon={ <OkSColorIcon /> }
            style={ {
                padding: '20px'
            } }
        />
    </div>
</div>
```

Интерактивная плашка

```jsx
import Paragraph from 'arui-feather/paragraph';

<Plate
    foldable={ true }
    title='Альфа-Мобайл 9.0'
>
    <Paragraph>
        Новый, превосходный, невероятный, беспрецедентный, большой, внушительный, четкий, безотказный, волшебный, понятный. +40 новых возможностей твоего мобайла!
    </Paragraph>
</Plate>
```
