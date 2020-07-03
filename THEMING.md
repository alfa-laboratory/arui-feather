# Документация по хоку withTheme

Под капотом используется хок из [bem-react-cassname](https://github.com/alfa-laboratory/bem-react-classname/blob/master/src/create-theme.tsx)

Пример использования withTheme

```js
class Component extends React.Component { }

export default withTheme(Component);
```

Если нужно использовать как тип, то необходимо передать в хок
тип пропсов компонента и сам тип компонента. Далее использовать тип использовать 
как `typeof Component`

```js
class Component extends React.Component {
    public someMethod() {}
}

const ThemedComponent = withTheme<ComponentProps, Component>(Component);

class OtherComponent extends React.Component {
    component: React.createRef<typeof ThemedComponent>(); // component.current.someMethod() is available
}
```
