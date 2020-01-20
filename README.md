<img align="left" width="140" height="140" title="arui-feather"
     src="https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg" />

# Alfa-Bank UI Library

[![npm][npm-img]][npm]
[![license][license-img]][license]
[![travis][travis-img]][travis]
[![appveyor][appveyor-img]][appveyor]
<br />
[![coveralls][coveralls-img]][coveralls]

[appveyor]: https://ci.appveyor.com/project/teryaew/arui-feather
[appveyor-img]: https://img.shields.io/appveyor/ci/teryaew/arui-feather/master.svg?label=win
[coveralls]: https://coveralls.io/github/alfa-laboratory/arui-feather?branch=master
[coveralls-img]: https://coveralls.io/repos/github/alfa-laboratory/arui-feather/badge.svg?branch=master
[license]: https://opensource.org/licenses/MPL-2.0
[license-img]: https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg
[npm]: https://www.npmjs.org/package/arui-feather
[npm-img]: https://img.shields.io/npm/v/arui-feather.svg
[travis]: https://travis-ci.org/alfa-laboratory/arui-feather?branch=master
[travis-img]: https://img.shields.io/travis/alfa-laboratory/arui-feather/master.svg?label=unix

<br />

arui-feather — это библиотека React компонентов для создания веб-интерфейсов.

Вы можете посмотреть примеры использования на нашем [сайте с документацией](https://alfa-laboratory.github.io/arui-feather/styleguide/).

## Ждём тебя в команду

Команда дизайн-системы Альфа-Банка ищет разработчика интерфейсов: https://hr.alfabank.ru/vacancies/ui-dev. Присоединяйся!

## Установка

arui-feather доступен как [npm-пакет](https://www.npmjs.com/package/arui-feather).

```sh
npm install arui-feather --save
```

## Поддерживаемые браузеры

**Desktop**

- Chrome _(две последние стабильные версии)_
- Edge _(две последние стабильные версии)_
- Firefox _(две последние стабильные версии)_
- IE 10+
- Opera _(две последние стабильные версии)_
- Safari _(две последние стабильные версии)_
- Yandex _(две последние стабильные версии)_

**Mobile**

- Android 4.1+
- iOS _(две последние стабильные версии)_

## Вёрстка

[Использование в адаптивной/мобильной среде](./GUIDE.md)

## Цветовая схема

[Использование цветовой схемы](./COLORS.md)

## Разработка

Необходимые внешние зависимости системы:

[`node`](https://nodejs.org/en/) 8 и `npm`

Шаги запуска демо:

1. `npm i`
2. `npm run demo`

Запустить demo на произвольном порту:

`PORT=8888 npm run demo`

Использовать только для обновления нескольких компонентов. Иначе не хватает памяти.

## Автоматические проверки кода

Перед каждым коммитом js код проверяется через `eslint`, css через `stylelint`.

Запуск unit-тестов `npm run test`.

Запуск unit-тестов для определенных компонентов `TESTS=amount,calendar npm run test`.

Запуск unit-тестов используя Chrome `npm run test -- --browser=Chrome`

Запуск линтера для css `npm run lint-css`.

Запуск линтера для js `npm run lint-js`.

[Запуск тестов на мобильных устройствах](./GUIDE.md#mobile-testing)

## Регрессионное тестирование

Для тестирования деградаций в вёрстке используется [`gemini`](https://github.com/gemini-testing/gemini).

Тесты для каждого компонента хранятся в `gemini/<component>.gemini.js`.

Запуск тестов производится командой `npm run gemini`.

Обновление или создание новых эталонных скриншотов: `npm run gemini-update`.

Для запуска тестов или обновления скриншотов необходимы следующие шаги:

- `export SAUCE_USERNAME=alfalab.js SAUCE_ACCESS_KEY={ ключ взять у мейнтейнеров }`
- `npm run sauce-connect`
- `npm run gemini` или `npm run gemini-update`

Запуск `gemini` на выборочное число тестов (используется опция [`--grep`](https://gemini-testing.github.io/doc/config.html)): `npm run gemini -- --grep="button|select"`.

Во время тестирования рендер каждого сьюта доступен по URL, например: `http://localhost:8668/popup/popup_theme_alfa-on-color.popup_size_m.popup_prop-set_1`

## Минификация svg

Для оптимизация svg используется [svgo](https://github.com/svg/svgo).

```sh
npm install svgo -g
find src -name *.svg -print0 | xargs -0 -L 1 svgo
```

## Правила контрибуции

[Подробнее о том, как контрибьютить в проект](./.github/CONTRIBUTING.md)

## Публикация

Для выпуска новой версии используйте следущие команды:

- Выпуск патч-версии 1.0.0 -> 1.0.1 `npm run release-patch`
- Выпуск минорной версии 1.0.0 -> 1.1.0 `npm run release-minor`
- Выпуск мажорной версии 1.0.0 -> 2.0.0 `npm run release-major`

Запуск этих команд автоматически сформирует changelog, сделает новый git tag,
запустит сборку и публикацию.

## Deprecation policy

Deprecation публичного API должно происходить плавно, позволяя пользователям библиотеки
обновляться с наименьшими неудобствами. Deprecation происходит со следующим сценарием:

1. Обновление документации для уведомления пользователей.
2. Выпуск минорного релиза с deprecations.
3. Дополнительное оповещение о deprecation в Slack-канал библиотеки.

До полного удаления устаревшей функциональности в мажорном релизе, должна быть выпущена как минимум
одна минорная версия для уведомления пользователей об изменениях.

## Лицензия

© 2016-2019 Alfa-Bank. Код лицензирован [Mozilla Public License 2.0](LICENSE.txt).
