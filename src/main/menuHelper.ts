import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'

export class MenuHelper {
  private mainMenuTemplate: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          role: 'close'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          label: 'Mode',
          submenu: [
            {
              label: 'Development',
              click: () => {
                this.browserWindow.webContents.send('menu', 'development')
              }
            },
            {
              label: 'Production',
              click: () => {
                this.browserWindow.webContents.send('menu', 'production')
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            this.browserWindow.webContents.send('menu', 'about')
          }
        }
      ]
    }
  ]

  constructor(private browserWindow: BrowserWindow) {}

  get mainMenu(): Menu {
    return Menu.buildFromTemplate(this.mainMenuTemplate)
  }
}
