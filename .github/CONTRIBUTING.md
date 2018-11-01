# Как сделать ARUI Feather лучше?

`ARUI Feather` — это единая библиотека визуальных компонентов Альфа Банка.

# Принципы разработки

Следующие базовые принципы разработки лежат в основе кода `ARUI Feather`.

1. [KISS](https://ru.wikipedia.org/wiki/KISS_%28%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%29)
2. [YAGNI](https://ru.wikipedia.org/wiki/YAGNI)
3. [DRY](https://ru.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself)

Максимально простой код с низком порогом входа.

# Документация

Все публичные интерфейсы библиотеки покрыты документацией.
Старайтесь придерживаться этой доброй традиции при добавлении/изменение публичных фичей.

## Документирование `React` компонентов

Всегда описывайте предназначение компонента в формате [JSDoc](http://usejsdoc.org/).

```
// Good

/**
 * Компонент текстового поля ввода.
 */
class Input extends React.Component {
   ...
}
```

```
// Bad

class Input extends React.Component {
   ...
}
```

## Документирование атрибутов `React` компонентов

Используйте для документирования формат [React.propTypes](https://facebook.github.io/react/docs/reusable-components.html) совместно с комментарием в [JSDoc](http://usejsdoc.org/).

```
// Good

class Input extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };
}
```

```
// Bad

class Input extends React.Component {
    static propTypes = {
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };
}
```

Используйте `defaultProps` для задания значений по умолчанию.

```
// Good

class Input extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };

    static defaultProps = {
        size: 'm'
    };

    render() {
        return <div className={ this.props.size } />
    }
}
```

```
// Bad

class Input extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };

    render() {
        return <div className={ this.props.size || 'm' } />
    }
}
```

Используйте неглагольные фразы для описания атрибутов.

```
// Good

class Input extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };
}
```

```
// Bad

class Input extends React.Component {
    static propTypes = {
        /** Определяет размер компонента */
        size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl'])
    };
}
```

## Документирование функций/методов

По умолчанию все методы `React` компонентов `@private`.
Используйте тег `@public` для того, чтобы объявить публичный интерфейс.

```
// Good

class Input extends React.Component {
    /**
     * Ставит фокус на поле ввода.
     *
     * @public
     */
    focus() {
        ...
    }
}
```

```
// Bad

class Input extends React.Component {
    /**
     * Ставит фокус на поле ввода.
     */
    focus() {
        ...
    }
}
```

При написании документации к функции/методу начинайте предложение с глагола в третьем лице.

```
// Good

/**
 * Ставит фокус на поле ввода.
 */
function focus() {
    ...
}
```

```
// Bad

/**
 * Устанавливаем фокус на поле ввода.
 */
function focus() {
    ...
}
```

Всегда описывайте ввод/вывод функции/метода.

```
// Good

/**
 * Устанавливает опорный элемент.
 * Возвращает предыдущий опорный элемент.
 *
 * @param {HTMLElement} target Новый опорный элемент.
 * @returns {HTMLElement}
 */
function setTarget(target) {
    ...
    return oldTarget;
}
```

```
// Bad

/**
 * Устанавливает опорный элемент.
 */
function setTarget(target) {
    ...
    return oldTarget;
}
```

# Tests

Все публичные интерфейсы библиотеки покрыты unit тестами.
Тесты в библиотеке пишутся с условием наличия настоящего DOM.

## Что нужно покрыть тестами в компоненте?

1. Поведение внешних атрибутов, заданных через [React.propTypes](https://facebook.github.io/react/docs/reusable-components.html).
2. Поведение внешних публичных методов, размеченных как `@public`.
3. Поведение внешних обработчиков, заданных через [React.propTypes](https://facebook.github.io/react/docs/reusable-components.html)

### Unit тестирование внешних атрибутов

Убедитесь, что внешние атрибуты корректно аффектят на генерацию DOM компонента.
Для этого стоит использовать [chai-dom](https://github.com/nathanboktae/chai-dom).

### Unit тестирование публичных методов

Вызов внешних методов, как правило, приводит к изменению DOM компонента и/или вызову внешнего обработчика.
Для этого стоит использовать [chai-dom](https://github.com/nathanboktae/chai-dom) и [chai-spies](http://chaijs.com/plugins/chai-spies/).

### Unit тестирование внешних обработчиков

Для этого стоит использовать [chai-spies](http://chaijs.com/plugins/chai-spies/).
Также стоит протестировать, что во внешних обработчиках приходят корректные аргументы.

# Commits

## Commit messages

Для commit messages используйте [формат Angular](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
В теме сообщения указывайте глагол в настоящем времени, который информирует об изменениях.
Для валидации commit messages на соответствующем git hook используется `validate-commit-message`.

## Commit best-practices

На основе коммитов в ветке `master` генерируется [CHANGELOG.md](./CHANGELOG.md).

Поэтому в мастер попадают коммиты только с информативными commit messages.

После окончания работы над задачей и перед вливанием коммитов в ветку `master`
сосквошьте ваш набор коммитов в один. Это можно сделать, например, так:

1. `git fetch && git rebase -i origin/master`
2. Пометьте коммиты, который вы хотите слить буквой `s`.
3. Укажите commit message: `feat(input): my new feature for input`.

```
// Good

feat(input): add new feature for input
```

```
// Bad

feat(input) rename some vars
fix(PR): fix some PR issues
wip
```

# Условия принятия вашего кода

Pull Request (PR) может попасть в `master` ветку при соблюдении всех условий:

1. Если PR реализует новый публичный функционал, то на него написана документация.
2. Код в PR соблюдает правила оформления для `js` и `css` кода.
3. Если PR добавляет новые фичи, то на них написаны тесты.
4. Если PR изменяет существующее публичное API, то должна соблюдаться [Deprecation Policy](./DEPRECATION_POLICY.md).
5. У PR корректный commit message.
6. Два ментора поставили лайк вашему PR.
7. PR успешно собрался на CI.
8. PR актуален с текущей веткой `master`.

Далее контрибьютор мержит PR в `master` самостоятельно.

# Менторы

Самый простой способ найти менторов, которые проведут review вашего кода -
это посмотреть `git blame` по тем компонентам, которые вы правите.

Просто добавьте менторов лучше всего знакомых с кодом компонента,
который вы правите в вашем Code Review.

Если вы добавляете новый компонент, то можете добавить на Code Review
менторов лучше всего знакомых с кодом библиотеки.
Список менторов можно найти в [package.json](./package.json).

# Спасибо за ваш вклад в развитие `ARUI Feather`!
