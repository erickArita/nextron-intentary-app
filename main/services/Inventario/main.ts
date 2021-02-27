import { handle } from '../../../library/router'
import {
    saveProduct,
    getPaginateProduct,
    deleteProduct,
    editProduct
} from './controller'

const { del, edit, get, save } = handle('Product')
save(saveProduct)
get(getPaginateProduct)
edit(editProduct)
del(deleteProduct)



