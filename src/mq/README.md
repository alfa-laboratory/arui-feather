Названия для @media в px

| Название     | Значение                                   |
| ------------ | ------------------------------------------ |
| --mobile-s   | min-width: 320px                           |
| --mobile-m   | min-width: 375px                           |
| --mobile-l   | min-width: 412px                           |
| --mobile     | **max**-width: 599px                       |
| --tablet-s   | min-width: 600px                           |
| --tablet-m   | min-width: 768px                           |
| --tablet     | min-width: 600px and **max**-width: 1023px |
| --desktop-s  | min-width: 1024px                          |
| --desktop-m  | min-width: 1280px                          |
| --desktop-l  | min-width: 1440px                          |
| --desktop-xl | min-width: 1920px                          |
| --desktop    | min-width: 1024px                          |

Пример использования:
```css
@media (--mobile-s), (--mobile-m) {
    ...
}
```
