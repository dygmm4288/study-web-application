const React = require('react');
const { useState, useRef, memo } = React;
const Icon = memo(({ iconInfo }) => {

    return (
        <>
            <i
                className={iconInfo.class}
                onClick={iconInfo.onClickBtn}></i>
        </>
    )
});

module.exports = Icon;