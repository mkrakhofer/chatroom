import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatRoom } from './components/chatroom/chatroom';

declare let module: any

ReactDOM.render(<ChatRoom/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
 }