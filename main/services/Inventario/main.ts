import Router from '../../../library/Router'
import {
    saveProduct,
    getPaginateProducts,
    deleteProduct,
    editProduct,
    getProduct
} from './controller'

const { del, edit, get, save } = Router('Product')
save(saveProduct)
get(getPaginateProducts)
get(getProduct, 'ById')
edit(editProduct)
del(deleteProduct)