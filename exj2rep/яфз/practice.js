let box = document.querySelector(".box")
 let users = JSON.parse(localStorage.getItem("data"))||[]
 let Form = document.querySelector("Form") 
 
 
 
 
 // [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     status: true,
//     job: "Frontend Developer",
//     address: "12 Green Street",
//     city: "New York"
//   },
//   {
//     id: 2,
//     name: "Maria Lopez",
//     status: false,
//     job: "UI/UX Designer"
   
//   },
//     { 
//     id: 3,
//     name: "David Smith",
//     status: true,
//     job: "Backend Developer"
 
//   },
//     {
//     id: 4,
//     name: "Emily Davis",
//     status: false,
//     job: "Project Manager"
    
//   },
//     {
//     id: 5,
//     name: "Michael Brown",
//     status: true,
//     job: "Full Stack Developer"
   
//   }
// ]
Form.onsubmit = (e) => {
    e.preventDefault()
    let obj={
        id:Date.now(),
        name:Form.name.value,
        job:Form.job.value
        
    }
    users.push(obj)
    localStorage.setItem("data",JSON.stringify(users))
    showUsers()
    Form.reset()
}








function deleteUser(id) {
    users = users.filter((e) => e.id !== id)
    localStorage.setItem("data", JSON.stringify(users))
    showUsers()
}




function showUsers() {
  box.innerHTML = ""
  users.forEach((e) => {
    let tr = document.createElement("tr")
    let tdId = document.createElement("td")
    let tdName = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdJob = document.createElement("td")
    let tdActions = document.createElement("td")
    let deleteBtn = document.createElement("button")
    let editBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    editBtn.innerText = "Edit"
     tdId.innerText = e.id
    tdName.innerText = e.name
    tdStatus.innerText = e.status ? "Active" : "Inactive"
    tdJob.innerText = e.job

    deleteBtn.onclick = () => deleteUser(e.id)
    tdActions.append(deleteBtn, editBtn)
    tr.append(tdId, tdName, tdStatus, tdJob, tdActions)
    box.append(tr)
  })
}

showUsers()
