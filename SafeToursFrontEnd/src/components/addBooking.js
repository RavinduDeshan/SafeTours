import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import TopSafe from './topSafe';
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import config from '../configure.js';
import "./css/main.portal.css";






export default class book extends Component {


    constructor(props) {

        super(props);


        
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeDateIn = this.onChangeDateIn.bind(this);
        this.onChangeDateOut = this.onChangeDateOut.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getAllEntries = this.getAllEntries.bind(this);
       
      
      
        this.state = {

            
            token: '',
            entries:'',
            dateIn:'',
            dateOut:'',
            destination:''



        }

    }

    onChangeDestination (e) {

        this.setState({

            destination: e.target.value


        });

    }

   async componentDidMount() {

      await  this.getAllEntries();

    }

    

  // validate users
  validateUser() {


    
    const token = localStorage.getItem('token');

     localStorage.setItem('destination',this.state.destination);
     localStorage.setItem('date',this.state.date);
    if(token!=null || token!=undefined ){
    axios.get(`http://${config.host}:${config.port}/user/session-validate`, {

      headers:
      {


        token: token

      }
    }
    ).then((res) => {


        localStorage.setItem('token', res.data.token);

        localStorage.setItem('username', res.data.username);

          this.props.history.push('/addLocations');

    }



    ).catch((err) => {

      if (token === "null") {

        console.log("Token is null Box called");

        swal({
          title: "Unauthorized Access",
          text: "You have to Log-In First!",
          icon: "error",
          button: "ok",
        });

        this.props.history.push('/login');
      }

      else {



        console.log("the token value is :", token);

        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Session Has Expired',
          html:
            '<h4>Last Session Details</h4><br/><b>User ID :</b> ' + localStorage.getItem("id") + '<br/>' +
            '<b>User Name :</b> ' + localStorage.getItem("username") + '<br/><br/>',
          showConfirmButton: false,
          timer: 4000
        })

        this.props.history.push('/login');


      }

    });

    }else{
        this.props.history.push('/login');
    }

}


 

    onChangeDateIn(e) {
        this.setState({

            dateIn: e.target.value


        });


    }

    onChangeDateOut(e) {
        this.setState({

            dateOut: e.target.value


        });


    }
    async getAllEntries() {

        await  axios.get(`http://${config.host}:${config.port}/place/` + this.props.match.params.id
          ).then(res => {
              this.setState({
  
                  entries: res.data.data
  
              })
  
              console.log("Home page are ", this.state.entries);
  
          }).catch(err => {
              console.log(err);
  
  
          })
      }
    


    //handle sign in

    onSubmit = (e) => {

        e.preventDefault();

        const Book = {

            username: localStorage.getItem("username"),
            checkInDate: this.state.dateIn,
            checkOutDate: this.state.dateOut,
            country: localStorage.getItem("destination"),
            placeId: this.props.match.params.id,
          
        }

        const response = axios.post(`http://${config.host}:${config.port}/book/add`, Book).then(
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
                        title: 'Successfully Booked the Place',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    this.props.history.push('/home');

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
              
            





                <section id="home" class="about-us"style={{backgroundImage: "url(" + this.state.entries.img + ")"}}>
			<div class="container" >
				<div class="about-us-content" >
					<div class="row">
						<div class="col-sm-12">
							<div class="single-about-us">
								<div class="about-us-txt">
									<h2>
										{this.state.entries.name}

									</h2>
									<div >
									<h3>
                                        {this.state.entries.description}</h3>

									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-0">
							<div class="single-about-us">
								
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>

        <section id="pack" class="packages">
			<div class="container">
				<div class="gallary-header text-center">
					<h2>
						Book a Tour to The {this.state.entries.name}
					</h2>
					<p>
					
					</p>
				</div>

			
			</div>

		</section>

		
		<section  class="travel-box" style={{color:"black"}}>
        	<div class="container">
        		<div class="row">
        			<div class="col-md-12">
        				<div class="single-travel-boxes">
        					<div id="desc-tabs" class="desc-tabs">

								

							
								<div class="tab-content">

									<div role="tabpanel" class="tab-pane active" >
										<div class="tab-para">

											<div class="row">
											<div class="col-lg-4 col-md-4 col-sm-4">
													<div class="single-tab-select-box">
														<h2>check in</h2>
														<div class="travel-check-icon">
															<form action="#">
																<input type="date" name="check_in" class="form-control" data-toggle="datepicker" min={localStorage.getItem("date")} placeholder="12 -01 - 2017 " value={this.state.dateIn} onChange={this.onChangeDateIn}/>
															</form>
														</div>
													</div>
												</div>


												<div class="col-lg-4 col-md-4 col-sm-4">
													<div class="single-tab-select-box">
														<h2>check out</h2>
														<div class="travel-check-icon">
															<form action="#">
																<input type="date" name="check_in" class="form-control" data-toggle="datepicker" placeholder="12 -01 - 2017 " value={this.state.dateOut} onChange={this.onChangeDateOut}/>
															</form>
														</div>
													</div>
												</div>

											

											
										

                                            <div>
                                            <div class="col-lg-4 col-md-4 col-sm-8">
													<div class="single-tab-select-box">
												
													<div>
														<button  class="about-view travel-btn" style={{marginTop:"30px"}} onClick={this.onSubmit}>
															Book	
														</button>
													</div>
												</div>
                                            </div>
                                            
                                            </div>

                                            </div>
										
										</div>

									</div>

									

									

								</div>
							</div>
        				</div>
        			</div>
        		</div>
        	</div>

        </section>

        



    
		</div>
          
        )


    }


}