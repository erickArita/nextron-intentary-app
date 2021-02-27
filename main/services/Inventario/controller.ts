import { IpcMainInvokeEvent as InvokeEvent } from 'electron'
import { Fields, Filters, ProductType } from './interfaces/productTypes'
import { deleteBy, edit, getPaginateData, insertData } from './dao'
import { Method } from '../../../api/enumChannels'




export const saveProduct = async (event: InvokeEvent, product: ProductType, channel) => {
	
	// const doc = await insertData(product)
	console.log(channel)
}

export const getPaginateProduct = async (event: InvokeEvent, field: Fields, filters: Filters = { limit: 10 }) => {
	const docs = await getPaginateData(field, filters)
	console.log(docs)
}

export const editProduct = async (event: InvokeEvent, filter: Fields) => {
	const docs = await edit(filter)
}

export const deleteProduct = async (event: InvokeEvent, filter: Fields) => {
	const docs = await deleteBy(filter)
}
