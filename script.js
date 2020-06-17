// @ts-ignore
const client = new StreamChat('t278amr6eqhe');
var all = ``

async function setup(id){
    await client.setGuestUser({ 
        id: id,
        name: 'akul'
    });
    con = client.channel('messaging', 'trailheist');
    await con.create();
    const state = await con.watch();
    return con
};

// setup("akul").then((con)=>{
//     con.on('message.new', event => {
//         console.log('received a new message', event.message.text);
//         update(event.message.user.id,event.message.text)
//     });
// });

// console.log(setup("akul"))

async function sendmessage(){
    let msg = document.getElementById("msginput").value;
    document.getElementById("msginput").value = "";
    const message = await con.sendMessage({
            text: msg,
    });
}

function update(name,msg){
    const message = `<li><img class="dp" src="https://getstream.io/random_svg/?name=`+name+`" alt=""><p class="message">`+msg+`</p></li>`;
    all = all + message;
    document.getElementById("msgs").innerHTML = all
}

// sendmessage(con)

async function main(){
    const con = await setup("akul")
    con.on('message.new', event => {
    // console.log('received a new message', event.message);
    update(event.message.user.name,event.message.text)
    });
    document.getElementById("msginput").addEventListener("keydown", function (e) {
        if (e.keyCode === 13) { 
            sendmessage();
        }
    });
    document.getElementById("btn").addEventListener("click",sendmessage);
}

main()
