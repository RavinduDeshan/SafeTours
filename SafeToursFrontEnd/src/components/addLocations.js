import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import TopSafe from './topSafe';
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import config from '../configure.js';
import "./css/main.portal.css";



let placeArr =[];
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
										{/* <p> Covid Situation Information
											<span>
												<i class="fa fa-angle-right"></i>  Total Recovered : {props.entry.recovered_value}
											</span>
											<i class="fa fa-angle-right"></i>  Total Deaths : {props.entry.death_value}
										 </p>

                                         <p> 
											<span>
												<i class="fa fa-angle-right"></i>  Total Active Patients : {props.entry.active_value}
											</span>
											<i class="fa fa-angle-right"></i>  Total Cases : {props.entry.confirmed_value}
										 </p> */}

									</div>
									<div class="packages-review">
										<p>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<span>242 review</span>
										</p>
									</div>
									<div class="about-btn">
									<Link to={'/book/' + props.entry._id}>	<button  class="about-view packages-btn"  >
											Select
										</button></Link>

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
		this.validateUser = this.validateUser.bind(this);
		this.getCovid= this.getCovid.bind(this);
       
      
      
        this.state = {

            
            token: '',
            entries: [],
            date:'',
            destination:'',
			fname:'',
			covid_Rate_obj:''



        }

    }

    onChangeDestination (e) {

        this.setState({

            destination: e.target.value


        });

    }

   async componentDidMount() {

	await this.getCovid();
      await  this.getAllEntries();
	 

	  
	  this.setState({

		destination: localStorage.getItem("destination"),
		date: localStorage.getItem("date"),
		fname: localStorage.getItem("firstname"),


	});

    }

    

  // validate users
  validateUser() {


    
    const token = localStorage.getItem('token');

   
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

		let country = localStorage.getItem("destination");
        await  axios.get(`http://${config.host}:${config.port}/place/byCountry/`+country
          ).then(res => {
              this.setState({
  
                  entries: res.data.data
  
              })
  
              console.log("places page are ", this.state.entries);
  
          }).catch(err => {
              console.log(err);
  
  
          })
      }
    

	  async getCovid() {

		var self = this;
		let country = localStorage.getItem("destination");
        await  axios.get(`http://${config.host}:${config.port}/country/covid/`+country
          ).then(res => {
			self.setState({
  
				covid_Rate_obj: res.data.data.covid_Rate_obj
  
              })
  
              console.log(" covid status are ", this.state.covid_Rate_obj);
  
          }).catch(err => {
              console.log(err);
  
  
          })

		  if (this.state.covid_Rate_obj!='') {
			this.forceUpdate();

			console.log("object Values death: " , this.state.covid_Rate_obj.death_value);
		  }
      }

    //handle sign in

    onSubmit = (e) => {

        e.preventDefault();

       this.validateUser();


    }


    render() {

		

        return (
            <div>
                <Navbar/>


			
		
	
              
            





		
	

        
<section id="pack" class="packages">
			<div class="container">
				<div class="gallary-header text-center">
				<h3>
						Hello, <b>{this.state.fname}</b>
					</h3>
					<h2>
						Plan your Tour in <b>"{this.state.destination}"</b>
					</h2>
					<p>
						Select Places to visit Starting Date from  <b>{this.state.date}</b>
<br/>
						<h1>{this.state.entries.length==0? " Oops! No places are available yet for this Country.. ":""}</h1>
					</p>
				</div>

				<div class="col-md-12 col-sm-12">
                            <div class="packages-content">
							<div class="single-package-item">
							
								<div class="single-package-item-txt">
									<center><h3> Covid Situation of the Country</h3></center>
									<div class="packages-para">
									
										<p> Covid Situation Information
											
												<i class="fa fa-angle-right"></i></p> <p>Total Recovered : {this.state.covid_Rate_obj.recovered_value==null? " loading.. ":this.state.covid_Rate_obj.recovered_value}
											
										
											
										 </p>

                                         <p> 
										 <i class="fa fa-angle-right"></i>  Total Deaths : {this.state.covid_Rate_obj.death_value==null? " loading.. ":this.state.covid_Rate_obj.death_value}
										 </p>
										 <p>
												<i class="fa fa-angle-right"></i>  Total Active Patients :{this.state.covid_Rate_obj.active_value ==null? " loading.. ":this.state.covid_Rate_obj.active_value}
										</p>
										<p>	
											
											<i class="fa fa-angle-right"></i>  Total Cases :{this.state.covid_Rate_obj.confirmed_value==null? " loading.. ":this.state.covid_Rate_obj.confirmed_value}
											
										 </p>

									</div>
									<div class="packages-review">
										<p>
											
											Overall Safety Rating  {this.state.covid_Rate_obj.safeR==null? " loading.. ":this.state.covid_Rate_obj.safeR + '%'}
										</p>
									</div>
									<div class="about-btn">
									

									</div>
								</div>
							</div>

						</div>

						
						
						
						</div>

                <div className="row">  {this.EntryList()} </div>
			
			</div>

		</section>


     
		</div>
          
        )


    }


}