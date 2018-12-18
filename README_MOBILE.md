# Документация по использованию `arui-feather` в адаптивной/мобильной среде

## Содержание

* [Медиа запросы](#mq)
* [Автоматическое тестирование](#mobile-testing)

<a name="mq"></a>
## Медиа запросы

### Брейкпойнты

Контрольные точки для медиа запросов задаются в `src/mq/mq.json`.

Для консистентной работы среди всех поддерживаемых браузеров используется единица измерения `em`.

```css
body { font-size: 16px };
```

- `--small`         0 to 100%
- `--small-only`    0 to 767px

- `--medium`        768px to 100%
- `--medium-only`   768px to 1023px

- `--large`         1024px to 100%
- `--large-only`    1024px to 1439px

- `--xlarge`        1440px to 100%
- `--xlarge-only`   1440px to 1919px

- `--xxlarge`       1920px to 100%
- `--xxlarge-only`  1920px to 100%

- `--mobile-s`      375px to 100%
- `--mobile-m`      412px to 100%
- `--mobile`        0 to 599px

- `--tablet-s`      600px to 100%
- `--tablet-m`      768px to 100%
- `--tablet`        600px to 1023px

- `--desktop-s`     1024px to 100%
- `--desktop-m`     1280px to 100%
- `--desktop-l`     1440px to 100%
- `--desktop-xl`    1920px to 100%
- `--desktop`       1024px to 100%

### Пример использования в CSS

```css
@media (--small-only) {
    .app__content {
        width: 100%;
        padding: 0 20px;
    }
}

@media (--medium) {
    .app__content {
        width: 700px;
        margin: 0 auto;
    }
}
```

### Пример использования в JS

При особой необходимости, для рендеринга по условию в шаблонах используйте компонент `Mq`, который основан на `window.matchMedia API`:

```jsx
<Mq
    query='--small-only'
    touch={ true }
    onMatchChange={ (isMatched) => console.log(`Your query is ${isMatched ? '' : 'not'} matched!`) }
>
    Show smth on mobile
</Mq>
```

Компонент `Mq` используется в компонентах `calendar-input` и `select` для рендеринга нативных виджетов на мобильных устройствах.

Важно понимать, что широкое использование этого подхода не рекомендовано, поскольку:

1. `matchMedia()` накладнее для браузера, чем матчинг элемента в CSS;
2. Этот способ работает только на клиенте, и, при использовании SSR, может усилить различие серверной и финальной разметки, и добавить сложности к тестированию.

<a name="mobile-testing"></a>
## Автоматическое тестирование

Временно: Запуск unit-тестов для тестирования в iOS Safari (необходим Xcode) `MOBILE=1 npm run test`.
