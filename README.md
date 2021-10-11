Sheet template: https://docs.google.com/spreadsheets/d/1TA79qZ0TVai4XwFH4OUbmxIfxndnp9p09x7lh9MweqQ/edit?usp=sharing

USAGE:

const { sheetToJSON } = require('json-from-gsheet')


sheetToJSON({
    spreadsheetId: 'SPREADSHEET_ID',
    apiKey: 'API_KEY',
    tabName: 'TAB_NAME',
    savePath: 'PATH_TO_SAVE_FILES'
})


Example:

sheetToJSON({
    spreadsheetId: 'SPREADSHEET_ID',
    apiKey: 'API_KEY',
    tabName: 'TAB_NAME',
    savePath: './src/i18n/locales'
})

Output:

