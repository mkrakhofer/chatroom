import * as React from "react";
import "./user-list-item.scss";

interface IProps {
    user: User;
}

export const UserListItem = (props: IProps) => {
    return <div className="user-list-item">
        {props.user.name}
    </div>;
}