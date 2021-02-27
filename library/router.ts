import { ipcMain as main } from 'electron'
import { Method, Service, } from '../api/enumChannels'



export const handle = (service: Service) => {
    const channelCreator = (m: Method) => `${m}${service}`
    const handler = (method: Method, cb) => {
        const channel = channelCreator(method)
        return main.handle(channel, (...args) => cb(args, channel))
    }
    const apiMethods = {
        save: cb => handler('save', cb),
        get: cb => handler('get', cb),
        edit: cb => handler('edit', cb),
        del: cb => handler('delete', cb)
    }
    return apiMethods
}