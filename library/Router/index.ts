import { ipcMain as main } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'
import { Method, Service, } from '../../api/enumChannels'



const Route = (service: Service) => {
    const channelCreator = (m: Method, sufix: string = '') => `${m}${service}${sufix}`
    let counter = 0
    const handler = (method: Method, sufix: string, cb) => {
        counter++
        //canal en el que escucha nuestra aplicacion ,vienen de la interfaz Method
        //se usaran las mismas con los listeners del renderer
        const channel = channelCreator(method, sufix)
        console.log(counter)
        //data que viene del renderer
        const req = (data) => {
            return data
        }

        //respuesta que daremos al renderer
        const response = (e: IpcMainInvokeEvent) => (data: {} = null) => {
            e.sender.send(channel, data)
        }

        //este sera el controlador personalizado que pasemos
        const listener = (e: IpcMainInvokeEvent, data: {} = null) => {

            return cb(req(data), response(e))
        }

        return main.handle(channel, listener)
    }

    const apiMethods = {
        save: (cb, sufixCH?: string) => handler('save', sufixCH, cb),
        get: (cb, sufixCH?: string) => handler('get', sufixCH, cb),
        edit: (cb, sufixCH?: string) => handler('edit', sufixCH, cb),
        del: (cb, sufixCH?: string) => handler('delete', sufixCH, cb)
    }
    return apiMethods
}

export default Route