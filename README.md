# mhkim-pivot-table


[![npm package](https://img.shields.io/npm/v/mhkim-pivot-table?style=flat-square)](https://www.npmjs.com/package/mhkim-pivot-table)
[![npm downloads](https://img.shields.io/npm/dt/mhkim-pivot-table?maxAge=2592000)](https://www.npmjs.com/package/mhkim-pivot-table)

<img src="https://user-images.githubusercontent.com/42853144/235080021-a76d6b42-ee66-43e6-bee3-5e97902a1ad4.gif" />


## 🚩 Table of Contents

- [Packages](#-packages)
- [Why Created Pivot Table?](#-why-created-pivot-table)
- [Examples](#-examples)
- [Browser Support](#-browser-support)
- [Pull Request Steps](#-pull-request-steps)
- [License](#-license)
- [Read Me Template](#read-me-template)


## 📦 Packages

### Pivot Table

| Name | Description |
| --- | --- |
| [`mhkim-pivot-table`](https://github.com/kimminhyug/mhkim-pivot-table) | React component |


## 🤖 Why Created Pivot Table?

I was so bored at home, so I implemented a table I was interested in.

### UI
* **Config** : Through the toolbar, you can style or add elements to the document you are editing.
<!-- ![UI](https://user-images.githubusercontent.com/37766175/121808231-767b0f80-cc92-11eb-82a0-433123746982.png) -->

* **Dark Theme** : You can use the dark theme.
<!-- ![UI](https://user-images.githubusercontent.com/37766175/121808649-8136a400-cc94-11eb-8674-812e170ccab5.png) -->

### How To Use

* **IPivotColDefs**

| Key | Type | Description |
| :---------: | :---------: | :---------: |
| key | string | This is column key in pivotItem |
| text | string | Text display on screen instead of key |
| style | CSSProperties |  Column css | 
| order | number | Column order |
| orderBy | 'ASC' or 'DESC' | Not use |
| showTotal | boolean | show total when grouping |
| total | (def: IPivotColDefs, value: any) => string or number |  when calculate total this function called use this result |
| formatter | (value: any) => any(string or number or React.ReactElement) | when render column data this function called use this result |
| sort | (def: IPivotColDefs, items: any, order: 'asc' or 'desc') => Array.prototype.sort | when user click column header,  this sort function called use this result |

* **Pivot**
  
| Option | Type | Description | Default Value |
| :---------: | :---------: | :---------: | :---------: |
| pivotItem | object[] | This is grid data, an array in the form of a directory  </br> [key(column key):string]:value | [] |
| groupKeys | string[] | This is column key for grouping | [] |
| defaultSelectedColumns | string[] | This is default column key to display on screen | [] |
| defaultGroupKeys | string[] | This is default column key for grouping | [] |
| colDefs | IPivotColDefs[] | This is column define list | [] |
| showConfig | boolean | This option asks to display the configuration box | false |
| maxGroupCount | number | This is max group count | 2 |
| theme | 'light' or 'dark' | This is theme | "light" |
| onChangeSelectedColumns | (list: string[]) => void | when user change selected column it is called | null |
| onChangeGroupColumns | (list: string[]) => void | when user change group it is called | null |


## 🐾 Examples

* [CodeSandBox](https://codesandbox.io/s/pivot-sample-r5185x)


## 🌏 Browser Support

| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Yes | Need Check | Need Check | Need Check | Yes |


## 🔧 Pull Request Steps

(Coming soon...)

Pivot Table products are open source, so you can create a pull request(PR) after you fix issues. Run npm scripts and develop yourself with the following process.

### Setup

Fork `main` branch into your personal repository. Clone it to local computer. Install node modules. Before starting development, you should check if there are any errors.

```sh
$ git clone https://github.com/{your-personal-repo}/mhkim-pivot-table
$ npm install
$ npm run build publish:npm
```

## 📜 License

This software is licensed under the [MIT](https://www.npmjs.com/package/mhkim-pivot-table)


## Read me Template

writed "readme" referring to "toast ui(nhn)".
