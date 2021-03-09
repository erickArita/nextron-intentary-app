import { IpcMainInvokeEvent as InvokeEvent } from 'electron'
import { deleteBy, edit, getDataById, getPaginateData, insertData } from './dao'


export const saveProduct = async (req, res) => {
	console.log(req, 'req')
	const data = await insertData(req)
	res(data)
}

export const getPaginateProducts = async (req, res) => {

	console.log(req);
	const docs = await getPaginateData({}, { createdAt: -1 }, 10)
	res(docs);
	// console.log(docs)
}
export const getProduct = async (req, res) => {
	const { id } = req
	const docs = await getDataById(id)
	res(docs);
}

export const editProduct = async (event: InvokeEvent, filter) => {
	const docs = await edit(filter)
}

export const deleteProduct = async (event: InvokeEvent, filter) => {
	const docs = await deleteBy(filter)
}
