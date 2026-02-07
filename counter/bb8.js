let back=document.querySelector(".back")
let box=0
back.style.backgroundColor='skyblue'
let h1=document.querySelector("h1")
h1.innerHTML=`${box}`
let but1=document.querySelector(".zpone")
let but2=document.querySelector(".zptwo")
let but3=document.querySelector(".zprem")
but1.onclick=()=>{
    box++
    h1.textContent=box
}
but2.onclick=()=>{
    box--
    h1.textContent=box
   
}
but3.onclick=()=>{
    h1.innerHTML=""
    h1.innerHTML="0"
}
