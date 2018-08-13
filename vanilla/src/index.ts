import * as fs from 'fs'

const result: string[] = fs.readdirSync(__dirname)

console.log('result', result)
