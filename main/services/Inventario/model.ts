// aqui se crean todas las funciones relacionadas con el negocio
//guardar eliminar etc funciones  simples?

import {insertData} from './dao'
export interface ProductType {
    nombre: string
    , descripcion: string
    , cantidad: number
    , precio: number
}

export default {
    addProduct: (product: ProductType) => {
        
        insertData(product);

    }
}

