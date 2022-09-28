import fs from 'fs'
import { json2excel } from './json2excel'

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
},
{
  name: 'Sheet 2',
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
}
]

describe('json to excel', () => {
  test('json2excel', () => {
    const file = json2excel('test.xlsx', sheets)
    console.log(file)
    expect(fs.existsSync(file)).toBeTruthy()
  })
})

