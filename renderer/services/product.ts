import { ipcRenderer } from 'electron'
import { useState } from 'react'
import { Method } from '../../api/enumChannels'


const fetch = (channel: Method) => (datasend) => {

    return ({
        send: () => {
            ipcRenderer.invoke(channel, datasend)
        },
        on: (setData) => {
            ipcRenderer.on(channel, (e, args) => {
                setData(data => [...data, args])
            })
        }
    })
}

const useFetch = (channel: Method, datasend: any) => {
    const [data, setData] = useState([])
    const listener = fetch(channel)
    const send = listener(datasend)
}