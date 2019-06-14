import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

const auth = new AuthService();

class Auth extends Component {

    state = {
        dataAuth: {
            username: '',
            password: ''
        },
        dataError: {
            username: '',
            password: ''
        },
        error: ''
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const field = ev.target.id;
        const value = ev.target.value;

        this.setState({
            dataAuth: {
                ...this.state.dataAuth,
                [field]: value
            }
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const body = this.state.dataAuth;
        const errors = auth.validateData(body);
        if (errors.username || errors.password){
            this.setState({
                dataError: errors
            });
            return;
        }
        auth.login(body).then(data => {
            if (data) {
                this.setState({error: data.error});
            } else {
                this.setState({error: ''});
            }
        });
    }

    render() {
        const errors = this.state.dataError;
        if (auth.isAuthenticated()) {
          return <Redirect to={{pathname: '/products'}}/>
        }

        return (
            <div className="auth">
                <form onSubmit={this.handleSubmit}>
                    {this.state.error ?
                        <div>
                            {this.state.error}
                        </div> : ''
                    }
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="form-control" onChange={this.handleChange}/>
                        {errors.username ? <span>{errors.username}</span> : ''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" onChange={this.handleChange}/>
                        {errors.password ? <span>{errors.password}</span> : ''}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Auth;
