import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbarEmpty';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import config from '../configure.js';
import "./css/main.portal.css"



export default class Login extends Component {


    constructor(props) {

        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassoword = this.onChangePassoword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onForgotPassword = this.onForgotPassword.bind(this);

        this.state = {

            username: '',
            password: '',
            token: ''


        }

    }

    onForgotPassword = (e) => {

        return null;

    }

    componentDidMount() {


    }


    onChangeUsername(e) {
        this.setState({

            username: e.target.value


        });


    }

    onChangePassoword(e) {
        this.setState({

            password: e.target.value


        });


    }


    //handle sign in

    onSubmit = (e) => {

        e.preventDefault();

        const login = {

            username: this.state.username,
            password: this.state.password,


        }

        const response = axios.post(`http://${config.host}:${config.port}/user/validate`, login).then(
            (res) => {

                const token = res.data.token;
                const warning = res.data.msg;

                if (warning !== null && warning !== undefined) {

                    console.log("message is", warning);

                    swal({
                        title: "Please Try Again",
                        text: warning,
                        icon: "warning",
                        button: true,
                        // dangerMode: true,
                    })


                } else if (token) {
                    console.log("Signed in token Success block :", token);


                    swal({
                        title: "Successful",
                        text: "You have Logged In Successfully!",
                        icon: "success",
                        button: "Continue",
                        timer: 2000,

                    });

                    const id = res.data.User.id;
                    const username = res.data.User.username;
                    const email = res.data.User.email;
                    const firstname = res.data.User.firstname;


                    //set user details in local storage
                    localStorage.setItem('token', token);
                    localStorage.setItem('id', id);
                    localStorage.setItem('username', username);
                    localStorage.setItem('email', email);
                    localStorage.setItem('firstname', firstname);

                    this.props.history.push('/home');


                }


                //    alert('Successfuly Loged In')

            }
        ).catch((err) => {

            swal({
                title: "Please Try Again",
                text: "Error Occurred",
                icon: "error",
                // buttons: true,
                dangerMode: true,
            })
        });


    };


    render() {


        return (
            <div>
                <Navbar/>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-85 p-b-20">
                            <form id={"login"} className="login100-form validate-form" onSubmit={this.onSubmit}>
					<span className="login100-form-title p-b-70">
						Welcome
					</span>
                                <span className="login100-form-avatar">
						<img
                            src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                            alt="AVATAR"/>
					</span>

                                <div className="wrap-input100 validate-input m-t-85 m-b-35"
                                     data-validate="Enter username">
                                  <label className="form-title">  Username</label>
                                    <input onChange={this.onChangeUsername} className="input100" type="text"
                                           name="username" placeholder={"Ex: John32"} id="username"
                                           value={this.state.username}/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                                <label className="form-title">   Password </label>
                                    <input className="input100" type="password" name="pass"
                                           placeholder={"Ex: QWERqwer123!@#"} onChange={this.onChangePassoword}
                                           id="password" value={this.state.password}/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>


                                <ul className="login-more p-t-50">
                                    <li className="m-b-8">

							<span className="txt1">

							</span>

                                        <a href="#" className="txt2">
                                            Forgot Password?
                                        </a>
                                    </li>

                                    <li>
							<span className="txt1">
								Want to Create an Account?
							</span>

                                        <a href="#" className="txt2">
                                            <Link to={"/signup"}> Sign up </Link>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )


    }


}