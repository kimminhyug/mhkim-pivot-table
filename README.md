# mhkim-pivot-table


[![npm package](https://img.shields.io/npm/v/mhkim-pivot-table?style=flat-square)](https://www.npmjs.com/package/mhkim-pivot-table)
[![npm downloads](https://img.shields.io/npm/dt/mhkim-pivot-table?maxAge=2592000)](https://www.npmjs.com/package/mhkim-pivot-table)

<img src="https://user-images.githubusercontent.com/42853144/235080021-a76d6b42-ee66-43e6-bee3-5e97902a1ad4.gif" />


## Table of Contents
1. [Packages](#packages)
2. [Why Pivot Table?](#why-pivot-table)
3. [Usage / Props](#usage--props)
4. [Examples](#examples)
5. [Browser Support](#browser-support)
6. [Pull Request](#pull-request)
7. [License](#license)

---

## Packages
| Name | Description |
| --- | --- |
| [`mhkim-pivot-table`](https://www.npmjs.com/package/mhkim-pivot-table) | React Pivot Table Component |
  

---

## Why Pivot Table?

- I was so bored at home, so I implemented a table I was interested in.

- UI
  - Config : Through the toolbar, you can style or add elements to the document you are editing.
  - Dark Theme : You can use the dark theme.

---

## Usage / Props

### Column Definition (`IPivotColDefs`)
| Key | Type | Description |
| --- | --- | --- |
| key | string | Column key in pivotItem |
| text | string | Display text |
| style | CSSProperties | Column CSS |
| order | number | Column order |
| showTotal | boolean | Show total when grouping |
| total | (def, value) => string/number | Total calculation function |
| formatter | (value) => string/number/ReactElement | Column value renderer |
| sort | (def, items, order) => array | Column sort function |

### Pivot Props
| Option | Type | Description | Default |
| --- | --- | --- | --- |
| pivotItem | object[] | Grid data array | [] |
| groupKeys | string[] | Columns for grouping | [] |
| defaultSelectedColumns | string[] | Default columns | [] |
| colDefs | IPivotColDefs[] | Column definitions | [] |
| showConfig | boolean | Show config UI | false |
| maxGroupCount | number | Maximum grouping | 2 |
| theme | 'light' \| 'dark' | Theme | 'light' |
| onChangeSelectedColumns | (list) => void | Callback when columns change | null |
| onChangeGroupColumns | (list) => void | Callback when grouping changes | null |

---

## Examples
[CodeSandbox](https://codesandbox.io/p/sandbox/pivot-sample-r5185x)

---

## Browser Support
| Chrome | IE | Edge | Safari | Firefox |
| --- | --- | --- | --- | --- |
| Yes | Check | Check | Check | Yes |

---

## Pull Request
- Fork → Clone → npm install → Develop → PR

```sh
$ git clone https://github.com/{your-repo}/mhkim-pivot-table
$ npm install
$ npm run build publish:npm
