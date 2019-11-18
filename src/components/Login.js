import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../actions/userActions';

class Login extends React.Component {

    render() {
        if (this.props && this.props.user && this.props.user.token) {
            return <Redirect to='/' />;
        }
        if(this.props && this.props.user && !this.props.user.wasChecked) {
            return <div className="text-center">User authentification...</div>
        }
        return <div className="login">
            <LoginForm
                login={this.props.login}
                fetching={this.props.user.fetching}
                loginError={this.props.user.loginError}
            />
        </div>
    }

}

const mapStateToProps = (store) => {
    return {
        user: store.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (login, password) => dispatch(loginUser(login, password)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);