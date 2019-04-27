import * as React from "react";
import {observable, action} from "mobx"

class MessageStore {
    @observable messages: Message[] = [];

    @action
    addMessage = (message: Message) => {
        this.messages.push(message);
    }

}

export const MessageStoreContext = React.createContext(new MessageStore());