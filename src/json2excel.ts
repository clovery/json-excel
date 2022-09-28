import os from 'os'
import path from 'path'
import get from 'lodash.get'
import XLSX from 'xlsx'

type Column = {
  path: string

  // 导出的 excel 的显示名
  name?: string

  convert?(val: any): any
}

interface Sheet {
  name: string

  columns: Column[]

  rows: Record<string, any>[]
}

/**
 * 创建 excel 文件
 * @param filename 文件名
 * @param columns 字段
 * @param records 数据
 * @returns
 */
export function json2excel(filename: string, sheets: Sheet[]) {
  const workBook = XLSX.utils.book_new()
  const filePath = path.resolve(os.tmpdir(), filename)

  sheets.forEach(sheet => {
    const ws = createSheet(sheet)
    XLSX.utils.book_append_sheet(workBook, ws, sheet.name)
  })

  XLSX.writeFile(workBook, filePath)

  return filePath
}

function createSheet(sheet: Sheet) {
  const { columns, rows } = sheet
  const json = toJSON(columns, rows)
  return XLSX.utils.json_to_sheet(json)
}

/**
 * 转换成 json 形式的数据
 * @param columns Column[]
 * @param records
 * @returns
 */
function toJSON(columns: Column[], records: Record<string, any>[]) {
  const result: Record<string, any>[] = []

  records.forEach((record) => {
    const row: Record<string, any> = {}

    columns.forEach((column) => {
      let val = get(record, column.path)

      if (column.convert) {
        val = column.convert(val)
      }

      row[column.name || column.path] = val
    })

    result.push(row)
  })

  return result
}

