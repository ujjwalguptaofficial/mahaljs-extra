import { Component, Computed } from "mahal";
import { initiate, mount } from "mahal-test-utils";
import { createSandbox, spy } from "sinon";
import { clone } from "./clone";
import { Watch, Template } from "@mahaljs/util";

@Template(`
<div>dd</div>
`)
export default class WatchDecorators extends Component {
    fruits = [];

    initialFruits = ["Banana", "Orange", "Apple", "Mango"]

    onInit(): void {
        window['fruitsComp'] = this;
    }

    @Computed('fruits')
    fruitsLength() {
        return this.fruits.length;
    }

    @Computed('fruits')
    fruitsObject() {
        const obj = {};
        this.fruits.forEach(fruit => {
            obj[fruit] = fruit;
        })
        return obj;
    }

    initializeFruit() {
        this.setState('fruits', clone(this.initialFruits));
    }

    @Watch('fruits')
    onFruitsChange(newValue, oldValue) {
        console.log('onFruitsChange', newValue, oldValue)
    }

    @Watch('fruitsLength')
    onFruitsLengthChange(newValue, oldValue) {
        console.log('onFruitsLengthChange', newValue, oldValue)
    }
}

describe("Watch decorator", () => {
    let component: WatchDecorators;
    before(async () => {
        component = await mount<WatchDecorators>(WatchDecorators);
    })



    it("initialize fruits", () => {
        let sandbox = createSandbox();
        const spy = sandbox.spy(console, "log");

        component.initializeFruit();
        sandbox.assert.calledTwice(spy);
        sandbox.assert.calledWith(spy.firstCall, 'onFruitsChange', component.initialFruits, []);
        sandbox.assert.calledWith(spy.secondCall, 'onFruitsLengthChange', 4, 0);
        sandbox.restore();
    })
})