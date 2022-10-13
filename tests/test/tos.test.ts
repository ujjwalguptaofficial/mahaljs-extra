import { Component, prop, formatter, reactive } from "mahal";
import { template } from "@mahaljs/util";
import { getMount } from "@mahaljs/test-utils";
import { app } from "../src";
import { expect } from "chai";
import { createRenderer } from "@mahaljs/html-compiler";

app.extend.setRenderer(createRenderer);

@template(`
<button class="btn" on:click="handleClick">{{label | toS | toUpper}}</button>
`)

export default class Btn extends Component {

    @prop()
    label;

    handleClick() {
        this.emit('click');
    }

    @formatter('toUpper')
    toUpper(value) {
        return value.toUpperCase();
    }
}

describe('tos formatter', function () {

    let component: Component;

    it("string prop", async function () {

        const mountWithApp = getMount(app);
        component = await mountWithApp(Btn, {
            props: {
                label: "ujjwal"
            }
        });
        // console.log('data', component.element.outerHTML);
        const data = component.element.textContent.trim();
        expect(data).equal("UJJWAL");
    });

});