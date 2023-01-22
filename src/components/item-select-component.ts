import { html, render } from "lit-html"
import { distinctUntilChanged, map } from "rxjs"
import store from "../model/store"
import "./select-box"

const template = html`
<div id="item-selector">
<link rel="stylesheet" href="./css/styles.css" />

    <div class="container">
        <select-box class="select-box" id="available" type="available">
        </select-box>
        <!-- too long for the available time in the exam
        <div>
            <div id="buttons"><button>&gt;&gt;</button></div>
            <div id="buttons"><button>&lt;&lt;</button></div>
        </div>
        -->
        <div id="buttons">&nbsp;</div>
        <select-box class="select-box" id="selected" type="selected">
        </select-box>
    </div>
</div>
`
class ItemSelectComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store.pipe(
            map(model => model.availableUsers),
            distinctUntilChanged()
        ).subscribe(users => {
            console.log("users loaded", users)
        })
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }
}
customElements.define("item-select", ItemSelectComponent)