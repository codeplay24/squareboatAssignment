const jobtitleEle = document.getElementById('jobTitle')
const jobDescEle = document.getElementById('jobDesc')
const logout = document.getElementById('logout')

const savejob = ()=>{
    const jobTitle = jobtitleEle.value
    const jobDesc = jobDescEle.value
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/savejob', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    const recIdStr = JSON.stringify({id,jobTitle,jobDesc})
    xhr.send(recIdStr)
    xhr.onload = function(){
        if(xhr.status==200){
            jobtitleEle.value = ""
            jobDescEle.value = ""
        }
    }
}


