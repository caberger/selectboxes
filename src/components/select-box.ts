import produce from "immer"
import { html, render } from "lit-html"
import { distinctUntilChanged, map } from "rxjs"
import store from "../model/store"
import { User } from "../user/user"

const userTemplate = (user: User) => html`
    <div @click=${() => userSelected(user)} class="selectable-element">
        <span class="light">${user.firstName}</span> ${user.lastName}
    </div>
`
const AVAILABLE = "available"
const TYPE_ATTRIBUTE_NAME = "type"

function userSelected(selectedUser: User) {
    const model = produce(store.getValue(), draft => {
        const remainInAvailable = draft.availableUsers.filter(user => user.id != selectedUser.id)
        const remainInSelected = draft.selectedUsers.filter(user => user.id != selectedUser.id)
        const users = remainInAvailable.length == draft.availableUsers.length ? remainInAvailable : remainInSelected
        users.push(selectedUser)
        draft.availableUsers = remainInAvailable
        draft.selectedUsers = remainInSelected
    })
    store.next(model)
}

class SelectBox extends HTMLElement {
    private type: string = AVAILABLE

    static get observedAttributes() {
        return [TYPE_ATTRIBUTE_NAME]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store
            .pipe(
                map(model => this.type == AVAILABLE ? model.availableUsers : model.selectedUsers),
                distinctUntilChanged()
            )
            .subscribe(users => this.render(users))        
    }
    private render(allUsers: User[]) {
        const users = [...allUsers].sort((l, r) => l.lastName.localeCompare(r.lastName))

        const userTemplates = users.map(user => userTemplate(user))
        const template = html`
            <link rel="stylesheet" href="./css/styles.css"/>
            ${userTemplates}
        `
        render(template, this.shadowRoot)
    }
    attributeChangedCallback(name: string, _old: string, value: string) {
        switch(name) {
            case TYPE_ATTRIBUTE_NAME:
                this.type = value
                break
            default:
                console.error(`unknown attribute ${name} changed to ${value}`)
                break
        }
    }
}
customElements.define("select-box", SelectBox)