import { 
    ipcRenderer, 
    MessageBoxOptions, 
    OpenDialogOptions, 
    SaveDialogOptions,
    MessageBoxReturnValue, 
    OpenDialogReturnValue,
    SaveDialogReturnValue
} from 'electron'

function getId() {
    return (Math.random() + Date.now()).toString(36)
}

export async function MessageDialog(options: MessageBoxOptions): Promise<MessageBoxReturnValue> {
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_messageDialog', _id, options)
        function handle(_: any, id: string, result: MessageBoxReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_messageDialog', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_messageDialog', handle)
    })
}

export async function OpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_openDialog', _id, options)
        function handle(_: any, id: string, result: OpenDialogReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_messageDialog', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_openDialog', handle)
    })
}

export async function SaveDialog(options: SaveDialogOptions): Promise<SaveDialogReturnValue> {
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_saveDialog', _id, options)
        function handle(_: any, id: string, result: SaveDialogReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_messageDialog', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_saveDialog', handle)
    })
}
