# Документация по использованию цветовой схемы `arui-feather`

Пример использования цветов в CSS

```css
@import "arui-feather/vars.css";

.info {
  font-size: var(--font-size-s);
  color: var(--color-dark-indigo-50);
}
```

Список цветов:

| Название                     | RGBA                |
| ---------------------------- | ------------------- |
| --color-dark-indigo          | 11, 31, 53, 1       |
| --color-dark-indigo-95       | 11, 31, 53, 0.95    |
| --color-dark-indigo-90       | 11, 31, 53, 0.9     |
| --color-dark-indigo-80       | 11, 31, 53, 0.8     |
| --color-dark-indigo-70       | 11, 31, 53, 0.7     |
| --color-dark-indigo-60       | 11, 31, 53, 0.6     |
| --color-dark-indigo-50       | 11, 31, 53, 0.5     |
| --color-dark-indigo-40       | 11, 31, 53, 0.4     |
| --color-dark-indigo-30       | 11, 31, 53, 0.3     |
| --color-dark-indigo-25       | 11, 31, 53, 0.25    |
| --color-dark-indigo-20       | 11, 31, 53, 0.2     |
| --color-dark-indigo-15       | 11, 31, 53, 0.15    |
| --color-dark-indigo-10       | 11, 31, 53, 0.1     |
| --color-dark-indigo-05       | 11, 31, 53, 0.05    |
| --color-dark-indigo-95-flat  | 23, 42, 63, 1       |
| --color-dark-indigo-90-flat  | 35, 53, 73, 1       |
| --color-dark-indigo-80-flat  | 60, 76, 93, 1       |
| --color-dark-indigo-70-flat  | 84, 98, 113, 1      |
| --color-dark-indigo-60-flat  | 109, 121, 134, 1    |
| --color-dark-indigo-50-flat  | 133, 143, 154, 1    |
| --color-dark-indigo-40-flat  | 157, 165, 174, 1    |
| --color-dark-indigo-30-flat  | 181, 187, 194, 1    |
| --color-dark-indigo-25-flat  | 194, 199, 204, 1    |
| --color-dark-indigo-20-flat  | 206, 210, 215, 1    |
| --color-dark-indigo-15-flat  | 219, 222, 225, 1    |
| --color-dark-indigo-10-flat  | 230, 232, 234, 1    |
| --color-dark-indigo-05-flat  | 243, 244, 245, 1    |
| --color-dark-indigo-deep     | 8, 24, 42, 1        |
| --color-red-brand            | 240, 50, 38, 1      |
| --color-red-brand-90         | 240, 50, 38, 0.9    |
| --color-red-brand-70         | 240, 50, 38, 0.7    |
| --color-red-brand-50         | 240, 50, 38, 0.5    |
| --color-red-brand-30         | 240, 50, 38, 0.3    |
| --color-red-brand-20         | 240, 50, 38, 0.2    |
| --color-red-brand-90-flat    | 241, 70, 59, 1      |
| --color-red-brand-70-flat    | 244, 111, 103, 1    |
| --color-red-brand-50-flat    | 247, 152, 146, 1    |
| --color-red-brand-30-flat    | 250, 193, 189, 1    |
| --color-red-brand-20-flat    | 252, 214, 212, 1    |
| --color-blue-action          | 14, 96, 185, 1      |
| --color-blue-action-ios      | 0, 122, 255, 1      |
| --color-blue-swipe-a         | 38, 112, 198, 1     |
| --color-blue-swipe-b         | 55, 129, 216, 1     |
| --color-blue-swipe-c         | 74, 144, 226, 1     |
| --color-indigo-active        | 94, 117, 138, 1     |
| --color-endeavour            | 0, 99, 167, 1       |
| --color-red-error            | 255, 92, 92, 1      |
| --color-red-dark             | 217, 29, 11, 1      |
| --color-green-done           | 13, 186, 38, 1      |
| --color-green-delta          | 95, 165, 13, 1      |
| --color-warning-default      | 252, 227, 51, 1     |
| --color-black                | 0, 0, 0, 1          |
| --color-black-95             | 0, 0, 0, 0.95       |
| --color-black-90             | 0, 0, 0, 0.9        |
| --color-black-80             | 0, 0, 0, 0.8        |
| --color-black-70             | 0, 0, 0, 0.7        |
| --color-black-60             | 0, 0, 0, 0.6        |
| --color-black-50             | 0, 0, 0, 0.5        |
| --color-black-40             | 0, 0, 0, 0.4        |
| --color-black-30             | 0, 0, 0, 0.3        |
| --color-black-25             | 0, 0, 0, 0.25       |
| --color-black-20             | 0, 0, 0, 0.2        |
| --color-black-15             | 0, 0, 0, 0.15       |
| --color-black-10             | 0, 0, 0, 0.1        |
| --color-black-05             | 0, 0, 0, 0.05       |
| --color-black-95-flat        | 13, 13, 13, 1       |
| --color-black-90-flat        | 25, 25, 25, 1       |
| --color-black-85-flat        | 38, 38, 38, 1       |
| --color-black-80-flat        | 51, 51, 51, 1       |
| --color-black-70-flat        | 76, 76, 76, 1       |
| --color-black-60-flat        | 102, 102, 102, 1    |
| --color-black-50-flat        | 127, 127, 127, 1    |
| --color-black-40-flat        | 153, 153, 153, 1    |
| --color-black-30-flat        | 178, 178, 178, 1    |
| --color-black-25-flat        | 191, 191, 191, 1    |
| --color-black-20-flat        | 204, 204, 204, 1    |
| --color-black-15-flat        | 217, 217, 217, 1    |
| --color-black-10-flat        | 229, 229, 229, 1    |
| --color-black-05-flat        | 242, 242, 242, 1    |
| --color-white                | 255, 255, 255, 1    |
| --color-white-95             | 255, 255, 255, 0.95 |
| --color-white-90             | 255, 255, 255, 0.9  |
| --color-white-80             | 255, 255, 255, 0.8  |
| --color-white-70             | 255, 255, 255, 0.7  |
| --color-white-60             | 255, 255, 255, 0.6  |
| --color-white-50             | 255, 255, 255, 0.5  |
| --color-white-40             | 255, 255, 255, 0.4  |
| --color-white-30             | 255, 255, 255, 0.3  |
| --color-white-20             | 255, 255, 255, 0.2  |
| --color-white-10             | 255, 255, 255, 0.1  |
| --color-white-05             | 255, 255, 255, 0.05 |
| --color-grey-00              | 191, 191, 191, 0    |
| --color-grey-20              | 191, 191, 191, 0.2  |
| --color-grey-50              | 191, 191, 191, 0.5  |
| --color-category-information | 67, 131, 232, 1     |
| --color-category-invoice     | 96, 130, 167, 1     |
| --color-category-notice      | 77, 213, 213, 1     |
| --color-bg-corporate         | 33, 42, 51, 1       |
| --color-bg-corporate-90      | 33, 42, 51, 0.9     |
| --color-bg-corporate-60      | 33, 42, 51, 0.6     |
| --color-bg-corporate-30      | 33, 42, 51, 0.3     |
| --color-bg-corporate-90-flat | 55, 63, 71, 1       |
| --color-bg-corporate-60-flat | 122, 127, 133, 1    |
| --color-bg-corporate-30-flat | 188, 191, 193, 1    |
| --color-bg-personal          | 20, 50, 90, 1       |
| --color-text-black-primary   | 11, 31, 53, 0.95    |
| --color-text-black-secondary | 11, 31, 53, 0.6     |
| --color-text-black-tertiary  | 11, 31, 53, 0.3     |
| --color-text-black-paragraph | 11, 31, 53, 0.7     |
| --color-text-white-primary   | 255, 255, 255, 1    |
| --color-text-white-secondary | 255, 255, 255, 0.7  |
| --color-text-white-tertiary  | 255, 255, 255, 0.4  |
| --color-text-white-paragraph | 255, 255, 255, 0.8  |
