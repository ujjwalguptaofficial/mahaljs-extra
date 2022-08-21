import { Component, Template, Reactive } from "mahal";

class BaseComponent extends Component {
}

@Template(`
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

    @Reactive
    students = [{
        name: 'ujjwal'
    }]

    @Reactive
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

