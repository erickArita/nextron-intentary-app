import { ipcMain as main } from 'electron'

import { saveProduct, getPaginateProduct } from './controller'


main.handle('save-product', saveProduct)

main.handle('get-product', getPaginateProduct)