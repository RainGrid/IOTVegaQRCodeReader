import React from 'react';
import { Link } from 'react-router-dom';

export default function DefaultLayout(props) {
    return <div className="page-wrapper">
        <div className="container">
            <div className="page-header mb-4">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">IOT Vega QR Code Reader</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/help" className="nav-link">Help</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="page-content">
                {props.children}
            </div>
        </div>
    </div>
}