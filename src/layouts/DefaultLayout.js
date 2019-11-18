import React from 'react';
import Header from '../components/Header';

export default function DefaultLayout(props) {
    return <div className="page-wrapper">
        <div className="container">
            <Header />
            <div className="page-content">
                {props.children}
            </div>
        </div>
    </div>
}