import React from 'react'

class StudyResult extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            study: props.selectedStudy,
            result: props.studyResult
        }
    }

    render(){
        
        console.log(this.state.result)
        console.log("STDY:", this.state.study)
        if(this.state.result ==1 ){
            return(
                <div>
                    <h4>In the study that you did:</h4>
                    <h5>Based on the data you reported there is a <u>statistically significant impact </u> of "{this.state.study.observed_input}" on "{this.state.study.observed_output}".</h5>
                    <p style={{fontSize:"15px"}}>Note, there might be other factors as well that are influencing the results.</p>
                </div>
            )
        }
        else{
            return(
                <div>
                         <h4>In the study that you did:</h4>
                         <h5>Based on the data you reported there is a <u>no statistically significant impact</u> of "{this.state.study.observed_input}"" on "{this.state.study.observed_output}".</h5>
                         <p style={{fontSize:"15px"}} >Note, there might be other factors as well that are influencing the results.</p>
                </div>)
        } 
    }
}

export default StudyResult;