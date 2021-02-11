import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbarEmpty';

import Swal from 'sweetalert2';
import swal from 'sweetalert';
import {Grid} from '@material-ui/core';
import config from '../configure.js';
import "./css/main.portal.css"



export default class Register extends Component {


    constructor(props) {

        super(props);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassoword = this.onChangePassoword.bind(this);
        this.onChangeConPass = this.onChangeConPass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.onForgotPassword = this.onForgotPassword.bind(this);

        this.state = {

            username: '',
            password: '',
            email: '',
            conpass: '',
            firstname: '',
            lastname: '',
            token: '',
            tel:''


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

    onChangeTel(e) {
        this.setState({

            tel: e.target.value


        });


    }


    onChangePassoword(e) {
        this.setState({

            password: e.target.value


        });


    }

    onChangeConPass(e) {
        this.setState({

            conpass: e.target.value


        });


    }

    onChangeEmail(e) {
        this.setState({

            email: e.target.value


        });


    }

    onChangeFirstname(e) {
        this.setState({

            firstname: e.target.value


        });


    }

    onChangeLastname(e) {
        this.setState({

            lastname: e.target.value


        });


    }

    //handle sign in

    onSubmit = (e) => {

        e.preventDefault();

        const User = {

            username: this.state.username,
            password: this.state.password,
            conpass: this.state.conpass,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            tel:this.state.tel,

        }

        const response = axios.post(`http://${config.host}:${config.port}/user/add`, User).then(
            (res) => {


                const warning = res.data.warn;

                if (warning !== null && warning !== undefined) {

                    console.log("message is", warning);

                    swal({
                        title: "Please Try Again",
                        text: warning,
                        icon: "warning",
                        button: true,
                        // dangerMode: true,
                    })


                } else {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Registered',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    this.props.history.push('/login');

                }


            }
        ).catch((err) => {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error Occured.Please try again',
                showConfirmButton: false,
                timer: 3000
            })
        });


    }


    render() {


        return (


            <div>
                <Navbar/>
                <div className="limiter">
                    <div className="container-login100">
                        <center><Grid
                            container
                            spacing={0}
                        >


                            <Grid
                                item
                                lg={12}
                                sm={12}
                                xl={12}
                                xs={12}
                            >
                                <div className="wrap-login100 p-t-85 p-b-20">
                                    <form id={"reg"} onSubmit={this.onSubmit} className="login100-form validate-form">
					<span className="login100-form-title p-b-70">
						Sign Up
					</span>


                                        <div className="wrap-input100 validate-input m-t-5 m-b-35"
                                             data-validate="Enter username">
                                           <label className="form-title"> First Name </label>
                                            <input className="input100" type="text" name="username"
                                                   placeholder={"EX: John"} required onChange={this.onChangeFirstname}
                                                   value={this.state.firstname}/>
                                            <span className="focus-input100"></span>
                                        </div>
                                        <div className="wrap-input100 validate-input m-t-5 m-b-35"
                                             data-validate="Enter username">
                                       <label className="form-title">  Last Name </label>
                                            <input className="input100" type="text" name="username"
                                                   placeholder={"EX: Doily"} required onChange={this.onChangeLastname}
                                                   value={this.state.lastname}/>
                                            <span className="focus-input100"></span>
                                        </div>
                                        <div className="wrap-input100 validate-input m-t-5 m-b-35"
                                             data-validate="Enter username">
                                          <label className="form-title"> Email </label> 
                                            <input className="input100" type="email" name="username"
                                                   placeholder={"EX: John@exsample.com"} required
                                                   onChange={this.onChangeEmail} value={this.state.email}/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div className="wrap-input100 validate-input m-t-5 m-b-35"
                                             data-validate="Enter username">
                                          <label className="form-title"> Text </label> 
                                            <input className="input100" type="number" name="username"
                                                   placeholder={"EX:0713409864"} required
                                                   onChange={this.onChangeTel} value={this.state.tel}/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div className="wrap-input100 validate-input m-t-5 m-b-35"
                                             data-validate="Enter username">
                                         <label className="form-title">Username </label>   
                                            <input className="input100" type="text" name="username"
                                                   placeholder={"EX: John123"} required onChange={this.onChangeUsername}
                                                   value={this.state.username}/>
                                            <span className="focus-input100" d></span>
                                        </div>

                                        <div className="wrap-input100 validate-input m-b-50"
                                             data-validate="Enter password">
                                       <label className="form-title">     Password </label>
                                            <input className="input100" type="password" name="pass"
                                                   placeholder={"EX: QWERqwer123!@#"} onChange={this.onChangePassoword}
                                                   value={this.state.password}
                                                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div className="wrap-input100 validate-input m-b-50"
                                             data-validate="Enter password">
                                       <label className="form-title">     Confirm Password </label>
                                            <input className="input100" type="password" name="pass"
                                                   placeholder={"Enter Password Again"} onChange={this.onChangeConPass}
                                                   value={this.state.conpass} required/>
                                            <span className="focus-input100"></span>
                                        </div>

                                        <div className="container-login100-form-btn">
                                            <button className="login100-form-btn">
                                                Sign Up
                                            </button>
                                        </div>


                                        <ul className="login-more p-t-50">


                                            <li>
							<span className="txt1">
								Already have an account?
							</span>

                                                <a href="#" className="txt2">
                                                    <Link to={"/login"}> Sign In</Link>
                                                </a>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </Grid>


                        </Grid></center>
                    </div>
                </div>
            </div>

        )


    }


}