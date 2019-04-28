import * as React from "react";
import "./user-list.scss";
import { UserListItem } from "./user-list-item/user-list-item";
import { UserStoreContext } from "../../../stores/users";
import { observer } from "mobx-react-lite";

export const UserList = observer(() => {

    const userStore = React.useContext(UserStoreContext);

    return <div className="user-list">
        {userStore.users.map(u => <UserListItem user={u} />)}
    </div>;
});