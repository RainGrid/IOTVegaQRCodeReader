import React from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, UncontrolledAlert } from 'reactstrap';


class LoginCard extends React.Component {

    state = {
        login: '',
        password: ''
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.login, this.state.password);
    }

    render() {
        return (
            <Card className="login-form border-primary">
                <CardHeader className="bg-primary text-white text-center">
                    IOT Vega QRR аутентификация
                </CardHeader>
                <CardBody>
                    <Form className="login-form__form" action="#" onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="login" >Логин</Label>
                            <Input type="text" name="login" id="login" onChange={this.handleInputChange} value={this.state.login} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" >Пароль</Label>
                            <Input type="password" name="password" id="password" onChange={this.handleInputChange} value={this.state.password} required/>
                        </FormGroup>
                        {this.props.loginError &&
                            <FormGroup>
                                <UncontrolledAlert color="danger">
                                    {this.props.loginError}
                                </UncontrolledAlert>
                            </FormGroup>}
                        <div className="text-right">
                            <Button type="submit" color="primary">Войти</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default LoginCard;