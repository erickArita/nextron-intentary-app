// data acces object 
// esta es la capa que se comunica con la base de datos 
// e imprementa todo lo relacionado a interactuar con la db
import { IpcMainInvokeEvent } from 'electron/main';
import databases from '../../database/Database'
import { Filters, ProductType } from './interfaces/interfaces';

export const insertData = async (data: ProductType) => {
    try {
        const doc = await databases.insert(data);
        return doc
    } catch (error) {
        console.log(error)
    }
}

export const getPaginateData = async(filters: Filters) => {
    try {
        const doc =await databases.find({ precio: { $gte: 1000 } })
            .limit(filters.limit)
            .skip(2)
            .exec()
        return doc;
    } catch (error) {
        console.log(error)

    }

}


