import Router from '../../../library/Router'
import {
    saveProduct,
    getPaginateProduct,
    deleteProduct,
    editProduct
} from './controller'

const { del, edit, get, save } = Router('Product')

save(saveProduct)
get(getPaginateProduct)
edit(editProduct)
del(deleteProduct)



