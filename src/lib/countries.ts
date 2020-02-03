/* eslint comma-dangle: 0 */

// Copy of https://github.com/patw0929/react-intl-tel-input/blob/master/src/components/AllCountries.js
// With russian translations

// Array of country objects for the flag dropdown.
// Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.

// Originally from https://github.com/mledoze/countries
// then with a couple of manual re-arrangements to be alphabetical
// then changed Kazakhstan from +76 to +7
// and Vatican City from +379 to +39 (see issue 50)
// and Caribean Netherlands from +5997 to +599
// and Curacao from +5999 to +599
// Removed:  Kosovo, Pitcairn Islands, South Georgia

// UPDATE Sept 12th 2015
// List of regions that have iso2 country codes, which I have chosen to omit:
// (based on this information: https://en.wikipedia.org/wiki/List_of_country_calling_codes)
// AQ - Antarctica - all different country codes depending on which 'base'
// BV - Bouvet Island - no calling code
// GS - South Georgia and the South Sandwich Islands -
// 'inhospitable collection of islands' - same flag and calling code as Falkland Islands
// HM - Heard Island and McDonald Islands - no calling code
// PN - Pitcairn - tiny population (56), same calling code as New Zealand
// TF - French Southern Territories - no calling code
// UM - United States Minor Outlying Islands - no calling code

// UPDATE the criteria of supported countries or territories (see issue 297)
// Have an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Have a country calling code: https://en.wikipedia.org/wiki/List_of_country_calling_codes
// Have a flag
// Must be supported by libphonenumber: https://github.com/googlei18n/libphonenumber

// Update: converted objects to arrays to save bytes!
// Update: added 'priority' for countries with the same dialCode as others
// Update: added array of area codes for countries with the same dialCode as others

// So each country array has the following information:
// [
//    Country name (en),
//    Country name (ru),
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]

type CountryData = [string, string, string, string, number?, string[]?];

const defaultCountriesData: CountryData[] = [
    [
        'Afghanistan',
        'Афганистан',
        'af',
        '93',
    ],
    [
        'Albania',
        'Албания',
        'al',
        '355',
    ],
    [
        'Algeria',
        'Алжир',
        'dz',
        '213',
    ],
    [
        'American Samoa',
        'Американское Самоа',
        'as',
        '1684',
    ],
    [
        'Andorra',
        'Андорра',
        'ad',
        '376',
    ],
    [
        'Angola',
        'Ангола',
        'ao',
        '244',
    ],
    [
        'Anguilla',
        'Ангилья',
        'ai',
        '1264',
    ],
    [
        'Antigua and Barbuda',
        'Антигуа и Барбуда',
        'ag',
        '1268',
    ],
    [
        'Argentina',
        'Аргентина',
        'ar',
        '54',
    ],
    [
        'Armenia',
        'Армения',
        'am',
        '374',
    ],
    [
        'Aruba',
        'Аруба',
        'aw',
        '297',
    ],
    [
        'Australia',
        'Австралия',
        'au',
        '61',
        0,
    ],
    [
        'Austria',
        'Австрия',
        'at',
        '43',
    ],
    [
        'Azerbaijan',
        'Азербайджан',
        'az',
        '994',
    ],
    [
        'Bahamas',
        'Багамские Острова',
        'bs',
        '1242',
    ],
    [
        'Bahrain',
        'Бахрейн',
        'bh',
        '973',
    ],
    [
        'Bangladesh',
        'Бангладеш',
        'bd',
        '880',
    ],
    [
        'Barbados',
        'Барбадос',
        'bb',
        '1246',
    ],
    [
        'Belarus',
        'Беларусь',
        'by',
        '375',
    ],
    [
        'Belgium',
        'Бельгия',
        'be',
        '32',
    ],
    [
        'Belize',
        'Белиз',
        'bz',
        '501',
    ],
    [
        'Benin',
        'Бенин',
        'bj',
        '229',
    ],
    [
        'Bermuda',
        'Бермудские Острова',
        'bm',
        '1441',
    ],
    [
        'Bhutan',
        'Бутан',
        'bt',
        '975',
    ],
    [
        'Bolivia',
        'Боливия',
        'bo',
        '591',
    ],
    [
        'Bosnia and Herzegovina',
        'Босния и Герцеговина',
        'ba',
        '387',
    ],
    [
        'Botswana',
        'Ботсвана',
        'bw',
        '267',
    ],
    [
        'Brazil',
        'Бразилия',
        'br',
        '55',
    ],
    [
        'British Indian Ocean Territory',
        'Брит. Терр. в Индийском Океане',
        'io',
        '246',
    ],
    [
        'British Virgin Islands',
        'Британские Виргинские Острова',
        'vg',
        '1284',
    ],
    [
        'Brunei',
        'Бруней',
        'bn',
        '673',
    ],
    [
        'Bulgaria',
        'Болгария',
        'bg',
        '359',
    ],
    [
        'Burkina Faso',
        'Буркина-Фасо',
        'bf',
        '226',
    ],
    [
        'Burundi',
        'Бурунди',
        'bi',
        '257',
    ],
    [
        'Cambodia',
        'Камбоджа',
        'kh',
        '855',
    ],
    [
        'Cameroon',
        'Камерун',
        'cm',
        '237',
    ],
    [
        'Canada',
        'Канада',
        'ca',
        '1',
        1,
        [
            '204', '226', '236', '249', '250', '289',
            '306', '343', '365', '387', '403', '416',
            '418', '431', '437', '438', '450', '506',
            '514', '519', '548', '579', '581', '587',
            '604', '613', '639', '647', '672', '705',
            '709', '742', '778', '780', '782', '807',
            '819', '825', '867', '873', '902', '905',
        ],
    ],
    [
        'Cape Verde',
        'Кабо-Верде',
        'cv',
        '238',
    ],
    [
        'Caribbean Netherlands',
        'Карибские Нидерланды',
        'bq',
        '599',
        1,
    ],
    [
        'Cayman Islands',
        'Каймановы Острова',
        'ky',
        '1345',
    ],
    [
        'Central African Republic',
        'ЦАР',
        'cf',
        '236',
    ],
    [
        'Chad',
        'Чад',
        'td',
        '235',
    ],
    [
        'Chile',
        'Чили',
        'cl',
        '56',
    ],
    [
        'China',
        'Китайская Народная Республика',
        'cn',
        '86',
    ],
    [
        'Christmas Island (Australia)',
        'Остров Рождества',
        'cx',
        '61',
        2,
    ],
    [
        'Cocos (Keeling) Islands',
        'Кокосовые Острова',
        'cc',
        '61',
        1,
    ],
    [
        'Colombia',
        'Колумбия',
        'co',
        '57',
    ],
    [
        'Comoros',
        'Коморские Острова',
        'km',
        '269',
    ],
    [
        'Congo (DRC)',
        'Демократическая Республика Конго',
        'cd',
        '243',
    ],
    [
        'Congo (Republic)',
        'Республика Конго',
        'cg',
        '242',
    ],
    [
        'Cook Islands',
        'Острова Кука',
        'ck',
        '682',
    ],
    [
        'Costa Rica',
        'Коста-Рика',
        'cr',
        '506',
    ],
    [
        'Côte d’Ivoire',
        'Кот-д’Ивуар',
        'ci',
        '225',
    ],
    [
        'Croatia',
        'Хорватия',
        'hr',
        '385',
    ],
    [
        'Cuba',
        'Куба',
        'cu',
        '53',
    ],
    [
        'Curaçao',
        'Кюрасао',
        'cw',
        '599',
        0,
    ],
    [
        'Cyprus',
        'Кипр',
        'cy',
        '357',
    ],
    [
        'Czech Republic',
        'Чехия',
        'cz',
        '420',
    ],
    [
        'Denmark',
        'Дания',
        'dk',
        '45',
    ],
    [
        'Djibouti',
        'Джибути',
        'dj',
        '253',
    ],
    [
        'Dominica',
        'Доминика',
        'dm',
        '1767',
    ],
    [
        'Dominican Republic',
        'Доминиканская Республика',
        'do',
        '1',
        2,
        ['809', '829', '849'],
    ],
    [
        'Ecuador',
        'Эквадор',
        'ec',
        '593',
    ],
    [
        'Egypt',
        'Египет',
        'eg',
        '20',
    ],
    [
        'El Salvador',
        'Сальвадор',
        'sv',
        '503',
    ],
    [
        'Equatorial Guinea',
        'Экваториальная Гвинея',
        'gq',
        '240',
    ],
    [
        'Eritrea',
        'Эритрея',
        'er',
        '291',
    ],
    [
        'Estonia',
        'Эстония',
        'ee',
        '372',
    ],
    [
        'Ethiopia',
        'Эфиопия',
        'et',
        '251',
    ],
    [
        'Falkland Islands',
        'Фолклендские Острова',
        'fk',
        '500',
    ],
    [
        'Faroe Islands',
        'Фарерские Острова',
        'fo',
        '298',
    ],
    [
        'Fiji',
        'Фиджи',
        'fj',
        '679',
    ],
    [
        'Finland',
        'Финляндия',
        'fi',
        '358',
        0,
    ],
    [
        'France',
        'Франция',
        'fr',
        '33',
    ],
    [
        'French Guiana',
        'Гвиана Французская',
        'gf',
        '594',
    ],
    [
        'French Polynesia',
        'Полинезия Французская',
        'pf',
        '689',
    ],
    [
        'Gabon',
        'Габон',
        'ga',
        '241',
    ],
    [
        'Gambia',
        'Гамбия',
        'gm',
        '220',
    ],
    [
        'Georgia',
        'Грузия',
        'ge',
        '995',
    ],
    [
        'Germany',
        'Германия',
        'de',
        '49',
    ],
    [
        'Ghana',
        'Гана',
        'gh',
        '233',
    ],
    [
        'Gibraltar',
        'Гибралтар',
        'gi',
        '350',
    ],
    [
        'Greece',
        'Греция',
        'gr',
        '30',
    ],
    [
        'Greenland',
        'Гренландия',
        'gl',
        '299',
    ],
    [
        'Grenada',
        'Гренада',
        'gd',
        '1473',
    ],
    [
        'Guadeloupe',
        'Гваделупа',
        'gp',
        '590',
        0,
    ],
    [
        'Guam',
        'Гуам',
        'gu',
        '1671',
    ],
    [
        'Guatemala',
        'Гватемала',
        'gt',
        '502',
    ],
    [
        'Guernsey',
        'Гернси',
        'gg',
        '44',
        1,
    ],
    [
        'Guinea',
        'Гвинея',
        'gn',
        '224',
    ],
    [
        'Guinea-Bissau',
        'Гвинея-Бисау',
        'gw',
        '245',
    ],
    [
        'Guyana',
        'Гайана',
        'gy',
        '592',
    ],
    [
        'Haiti',
        'Гаити',
        'ht',
        '509',
    ],
    [
        'Honduras',
        'Гондурас',
        'hn',
        '504',
    ],
    [
        'Hong Kong',
        'Гонконг',
        'hk',
        '852',
    ],
    [
        'Hungary',
        'Венгрия',
        'hu',
        '36',
    ],
    [
        'Iceland',
        'Исландия',
        'is',
        '354',
    ],
    [
        'India',
        'Индия',
        'in',
        '91',
    ],
    [
        'Indonesia',
        'Индонезия',
        'id',
        '62',
    ],
    [
        'Iran',
        'Иран',
        'ir',
        '98',
    ],
    [
        'Iraq',
        'Ирак',
        'iq',
        '964',
    ],
    [
        'Ireland',
        'Ирландия',
        'ie',
        '353',
    ],
    [
        'Isle of Man',
        'Остров Мэн',
        'im',
        '44',
        2,
    ],
    [
        'Israel',
        'Израиль',
        'il',
        '972',
    ],
    [
        'Italy',
        'Италия',
        'it',
        '39',
        0,
    ],
    [
        'Jamaica',
        'Ямайка',
        'jm',
        '1876',
    ],
    [
        'Japan',
        'Япония',
        'jp',
        '81',
    ],
    [
        'Jersey',
        'Джерси',
        'je',
        '44',
        3,
    ],
    [
        'Jordan',
        'Иордания',
        'jo',
        '962',
    ],
    [
        'Kazakhstan',
        'Казахстан',
        'kz',
        '7',
        1,
    ],
    [
        'Kenya',
        'Кения',
        'ke',
        '254',
    ],
    [
        'Kiribati',
        'Кирибати',
        'ki',
        '686',
    ],
    [
        'Kosovo',
        'Косово',
        'xk',
        '383',
    ],
    [
        'Kuwait',
        'Кувейт',
        'kw',
        '965',
    ],
    [
        'Kyrgyzstan',
        'Киргизия',
        'kg',
        '996',
    ],
    [
        'Laos',
        'Лаос',
        'la',
        '856',
    ],
    [
        'Latvia',
        'Латвия',
        'lv',
        '371',
    ],
    [
        'Lebanon',
        'Ливан',
        'lb',
        '961',
    ],
    [
        'Lesotho',
        'Лесото',
        'ls',
        '266',
    ],
    [
        'Liberia',
        'Либерия',
        'lr',
        '231',
    ],
    [
        'Libya',
        'Ливия',
        'ly',
        '218',
    ],
    [
        'Liechtenstein',
        'Лихтенштейн',
        'li',
        '423',
    ],
    [
        'Lithuania',
        'Литва',
        'lt',
        '370',
    ],
    [
        'Luxembourg',
        'Люксембург',
        'lu',
        '352',
    ],
    [
        'Macau',
        'Макао',
        'mo',
        '853',
    ],
    [
        'Macedonia',
        'Македония',
        'mk',
        '389',
    ],
    [
        'Madagascar',
        'Мадагаскар',
        'mg',
        '261',
    ],
    [
        'Malawi',
        'Малави',
        'mw',
        '265',
    ],
    [
        'Malaysia',
        'Малайзия',
        'my',
        '60',
    ],
    [
        'Maldives',
        'Мальдивы',
        'mv',
        '960',
    ],
    [
        'Mali',
        'Мали',
        'ml',
        '223',
    ],
    [
        'Malta',
        'Мальта',
        'mt',
        '356',
    ],
    [
        'Marshall Islands',
        'Маршалловы Острова',
        'mh',
        '692',
    ],
    [
        'Martinique',
        'Мартиника',
        'mq',
        '596',
    ],
    [
        'Mauritania',
        'Мавритания',
        'mr',
        '222',
    ],
    [
        'Mauritius',
        'Маврикий',
        'mu',
        '230',
    ],
    [
        'Mayotte',
        'Майотта',
        'yt',
        '262',
        1,
    ],
    [
        'Mexico',
        'Мексика',
        'mx',
        '52',
    ],
    [
        'Micronesia',
        'Микронезия',
        'fm',
        '691',
    ],
    [
        'Moldova',
        'Молдавия',
        'md',
        '373',
    ],
    [
        'Monaco',
        'Монако',
        'mc',
        '377',
    ],
    [
        'Mongolia',
        'Монголия',
        'mn',
        '976',
    ],
    [
        'Montenegro',
        'Черногория',
        'me',
        '382',
    ],
    [
        'Montserrat',
        'Монтсеррат',
        'ms',
        '1664',
    ],
    [
        'Morocco',
        'Марокко',
        'ma',
        '212',
        0,
    ],
    [
        'Mozambique',
        'Мозамбик',
        'mz',
        '258',
    ],
    [
        'Myanmar',
        'Мьянма',
        'mm',
        '95',
    ],
    [
        'Namibia',
        'Намибия',
        'na',
        '264',
    ],
    [
        'Nauru',
        'Науру',
        'nr',
        '674',
    ],
    [
        'Nepal',
        'Непал',
        'np',
        '977',
    ],
    [
        'Netherlands',
        'Нидерланды',
        'nl',
        '31',
    ],
    [
        'New Caledonia',
        'Новая Каледония',
        'nc',
        '687',
    ],
    [
        'New Zealand',
        'Новая Зеландия',
        'nz',
        '64',
    ],
    [
        'Nicaragua',
        'Никарагуа',
        'ni',
        '505',
    ],
    [
        'Niger',
        'Нигер',
        'ne',
        '227',
    ],
    [
        'Nigeria',
        'Нигерия',
        'ng',
        '234',
    ],
    [
        'Niue',
        'Ниуэ',
        'nu',
        '683',
    ],
    [
        'Norfolk Island',
        'Остров Норфолк',
        'nf',
        '672',
    ],
    [
        'North Korea',
        'Северная Корея',
        'kp',
        '850',
    ],
    [
        'Northern Mariana Islands',
        'Северные Марианские Острова',
        'mp',
        '1670',
    ],
    [
        'Norway',
        'Норвегия',
        'no',
        '47',
        0,
    ],
    [
        'Oman',
        'Оман',
        'om',
        '968',
    ],
    [
        'Pakistan',
        'Пакистан',
        'pk',
        '92',
    ],
    [
        'Palau',
        'Палау',
        'pw',
        '680',
    ],
    [
        'Palestine',
        'Палестина',
        'ps',
        '970',
    ],
    [
        'Panama',
        'Панама',
        'pa',
        '507',
    ],
    [
        'Papua New Guinea',
        'Папуа — Новая Гвинея',
        'pg',
        '675',
    ],
    [
        'Paraguay',
        'Парагвай',
        'py',
        '595',
    ],
    [
        'Peru',
        'Перу',
        'pe',
        '51',
    ],
    [
        'Philippines',
        'Филиппины',
        'ph',
        '63',
    ],
    [
        'Poland',
        'Польша',
        'pl',
        '48',
    ],
    [
        'Portugal',
        'Португалия',
        'pt',
        '351',
    ],
    [
        'Puerto Rico',
        'Пуэрто-Рико',
        'pr',
        '1',
        3,
        ['787', '939'],
    ],
    [
        'Qatar',
        'Катар',
        'qa',
        '974',
    ],
    [
        'Réunion',
        'Реюньон',
        're',
        '262',
        0,
    ],
    [
        'Romania',
        'Румыния',
        'ro',
        '40',
    ],
    [
        'Russia',
        'Россия',
        'ru',
        '7',
        0,
    ],
    [
        'Rwanda',
        'Руанда',
        'rw',
        '250',
    ],
    [
        'Saint Barthélemy',
        'Сен-Бартелеми',
        'bl',
        '590',
        1,
    ],
    [
        'Saint Helena',
        'Остров Святой Елены',
        'sh',
        '290',
    ],
    [
        'Saint Kitts and Nevis',
        'Сент-Китс и Невис',
        'kn',
        '1869',
    ],
    [
        'Saint Lucia',
        'Сент-Люсия',
        'lc',
        '1758',
    ],
    [
        'Saint Martin',
        'Сен-Мартен',
        'mf',
        '590',
        2,
    ],
    [
        'Saint Pierre and Miquelon',
        'Сен-Пьер и Микелон',
        'pm',
        '508',
    ],
    [
        'Saint Vincent and the Grenadines',
        'Сент-Винсент и Гренадины',
        'vc',
        '1784',
    ],
    [
        'Samoa',
        'Самоа',
        'ws',
        '685',
    ],
    [
        'San Marino',
        'Сан-Марино',
        'sm',
        '378',
    ],
    [
        'São Tomé and Príncipe',
        'Сан-Томе и Принсипи',
        'st',
        '239',
    ],
    [
        'Saudi Arabia',
        'Саудовская Аравия',
        'sa',
        '966',
    ],
    [
        'Senegal',
        'Сенегал',
        'sn',
        '221',
    ],
    [
        'Serbia',
        'Сербия',
        'rs',
        '381',
    ],
    [
        'Seychelles',
        'Сейшельские Острова',
        'sc',
        '248',
    ],
    [
        'Sierra Leone',
        'Сьерра-Леоне',
        'sl',
        '232',
    ],
    [
        'Singapore',
        'Сингапур',
        'sg',
        '65',
    ],
    [
        'Sint Maarten',
        'Синт-Мартен',
        'sx',
        '1721',
    ],
    [
        'Slovakia',
        'Словакия',
        'sk',
        '421',
    ],
    [
        'Slovenia',
        'Словения',
        'si',
        '386',
    ],
    [
        'Solomon Islands',
        'Соломоновы Острова',
        'sb',
        '677',
    ],
    [
        'Somalia',
        'Сомали',
        'so',
        '252',
    ],
    [
        'South Africa',
        'ЮАР',
        'za',
        '27',
    ],
    [
        'South Korea',
        'Южная Корея',
        'kr',
        '82',
    ],
    [
        'South Sudan',
        'Южный Судан',
        'ss',
        '211',
    ],
    [
        'Spain',
        'Испания',
        'es',
        '34',
    ],
    [
        'Sri Lanka',
        'Шри-Ланка',
        'lk',
        '94',
    ],
    [
        'Sudan',
        'Судан',
        'sd',
        '249',
    ],
    [
        'Suriname',
        'Суринам',
        'sr',
        '597',
    ],
    [
        'Svalbard and Jan Mayen',
        'Шпицберген и Ян-Майен',
        'sj',
        '47',
        1,
    ],
    [
        'Swaziland',
        'Свазиленд',
        'sz',
        '268',
    ],
    [
        'Sweden',
        'Швеция',
        'se',
        '46',
    ],
    [
        'Switzerland',
        'Швейцария',
        'ch',
        '41',
    ],
    [
        'Syria',
        'Сирия',
        'sy',
        '963',
    ],
    [
        'Taiwan',
        'Тайвань',
        'tw',
        '886',
    ],
    [
        'Tajikistan',
        'Таджикистан',
        'tj',
        '992',
    ],
    [
        'Tanzania',
        'Танзания',
        'tz',
        '255',
    ],
    [
        'Thailand',
        'Таиланд',
        'th',
        '66',
    ],
    [
        'Timor-Leste',
        'Восточный Тимор',
        'tl',
        '670',
    ],
    [
        'Togo',
        'Того',
        'tg',
        '228',
    ],
    [
        'Tokelau',
        'Токелау',
        'tk',
        '690',
    ],
    [
        'Tonga',
        'Тонга',
        'to',
        '676',
    ],
    [
        'Trinidad and Tobago',
        'Тринидад и Тобаго',
        'tt',
        '1868',
    ],
    [
        'Tunisia',
        'Тунис',
        'tn',
        '216',
    ],
    [
        'Turkey',
        'Турция',
        'tr',
        '90',
    ],
    [
        'Turkmenistan',
        'Туркмения',
        'tm',
        '993',
    ],
    [
        'Turks and Caicos Islands',
        'Тёркс и Кайкос',
        'tc',
        '1649',
    ],
    [
        'Tuvalu',
        'Тувалу',
        'tv',
        '688',
    ],
    [
        'U.S. Virgin Islands',
        'Американские Виргинские Острова',
        'vi',
        '1340',
    ],
    [
        'Uganda',
        'Уганда',
        'ug',
        '256',
    ],
    [
        'Ukraine',
        'Украина',
        'ua',
        '380',
    ],
    [
        'United Arab Emirates',
        'ОАЭ',
        'ae',
        '971',
    ],
    [
        'United Kingdom',
        'Великобритания',
        'gb',
        '44',
        0,
    ],
    [
        'United States',
        'США',
        'us',
        '1',
        0,
    ],
    [
        'Uruguay',
        'Уругвай',
        'uy',
        '598',
    ],
    [
        'Uzbekistan',
        'Узбекистан',
        'uz',
        '998',
    ],
    [
        'Vanuatu',
        'Вануату',
        'vu',
        '678',
    ],
    [
        'Vatican City',
        'Ватикан',
        'va',
        '39',
        1,
    ],
    [
        'Venezuela',
        'Венесуэла',
        've',
        '58',
    ],
    [
        'Vietnam',
        'Вьетнам',
        'vn',
        '84',
    ],
    [
        'Wallis and Futuna',
        'Уоллис и Футуна',
        'wf',
        '681',
    ],
    [
        'Western Sahara',
        'Западная Сахара',
        'eh',
        '212',
        1,
    ],
    [
        'Yemen',
        'Йемен',
        'ye',
        '967',
    ],
    [
        'Zambia',
        'Замбия',
        'zm',
        '260',
    ],
    [
        'Zimbabwe',
        'Зимбабве',
        'zw',
        '263',
    ],
    [
        'Åland Islands',
        'Аландские Острова',
        'ax',
        '358',
        1,
    ],
];

let countries;

function formatCountriesData(countriesData: CountryData[]) {
    return countriesData.map(country => ({
        name: country[1],
        iso2: country[2],
        dialCode: country[3],
        priority: country[4],
        areaCodes: country[5] || null
    })).sort((a, b) => a.name.localeCompare(b.name));
}

function initialize(externalCountriesList = defaultCountriesData) {
    countries = formatCountriesData(externalCountriesList);
}

function getCountries(): CountryData[] {
    if (!countries) {
        initialize();
    }

    return countries;
}

const AllCountries = {
    initialize,
    getCountries
};

export default AllCountries;
