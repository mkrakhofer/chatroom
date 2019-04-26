import * as React from "react";
import "./messages.scss";
import { Message } from "./message/message";
import { MessageStoreContext } from "../../../stores/messages";

export const Messages = () => {

    const messageStore = React.useContext(MessageStoreContext);

    return <div className="messages">
        {messageStore.messages.map(m => <Message message={m}/>)}
    </div>;
}