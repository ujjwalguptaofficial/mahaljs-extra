import { Component, Template } from "mahal";

@Template("<div on:click='say'>{{name}}</div>")
export default class HelloWorld extends Component {
    name = "ujjwal gupta";

    say() {
        window.alert("Hello World");
    }
}