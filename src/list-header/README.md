Header используется для разделения ячеек списка по смысловым группам.


Компонент с серой подложкой используется для «бесконечных списков». Например для истории операций или спика писем.

```jsx
<div>
    <ListHeader view="filled" title='Сегодня' />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu eleifend lectus. Aliquam erat volutpat. Proin laoreet sem volutpat scelerisque tincidunt. Sed blandit, mi at congue dapibus, arcu quam viverra risus, a congue purus nunc ac odio. Cras condimentum nec ipsum semper bibendum.</p>

    <ListHeader view="filled" title='22 мая' description='среда' />
    <p>Integer eu quam vitae mi posuere dignissim. Vestibulum ornare, sapien eget mollis viverra, arcu lectus varius erat, vel lacinia odio lorem cursus arcu. Pellentesque arcu orci, iaculis et urna et, rutrum iaculis lacus. Phasellus mollis varius purus, sed viverra augue viverra vel. Praesent consequat enim id leo hendrerit lacinia.</p>

    <ListHeader view="filled" title='27 мая 2017' description='среда' />
    <p>Nulla ullamcorper erat a nisi lobortis, in vulputate urna consequat. Morbi et nisl ut dui placerat egestas eget vitae dui. Sed in dolor eu justo aliquet ultrices in id quam. In ornare sed est sed tincidunt. Nam mollis, sapien a tincidunt sagittis, massa enim tincidunt diam, sit amet vestibulum enim sapien id diam. Cras urna nisi, cursus semper magna ut, rhoncus feugiat justo.</p>
</div>
```

Компонент без подложки используется для «фиксированных списков».

```jsx
<div>
    <ListHeader title='Сегодня' />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu eleifend lectus. Aliquam erat volutpat. Proin laoreet sem volutpat scelerisque tincidunt. Sed blandit, mi at congue dapibus, arcu quam viverra risus, a congue purus nunc ac odio. Cras condimentum nec ipsum semper bibendum.</p>

    <ListHeader title='22 мая' description='среда' />
    <p>Integer eu quam vitae mi posuere dignissim. Vestibulum ornare, sapien eget mollis viverra, arcu lectus varius erat, vel lacinia odio lorem cursus arcu. Pellentesque arcu orci, iaculis et urna et, rutrum iaculis lacus. Phasellus mollis varius purus, sed viverra augue viverra vel. Praesent consequat enim id leo hendrerit lacinia.</p>

    <ListHeader title='27 мая 2017' description='среда' />
    <p>Nulla ullamcorper erat a nisi lobortis, in vulputate urna consequat. Morbi et nisl ut dui placerat egestas eget vitae dui. Sed in dolor eu justo aliquet ultrices in id quam. In ornare sed est sed tincidunt. Nam mollis, sapien a tincidunt sagittis, massa enim tincidunt diam, sit amet vestibulum enim sapien id diam. Cras urna nisi, cursus semper magna ut, rhoncus feugiat justo.</p>
</div>
```


===RULES===

- Дата и день недели отображаются с третьего дня.
- Текущий год в компоненте не отображается. Если часть списка относится к предыдущим годам — год отображается во всех ячейках относящихся с предыдущему году.
