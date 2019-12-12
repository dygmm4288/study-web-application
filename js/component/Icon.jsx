const React = require('react');
const { useState, useRef, memo } = React;
const Icon = memo(() => {

    const [value, setValue] = useState('icon');

    const onClickBtn = (e) => {

    };
    return (
        <>
            <button className="icon" onClick={onClickBtn}>{value}</button>
        </>
    )
});

module.exports = Icon;