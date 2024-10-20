<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Websocket Test</title>
     @vite(['resources/js/app.js'])
     <style>
        .msg {
            border: 1px solid #1d2341;
            padding: 5px 10px;
            border-radius: 5px;
            color: #7781b6;
            margin-bottom: 7px;
        }
     </style>
</head>
<body style="background: #020617; color: white; font-family: Arial, Helvetica, sans-serif; color:#dedede">
    <div>
        <div style="background: #0e1727; padding: 10px 15px; border-radius: 10px; font-size: 20px; height: 23px">New Announcement</div>
        <div style="margin: 10px 0px">
            <div style="display: flex; align-items: center; gap: 10px">
                <input type="text" id="msg-input" style="background: transparent; border: 1px solid #7781b6; border-radius: 7px; font-size: 20px; color: white; outline: none; padding: 5px; width: 400px" placeholder="Type Message..." />
                <input type="text" id="username-input" style="background: transparent; border: 1px solid #7781b6; border-radius: 7px; font-size: 20px; color: white; outline: none; padding: 5px; width: 400px" placeholder="Username (Optional)" />
                <button style="height: 35px; background:#7781b6; border-radius: 7px" id="send">SEND</button>
            </div>
        </div>
    </div>
    <div style="display: flex; gap: 10px">
        <div style="flex: 1">
            <div style="background: #0e1727; padding: 10px 15px; border-radius: 10px; font-size: 20px; height: 23px">Announce for Public</div>
            <div style="margin-top: 10px">
                <div id="public-msg"></div>
            </div>
        </div>
        <div style="flex: 1">
            <div style="background: #0e1727; padding: 10px 15px; border-radius: 10px; font-size: 20px; height: 23px"><span id="name">Set ?username=NAME at query string</span></div>
            <div style="margin-top: 10px">
                <div id="user-msg"></div>
            </div>
        </div>
    </div>


<script>
    const query = new URLSearchParams(window.location.search);
    const username = query.get('username');


    window.addEventListener('DOMContentLoaded', function(){
        window.Echo.channel('public')
            .listen('.anouncement', (event) => {
                document.getElementById("public-msg").innerHTML += `<div class="msg">${event.message}</div>`;
            })

        if (username) {
            document.getElementById("name").innerHTML = `Announce for ${username}`;
            window.Echo.channel(`public-${username}`)
            .listen('.anouncement', (event) => {
                document.getElementById("user-msg").innerHTML += `<div class="msg">${event.message}</div>`;
            })
        }
    });

    document.getElementById("send").addEventListener("click", function(){
        const msg = document.getElementById("msg-input").value;
        const uname = document.getElementById("username-input").value;
        if (!msg) {
            alert ("Message is required!");
        }

        fetch('/message/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "message": msg,
                "channel": "public",
                "receiver": uname
            })
        });

        document.getElementById("msg-input").value = "";
        document.getElementById("username-input").value = "";
    })
    
</script>
</body>
</html>