import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import TopSafe from './topSafe';
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import config from '../configure.js';
import "./css/main.portal.css";

const Card = props => (


     


    
   
					

						<div class="col-md-4 col-sm-6">
                            <div class="packages-content">
							<div class="single-package-item">
								<img src={props.entry.img}/>
								<div class="single-package-item-txt">
									<h3> {props.entry.name} <span class="pull-right"> </span></h3>
									<div class="packages-para">
										<p>
											
												 {props.entry.description}
										
										</p>
							
									</div>
									<div class="packages-review">
										<p>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<span>345 review</span>
										</p>
									</div>
									<div class="about-btn">
										<button  class="about-view packages-btn">
											Book A Tour
										</button>
									</div>
								</div>
							</div>

						</div>

						
						
						
						</div>
						
						
						
						

			
  

    

);


export default class Home extends Component {


    constructor(props) {

        super(props);


        
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getAllEntries = this.getAllEntries.bind(this);
       
      
      
        this.state = {

            
            token: '',
            entries: [],
            date:'',
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


    EntryList(){

        
      

        
        console.log("This is called");
        return this.state.entries.map(entryCurrent => {

            return <Card

                key={entryCurrent._id}

                entry={entryCurrent}
            />;

        })
    };


    onChangeDate(e) {
        this.setState({

            date: e.target.value


        });


    }
    async getAllEntries() {

        await  axios.get(`http://${config.host}:${config.port}/country/`
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

        if(this.state.date=='' || this.state.destination==''){

            swal({
                title: "Necessary Fields are empty",
                text: "You have to Fill the Destination and Date First!",
                icon: "error",
                button: "ok",
              });


        }else

       this.validateUser();


    }


    render() {


        return (
            <div>
                <Navbar/>
              
            





                <section id="home" class="about-us">
			<div class="container">
				<div class="about-us-content">
					<div class="row">
						<div class="col-sm-12">
							<div class="single-about-us">
								<div class="about-us-txt">
									<h2>
										We are Amazing Because We Care

									</h2>
									<div class="about-btn">
										<button  class="about-view">
											Book Now
										</button>
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
												<div class="col-lg-4 col-md-4 col-sm-12">
													<div class="single-tab-select-box">

														<h2>destination</h2>

														<div class="travel-select-icon">
															<select class="form-control " onChange={this.onChangeDestination} value={this.state.destination}>

                                                            <option value="default">Select your destination country</option>
                                                            {this.state.entries.map((entry) => <option key={entry._id} value={entry.name}>{entry.name}</option>)}

															  

															  	

															</select>
														</div>

													
													</div>
												</div>

												<div class="col-lg-4 col-md-4 col-sm-4">
													<div class="single-tab-select-box">
														<h2>check in</h2>
														<div class="travel-check-icon">
															<form action="#">
																<input type="date" name="check_in" class="form-control" data-toggle="datepicker" placeholder="12 -01 - 2017 " value={this.state.date} onChange={this.onChangeDate}/>
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

        
<section id="pack" class="packages">
			<div class="container">
				<div class="gallary-header text-center">
					<h2>
						Destinations to Visit
					</h2>
					<p>
					These amazing places may amuse you!
					</p>
				</div>

                <div className="row">  {this.EntryList()} </div>
                
                <div className="row">  <TopSafe/> </div>
			
			</div>

		</section>


       
		</div>
          
        )


    }


}