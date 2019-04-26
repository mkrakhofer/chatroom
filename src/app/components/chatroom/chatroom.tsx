import * as React from 'react';
import './chatroom.scss';
import { UserList } from './user-list/user-list';
import { Messages } from './messages/messages';
import { UserInput } from './user-input/user-input';

export const ChatRoom = () => {
    let [messages, setMessages] = React.useState<string[]>([]);

    var HOST = location.origin.replace(/^http/, 'ws')

    const updateMessages = (message: string) => {
        // TRICKY! https://github.com/facebook/react/issues/15041
        // setMessages(m => m.concat(message));
    }

    React.useEffect(() => {
        console.log("USE EFFEKT");
        const ws = new WebSocket(HOST);
        ws.onopen = () => {
            console.log('websocket is connected...');
            ws.send('connected');
        }
        ws.onmessage = (event: MessageEvent) => {
            //console.log(event.data);
            updateMessages(event.data);
        }
    }, [])

    const renderMessages = () => {
        return messages.map((message: string, i: number) => {
            return <p key={i}>- {message}</p>;
        })
    }

    return <div className="chatroom">
        <div className="left">
            <UserList/>
        </div>
        <div className="right">
            <Messages/>
            <UserInput/>
        </div>
    </div>;
}