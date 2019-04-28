import { MessageStore } from './../stores/messages';
import { UserStore } from './../stores/users';
import { NotificationManager } from 'react-notifications';

let ws: WebSocket;

export const connect = (userStore: UserStore, messageStore: MessageStore) => {

    /**
     * 2 CONNECT THE WEBSERVER
     */
    var HOST = location.origin.replace(/^http/, 'ws')
    ws = new WebSocket(HOST);
  
    ws.onopen = () => {
        console.log('websocket is connected...');
    }

    /**
     * 4 RECEIVE THE CLIENTS USER
     */

    ws.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        switch(message.type) {
            case "ME": {
                userStore.setMe(message.data);
                break;
            }
            case "USERS": {
                userStore.users = message.data;
                break;
            }
            case "USER_JOINED": {
                const joined: User = message.data;
                userStore.addUser(joined);
                NotificationManager.success(joined.name + " joined");
                break;
            }
            case "USER_LEFT": {
                const left: User = message.data;
                userStore.removeUser(left);
                NotificationManager.error(left.name + " left");
                break;
            }
            case "MESSAGES": {
                messageStore.messages = message.data;
                break;
            }
            case "NEW_MESSAGE": {
                messageStore.addMessage(message.data);
                break;
            }
            case "PING": {
                console.log("PING");
                break;
            }
        }
    }
}

export const sendMessage = (message: string) => {
    if(ws) {
        ws.send(message);
    }
}