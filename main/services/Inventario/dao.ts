// data acces object 
// esta es la capa que se comunica con la base de datos 
// e imprementa todo lo relacionado a interactuar con la db
import { ipcMain as main } from 'electron';
import databases from '../../database/Database'
import { ProductType } from './model'
let doc = 1;
export const insertData = (data: ProductType) => {
    
    databases.insert(data )
    main.once('save-data?', (e, arg) => {
        e.sender.send('save-data?', ['ihii', `${arg}`, doc++,data])
    })

}



