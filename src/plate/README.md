Виды плашек:

```jsx
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

<div>
    <Plate title={ 'Основной' } hasCloser={ true } />
    <Plate title={ 'Обычный' } type={ 'common' } hasCloser={ true } />
    <Plate title={ 'Ошибочный' } type={ 'error' } hasCloser={ true } />
    <Plate title={ 'Успешный' } type={ 'success' } hasCloser={ true } />
</div>
```

Интерактивная плашка

```jsx
import Heading from 'arui-feather/heading';
import Paragraph from 'arui-feather/paragraph';

<Plate
    hasShrink={ true }
    title={ 'Альфа-Мобайл 9.0' }

>
    <Paragraph>
        Новый, превосходный, невероятный, беспрецедентный, большой, внушительный, четкий, безотказный, волшебный, понятный. +40 новых возможностей твоего мобайла!
    </Paragraph>
</Plate>
```
