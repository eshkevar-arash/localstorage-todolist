let inputElem=document.getElementById('itemInput')
let addBtn=document.getElementById('addButton')
let clearButton=document.getElementById('clearButton')
let todoListElement=document.getElementById('todoList')
let todoArray=[]
let newLine={}
let inputText,flag,content,status,currentLiName,index

function inputReset(){
    inputElem.value=''
    inputElem.focus()
}
function deleteLi(event){
    currentLiName=event.target.parentElement.firstElementChild.innerText
    index = todoArray.findIndex(function (line){
        return line['content'] == currentLiName
    })
    todoArray.splice(index,1)
    event.target.parentElement.remove()
    setLocalStorage(todoArray)
}
function changeStatusForToDoArray(liName,newStatus){
    index=todoArray.findIndex(function (line){
        return line['content'] == liName
    })
    todoArray[index].status = newStatus
    console.log(todoArray)
    setLocalStorage(todoArray)
}
function changeStatusLi(event){
    let currentStatus=event.target.innerText
    if (currentStatus == 'Complete'){
        event.target.innerText = 'InComplete'
    }else {
        event.target.innerText = 'Complete'
    }
    currentStatus=event.target.innerText
    currentLiName=event.target.parentElement.firstElementChild.innerText
    changeStatusForToDoArray(currentLiName,currentStatus)
}
function setLocalStorage(todoArray){
    localStorage.setItem('localArray',JSON.stringify(todoArray))
}
function addToDoListElement(line,currentStatus){
    let newLabel=document.createElement('label')
    newLabel.innerText = line['content']
    let newBtnStatus=document.createElement('button')
    newBtnStatus.className = 'btn btn-success'
    newBtnStatus.innerText=currentStatus
    newBtnStatus.setAttribute('onclick','changeStatusLi(event)')
    let newBtnDelete=document.createElement('button')
    newBtnDelete.className = 'btn btn-danger'
    newBtnDelete.innerText = 'Delete'
    newBtnDelete.setAttribute('onclick','deleteLi(event)')
    let newLi = document.createElement('li')
    newLi.className = 'completed well'
    newLi.appendChild(newLabel)
    newLi.appendChild(newBtnStatus)
    newLi.appendChild(newBtnDelete)
    todoListElement.appendChild(newLi)
    setLocalStorage(todoArray)
}
function addLineToDoArray(currentContent,currentStatus){
    newLine = {
        content : currentContent,
        status : currentStatus
    }
    todoArray.push(newLine)
    addToDoListElement(newLine,currentStatus)
}
function addToDoList(){
    inputText = inputElem.value;
    if (inputText){
       flag = todoArray.some(function (row){
           return row['content'] == inputText
       })
        if (!flag){
            addLineToDoArray(inputText,'Complete')
        }
    }
}
window.onload=function (){
    inputReset()
    let getToDoArray=JSON.parse(localStorage.getItem('localArray'))
    if (getToDoArray != null){
        getToDoArray.forEach(function (line){
            addLineToDoArray(line['content'],line['status'])
        })
    }
}
clearButton.addEventListener('click',function (){
    inputReset()
})
addBtn.addEventListener('click',function (){
    addToDoList()
    inputReset()
})
inputElem.addEventListener('keyup',function (event){
    if (event.keyCode == 13){
        addToDoList()
        inputReset()
    }
})