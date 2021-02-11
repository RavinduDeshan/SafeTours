import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'


export default class Footer extends Component {

    constructor(props) {

        super(props);

    }


    render() {

        return (
            <footer style={{padding: "50px", backgroundColor: "#E1F5FE"}}>
                <div className={"container-fluid padding"}>

                    <div class={"row text-center"}>
                        <div class="col-md-4">
                            <h1>  SafeTours
                            </h1>

                            <p>Your Tour Planner</p>
                            <p>Your Safety First!</p>
                        </div>


                        <div className="col-md-4" id={"footabout"}>
                            <h3>About</h3>

                            <p>Number 01 TourPlaner</p>
                            <p>We are happ to have you.</p>
                            <p>Choose us.</p>
                        </div>

                        <div className="col-md-4">
                            <h3>Contact</h3>

                            <p>071 400 9186</p>
                            <p>501/A , Malabe</p>
                            <p>Sri Lanka</p>
                        </div>
                    </div>
                </div>
            </footer>


        )


    }


}
