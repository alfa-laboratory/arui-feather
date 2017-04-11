# RenderInContainer

Компонент, позволяющий визуализировать другие компоненты в произвольном контейнере.

```javascript
import RenderInContainer from 'arui-feather/render-in-container';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы контейнера |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| container | HtmlElement |  |  | Контейнер, в котором будет визуализирован компонент |
| onRender | Type.func |  |  | Callback на рендер компонента |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает HTMLElement враппера компонента. |
| getContainer(): HTMLElement | Возвращает HTMLElement контейнера, в который отрендерился компонент. |









