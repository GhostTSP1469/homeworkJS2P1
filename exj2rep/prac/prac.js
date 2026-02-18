let box=document.querySelector('.box');
let users = JSON.parse(localStorage.getItem("data"))||[]
let Form = document.querySelector('Form');
let submit=document.querySelector('.submit')
Form.onsubmit = (e) => {
    e.preventDefault()
    let obj={
        id:Date.now(),
        name:Form["name"].value,
        job:Form["job"].value,
        status:Form["status"].value === "active" ? true : false
        
    }
    users.push(obj)
    localStorage.setItem("data",JSON.stringify(users))
    showUsers()
    Form.reset()
}





function infoUser(id){
let infoModal=document.querySelector(".infoModal")
let user=users.find((e)=>e.id===id)
infoModal.innerHTML=`<h2>${user.name}</h2><p>Job: ${user.job}</p><p>Status: ${user.status ? "Active" : "Inactive"}</p>`
let closeBtn=document.createElement("button")
closeBtn.innerText="Close"
closeBtn.onclick=()=>{
    infoModal.close()
}
infoModal.append(closeBtn)
infoModal.showModal()
}





function deleteUser(id) {
  users = users.filter((e) => e.id !== id)
  localStorage.setItem("data", JSON.stringify(users))
  showUsers()
}


editUser = (e) => {
submit.innerText = "Edit"
let user = users.find((el) => el.id === e)
Form["name"].value = user.name
Form["job"].value = user.job
Form["status"].value = user.status ? "active" : "inactive"
Form.onsubmit = (event) => {
  event.preventDefault()
  user.name = Form["name"].value
  user.job = Form["job"].value
  user.status = Form["status"].value === "active" ? true : false
  localStorage.setItem("data", JSON.stringify(users))
  showUsers()
  Form.reset()
  submit.innerText = "Add User"
   
}
 

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
    let checkbox=document.createElement("input")
    let infoBtn=document.createElement("button")
    checkbox.type="checkbox"
    checkbox.checked=e.status
    infoBtn.innerText="Info"
    deleteBtn.innerText = "Delete"
    editBtn.innerText = "Edit"
     tdId.innerText = e.id
    tdName.innerText = e.name
    tdStatus.innerText = e.status ? "Active" : "Inactive"
    tdJob.innerText = e.job

    deleteBtn.onclick = () => deleteUser(e.id)
    editBtn.onclick = () => {editUser(e.id)}
    infoBtn.onclick=()=>{infoUser(e.id)}
    checkbox.onchange=()=>{
        users=users.map((el)=>{
            if(el.id===e.id){
                el.status=checkbox.checked
            }
            return el
        })
        localStorage.setItem("data",JSON.stringify(users))
        showUsers()
    }
   

    tdActions.append(deleteBtn, editBtn,infoBtn)
    tdStatus.append(checkbox)
    tr.append(tdId, tdName,  tdJob,tdStatus, tdActions)
    box.append(tr)
  })
}

showUsers()