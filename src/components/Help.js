import React from 'react';

export default class Help extends React.Component {

    render() {
        return <div className="help">
            <h1>Help</h1>
            <p>This is a simple app that will help you easily add Vega Absolute devices to IOT Vega Server by QR codes</p>
            <p>How to use:</p>
            <ol>
                <li>Enter your login, password and IOT Server address in config.js</li>
                <li>Start the app</li>
                <li>Allow the app to access your webcam</li>
                <li>If there are no errors, scan the QR code, enter a new device name and press Save</li>
                <li>Press Reset to skip the device or add a new one</li>
            </ol>
        </div>
    }

}