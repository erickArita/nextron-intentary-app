import { ipcMain as main } from 'electron'

import { saveProduct } from './controller'


main.on('save-product',  saveProduct)
