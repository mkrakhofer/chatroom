import * as React from "react";
import "./message.scss";

interface IProps {
    message: Message;
}

export const Message = (props: IProps) => {
    return <div className="message">
        <p>{props.message.content}</p>
    </div>;
}