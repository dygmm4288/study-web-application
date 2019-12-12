
const React = require('react');
const { useState, useRef, memo } = React;
const Icon = require('../Icon');

const Footer = memo(() => {
    return (
        <>
            <footer>
                <Icon />
                <Icon />
                <Icon />
                <Icon />
                <Icon />
            </footer>
        </>
    );
});
module.exports = Footer;