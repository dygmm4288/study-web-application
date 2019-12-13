
const React = require('react');
const { useState, useRef, memo } = React;
const Icon = require('../Icon');

const Footer = memo(() => {
    return (
        <>
            <footer className="flex">
                <Icon iconInfo={{ 'class': 'fas fa-calendar-alt', click: (e) => { e.preventDefault() } }} />
                <Icon iconInfo={{ 'class': 'fas fa-bell', click: (e) => { e.preventDefault() } }} />
                <Icon iconInfo={{ 'class': 'fas fa-home', click: (e) => { e.preventDefault() } }} />
                <Icon iconInfo={{ 'class': 'fas fa-chart-bar', click: (e) => { e.preventDefault() } }} />
            </footer>
        </>
    );
});
module.exports = Footer;