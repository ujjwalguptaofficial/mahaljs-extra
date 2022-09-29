import { Component, reactive } from "mahal";
import { template } from "@mahaljs/util";


class BaseComponent extends Component {
}

@template(`
<div>
    <div class="input-container">
        <input type="text" :model(name) /> 
        <button @click="addStudentUsingInput">Add Student</button>
    </div>
    <table>
      <tr :for(student in students)>
       <td>{{student.name}}</td>
       <td on:click="addStudent"><button>Add Student</button></td>
      </tr>
    </table>
</div>
`)
export default class extends BaseComponent {

    name = "";

    @reactive
    students = [{
        name: 'ujjwal'
    }]

    @reactive
    flag = true;

    addStudent() {
        this.students.push({
            name: 'ujjwal1'
        });
    }

    addStudentUsingInput() {
        this.students.push({
            name: this.name
        });
    }


}

