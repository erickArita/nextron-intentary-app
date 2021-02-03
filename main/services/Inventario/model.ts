// aqui se crean todas las funciones relacionadas con el negocio
//guardar eliminar etc funciones  simples?

import { IpcMainInvokeEvent } from 'electron/main';
import { getPaginateData, insertData } from './dao'
import { ProductType } from './interfaces/interfaces';


export default {
    addProduct: (event:IpcMainInvokeEvent,product: ProductType) => {

        insertData(event,product);

    },
    getProducts: (event: IpcMainInvokeEvent, filters) => {
        getPaginateData(event, filters)
    }

}

