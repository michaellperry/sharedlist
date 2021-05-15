import * as React from "react";
import { useHistory } from "react-router-dom";

export const HomePage = ({}) => {
    const [ topic, setTopic ] = React.useState("");
    const history = useHistory();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/${topic}`);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Topic
                <input type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Go" />
        </form>
    );
};