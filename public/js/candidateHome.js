let xhr = new XMLHttpRequest()
const applyClicked = (jobId)=>{
    xhr.open('POST', '/applyjob', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    const jsonstr = JSON.stringify({jobId})
    xhr.send(jsonstr)
    xhr.onload = function(){
        if(xhr.status==200){
            alert(xhr.response)
        }
    }
}

const applyClicked2 = (jobId)=>{
    xhr.open('POST', '/applyjob', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    const jsonstr = JSON.stringify({jobId,id})
    xhr.send(jsonstr)
    xhr.onload = function(){
        if(xhr.status==200){
            alert(xhr.response)
        }
    }
}