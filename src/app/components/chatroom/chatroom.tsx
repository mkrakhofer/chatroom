import * as React from 'react';
import './chatroom.scss';
import { UserList } from './user-list/user-list';
import { Messages } from './messages/messages';
import { UserInput } from './user-input/user-input';
import { connect } from '../../api/websocket';
import { UserStoreContext } from '../../stores/users';
import '../../../../node_modules/react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { observer } from 'mobx-react-lite';

export const ChatRoom = observer(() => {
    // let [messages, setMessages] = React.useState<string[]>([]);

    const updateMessages = (message: string) => {
        // TRICKY! https://github.com/facebook/react/issues/15041
        // setMessages(m => m.concat(message));
    }

    const userStore = React.useContext(UserStoreContext);

    React.useEffect(() => {
        console.log("USE EFFEKT");
        connect(userStore);
    }, [])

    // const renderMessages = () => {
    //     return messages.map((message: string, i: number) => {
    //         return <p key={i}>- {message}</p>;
    //     })
    // }

    let greeting = "Welcome!";
    if(userStore.me) {
        greeting += " Your name is '" + userStore.me.name + "'!";
    }

    return <div className="chatroom">
        <div className="left">
            <UserList/>
        </div>
        <div className="right">
            <div className="greeting">
                {greeting}
            </div>
            <Messages/>
            <UserInput/>
        </div>
        <NotificationContainer/>
    </div>;
});