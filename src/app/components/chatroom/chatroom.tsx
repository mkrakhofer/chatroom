import * as React from 'react';
import './chatroom.scss';

export const ChatRoom = () => {
    let [messages, setMessages] = React.useState<string[]>([]);

    var HOST = location.origin.replace(/^http/, 'ws')
    const ws = new WebSocket(HOST);

    const updateMessages = (message: string) => {
        setMessages([...messages, message]);
    }

    React.useEffect(() => {
        console.log("USE EFFEKT");
        ws.onopen = () => {
            console.log('websocket is connected...');
            ws.send('connected');
        }
        ws.onmessage = (event: MessageEvent) => {
            console.log(event.data);
            updateMessages(event.data);
        }
    }, [])

    const renderMessages = () => {
        return messages.map((message: string, i: number) => {
            return <p key={i}>- {message}</p>;
        })
    }

    return <div className="chatroom">{renderMessages()}</div>;
}