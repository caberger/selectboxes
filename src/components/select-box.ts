import produce from "immer"
import { distinctUntilChanged, map } from "rxjs"
import store from "../model/store"
import { User } from "../user/user"

/*
const userTemplate = (user: User) => html`
    <div class="selectable-element">${user.firstName} ${user.lastName}</div>
`
*/
const style = '<link rel="stylesheet" href="./css/styles.css" />'

const AVAILABLE = "available"

class SelectBox extends HTMLElement {
    private type: string = AVAILABLE

    static get observedAttributes() {
        return ["type"]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store.pipe(
            map(model => this.type == AVAILABLE ? model.availableUsers : model.selectedUsers),
            distinctUntilChanged()
        ).subscribe(users => {
            this.render(users)
        })        
    }
    private render(allUsers: User[]) {
        const users = [...allUsers].sort((l, r) => l.lastName.localeCompare(r.lastName))
        console.log("render", users)

        this.shadowRoot.innerHTML = style
        users.forEach(user => {
            const div = document.createElement("div")
            div.classList.add("selectable-element")
            div.innerHTML = `${user.firstName} ${user.lastName}`
            div.onclick = (e: Event) => {
                this.userSelected(user)
            }
            this.shadowRoot.appendChild(div)
        })
    }
    private userSelected(selectedUser: User) {
        const model = produce(store.getValue(), draft => {
            const remainInAvailable = draft.availableUsers.filter(user => user.id != selectedUser.id)
            const remainInSelected = draft.selectedUsers.filter(user => user.id != selectedUser.id)
            if (remainInAvailable.length == draft.availableUsers.length) {
                remainInAvailable.push(selectedUser)
            } else {
                remainInSelected.push(selectedUser)
            }
            draft.availableUsers = remainInAvailable
            draft.selectedUsers = remainInSelected
        })
        store.next(model)
    }
    attributeChangedCallback(name: string, _old: string, value: string) {
        switch(name) {
            case "type":
                this.type = value
                break
            default:
                console.log(`unknown attribute ${name} changed to ${value}`)
                break;
        }
    }
}
customElements.define("select-box", SelectBox)