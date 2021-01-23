import { ipcMain as main } from 'electron'

import { saveProduct } from './controller'


main.handle('save-product',  saveProduct)
