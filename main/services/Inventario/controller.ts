import { IpcMainInvokeEvent } from 'electron'
import { Filters, ProductType } from './interfaces/productTypes'
import { getPaginateData, insertData } from './dao'

export const saveProduct = async(event: IpcMainInvokeEvent, product: ProductType) => {
	const doc = await insertData(product)
	event.sender.send('save-product', doc)
}

export const getPaginateProduct =  async(
	event: IpcMainInvokeEvent,
	filters: Filters = { limit: 10 }
) => {
	const docs = await getPaginateData(filters)
	console.log(docs)
	event.sender.send('get-product', docs)
}
