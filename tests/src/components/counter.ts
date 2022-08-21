import { Component, Template, Reactive } from "mahal";

@Template(`<div>
    <div id="counter">{{counter}}</div>
    <button id="btnIncrement" on:click='increment'>Increment</button>
    <button id="btnDecrement" on:click='decrement'>Decrement</button>
</div>`)
export default class extends Component {
    @Reactive
    counter = 0;

    increment() {
        console.log("triggered increment");
        ++this.counter;
    }

    decrement() {
        --this.counter;
    }
}