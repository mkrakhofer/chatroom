import * as React from 'react';
import './chatroom.scss';

export const ChatRoom = () => {
    let [messages, setMessages] = React.useState<string[]>([]);
    let [didMount, setDidMount] = React.useState(false);

    var HOST = location.origin.replace(/^http/, 'ws')
    const ws = new WebSocket(HOST);

    const updateMessages = (message: string) => {
        setMessages([...messages, message]);
    }

    React.useEffect(() => {
        if(!didMount) {
            console.log("USE EFFEKT");
            ws.onopen = () => {
                console.log('websocket is connected...');
                ws.send('connected');
            }
            ws.onmessage = (event: MessageEvent) => {
                console.log(event.data);
                updateMessages(event.data);
            }
            setDidMount(true);
        }
    })

    const renderMessages = () => {
        return messages.map((message: string, i: number) => {
            return <p key={i}>- {message}</p>;
        })
    }

    return <div className="chatroom">{renderMessages()}</div>;
}