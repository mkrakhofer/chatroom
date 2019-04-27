import { UserStore } from './../stores/users';
import { NotificationManager } from 'react-notifications';

export const connect = (userStore: UserStore) => {
    var HOST = location.origin.replace(/^http/, 'ws')
    const ws = new WebSocket(HOST);
  
    ws.onopen = () => {
        console.log('websocket is connected...');
        ws.send('connected');
    }
    ws.onmessage = (event: MessageEvent) => {
        // console.log(event.data);
        // updateMessages(event.data);

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
        }
    }
}