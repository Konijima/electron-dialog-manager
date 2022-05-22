import { 
    ipcMain, 
    dialog, 
    MessageBoxOptions, 
    OpenDialogOptions, 
    SaveDialogOptions, 
    MessageBoxReturnValue, 
    OpenDialogReturnValue,
    SaveDialogReturnValue
} from 'electron'

let set = false
export default function() {
    if (set) return
    else set = true

    ipcMain.on('edm_messageDialog', (ev, id: string, options: MessageBoxOptions) => {
        dialog.showMessageBox(options).then((result: MessageBoxReturnValue) => {
            ev.sender.send('edm_messageDialog', id, result)
        })
    })
    
    ipcMain.on('edm_openDialog', (ev, id: string, options: OpenDialogOptions) => {
        dialog.showOpenDialog(options).then((result: OpenDialogReturnValue) => {
            ev.sender.send('edm_openDialog', id, result)
        })
    })
    
    ipcMain.on('edm_saveDialog', (ev, id: string, options: SaveDialogOptions) => {
        dialog.showSaveDialog(options).then((result: SaveDialogReturnValue) => {
            ev.sender.send('edm_saveDialog', id, result)
        })
    })
}
