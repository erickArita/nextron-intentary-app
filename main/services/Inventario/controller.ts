import { IpcMainInvokeEvent } from 'electron'
import models, { ProductType } from './model'

export const saveProduct = (_event: IpcMainInvokeEvent, { cantidad, descripcion, nombre, precio }: ProductType) => {

      models.addProduct({ cantidad, descripcion, nombre, precio })
      return 'cerdo'
}
