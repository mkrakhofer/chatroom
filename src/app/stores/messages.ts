import * as React from "react";
import {observable, action} from "mobx"

class MessageStore {
    @observable messages: Message[] = [
        {
            id: "1",
            userId: "1234",
            content: "this is a message from Silly Squid :)",
            dateTime: new Date()
        },
        {
            id: "2",
            userId: "5678",
            content: "this is another message from another user :O",
            dateTime: new Date()
        },
    ];

    @action
    addMessage = (message: Message) => {
        this.messages.push(message);
    }

}

export const MessageStoreContext = React.createContext(new MessageStore());