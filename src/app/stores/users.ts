import * as React from "react";
import {observable, action} from "mobx"
var generateName = require('sillyname');
var sillyName = generateName();
class UserStore {
    @observable users: User[] = [
        {
            id: "1234",
            name: sillyName,
        }
    ];

    @action
    addUser = (user: User) => {
        this.users.push(user);
    }

    @action
    removeUser = (user: User) => {
        this.users = this.users.filter(u => u.id !== user.id);
    }
}

export const UserStoreContext = React.createContext(new UserStore());