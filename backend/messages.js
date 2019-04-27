
class UserMessagesStore {

    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }
}

module.exports = {
    store: new UserMessagesStore()
};