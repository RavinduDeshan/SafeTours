import React, {Component} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';


import swal from 'sweetalert2';
import config from '../configure.js';
import "./css/main.portal.css"
var forEach = require('async-foreach').forEach;



//card component
const Card = props => (

    <div>


     


       
						<div class="col-md-12 col-sm-12">
                            <div class="packages-content">
							<div class="single-package-item">
								<img src={props.entry.img}/>
								<div class="single-package-item-txt">
									<h1> {props.entry.name} </h1><p> {props.entry.description} </p><h3><span class="pull-right" >         Covid Rating : {props.entry.safeR}</span> <span style={{color:props.entry.safeR>85?"green":"red"}}>{props.entry.safeR>85?"safe":"Not Reccomended"}</span> </h3>
									
                                    <div class="packages-para">
										<p>
                                        <h3>Covid Situation Information</h3>
												
										
											
										</p>

										<p style={{color:"green"}}> 
										
												<i class="fa fa-angle-right"></i>  Total Recovered : {props.entry.recovered_value}
											
											
										 </p>
                                         <p style={{color:"red"}}> 

                                         <i class="fa fa-angle-right"></i>  Total Deaths : {props.entry.death_value}

                                         </p>

                                         <p> 
							
												<i class="fa fa-angle-right"></i>  Total Active Patients : {props.entry.active_value}
										</p>
                                        <p>
											<i class="fa fa-angle-right"></i>  Total Cases : {props.entry.confirmed_value}
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
				</div>
                
                
                
                  

  

    

);


export default class topSafe extends Component {


    constructor(props) {

        super(props);

        

        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getAllEntries = this.getAllEntries.bind(this);
        this.getCovidEntries = this.getCovidEntries.bind(this);
        this.EntryList = this.EntryList.bind(this);
        this.state = {

            
            token: '',
            entries: [],
            covidArr:[]



        }

    }

    onForgotPassword = (e) => {

        return null;

    }

    async componentDidMount() {

        let tempArr = [];
        await  axios.get(`http://${config.host}:${config.port}/country/`
        ).then((res) => {
            this.setState({

                entries: res.data.data

            })
            console.log("TopSafePage Entries are ", this.state.entries);
            


            // covid data 



            
            this.state.entries.forEach(  entry => {
            
                let country = entry.name;
         
             axios.get(`http://${config.host}:${config.port}/country/covid/` + country
                 ).then(res => {
         
                   
         
                     const entryObj = {
         
                        
                     _Id : res.data.data.EntryObj._id,
                     name : res.data.data.EntryObj.name,
                     description : res.data.data.EntryObj.description,
                     img : res.data.data.EntryObj.img,
         
                     confirmed_value : res.data.data.covid_Rate_obj.confirmed_value,
                     death_value : res.data.data.covid_Rate_obj.death_value,
                     recovered_value : res.data.data.covid_Rate_obj.recovered_value,
                     active_value : res.data.data.covid_Rate_obj.active_value,
                     safeR : res.data.data.covid_Rate_obj.safeR,
         
             
             
                     }
         
                   
                     tempArr.push(entryObj);

                     console.log("Executed lower end");
         
                   this.setState({
         
                    covidArr: tempArr
         
             })
         
             console.log("covid entry 2 are ", this.state.covidArr);
         
             console.log("hidden earea ", this.state.covidArr);
             if (this.state.covidArr.length!=0) {
                this.forceUpdate();
        
                console.log("Values Updated ");
              }
     
         
         
                 }).catch(err => {
                     console.log(err);
         
         
                 })

                
             }
             
            
             );

             


            //  covid

           

        }).catch(err => {
            console.log(err);


        })

        
    
         


    }

    async componentWillMount() {

       
      }

     

    EntryList(){

        
        if(this.state.covidArr==undefined || this.state.covidArr==null ){
            this.componentDidMount();
        }

        
        console.log("This is called");
        return this.state.covidArr.map(entryCurrent => {

            return <Card

                key={entryCurrent._id}

                entry={entryCurrent}
            />;

        })
    };


    async getAllEntries() {

      await  axios.get(`http://${config.host}:${config.port}/country/`
        ).then(res => {
            this.setState({

                entries: res.data.data

            })

            console.log("All Entries are ", this.state.entries);

        }).catch(err => {
            console.log(err);


        })
    }
   

    
   async getCovidEntries() {

    let tempArr = [];
       
       this.state.entries.forEach( async entry => {
            
       let country = entry.name;

      
    await    axios.get(`http://${config.host}:${config.port}/country/covid/` + country
        ).then(res => {

            

            const entryObj = {

               
            _Id : res.data.data.EntryObj._id,
            name : res.data.data.EntryObj.name,
            description : res.data.data.EntryObj.description,
            img : res.data.data.EntryObj.img,

            confirmed_value : res.data.data.covid_Rate_obj.confirmed_value,
            death_value : res.data.data.covid_Rate_obj.death_value,
            recovered_value : res.data.data.covid_Rate_obj.recovered_value,
            active_value : res.data.data.covid_Rate_obj.active_value,
            safeR : res.data.data.covid_Rate_obj.safeR,

    
    
            }

          
            tempArr.push(entryObj);

            console.log("Executed lower end");

          this.setState({

           covidArr: tempArr

    })

    console.log("covid entry 2 are ", this.state.covidArr);

  


         


        }).catch(err => {
            console.log(err);


        })
        
        if (this.state.covidArr!='') {
            this.forceUpdate();
    
            console.log("Values Updated ");
          }

    }
    
   
    );

    
    }

    onChangeDestination(e) {
        this.setState({

            username: e.target.value


        });


    }

    onChangeDate(e) {
        this.setState({

            password: e.target.value


        });


    }


    //handle sign in

    onSubmit = (e) => {

        e.preventDefault();

       


    }


  render() {

       
        return (
            <div>
               




<section id="pack" class="packages">
			<div class="container">
				<div class="gallary-header text-center">
					<h2>
						Destinations Pandemic Status
					</h2>
					<p>
						We Care your Safety!
					</p>
				</div>

                
			
			</div>
            <div className="row">     {this.EntryList()} </div>

		</section>


            </div>

        )


    }


}