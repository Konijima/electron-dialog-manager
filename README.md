# electron-dialog-manager

## Install
```bash
npm install -s electron-dialog-manager
```

## Usage
Initialize in the main process:
```ts
import { DialogManagerMain } from 'electron-dialog-manager'

DialogManagerMain()
```

Use in your renderer process:
```ts
import { DialogManagerRenderer } from 'electron-dialog-manager'

DialogManagerRenderer.MessageDialog({
    title: 'Hello',
    message: 'Hello world',
    buttons: [ 'Hey', 'Cancel' ]
})
.then((result) => {
    console.log(result.response)
})
```
