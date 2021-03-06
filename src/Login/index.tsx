import * as React from 'react'
import './Login.css'
import axios from 'axios'
import ChangeSessionToken from '../Utils/ChangeSessionToken'

export default class Login extends React.Component<any, any> {
    
    static propTypes = {
        history: React.PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)

        document.body.className = 'color-accent'

        this.state = {
            email: '',
            password: ''
        }
    }

    ChangeInput = (input) => {
        this.setState({[input.target.name]: input.target.value})
    }
    
    LogInServer = (e) => {

        e.preventDefault()

        axios ({
            method: 'get',
            url: 'https://dev.flyve.org/glpi/apirest.php/initSession',
            auth: {
                username: this.state.email,
                password: this.state.password,
            }
        })
            .then((response) => {

                ChangeSessionToken(response.data.session_token)
                this.props.history.push(`/contactbook`)
                
            })
            .catch(function (error: object){
                console.log(error)
            })
    }

    render () {
    
        return (
            <div className="row color-white" id="LoginForm">
                <div className="small-12 medium-4 columns section1">
                    <img src="img/logo-flyve-login.png" className="img-login"/>
                </div>
                <div className="small-12 medium-8 columns section2">
                    <h2>Mobile Device Management</h2>
                    <form onSubmit={this.LogInServer}>
                        <p>Email</p>
                        <input type="text" name="email" value={this.state.email} onChange={this.ChangeInput} />
                        <p>Password</p>
                        <input 
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.ChangeInput} 
                        />
                        <button className="win-button">SIGNUP</button>
                        <button className="win-button color-accent">
                            LOGIN
                        </button>
                    </form>
                    <span className="credentials" >
                        A solution powered by &nbsp; <img src="img/logo-teclib-blanc-1-2.png" />
                    </span>
                </div>
                
            </div>
        )
    }
}