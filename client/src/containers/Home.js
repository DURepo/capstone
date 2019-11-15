import React from "react";
import StartnewStudy from './CreateStudy/StartNewStudy';
import UserStudies from './Studies/UserStudies';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            activeMode : "none",
            userid: props.userid

        }
    }
    
    updatemode = (mode) =>{
        this.setState({activeMode: mode})
       
    }

    loadHome = () =>{
        return(
                <div>                    
                <button type="submit" onClick={()=>this.updatemode("viewStudies")}>Select Existing Study</button>
                <button type="submit" userid={this.state.userid} onClick={()=>this.updatemode("createNewStudy")}>Start a New Study</button>
                <label>load home return {this.state.userid}</label>
                </div>
        )
    }

    
    render(){        
        
            if(this.state.activeMode==="none"){
                // return (<div>
                // {this.loadHome()}
                // </div>
                return(            
                <div>                    
                    <button type="submit" onClick={()=>this.updatemode("viewStudies")}>Select Existing Study</button>
                    <p>{"\n"}</p>
                    <button type="submit" userid={this.state.userid} onClick={()=>this.updatemode("createNewStudy")}>Start a New Study</button>
                    <label>DIV return {this.state.userid}</label>
                </div>
                )
            }
            else if(this.state.activeMode==="createNewStudy") {
                return(
                    <div>
                        
                        {/* {this.createStudyDisplayPage()} */}
                        <StartnewStudy userid={this.state.userid} route={this.state.route} />
                    </div>
                )
            }
            else{
                //view study
                return(<div>
                    <UserStudies userid={this.state.userid} />
                    <label>else return {this.state.userid}</label>
                </div>)
            }
        
    }
}

export default Home;