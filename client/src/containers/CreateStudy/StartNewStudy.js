import React from "react";
import Home from '../Home';
import StudyPlan from '../StudyPlan';

class StartnewStudy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:props.userid,
            display:'default',
            studyinput:'',
            studyoutput:'',
            studyduration:0            
        }

    }

    updateDisplay=(mode)=>{        

        this.setState({display:mode})

    }

    onstudyInputChange =(event)=>{
        this.setState({studyinput:event.target.value})        
    }

    onstudyOutputChange = (event) =>{
        this.setState({studyoutput:event.target.value})        
    }

    onDurationSelection = (event) => {
        this.setState({studyduration: event.target.value})        
    }

    confirmStudysubmit = (event) =>{
        console.log("CREATE STDY:", this.state.userid)
        // call server update study details
        fetch('/createuserStudy',{
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({          
          userid: this.state.userid,
          studyinput: this.state.studyinput,
          studyoutput: this.state.studyoutput,
          studyPeriodinDays: this.state.studyduration
          
      })
    })
    .then(resp => console.log("RESPONSE: " + resp))
        this.updateDisplay("studyCreated")
    }

    CancelStudy=()=>{
        this.updateDisplay("studyCanceled") 
    }

    render(){
        
        switch (this.state.display) {
            case "default" : 
            return (<div>
                <h1>Create New Study</h1>
                <label>What do you want to study?</label>
                <p>Impact of</p>
                <input id="studyinput" onChange={this.onstudyInputChange} ></input>
                <p>on</p>
                <input id="studyoutput" onChange={this.onstudyOutputChange} ></input>
                <p>Ex: Impact of "high vegetable intake" on "sleep"</p>
                <button type="submit" onClick={()=>this.updateDisplay("duration")}>Next</button>
                <label> {this.state.userid} </label>
                </div>)                
            case "duration":
                return (<div>
                    <h1>Create New Study</h1>
                    <label>How long a study do you want to conduct</label>
                    <select style={{margin:"10px"}} onChange={this.onDurationSelection}>
                        <option value="">--select--</option>
                        <option value="15">15 Days</option>
                        <option value="30">30 Days</option>
                        <option value="45">45 Days</option>
                        <option value="60">60 Days</option>
                    </select>
                    <p>{"\n"}</p>
                    <button type="submit" onClick={()=>this.updateDisplay("showHypothesis")}>Next</button>
                    <label> {this.state.userid} </label>
                </div>)
            case "showHypothesis":
                return (
                    <div>
                        <h1>Create New Study</h1>
                        <p>Your Hypthosis is {this.state.studyinput} has impact on {this.state.studyoutput}</p>
                        <button style={{margin:"20px"}} type="submit" onClick={()=>this.confirmStudysubmit()}>Yes, Start My Study</button>
                        <button style={{margin:"20px"}} type="cancel" onClick={()=>this.CancelStudy()}>Cancel, I changed My mind</button>
                        <label> {this.state.userid} </label>
                    </div>
                )
            case "studyCreated":
                return(
                    <div>
                        <h1>Create New Study</h1>
                        <p>Your Study has been created!!! </p>
                        <p>{"\n"}</p>
                        <p>For better analysis maintain High value of "{this.state.studyinput}" on below listed days and low on other days.</p>
                        <StudyPlan studyPeriod={this.state.studyduration}/>
                        <button style={{margin:"20px"}} type="cancel" onClick={()=>this.CancelStudy()}>Okay</button>
                        <label> {this.state.userid} </label>
                    </div>
                )
            case "studyCanceled":
                console.log('START NEW STUDY Sate: ', this.state)
                
                return(
                    
                     <Home userid= {this.state.userid} route={this.state.route}/>
                     
                 )
            default:
            break;             



        }
      
    }

}

export default StartnewStudy ;