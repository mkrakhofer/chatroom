import * as React from "react";
import {observable, action} from "mobx"

export class UserStore {
    @observable users: User[] = [];
    @observable me: User;

    @action
    setMe = (user: User) => {
        this.me = user;
    }

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