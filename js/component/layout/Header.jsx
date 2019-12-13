
const React = require('react');
const { useState, useRef, memo } = React;
const Icon = require('../Icon.jsx');
const HeadLogo = require('../Header/HeadLogo.jsx');

const Header = memo(() => {

    return (
        <>
            <header className="flex">
                <Icon iconInfo={{ 'class': 'fas fa-list', click: (e) => { e.preventDefault(); console.log('click') } }} />
                <HeadLogo keys={"headLogo"} props={"Welcome SWA"} />
                <Icon iconInfo={{ 'class': 'far fa-check-square', click: (e) => { e.preventDefault(); console.log('click') } }} />
            </header>
        </>
    );
});
module.exports = Header;