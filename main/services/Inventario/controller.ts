import { IpcMainInvokeEvent } from 'electron'
import { ProductType } from './interfaces/interfaces'
import models from './model'

export const saveProduct = (event: IpcMainInvokeEvent, { cantidad, descripcion, nombre, precio }: ProductType) => {

      models.addProduct(event, { cantidad, descripcion, nombre, precio })
}

export const getPaginateProduct = (event: IpcMainInvokeEvent, filters = { paginate: 10 }) => {

      models.getProducts(event, filters)
}
