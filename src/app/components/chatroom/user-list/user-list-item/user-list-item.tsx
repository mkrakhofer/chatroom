import * as React from "react";
import "./user-list-item.scss";
import { UserStoreContext } from "../../../../stores/users";

interface IProps {
    user: User;
}

export const UserListItem = (props: IProps) => {
    
    const me: User = React.useContext(UserStoreContext).me;

    return <div style={me && props.user.id === me.id ? {color: "red"} : undefined} className="user-list-item">
        {props.user.name}
    </div>;
}