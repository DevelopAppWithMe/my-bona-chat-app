let c = document.cookie
let ar = c.split("=")
let name = ar[1]


function onMessageSend(){
    let msg = document.getElementById("msg").value;
    
    console.log(msg)

    if (msg == ""){
        document.getElementById("warn").hidden = false;
    }else{
        document.getElementById("warn").hidden = true;
        document.getElementById("msg").value = "";

        getAllMessages();

        let data = {
            sender: name,
            msg: msg
        }


        sendMessage(data);
    }

}


async function sendMessage(meta){
    let res = await fetch("/saveMessage" , {
        body: JSON.stringify(meta),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let data = await res.text;

    console.log(data);
}


async function getAllMessages(){
    //Fetch all messages
    let allMsgs = await fetch('/getallpost');
    let alldata = await allMsgs.json();
    let msgBox = document.getElementById("allMsg");

    msgBox.innerHTML = ""

    console.log(alldata);

    alldata.forEach(element => {
        msgBox.innerHTML = `<div class="msgBubble"> <h4><b style="color: rgb(0, 123, 255);">${element.sender}</b> : ${element.msg}</h4></div>` + msgBox.innerHTML
    });

}

setTimeout(getAllMessages() , 500);
