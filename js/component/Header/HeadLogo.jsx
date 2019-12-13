const React = require('react');
const { useState } = require('react');
const HeadLogo = ({ props }) => {
    const [logo, setLogo] = useState(props);

    return (
        <>
            <span>{logo}</span>
        </>
    )

};

module.exports = HeadLogo;