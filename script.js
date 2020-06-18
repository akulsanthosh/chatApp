// @ts-ignore
const client = new StreamChat('t278amr6eqhe',{
    timeout: 6000,
});
var all = ``

async function setup(id,name,user_id="test"){
    await client.setGuestUser({ 
        id: id,
        name: name,
        //image: '',
    });
    con = client.channel('messaging', 'trailheist');
    const state = await con.watch();
    return con
};

async function sendmessage(){
    let msg = document.getElementById("msginput").value;
    if(msg.trim() === "" ){
        return;
    }
    document.getElementById("msginput").value = "";
    try{
        const message = await con.sendMessage({ text: msg,});
    }
    catch{
        const message = await con.sendMessage({ text: msg,}).catch((err)=> alert("Slow Connection"));
    }
}

function update(name,msg,date="temp"){
    const message = `<li><img class="dp" src="https://getstream.io/random_svg/?name=` + name + `" alt=""><p class="message">`+msg+`</p></li>`;
    all = all + message;
    document.getElementById("msgs").innerHTML = all
    autoScroll();
}

async function main(){
    let userdata = await fetch('/api/v1/current/user').then((res)=> res.json()).catch((err)=> alert('Error: Try Reloading page'));
    let name = userdata.current_username.toString();
    let id = userdata.userid.toString();
    try{
        const con = await setup(id,name);
    }
    catch{
        const con = await setup(id,name).catch((err)=> alert("Slow connection, Try reloading"));
    }
     for(i=0;i<con.state.messages.length;i++){
         update(con.state.messages[i].user.name,con.state.messages[i].text,con.state.messages[i].created_at);
     }
    con.on('message.new', event => {
    // console.log('received a new message', event.message);
    update(event.message.user.name,event.message.text,event.message.created_at)
    });
    document.getElementById("msginput").addEventListener("keydown", function (e) {
        if (e.keyCode === 13) { 
            sendmessage();
        }
    });
    document.getElementById("btn").addEventListener("click",sendmessage);
    document.getElementById("shrug").addEventListener("click",() => {
        document.getElementById("msginput").value = "¯\\_(ツ)_/¯";
        sendmessage();
    });
}

main()
