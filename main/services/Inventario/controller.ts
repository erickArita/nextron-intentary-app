import { IpcMainInvokeEvent as InvokeEvent } from 'electron'
import { Fields, Filters, ProductType } from './interfaces/productTypes'
import { deleteBy, edit, getPaginateData, insertData } from './dao'
import { Method } from '../../../api/enumChannels'


export const saveProduct = async (event: InvokeEvent, product: ProductType) => {
	const doc = await insertData(product)
	event.sender.send(Method.saveProduct, doc)
}

export const getPaginateProduct = async (event: InvokeEvent, field: Fields, filters: Filters = { limit: 10 }) => {
	const docs = await getPaginateData(field, filters)
	console.log(docs)
	event.sender.send(Method.getProducts, docs)
}

export const editProduct = async (event: InvokeEvent, filter: Fields) => {
	const docs = await edit(filter)
	event.sender.send(Method.editProducts, docs)
}

export const deleteProduct = async (event: InvokeEvent, filter: Fields) => {
	const docs = await deleteBy(filter)
	event.sender.send(Method.deleteProduct, docs)
}
