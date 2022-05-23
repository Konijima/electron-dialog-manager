# electron-dialog-manager
Typescript wrapper to use async dialogs in electron renderer process.  

[![npm version](https://badge.fury.io/js/electron-dialog-manager.svg)](https://badge.fury.io/js/electron-dialog-manager)

## Install
```bash
npm install -s electron-dialog-manager
```

## Usage
Activate in the main process:
```ts
import { ElectronDialogManagerMain } from 'electron-dialog-manager'

ElectronDialogManagerMain.activate()
```

Use in a renderer process:
```ts
import { ElectronDialogManagerRenderer } from 'electron-dialog-manager'

ElectronDialogManagerRenderer.showMessageDialog({
    title: 'Hello',
    message: 'Hello world',
    buttons: [ 'Hey', 'Cancel' ]
})
.then((result) => {
    console.log(result.response)
})
```

## Main Process Methods
- [x] activate(): boolean
- [x] deactivate(): boolean

## Renderer Process Methods
- [x] showErrorBox(`title: string, content: string`): void
- [x] async showCertificateTrustDialog(`options: CertificateTrustDialogOptions`): Promise<void>
- [x] async showMessageBox(`options: MessageBoxOptions`): Promise<MessageBoxReturnValue>
- [x] async showOpenDialog(`options: OpenDialogOptions`): Promise<OpenDialogReturnValue>
- [x] async showSaveDialog(`options: SaveDialogOptions`): Promise<SaveDialogReturnValue>
