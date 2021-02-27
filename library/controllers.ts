import { IpcMainInvokeEvent as InvokeEvent } from "electron/main"
import { Method } from "../api/enumChannels"
import { ProductType } from "../main/services/Inventario/interfaces/productTypes"


export const saveProduct = async (e: InvokeEvent, product: ProductType) => {

    const response = (channel: Method, doc) => e.sender.send(channel, doc)
    
    const doc = await insertData(product)
}