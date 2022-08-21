import { Component, Template, Reactive } from "mahal";

@Template(`<div>
    <div id="counter">{{name | upper}}</div>
</div>`)
export default class extends Component {
    @Reactive
    name = 'ujjwal';

}