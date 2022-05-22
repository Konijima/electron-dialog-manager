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

function certificateDialog(ev: IpcMainEvent, id: string, options: CertificateTrustDialogOptions) {
    dialog.showCertificateTrustDialog(options).then(() => {
        ev.sender.send('edm_certificateDialog', id)
    })
}

function errorDialog(ev: IpcMainEvent, title: string, content: string) {
    dialog.showErrorBox(title, content)
}

function messageDialog(ev: IpcMainEvent, id: string, options: MessageBoxOptions) {
    dialog.showMessageBox(options).then((result: MessageBoxReturnValue) => {
        ev.sender.send('edm_messageDialog', id, result)
    })
}

function openDialog(ev: IpcMainEvent, id: string, options: OpenDialogOptions) {
    dialog.showOpenDialog(options).then((result: OpenDialogReturnValue) => {
        ev.sender.send('edm_openDialog', id, result)
    })
}

function saveDialog(ev: IpcMainEvent, id: string, options: SaveDialogOptions) {
    dialog.showSaveDialog(options).then((result: SaveDialogReturnValue) => {
        ev.sender.send('edm_saveDialog', id, result)
    })
}

export class ElectronDialogManagerMain {

    private static isSet = false

    public static set() {
        if (this.isSet === true) return
        this.isSet = true

        ipcMain.on('edm_certificateDialog', certificateDialog)
        ipcMain.on('edm_errorDialog', errorDialog)
        ipcMain.on('edm_messageDialog', messageDialog)
        ipcMain.on('edm_openDialog', openDialog)
        ipcMain.on('edm_saveDialog', saveDialog)

    }

    public static unset() {
        if (this.isSet === false) return
        this.isSet = false

        ipcMain.off('edm_certificateDialog', certificateDialog)
        ipcMain.off('edm_errorDialog', errorDialog)
        ipcMain.off('edm_messageDialog', messageDialog)
        ipcMain.off('edm_openDialog', openDialog)
        ipcMain.off('edm_saveDialog', saveDialog)
    }

}
