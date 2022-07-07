let btn = document.querySelector("#addBtn")
let input =  document.querySelector('input')
let mainRow =document.querySelector('#main-row')


btn.addEventListener('click', function(){
    let inputVal = input.value;
    let xml =  new XMLHttpRequest();
    xml.open('post','/save');
    xml.onreadystatechange = function(){
        if(xml.readyState == 4 && xml.status == 200){
            displayTodos()
        }
    }
    xml.setRequestHeader('Content-Type','application/json; charset=utf-8');
    xml.send(JSON.stringify({msg: inputVal}));
})

function displayTodos(){
    let data = new Promise((resolve,reject)=>{
        let xml =  new XMLHttpRequest();
        xml.open('get', '/get_data');
        xml.onreadystatechange = ()=>{
            if(xml.readyState == 4 && xml.status == 200){
                //console.log(JSON.parse(xml.responseText))
                resolve(JSON.parse(xml.responseText));
            }
        }
        xml.send();
    })

    data.then((data)=>{
        let text ='';
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            text += `
            <div class="col-4 mb-2">
            <div class="card">
                <div class="card-header">
                    <button class="btn btn-sn btn-secondary float-left">Todo: ${i+1}</button>
                    <button class="btn btn-sn btn-success float-right">${data[i].date}</button>
                </div>
                <div class="card-body">
                    <h3>${data[i].msg}</h3>
                </div>
                <div class="card-footer text-center">
                    <button data-id="${data[i]._id}" class="btn btn-sn btn-danger">Delete</button>
                </div>
            </div>
            </div>
            `
         }

         mainRow.innerHTML = text;  

         let allDeleteBtns = document.querySelectorAll('[data-id')
         //console.log(allDeleteBtns)

         for (let i = 0; i < allDeleteBtns.length; i++) {
           allDeleteBtns[i].addEventListener('click', deleteTodo);
         }
    })
}

function deleteTodo(){

    let xml = new XMLHttpRequest();
    xml.open('post','/delete');

    xml.onreadystatechange = function(){
        if(xml.readyState == 4 && xml.status == 200){
            displayTodos()
        }
    }
    xml.setRequestHeader('Content-Type','application/json; charset=utf-8');
    xml.send(JSON.stringify({id:this.getAttribute('data-id')}));
    
}

displayTodos();