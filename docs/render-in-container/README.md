# RenderInContainer

Компонент, позволяющий визуализировать другие компоненты в произвольном контейнере.

```javascript
import RenderInContainer from 'arui-feather/render-in-container';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Array.<Node>\|Node |  |  | Дочерние элементы контейнера |
| className | Function\|String |  |  | Дополнительный класс |
| container | HtmlElement |  |  | Контейнер, в котором будет визуализирован компонент |
| onRender | Function |  |  | Callback на рендер компонента |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает HTMLElement враппера компонента. |
| getContainer(): HTMLElement | Возвращает HTMLElement контейнера, в который отрендерился компонент. |









