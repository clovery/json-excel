# @clovery/json-excel

```ts
import { json2excel } from '@clovery/json-excel'

const sheets = [{
  name: 'Sheet 1',
  columns: [
    {
      name: 'Name',
      path: 'name'
    }
  ],
  rows: [
    {
      name: 'ZhangSan'
    }
  ]
}]

json2excel('test.xlsx', columns, records)
```
