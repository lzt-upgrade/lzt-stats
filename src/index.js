import MenuButton from "./ui/MenuButton.svelte"

import AjaxHook from "./hooks/ajax.js"

const app = new (class {
  constructor() {
    this.lang = XenForo?.visitor?.language_id === 1 ? "en_US" : "ru_RU"
  }

  init() {
    AjaxHook.init()
    this.render()
  }

  render() {
    const menu = document.querySelector(
      "#AccountMenu > ul:nth-child(1) > li:nth-child(10)",
    )

    const menuItem = document.createElement("li")
    new MenuButton({ target: menuItem, props: { lang: this.lang } })
    menu.insertAdjacentElement("afterend", menuItem)
  }
})()

app.init()
