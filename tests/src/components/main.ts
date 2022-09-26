import { Children, Reactive, Component } from "mahal";
import Student from "./student";
import { template } from "@mahaljs/util";

@template(`<Student/>`)
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