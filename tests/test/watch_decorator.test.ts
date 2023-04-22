import { Component, computed } from "mahal";
import { initiate, mount } from "@mahaljs/test-utils";
import { createSandbox, spy } from "sinon";
import { clone } from "./clone";
import { watch, template, on } from "@mahaljs/util";

@template(`
<div>dd</div>
`)
export default class WatchDecorators extends Component {
    fruits = [];

    initialFruits = ["Banana", "Orange", "Apple", "Mango"]

    onInit(): void {
        window['fruitsComp'] = this;
    }

    @on('mount')
    onMount() {
        console.log('mounted');
    }

    @on('create')
    onCreate() {
        console.log('created');
    }

    @computed('fruits')
    fruitsLength() {
        return this.fruits.length;
    }

    @computed('fruits')
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

    @watch('fruits')
    onFruitsChange(newValue, oldValue) {
        console.log('onFruitsChange', newValue, oldValue)
    }

    @watch('fruitsLength')
    onFruitsLengthChange(newValue, oldValue) {
        console.log('onFruitsLengthChange', newValue, oldValue)
    }

    @on('click')
    onClick() {
        console.log('click emitted');
    }
}

describe("Watch decorator", () => {
    let component: WatchDecorators;
    let sandbox = createSandbox();
    const consoleSpy = sandbox.spy(console, "log");

    before(async () => {
        component = await mount<WatchDecorators>(WatchDecorators);
    })

    it('check for mounted and created', () => {
        sandbox.assert.calledTwice(consoleSpy);
        sandbox.assert.calledWith(consoleSpy.firstCall, 'created');
        sandbox.assert.calledWith(consoleSpy.secondCall, 'mounted');
        consoleSpy.restore();
    })

    it("check for onFruitsChange & onFruitsLengthChange call", () => {
        const spy = sandbox.spy(console, "log");

        component.initializeFruit();
        sandbox.assert.calledTwice(spy);
        sandbox.assert.calledWith(spy.firstCall, 'onFruitsChange', component.initialFruits, []);
        sandbox.assert.calledWith(spy.secondCall, 'onFruitsLengthChange', 4, 0);
        sandbox.restore();
    })

    it("custom event call", () => {
        const spy = sandbox.spy(console, "log");

        component.emit('click');
        sandbox.assert.calledOnce(spy);
        sandbox.assert.calledWith(spy.firstCall, 'click emitted');
        sandbox.restore();
    })

    // it('destroy', () => {
    //     const els = component['_events_']
    //     component.element.remove();
    // })
})