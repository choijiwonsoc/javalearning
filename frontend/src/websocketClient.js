import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


const client = new Client({
    //websocket handshake
    webSocketFactory:()=> new SockJS("http://localhost:8080")
});
client.onConnect=()=>{
    client.subscribe("/topic/simulation",
        (message)=>{
            const event = JSON.parse(message.body);
            console.log(event);
        }
    )
}
client.activate();