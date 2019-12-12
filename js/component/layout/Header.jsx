
const React = require('react');
const { useState, useRef, memo } = React;
const Icon = require('../Icon');

const Header = memo(() => {


    return (
        <>
            <header>
                <Icon />
                {/* logo */}
                {/* nav  */}
            </header>
        </>
    );
});
module.exports = Header;