function nextPage(){
    let username = document.getElementById("username").value;
    if (username == ""){
        window.alert('Write the name first');
    }else{
        document.cookie = `username=${username}`;
        window.location.href = "/app.html";
    }
}