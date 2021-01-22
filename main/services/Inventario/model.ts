// aqui se crean todas las funciones relacionadas con el negocio
//guardar eliminar etc funciones  simples?

import { DataTransactions } from './dao'
export interface ProductType {
    nombre: string
    , descripcion: string
    , cantidad: number
    , precio: number
    ,
}

export class Products {


    constructor(private product: ProductType) { }

    public addProduct = (databaseName: string) => {

        const transaction = new DataTransactions(databaseName);

        transaction.insertData(this.product)
    }

}
