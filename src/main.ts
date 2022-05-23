import { 
    ipcMain,
    IpcMainEvent,
    dialog,

    CertificateTrustDialogOptions,
    MessageBoxOptions,
    OpenDialogOptions,
    SaveDialogOptions,

    MessageBoxReturnValue,
    OpenDialogReturnValue,
    SaveDialogReturnValue
} from 'electron'

function showErrorBox(ev: IpcMainEvent, title: string, content: string) {
    dialog.showErrorBox(title, content)
}

function showCertificateTrustDialog(ev: IpcMainEvent, id: string, options: CertificateTrustDialogOptions) {
    dialog.showCertificateTrustDialog(options).then(() => {
        ev.sender.send('edm_showCertificateTrustDialog', id)
    })
}

function showMessageBox(ev: IpcMainEvent, id: string, options: MessageBoxOptions) {
    dialog.showMessageBox(options).then((result: MessageBoxReturnValue) => {
        ev.sender.send('edm_showMessageBox', id, result)
    })
}

function showOpenDialog(ev: IpcMainEvent, id: string, options: OpenDialogOptions) {
    dialog.showOpenDialog(options).then((result: OpenDialogReturnValue) => {
        ev.sender.send('edm_showOpenDialog', id, result)
    })
}

function showSaveDialog(ev: IpcMainEvent, id: string, options: SaveDialogOptions) {
    dialog.showSaveDialog(options).then((result: SaveDialogReturnValue) => {
        ev.sender.send('edm_showSaveDialog', id, result)
    })
}

let activated = false

function isMainProcess() {
    return (process && process.type === 'browser')
}

export class ElectronDialogManagerMain {

    /**
     * Activate dialog manager in the main process
     * @returns return true if it has been activated
     */
    public static activate(): boolean {
        if (isMainProcess() === false) throw new Error('ElectronDialogManagerMain can only be activated in the main process.')
        if (activated === true) return false
        activated = true

        ipcMain.on('edm_showErrorBox', showErrorBox)
        ipcMain.on('edm_showCertificateTrustDialog', showCertificateTrustDialog)
        ipcMain.on('edm_showMessageBox', showMessageBox)
        ipcMain.on('edm_showOpenDialog', showOpenDialog)
        ipcMain.on('edm_showSaveDialog', showSaveDialog)
        return true
    }

    /**
     * Deactivate dialog manager if needed
     * @returns return true if it has been deactivated
     */
    public static deactivate(): boolean {
        if (isMainProcess() === false) throw new Error('ElectronDialogManagerMain can only be deactivated from the main process.')
        if (activated === false) return false
        activated = false

        ipcMain.off('edm_showErrorBox', showErrorBox)
        ipcMain.off('edm_showCertificateTrustDialog', showCertificateTrustDialog)
        ipcMain.off('edm_showMessageBox', showMessageBox)
        ipcMain.off('edm_showOpenDialog', showOpenDialog)
        ipcMain.off('edm_showSaveDialog', showSaveDialog)
        return true
    }

}
