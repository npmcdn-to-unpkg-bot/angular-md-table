![Downloads](https://img.shields.io/npm/dm/angular-md-table.svg)
![npm](https://img.shields.io/npm/v/angular-md-table.svg)
![node](https://img.shields.io/node/v/angular-md-table.svg)

# Usage

Add module:

```js
    angular.module('app', [
        'ttmd.table'
    ]);
```

# Install

## npm:

```bash
npm install angular-md-table --save
```

Include files:

```js
require('angular-md-table/dist/angular-md-table.min.css');
require('angular-md-table/dist/angular-md-table.min.js');
```

## CDN

```bash
https://npmcdn.com/angular-md-table@latest/dist/angular-md-table.umd.js
// or
https://npmcdn.com/angular-md-table@latest/dist/angular-md-table.umd.min.js

https://npmcdn.com/angular-md-table@latest/dist/angular-md-table.min.css
```

### Required dependencies

* Angular 1.5.2
* Angular Material 1.0.8
* Angular Translate Support

************************

# About Adding your translation

Inside library, use `{{ value | translate }}` to get the translations.

If you do NOT need translation, you can just pass the string you want to display.
If you do need translation, you can pass in the json path as when you use angular translation libaray.

For Example:

```json
{
 "title": {
    "greeting": "Hello!"
 }
}
```

```js
<ttmd-table toolbar="{title: 'title.greeting'}"></ttmd-table>
```

#### Add missing translations:

In mobile view, there are two buttons needs your provide translations for other languages:

```json
{
  "util": {
    "previous": "",
    "next": "",
    "noData": ""
  }
}
```

Default value for those are:
```json
{
  "util": {
    "previous": "Previous",
    "next": "Next",
    "noData": "There is not Data"
  }
}
```



# Features

### Desktop view and mobile view

The default breakpoint is 'xs',  able to pass `breakpoint` bindings to the component

```html
<ttmd-table items="vm.items" headers="vm.headers" breakpoint="sm"></ttmd-table>
```

### Force Mobile View

If there is a case you only want to display mobile view, pass in `force-mobile`:

```html
<ttmd-table items="vm.items" headers="vm.headers" force-mobile="true"></ttmd-table>
```


### Toolbar

To display the toolbar for the table, passing `tooblar` attr. Which is an object contains `title` and `icon`:
Here `icon` is Material font icon.

```html
<ttmd-table items="vm.items" headers="vm.headers" toolbar="{
   title="Due Date"
   icon="account_circle"
}"></ttmd-table>
```

### Pagination

To enable pagination, need to pass in `total-number` to tell how many items in total. You can passing the callback function to `on-page-change`, it will push your a `payload` object with `limit, offset, listType`.

```html
<ttmd-table items="vm.items" headers="vm.headers" total-number="vm.totalNumber" on-page-change="vm.fetchData(payload)"></ttmd-table>
```

### Sort

Able to `sort` data according to the attr, this should be an array, but currently, only work with the first element inside the array.

```html
<ttmd-table items="vm.items" headers="vm.headers" sort="['dueDate']"></ttmd-table>
```

### Exclude

If there is any attr inside the data you don't want to display on the interface, you can use `exclude`:

```html
<ttmd-table items="vm.items" headers="vm.headers" exclude="['id']"></ttmd-table>
```

### Pipes

You can use Angular built-in filter such as `date` & `currency` by adding `pipies` to format the field:

```html
<ttmd-table items="vm.items" headers="vm.headers" pipes="vm.pipes"></ttmd-table>
```

```js
this.pipes = {
    currency: {
        targets: ['amount', 'amountWithOutTax'],
        foramt: '$' // default $, optional
    },
    date: {
        tragets: ['dueDate'],
        format: 'mm-DD-yyyy'
    }
}
```

### Highlight Row

You can highlight row by adding `highlight-row` to the html:

```html
<ttmd-table items="vm.items" headers="vm.headers" highlight-row="vm.someFn"></ttmd-table>
```

It takes function:

```js
//Item is sent back with callback
const someFn = (item) => {
    return fn(item.someAttr); // parsing some logic
}
```

### Change the limits

By default, desktop view show 8 pre-page, mobile view shows 3 pre-page, you can config this for each table:

```html
<ttmd-table items="vm.items" headers="vm.headers" limits="{desktop: 5, mobile: 4}"></ttmd-table>
```

### Accordion

By default accordion will not be shown. You can enable accordion globally for all tables or individual one. To do that
you need to pass `enable-accordion=true` & `accordion-state=boolean`.

```html
<ttmd-table items="vm.items" headers="vm.headers" enable-accordion=true accordion-state=true"></ttmd-table>
```

`accordion-state=boolean` will show the content.

### Type

If you need to display multi-tables in a page and there is one large object holds all the data, you might consider use `type`
It can help to change the talbe data inside that large object.
```html
<ttmd-table items="vm.accounts.dueDate" headers="vm.headers" type="dueSoon"></ttmd-table>
```

The `type` you pass in , will be the `listType` inside js:

```js
        this.SomeService.fetchDataAccordingPagination(limit, offset)
            .then((res) => {
                if(listType){
                    this.accounts[listType] = [
                        ...res
                    ];
                }
            })
```

### Action (BreakChange)

Besides displaying data, you can pass in action. You can pass in custom directive

```html
    <ttmd-table
        headers="vm.multiPaymentsHeaders"
        items="vm.accounts.all"
        total-number="vm.accounts.totalNumber.all"
        on-page-change="vm.updateMultiPaymentList(payload)"
        type="all"
        breakpoint="sm"
        sort="['dueDate']"
        toolbar="{
            title: 'paymentComponent.allPendingBills',
            icon: 'account_circle'
        }">
        <ttmd-actions>
            <ttmd-action
                on-click="vm.pay(payload)"
                if="vm.shouldPay"
            >
              <md-button class="md-raised md-warn">Pay</md-button>
            </ttmd-action>
        </ttmd-actions>
    </ttmd-table>
```

### Row Detail

If you want to display more detail information when click the row, you can add `<ttmd-detail>` to the code, inside `<ttmd-detail>`, passing the directive you want to display. Also add `on-row-click` to the `<ttmd-table>`, 

Also you want to use your own template without using `ttmd-detail`, you can just use `on-row-click` to get `payload` back.

```html
    <ttmd-table
        items="vm.invoices"
        headers="vm.headers"
        on-row-click="vm.someFn(payload)">
        <ttmd-detail>
            <your_directive your_binding="vm.someData"></your_directive>
        </ttmd-detail>
    </ttmd-table>
```

Inside `someFn()` function, it will return `someData` for `your_directive` to display.

```js
    someFn(payload){
        someService.fetchSomeData(payload)
            .then( (res) => {
                this.someData = res;
            });
    }
```

### No Data Message

Able to pass `no-data-text` to display the text when there is empty `items` array. Also able to config this in global config.

```html
<ttmd-table items="[]" headers="vm.headers" no-data-text="There is no data"></ttmd-table>
```

There is default value set as:

```html
translate="util.noData" transalte-default="There is no Data"
```

****************

## Global Config

It is possible to config for all the tables inside application.
To do that, go to the `ngModule.config()`, inject `ttmdTableProvider`:

```js
ngModule.config( (ttmdTableProvider) => {
    ttmdTableProvider.setConfig({
        limits: {desktop: 7, mobile: 4},
        breakpoint: 'sm',
        message: {
            noData: "Empty result" // or with Angular-translate: 'path.to.value.noData'
        },
        enableAccordion: true
    })
});
```

### Default Config value

```js
const _defaultConfigs = {
         forceMobile: false,
         breakpoint: 'xs',
         limits: {
             desktop: 8,
             mobile: 3
         },
         message: {
             noData: null
         },
         enableAccordion: false
}
```

****************


## Data Structure

### items: Array[Object]  (required)

```js
[
    {
      "serviceCode": "1-260-865-6252 x638",
      "username": "Milton Mraz",
      "amount": "8.03",
      "dueDate": "2016-05-20T05:15:02.719Z"
    },
    {
      "serviceCode": "1-965-662-5118",
      "username": "Alessandro Kassulke",
      "amount": "8.61",
      "dueDate": "2016-06-25T19:15:02.720Z"
    }
]
```

### headers: Array (optional)

```js
// Using angular-translate inside the table component, so you need to give the path to find your value
vm.headers =[
  'some.path.to.value',  // or 'Name'
  'some.path.to.value2'  // or 'Position'
]
```

### total-number: number (required if need pagination)

### on-page-change: function (required if need pagination)

### force-mobile: boolean (optional)

### breakpoint: ['xs', 'sm', 'md', 'lg'] (optional)

### limits: Object (optional)

```js
vm.limits = {
    desktop: 3,
    mobile: 3,
}
```

### sort: Array[string] (optional)

### exclude: Array[string] (optional)

### toolbar: Object (optional)

```js
 vm.toolbar = {
    title: this.$translate.instant('path.to.value'),
    icon: 'string'
 }
```
### pipes: Object

```js
vm.pipes = {
    targets: [],
    foramt: string
}
```

### highlight-row: function

### type: string (attr on the object) (optional)

### if: string: expression
Use the attr on the each object
```js
if= "someAttr > 3"; // if someAttr = 5, then action doesn't show, if someAttr = 2, then action will show
```

### no-data-text: string (optional)

# Thanks

Thanks for usin my library, currently the code is not on Github, but will do it soon. Then I will be really appreciated to see the _pull request_ or _issues_
from all of you!

# Author

This library is created and maintained by [Zhentian Wan](https://zhentian.herokuapp.com/) (Tecnotree Oy, Tampere, Finland).
And this is the *first time* I contribute to open source world! WoW!!
Fell free to @ me on Twitter @Zhentiw, if anything come to your mind want to discuss with me.

********************

# CHANGE LOG

# Break Change 9.6.2016
    
    * Support pass in custom directive as action, no long use `show-as` & 'text' bingdings.
    * `<ttmd-detail>` is no longer necessary when use `on-row-click`

#Version 1.1.7 (9.5.2016)

## BUG FIXS

  * remove placeholder when action is not defined
  * fix text-overflow
  * fix desktop table border mis match
  * improve the preformence when toggle accordion

#Version 1.1.3 (2.5.2016)

## New Features

    * Add accordion support
    * Add UMD Support

## BUG FIXS

    * Change the toolbar style
    * Add lodash

# Version 1.0.8 (30.04.2016)

## New Features

    * Able to config message globaly or for each table when there is no data (tranlsate support).

## BUG FIXS

    * Hide pagination when the item length is 0



