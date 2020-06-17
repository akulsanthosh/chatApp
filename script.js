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

async function sendmessage(con){
    // document.getElementById("msgInput")
    console.log("finally")
    const message = await con.sendMessage({
            text: "hi",
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
    console.log('received a new message', event.message.text);
    update(event.message.user.id,event.message.text)
    });

    document.getElementById("btn").addEventListener("click",await sendmessage(con))
}

main()