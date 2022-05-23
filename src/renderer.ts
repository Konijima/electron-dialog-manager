import { 
    ipcRenderer,
    
    CertificateTrustDialogOptions,
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

function isRendererProcess() {
    return (!process || process.type === 'renderer')
}

export function showErrorBox(title: string, content: string): void {
    if (isRendererProcess() === false) throw new Error('showErrorBox can only be called from the renderer process.')
    ipcRenderer.send('edm_showErrorBox', title, content)
}

export async function showCertificateTrustDialog(options: CertificateTrustDialogOptions): Promise<void> {
    if (isRendererProcess() === false) throw new Error('showCertificateTrustDialog can only be called from the renderer process.')
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_showCertificateTrustDialog', _id, options)
        function handle(_: any, id: string) {
            if (_id === id) {
                ipcRenderer.off('edm_showCertificateTrustDialog', handle)
                return resolve()
            }
        }
        ipcRenderer.on('edm_showCertificateTrustDialog', handle)
    })
}

export async function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue> {
    if (isRendererProcess() === false) throw new Error('showMessageBox can only be called from the renderer process.')
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_showMessageBox', _id, options)
        function handle(_: any, id: string, result: MessageBoxReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_showMessageBox', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_showMessageBox', handle)
    })
}

export async function showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    if (isRendererProcess() === false) throw new Error('showOpenDialog can only be called from the renderer process.')
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_showOpenDialog', _id, options)
        function handle(_: any, id: string, result: OpenDialogReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_showOpenDialog', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_showOpenDialog', handle)
    })
}

export async function showSaveDialog(options: SaveDialogOptions): Promise<SaveDialogReturnValue> {
    if (isRendererProcess() === false) throw new Error('showSaveDialog can only be called from the renderer process.')
    return new Promise((resolve) => {
        const _id = getId()
        ipcRenderer.send('edm_showSaveDialog', _id, options)
        function handle(_: any, id: string, result: SaveDialogReturnValue) {
            if (_id === id) {
                ipcRenderer.off('edm_showSaveDialog', handle)
                return resolve(result)
            }
        }
        ipcRenderer.on('edm_showSaveDialog', handle)
    })
}
