import { Children, Reactive, Component } from "mahal";
import Student from "./student";
import { Template } from "@mahaljs/util";

@Template(`<Student/>`)
@Children({
    Student
})
export default class Main extends Component {

    @Reactive
    flag = true

    onClick() {
        this.flag = false
    }

}