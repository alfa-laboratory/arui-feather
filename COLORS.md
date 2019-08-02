# Документация по использованию цветовой схемы `arui-feather`

Пример использования цветов в CSS

```css
@import "arui-feather/vars.css";

.info {
  font-size: var(--font-size-s);
  color: var(--color-dark-indigo-50);
}
```

[Актуальный список цветов](https://github.com/alfa-laboratory/alfa-ui-primitives/blob/master/colors.json)

| Название                       | Значение  |
| ------------------------------ | --------- |
| dark_indigo                    | #0b1f35   |
| dark_indigo_95_deprecated      | #f20b1f35 |
| dark_indigo_90_deprecated      | #e60b1f35 |
| dark_indigo_80_deprecated      | #cc0b1f35 |
| dark_indigo_70_deprecated      | #b30b1f35 |
| dark_indigo_60                 | #990b1f35 |
| dark_indigo_50_deprecated      | #800b1f35 |
| dark_indigo_40_deprecated      | #660b1f35 |
| dark_indigo_30                 | #4d0b1f35 |
| dark_indigo_25_deprecated      | #400b1f35 |
| dark_indigo_20_deprecated      | #330b1f35 |
| dark_indigo_15                 | #260b1f35 |
| dark_indigo_10                 | #1a0b1f35 |
| dark_indigo_07                 | #120b1f35 |
| dark_indigo_05                 | #0d0b1f35 |
| dark_indigo_03                 | #080b1f35 |
| dark_indigo_95_flat_deprecated | #172a3f   |
| dark_indigo_90_flat_deprecated | #233549   |
| dark_indigo_80_flat_deprecated | #3c4c5d   |
| dark_indigo_70_flat_deprecated | #546271   |
| dark_indigo_60_flat            | #6d7986   |
| dark_indigo_50_flat_deprecated | #858f9a   |
| dark_indigo_40_flat_deprecated | #9da5ae   |
| dark_indigo_30_flat            | #b5bbc2   |
| dark_indigo_25_flat_deprecated | #c2c7cc   |
| dark_indigo_20_flat_deprecated | #ced2d7   |
| dark_indigo_15_flat            | #dbdee1   |
| dark_indigo_10_flat            | #e6e8ea   |
| dark_indigo_07_flat            | #eeeff1   |
| dark_indigo_05_flat            | #f3f4f5   |
| dark_indigo_03_flat            | #f7f8f9   |
| dark_indigo_deep_deprecated    | #08182a   |
| red_brand                      | #ef3124   |
| red_brand_90                   | #e6ef3124 |
| red_brand_70                   | #b3ef3124 |
| red_brand_50                   | #80ef3124 |
| red_brand_30                   | #4def3124 |
| red_brand_20                   | #33ef3124 |
| red_brand_10                   | #1aef3124 |
| red_brand_90_flat              | #f14539   |
| red_brand_70_flat              | #f46e65   |
| red_brand_50_flat              | #f79891   |
| red_brand_30_flat              | #fac1bd   |
| red_brand_20_flat              | #fcd6d3   |
| red_brand_10_flat              | #FDEAE9   |
| blue_action                    | #0e60b9   |
| blue_action_ios                | #007aff   |
| blue_action_ios_10             | #1a007aff |
| blue_action_ios_10_flat        | #E6F2FF   |
| blue_swipe_a                   | #2670c6   |
| blue_swipe_b                   | #3781d8   |
| blue_swipe_c                   | #4a90e2   |
| indigo_active                  | #5e758a   |
| endeavour                      | #0063a7   |
| red_error                      | #ff5c5c   |
| red_dark                       | #d91d0b   |
| green_done                     | #13a463   |
| green_done_20                  | #3313a463 |
| green_done_10                  | #1a13a463 |
| green_done_05                  | #0d13a463 |
| green_done_20_flat             | #d0ede0   |
| green_done_10_flat             | #e8f6f0   |
| green_done_05_flat             | #f3faf7   |
| green_delta                    | #5fa50d   |
| warning_default                | #fce333   |
| black                          | #000000   |
| black_95                       | #f2000000 |
| black_90                       | #e6000000 |
| black_80                       | #cc000000 |
| black_70                       | #b3000000 |
| black_60                       | #99000000 |
| black_50                       | #80000000 |
| black_40                       | #66000000 |
| black_30                       | #4d000000 |
| black_25                       | #40000000 |
| black_20                       | #33000000 |
| black_15                       | #26000000 |
| black_10                       | #1a000000 |
| black_05                       | #0d000000 |
| black_95_flat                  | #0d0d0d   |
| black_90_flat                  | #191919   |
| black_85_flat                  | #262626   |
| black_80_flat                  | #333333   |
| black_70_flat                  | #4c4c4c   |
| black_60_flat                  | #666666   |
| black_50_flat                  | #7f7f7f   |
| black_40_flat                  | #999999   |
| black_30_flat                  | #b2b2b2   |
| black_25_flat                  | #bfbfbf   |
| black_20_flat                  | #cccccc   |
| black_15_flat                  | #d9d9d9   |
| black_10_flat                  | #e5e5e5   |
| black_05_flat                  | #f2f2f2   |
| white                          | #ffffff   |
| white_95                       | #f2ffffff |
| white_90                       | #e6ffffff |
| white_80                       | #ccffffff |
| white_70                       | #b3ffffff |
| white_60                       | #99ffffff |
| white_50                       | #80ffffff |
| white_40                       | #66ffffff |
| white_30                       | #4dffffff |
| white_20                       | #33ffffff |
| white_10                       | #1affffff |
| white_05                       | #0dffffff |
| grey_00                        | #00bfbfbf |
| grey_20                        | #33bfbfbf |
| grey_50                        | #80bfbfbf |
| category_information           | #4383e8   |
| category_invoice               | #6082a7   |
| category_notice                | #4dd5d5   |
| bg_corporate                   | #212a33   |
| bg_corporate_90                | #e6212a33 |
| bg_corporate_60                | #99212a33 |
| bg_corporate_30                | #4d212a33 |
| bg_corporate_90_flat           | #373f47   |
| bg_corporate_60_flat           | #7a7f85   |
| bg_corporate_30_flat           | #bcbfc1   |
| bg_personal                    | #14325A   |
| text_black_primary             | #f20b1f35 |
| text_black_secondary           | #990b1f35 |
| text_black_tertiary            | #4d0b1f35 |
| text_black_paragraph           | #b30b1f35 |
| text_white_primary             | #ffffff   |
| text_white_secondary           | #b3ffffff |
| text_white_tertiary            | #66ffffff |
| text_white_paragraph           | #ccffffff |
| corporate_payment_to_person    | #f6bf65   |
| corporate_payment_to_atm       | #8888ad   |
| corporate_payment_to_card      | #a489a    |
