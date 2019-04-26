import * as React from "react";
import "./user-input.scss";

export const UserInput = () => {
    const [value, setValue] = React.useState("");

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setValue("");
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    
    return <div className="user-input">
        <input onKeyDown={onKeyDown}
            placeholder="enter a message"
            value={value}
            onChange={onChange} />
    </div>;
}