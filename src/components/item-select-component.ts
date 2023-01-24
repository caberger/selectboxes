import { html, render } from "lit-html"
import "./select-box"

const template = html`
<div id="item-selector">
<link rel="stylesheet" href="./css/styles.css" />

    <div class="container">
        <select-box class="select-box" id="available" type="available">
        </select-box>
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
       render(template, this.shadowRoot)
    }
}
customElements.define("item-select", ItemSelectComponent)