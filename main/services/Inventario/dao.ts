// data acces object 
// esta es la capa que se comunica con la base de datos 
// e imprementa todo lo relacionado a interactuar con la db
import { IpcMainInvokeEvent } from 'electron/main';
import databases from '../../database/Database'
import { Filters, ProductType } from './interfaces/interfaces';

export const insertData = (event: IpcMainInvokeEvent, data: ProductType) => {

    databases.insert(data, (err, docs) => {

        event.sender.send('save-product', ['guardado', { error: err, data: docs }])
    })
}


export const getPaginateData = (event: IpcMainInvokeEvent, filters: Filters) => {
    databases.find({ precio: { $gte: 1000 } }).limit(filters.limit).exec((err, docs) => {

        event.sender.send('get-product', docs)

    })
}


