Виды плашек:

```jsx
import IconOk from 'arui-feather/icon/ui/ok';
import IconError from 'arui-feather/icon/ui/error';
import IconVerifying from 'arui-feather/icon/ui/verifying';

<div>
    <Plate
        title='Основной'
        hasCloser={ true }
    />
    <Plate
        title='Обычный'
        type='common'
        hasCloser={ true }
        icon={
            <IconVerifying />
        }
    />
    <Plate
        title='Ошибочный'
        type='error'
        hasCloser={ true }
        icon={
            <IconError
                colored={ true }
            />
        }
    />
    <Plate
        title='Успешный'
        type='success'
        hasCloser={ true }
        icon={
            <IconOk
                colored={ true }
            />
        }
    />
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
