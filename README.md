<img align="left" width="140" height="140" title="arui-feather"
     src="https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg" />

Alfa Bank UI lightweight library
================================

[![NPM version][npm-img]][npm] [![Travis Build Status][travis-img]][travis] [![AppVeyor Build Status][appveyor-img]][appveyor]

[appveyor-img]: https://img.shields.io/appveyor/ci/teryaew/arui-feather/master.svg?label=win
[npm-img]:      https://img.shields.io/npm/v/arui-feather.svg
[travis-img]:   https://img.shields.io/travis/alfa-laboratory/arui-feather/master.svg?label=unix
[appveyor]:     https://ci.appveyor.com/project/teryaew/arui-feather
[npm]:          https://www.npmjs.org/package/arui-feather
[travis]:       https://travis-ci.org/alfa-laboratory/arui-feather?branch=master

<br />

Как запустить?
--------------

Необходимые внешние зависимости системы:

`node` 5+ и `npm` (https://nodejs.org/en/).

Шаги запуска демо:

1. `npm i`
2. `npm run demo`

Запустить demo на произвольном порту:

`PORT=8888 npm run demo`

Запустить demo для отдельных компонентов:

`COMPONENTS="calendar-input, popup" npm run demo`

Запустить demo с автоматичесим обновлением содержимого страницы при изменении компонента:

`COMPONENTS="calendar-input, popup" HOT_LOADER=1 npm run demo `

Использовать только для обновления нескольких компонентов. Иначе не хватает памяти.

Автоматические проверки кода
----------------------------

Перед каждым коммитом js код проверяется через `eslint`, css через `stylelint`.

Ручной запуск проверки кода линтерами и юнит тестами `npm run quality-check`.

Запуск unit-тестов `npm run test`.

Запуск unit-тестов для определенных компонентов `TESTS=amount,calendar npm run test`.

Запуск unit-тестов используя Chrome `npm run test -- --browsers=Chrome`

Запуск линтера для css `npm run lint-css`.

Запуск линтера для js `npm run lint-js`.

[Запуск тестов на мобильных устройствах](./README_MOBILE.md#mobile-testing).

Регрессионное тестирование
--------------------------

Для тестирования деградаций в вёрстке используется [`gemini`](https://github.com/gemini-testing/gemini).

Тесты для каждого компонента хранятся в `gemini/<component>.gemini.js`.

Запуск тестов производится командой `npm run gemini`.

В схеме тестирования участвует сервис [`Sauce Labs`](https://saucelabs.com), для доступа к нему необходимо указать переменные окружения: `SAUCE_USERNAME=alfalab.js SAUCE_ACCESS_KEY={ ключ взять у мейнтейнеров }`.

Обновление или создание новых эталонных скриншотов: `npm run gemini-update`.

Запуск `gemini` на выборочное число сьютов (используется опция `--grep` c JS RegExp): `SUITES='button|select' npm run gemini`.

Во время тестирования рендер каждого сьюта доступен по URL, например: `http://localhost:8888/popup/popup_theme_alfa-on-color.popup_size_m.popup_prop-set_1`

Минификация svg
---------------

Для оптимизация svg используется [svgo](https://github.com/svg/svgo)
```
npm install svgo -g
find src -name *.svg -print0 | xargs -0 -L 1 svgo
```

Документация по компонентам
---------------------------

Документация генерируется на основе кода библиотеки и комментариев в формате jsdoc.

Перед каждым коммитом документация автоматически перегенирируется.

[Референс по всем блокам](./docs)

Ручной запуск перегенерации документации: `npm run docs`.

Правила контрибуции
-------------------

[Подробнее о том, как контрибьютить в проект](./CONTRIBUTION.md)

Оптимизация производительности компонентов
-------------------------------------------
Для оптимизации производительности компонентов используется метод
[shouldComponentUpdate](https://facebook.github.io/react/docs/advanced-performance.html#avoiding-reconciling-the-dom),
реализуемый декоратором [@performance](./src/performance.js).

Пример использования:
```
import performance from '../performance';

@performance(true)
class Component extends React.Component {}
```

Использование Modernizr
-----------------------
Поскольку modernizr на данный момент не умеет правильно работать внутри webpack
используется скрипт для генерации webpack на основе конфигурации для него.

Настройки modernizr находятся в файле `.modernizrrc`. [Список доступных опций](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)

Автоматическая перегенерация `modernizr.js` не предусмотрена, в случае если вы поменяли его настройки - вам нужно
будет перегенерировать файл.

Для ручного обновления собранного `Modernizr`:

```
npm run modernizr
```

Поддерживаемые браузеры
-----------------------

**Desktop**

  * Chrome *(две последние стабильные версии)*
  * Edge *(две последние стабильные версии)*
  * Firefox *(две последние стабильные версии)*
  * IE 10+
  * Opera *(две последние стабильные версии)*
  * Safari *(две последние стабильные версии)*
  * Yandex *(две последние стабильные версии)*

**Mobile**

  * Android 4.1+
  * iOS *(две последние стабильные версии)*

Мобильная вёрстка
-----------------
[Использование в адаптивной/мобильной среде](./README_MOBILE.md)

Лицензия
--------

© 2017 Alfa Laboratory. Код лицензирован [Mozilla Public License 2.0](LICENSE.txt).
