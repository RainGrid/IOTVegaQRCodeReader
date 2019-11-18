import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../components/Login';

export default function LoginPage(props) {
    return <DefaultLayout>
        <Login />
    </DefaultLayout>
}