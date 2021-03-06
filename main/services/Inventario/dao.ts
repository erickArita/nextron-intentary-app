// data acces object 
// esta es la capa que se comunica con la base de datos 
// e imprementa todo lo relacionado a interactuar con la db
import databases from '../../database/Database'
import { ProductType, findBy, sortBy } from './interfaces/productTypes';

export const insertData = async (data: ProductType) => {
    try {
        const doc = await databases.insert(data);
        return doc
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getPaginateData = async (field?: findBy | {}, sortBy?: sortBy | {}, limit = 1) => {
    try {
        return await databases.find(field)
            .limit(limit)
            .sort(sortBy)
            .exec()
    } catch (error) {
        console.log(error)
        return error
    }
}
export const getDataById = async (id) => {
    try {
        return await databases.find(id)
    } catch (error) {
        console.log(error)
        return error
    }
}


export const edit = async (field: Fields, multi: boolean = false) => {
    try {
        const docs = await databases.update({ field }, { multi: multi })
        return docs;
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteBy = async (field: Fields, multi: boolean = false) => {
    try {
        const docs = await databases.remove({ field }, { multi: multi })
        return docs;
    } catch (error) {
        console.log(error)
        return error
    }
}

