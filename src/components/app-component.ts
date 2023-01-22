import produce from "immer"
import { html, render } from "lit-html"
import store from "../model/store"
import userService from "../user/user-service"

import "./item-select-component"

const template = html`
<div>
    <item-select></item-select>
</div>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        
    }
    async connectedCallback() {
        const users = await userService.getAll()
        const next = produce(store.getValue(), draft => {
            draft.availableUsers = users
        })
        store.next(next)
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }
}
customElements.define("app-component",AppComponent)