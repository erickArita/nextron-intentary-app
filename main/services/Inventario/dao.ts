// data acces object 
// esta es la capa que se comunica con la base de datos 
// e imprementa todo lo relacionado a interactuar con la db

import databases from '../../database/Database'
import { ProductType } from './model'


export class DataTransactions {

    constructor(private databaseName: string) { }

    public insertData = (data: ProductType) => {

        databases[this.databaseName].insert(data);
        console.log(data)
    }

}