import * as React from "react";
import "./message.scss";
import { UserStoreContext } from "../../../../stores/users";
import { observer } from "mobx-react-lite";

interface IProps {
    message: Message;
}

export const Message = observer((props: IProps) => {

    const me: User = React.useContext(UserStoreContext).me;
    let c = "chat-message";
    
    if(me && props.message.user.id === me.id) {
        c = c + " chat-message--me"
    }

    return <div className={c}>
        <p className="sender">{props.message.user.name}</p>
        <p className="content">{props.message.content}</p>
    </div>;
});