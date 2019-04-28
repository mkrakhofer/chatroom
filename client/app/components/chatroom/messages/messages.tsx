import * as React from "react";
import "./messages.scss";
import { Message } from "./message/message";
import { MessageStoreContext } from "../../../stores/messages";
import { observer } from "mobx-react-lite";

export const Messages = observer(() => {

    const messageStore = React.useContext(MessageStoreContext);
    const messages = React.useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = React.useState(true);

    const handleScroll = () => {
        const scrollTop = messages.current.scrollTop;
        const scrollHeight = messages.current.scrollHeight;
        const clientHeight = messages.current.clientHeight;
        if(scrollHeight - scrollTop - clientHeight < 10) {
            setAutoScroll(true);
        }
        else {
            setAutoScroll(false);
        }
    }

    React.useEffect(() => {
        if(autoScroll) {
            const scrollHeight = messages.current.scrollHeight;
            const height = messages.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messages.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0; 
        }
    });

    return <div onScroll={handleScroll} ref={messages} className="messages">
        {messageStore.messages.map(m => <Message message={m}/>)}
    </div>;
});