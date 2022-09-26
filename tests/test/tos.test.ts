import { Component, Prop, Formatter, Reactive } from "mahal";
import { template } from "@mahaljs/util";
import { getMount } from "@mahaljs/test-utils";
import { app } from "../src";
import { expect } from "chai";
import { createRenderer } from "@mahaljs/html-compiler";

app.extend.renderer = createRenderer;

@template(`
<button class="btn" on:click="handleClick">{{label | toS | toUpper}}</button>
`)

export default class Btn extends Component {

    @Prop()
    label;

    handleClick() {
        this.emit('click');
    }

    @Formatter('toUpper')
    toUpper(value) {
        return value.toUpperCase();
    }
}

describe('tos Formatter', function () {

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