Sheet template: https://docs.google.com/spreadsheets/d/1TA79qZ0TVai4XwFH4OUbmxIfxndnp9p09x7lh9MweqQ/edit?usp=sharing




### Installation 

```
yarn add json-from-gsheet   
```
or   
```
npm i json-from-gsheet
```


### Usage:

`spreadsheetId` - You can get it from the spreadsheet url which is placed after `/spreadsheets/d/`. Ex: spreadsheets/d/{YOUR_SPREADSHEET_ID}.  
`apiKey` - get it from your Google Console. [Learn more](https://developers.google.com/maps/documentation/javascript/get-api-key#creating-api-keys).  
`tabName` - tab name in your spreadsheet, which is shown on the bottom of the page. `Ex: Sheet1`.  
`savePath` - the path where you want to store your translation files. 

```
const { sheetToJSON } = require('json-from-gsheet')


sheetToJSON({
    spreadsheetId: 'SPREADSHEET_ID',
    apiKey: 'API_KEY',
    tabName: 'TAB_NAME',
    savePath: 'PATH_TO_SAVE_FILES'
})

```
### Example:

```
sheetToJSON({
    spreadsheetId: 'SPREADSHEET_ID',
    apiKey: 'API_KEY',
    tabName: 'TAB_NAME',
    savePath: './src/i18n/locales'
})
```

### Output:   
It outputs `languages.json` file in the root folder of the path you passed.   
<img width="602" alt="Screen Shot 2021-10-12 at 08 23 17" src="https://user-images.githubusercontent.com/22298895/136867279-3509524b-c5b9-4bce-a0d9-422d42092db7.png">

Then it outputs all `[language].json` files in the passed path.  

<img width="292" alt="Screen Shot 2021-10-12 at 08 22 46" src="https://user-images.githubusercontent.com/22298895/136867461-390acdce-b943-4f78-922c-150e181b2516.png">


Here is how `[language].json` looks like after it is parsed from the [sheet]( https://docs.google.com/spreadsheets/d/1TA79qZ0TVai4XwFH4OUbmxIfxndnp9p09x7lh9MweqQ/edit?usp=sharing
)
<img width="560" alt="Screen Shot 2021-10-12 at 08 27 13" src="https://user-images.githubusercontent.com/22298895/136867284-bb18d9d4-773a-41a3-bc88-4ac7494a22cf.png">
