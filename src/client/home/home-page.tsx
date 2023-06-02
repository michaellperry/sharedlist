import * as React from "react";
import { useHistory } from "react-router-dom";
import { LogInButton } from "../login/LogInButton";

export const HomePage = ({}) => {
    const [ topic, setTopic ] = React.useState("");
    const history = useHistory();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/${encodeURI(topic.toLowerCase())}`);
    };

    return (
        <>
            <h2>Create and share lists</h2>
            <p>Enter a topic to create and join a list.</p>
            <LogInButton />
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
        </>
    );
};