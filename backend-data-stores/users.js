
class UserBackendStore {

    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.users = this.users.filter(u => u.id !== user.id);
    }
}

module.exports = {
    store: new UserBackendStore()
};