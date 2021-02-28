import { ipcMain as main } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'
import { Method, Service, } from '../../api/enumChannels'



const Route = (service: Service) => {
    const channelCreator = (m: Method) => `${m}${service}`
    let counter = 0
    const handler = (method: Method, cb) => {
        counter++
        //canal en el que escucha nuestra aplicacion ,vienen de la interfaz Method
        //se usaran las mismas con los listeners del renderer
        const channel = channelCreator(method)
        console.log(counter)
        //data que viene del renderer
        const req = (data) => {
            return data
        }

        //respuesta que daremos al renderer
        const response = (e: IpcMainInvokeEvent) => (data: {} = null) => {
            console.log(channel,data)
            e.sender.send(channel, data)
        }

        //este sera el controlador personalizado que pasemos
        const listener = (e: IpcMainInvokeEvent, data: {} = null) => {

            return cb(req(data),  response(e))
        }

        return main.handle(channel, listener)
    }

    const apiMethods = {
        save: cb => handler('save', cb),
        get: cb => handler('get', cb),
        edit: cb => handler('edit', cb),
        del: cb => handler('delete', cb)
    }
    return apiMethods
}

export default Route