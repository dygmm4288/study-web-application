const React = require('react');
const { useState, useRef, memo } = React;
const Header = require('./Header');
const Main = require('./Main');
const Footer = require('./Footer');

const App = memo(() => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
});

module.exports = App;