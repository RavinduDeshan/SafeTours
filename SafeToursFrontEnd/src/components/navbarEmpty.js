import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'


export default class NavbarEmpty extends Component {

    constructor(props) {

        super(props);
        this.logout = this.logout.bind(this);


    }


    logout() {

        localStorage.setItem('token', null);

        localStorage.setItem('username', null);
        localStorage.setItem('id', null);
        localStorage.setItem('email', null);

        const token = localStorage.getItem('token');

        console.log("Logout method called : Token is : ", token);


    }


    render() {

        return (
            <nav className="navbar  bg-light sticky-top">
                <div className={"container-fluid"}>
                <a class="navbar" style={{fontSize:"26px"}}> <b>SafeTours</b></a>
                    <button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"}
                            data-target={"#navbarResponsive"}>
                        <span className={"navbar-toggler-icon"}></span>
                    </button>


                </div>


            </nav>


        )


    }


}
