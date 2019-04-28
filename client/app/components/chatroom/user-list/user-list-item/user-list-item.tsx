import * as React from "react";
import "./user-list-item.scss";
import { UserStoreContext } from "../../../../stores/users";

interface IProps {
    user: User;
}

export const UserListItem = (props: IProps) => {
    
    const me: User = React.useContext(UserStoreContext).me;
    let c = "user-list-item";
    
    if(me && props.user.id === me.id) {
        c = c + " user-list-item--me"
    }
    
    return <div className={c}>
        {props.user.name}
    </div>;
}