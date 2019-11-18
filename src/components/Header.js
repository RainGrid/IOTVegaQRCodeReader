import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUserFull } from '../actions/userActions';

class Header extends React.Component {

    handleLogout = (event) => {
        event.preventDefault();
        if (this.props.logout) {
            this.props.logout();
        }
    }

    render() {
        return <div className="page-header mb-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">IOT Vega QR Code Reader</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav justify-content-between" style={{ flexGrow: 1 }}>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item mr-auto">
                            <Link to="/help" className="nav-link">Help</Link>
                        </li>
                        {this.props && this.props.user && this.props.user.token &&
                            <li className="nav-item ml-auto">
                                <a href="/" className="nav-link" onClick={this.handleLogout}>Logout</a>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>;
    }

}

const mapStateToProps = (store) => {
    return {
        user: store.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutUserFull()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);