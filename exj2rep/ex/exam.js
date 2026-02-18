let box = document.querySelector(".box")
let addForm = document.querySelector(".addForm")
let submit = document.querySelector(".submit")
let idx = null

let users = [
  {
    id: 1,
    name: "Alex Johnson",
    status: true,
    job: "Frontend Developer",
    address: "12 Green Street",
    city: "New York"
  },
  {
    id: 2,
    name: "Maria Lopez",
    status: false,
    job: "UI/UX Designer",
    address: "45 Sunset Avenue",
    city: "Los Angeles"
  },
    { 
    id: 3,
    name: "David Smith",
    status: true,
    job: "Backend Developer",
    address: "78 Oak Lane",
    city: "Chicago"
  },
    {
    id: 4,
    name: "Emily Davis",
    status: false,
    job: "Project Manager",
    address: "34 Pine Road",
    city: "San Francisco"
  },
    {
    id: 5,
    name: "Michael Brown",
    status: true,
    job: "Full Stack Developer",
    address: "56 Maple Street",
    city: "Seattle"
  }
]

function deleteUser(id) {
  users = users.filter((e) => e.id !== id)
  showUsers()
}

addForm.onsubmit = (e) => {
  e.preventDefault()

  let obj = {
    id: idx ? idx : Date.now(),
    name: addForm["name"].value,
    status: addForm["status"].value == "true",
    job: addForm["job"].value,
    address: addForm["address"].value,
    city: addForm["city"].value
  }

  if (idx) {
    users = users.map((e) =>
      e.id == idx ? obj : e
    )
    submit.innerHTML = "Add User"
    idx = null
  } else {
    users.push(obj)
  }

  addForm.reset()
  showUsers()
}

function editUser(e) {
  idx = e.id
  submit.innerHTML = "Edit User"

  addForm["name"].value = e.name
  addForm["status"].value = e.status ? "true" : "false"
  addForm["job"].value = e.job
  addForm["address"].value = e.address
  addForm["city"].value = e.city
}

function infoUser(user) {
  alert(
`Name: ${user.name}
Status: ${user.status ? "Active" : "Inactive"}
Job: ${user.job}
Address: ${user.address}
City: ${user.city}`
  )
}

function showUsers() {
  box.innerHTML = ""

  users.forEach((e) => {
    let tr = document.createElement("tr")
    tr.classList.add("tableRow")

    let tdName = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdJob = document.createElement("td")
    let tdAddress = document.createElement("td")
    let tdCity = document.createElement("td")
    let tdAction = document.createElement("td")

    let btnDelete = document.createElement("button")
    let btnEdit = document.createElement("button")
    let btnInfo = document.createElement("button")

    tdName.innerHTML = e.name
    tdStatus.innerHTML = e.status ? "Active" : "Inactive"
    tdStatus.classList.add(e.status ? "active" : "inactive")
    tdJob.innerHTML = e.job
    tdAddress.innerHTML = e.address
    tdCity.innerHTML = e.city

    btnDelete.innerHTML = "🗑️"
    btnEdit.innerHTML = "⚙️"
    btnInfo.innerHTML = "🪪"
btnDelete.classList.add("deleteBTN")
btnEdit.classList.add("editBTN")
btnInfo.classList.add("infoBTN")
    btnDelete.onclick = () => deleteUser(e.id)
    btnEdit.onclick = () => editUser(e)
    btnInfo.onclick = () => infoUser(e)

    tdAction.append(btnInfo, btnEdit, btnDelete)
    tr.append(tdName, tdStatus, tdJob, tdAddress, tdCity, tdAction)
    box.append(tr)
  })
}

showUsers()
