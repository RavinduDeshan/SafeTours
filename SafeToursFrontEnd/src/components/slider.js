import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
import config from "../configure";


let i = 0;

export default class Slide extends Component {

    constructor(props) {

        super(props);
        this.getAllEntries = this.getAllEntries.bind(this);

        this.state = {


            events: []


        }

    }

    componentDidMount() {
        i = 0;
        this.getAllEntries();


    }


    async getAllEntries() {

        await axios.get(`http://${config.host}:${config.port}/event/`
        ).then(res => {
            this.setState({

                events: res.data.data

            })

            console.log("Entries in slide are ", this.state.events);

        }).catch(err => {
            console.log(err);


        })
    }


    //handle log out


    //show profile tag


    render() {

        return (

            <div>


                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">


                        {

                            this.state.events.map(event => {
                                i++;
                                console.log("i is", i);
                                return (


                                    <div style={{
                                        height: "85%",
                                        padding: "20%",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        position: "static",
                                        backgroundImage: "url(" + event.img + ")"
                                    }} className={i == 1 ? "carousel-item active" : "carousel-item"}>
                                        {/*<img src={event.img}/>*/}
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 style={{fontSize: "48px"}}>{event.name} </h2>
                                            <p>{event.description} </p>
                                            <h3>{event.date} </h3>

                                        </div>
                                    </div>


                                )


                            })


                        }

                    </div>


                </div>
            </div>


        )


    }


}
