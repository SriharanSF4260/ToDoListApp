
const list=document.getElementById("list");
const form=document.getElementById("new-task-form") as HTMLFormElement
const input=document.getElementById("new-task-title")  as HTMLInputElement

type Task= {title :string ,
     completed :boolean , 
     created :Date
    }
    const tasks:Task[]=[];

form.addEventListener("submit" , e =>{
    e.preventDefault()
    if(input?.value=="" || input?.value ==null) return 

    const newTask :Task= {
        title:input.value,
        completed:false,
        created:new Date()

    }
    tasks.push(newTask);

    addListItem(newTask)
    input.value='';

})

function addListItem(task :Task ) {
    const item=document.createElement("li")
    const label=document.createElement("label")
    const checkbox=document.createElement("input")
    checkbox.addEventListener("change", () => {
        task.completed=checkbox.checked
        console.log(tasks)
    })
    checkbox.type="checkbox"
    checkbox.checked=task.completed
    label.append(checkbox,task.title)
    item.append(label)
    list?.append(item)

}

function saveTasks() {
    localStorage.setItem("Tasks",JSON.stringify(tasks))
}

