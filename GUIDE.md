# Документация по использованию `arui-feather` в адаптивной/мобильной среде

## Содержание

- [Система отступов](#gap)
- [Медиа запросы](#mq)
- [Автоматическое тестирование](#mobile-testing)

## Система отступов

<a name="gap"></a>

### Определение

Система отступов используется для того, чтобы задать расстояние между элементами.
Переменные отступа не используются для задания размеров или позиционирования на странице.

### Значения отступов

Переменные хранятся в файле [vars.css](src/vars.css)

| Название    | Значение |
| ----------- | -------- |
| `--gap-2xs` | 4px      |
| `--gap-xs`  | 8px      |
| `--gap-s`   | 12px     |
| `--gap-m`   | 16px     |
| `--gap-l`   | 20px     |
| `--gap-xl`  | 24px     |
| `--gap-2xl` | 32px     |
| `--gap-3xl` | 40px     |
| `--gap-4xl` | 48px     |
| `--gap-5xl` | 72px     |

### Пример использования в CSS

```css
@import 'arui-feather/vars.css';

.array-item {
    margin-bottom: var(--gap-xs);
}

.description {
    margin: var(--gap-l) 0;
}
```

### Пример **неправильного** использования
```css
.icon {
    width: var(--gap-m);
}
```

## Медиа запросы

<a name="mq"></a>

### Брейкпойнты

Контрольные точки для медиа запросов задаются в [mq.json](src/mq/mq.json).

Для консистентной работы среди всех поддерживаемых браузеров используется единица измерения `em`.

```css
body {
  font-size: 16px;
}
```

| Название         | Значение         | Deprecation |
| ---------------- | ---------------- | ----------- |
| `--mobile-s`     | 320px to 100%    |             |
| `--mobile-m`     | 375px to 100%    |             |
| `--mobile-l`     | 412px to 100%    |             |
| `--mobile`       | 0 to 599px       |             |
| `--tablet-s`     | 600px to 100%    |             |
| `--tablet-m`     | 768px to 100%    |             |
| `--tablet`       | 600px to 1023px  |             |
| `--desktop-s`    | 1024px to 100%   |             |
| `--desktop-m`    | 1280px to 100%   |             |
| `--desktop-l`    | 1440px to 100%   |             |
| `--desktop-xl`   | 1920px to 100%   |             |
| `--desktop`      | 1024px to 100%   |             |
| `--small`        | 0 to 100%        | Deprecated  |
| `--small-only`   | 0 to 767px       | Deprecated  |
| `--medium`       | 768px to 100%    | Deprecated  |
| `--medium-only`  | 768px to 1023px  | Deprecated  |
| `--large`        | 1024px to 100%   | Deprecated  |
| `--large-only`   | 1024px to 1439px | Deprecated  |
| `--xlarge`       | 1440px to 100%   | Deprecated  |
| `--xlarge-only`  | 1440px to 1919px | Deprecated  |
| `--xxlarge`      | 1920px to 100%   | Deprecated  |
| `--xxlarge-only` | 1920px to 100%   | Deprecated  |

### Пример использования в CSS

```css
@media (--mobile) {
  .app__content {
    width: 100%;
    padding: 0 var(--gap-l);
  }
}

@media (--tablet) {
  .app__content {
    width: 700px;
    margin: 0 auto;
  }
}

@media (--mobile), (--tablet) {
  .button {
    width: 100%;
  }
}
```

### Пример использования в JS

При особой необходимости, для рендеринга по условию в шаблонах используйте компонент `Mq`, который основан на `window.matchMedia API`:

```jsx
import Mq from 'arui-feather/mq';

const MyComponent = () => (
  <Mq
    query='--mobile'
    touch={true}
    onMatchChange={isMatched =>
      console.log(`Your query is ${isMatched ? '' : 'not'} matched!`)
    }
  >
    Show smth on mobile
  </Mq>
);
```

Также можно использовать Mq декоратор:

```jsx
import mqDecorator from 'arui-feather/mq/decorator';

@mqDecorator('--mobile', 'isMobile')
class MyComponent extends React.Component {
  render() {
    return <div>Is mobile: {this.props.isMobile} </div>;
  }
}
```

Компонент `Mq` используется в компонентах `calendar-input` и `select` для рендеринга нативных виджетов на мобильных устройствах.

Важно понимать, что широкое использование этого подхода не рекомендовано, поскольку:

1. `matchMedia()` накладнее для браузера, чем матчинг элемента в CSS;
2. Этот способ работает только на клиенте, и, при использовании SSR, может усилить различие серверной и финальной разметки, и добавить сложности к тестированию.

<a name="mobile-testing"></a>

## Автоматическое тестирование

Временно: Запуск unit-тестов для тестирования в iOS Safari (необходим Xcode) `MOBILE=1 npm run test`.
