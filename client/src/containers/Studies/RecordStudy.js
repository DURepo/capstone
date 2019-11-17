import React from 'react'
import { isNull } from 'util';

class RecordStudy  extends React.Component{
    constructor(props){
        super(props)

        this.state= {
            selectedinput : "",
            selectedoutput :"",
            studyDates: this.props.studyDates,
            study: this.props.studyData,
            mode:"",
            displayMessage:"",
            displayDate:"",
            displayedDate_id:""
        }
    }

    updatemode = (date,date_id) => {
        
        this.setState({mode:"RecordDay", displayMessage:"", displayDate:date,displayedDate_id:date_id})

    }

    onInputChange = (event) => {
        console.log('SELECT: ', event.target.value)
        this.setState({selectedinput: event.target.value})

    }

    onOutputChange= (event) =>{
        this.setState({selectedoutput: event.target.value})
    }

    saveDaybtnclick = () =>{
        console.log("EMPTY ",  this.state.selectedinput.length)
        if(this.state.displayedDate_id && (this.state.selectedinput!=2 && this.state.selectedinput.length>0 ) && this.state.selectedoutput.length>0)
        {
            this.setState({ mode:"", displayMessage:"Saved!!!"})
            
            fetch('/recordStudy',{
                method:'put',
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.state.displayedDate_id,
                    input_data: this.state.selectedinput,
                    output_data: this.state.selectedoutput
                })
                
            })
            .then(response => {
                this.setState({selectedoutput: "", selectedinput:""})
                console.log("RESP:",response)
                })
        }
        else{
            
            this.setState({selectedoutput: "", selectedinput:"", mode:"", displayMessage:"Please fill input and output after selecting date!!!"})
            console.log("PROPS:")
            console.log( this.state.selectedinput)
            console.log(this.state.selectedoutput)
            console.log(this.state.displayedDate_id)
            
            
        }


    }

    render(){
        const {s, studyDates} = this.props
        console.log('PROPS:',studyDates)
        const tablecomponent = studyDates.map((d,i)=>
        {
            let D = new Date(d.date)
            let displayDate = D.toString().split('00')[0]
        return (<button style={{margin:"2px"}} className="all" type="submit" key={d.id} value={d.id} onClick={()=>this.updatemode(displayDate,d.id)} >{displayDate}</button>)
        }       
        )

        return(
            <div>
                <h5> Select a Date: </h5>
                
                {this.state.mode==="RecordDay"
                ?<div>
                    <label>On {this.state.displayDate}</label>
                    <p>{"\n"}</p>                 
                    <label>Rate {this.state.study.observed_input} as low or high</label>
                    <select style={{"width" : "20%"}} onChange={this.onInputChange}>
                        <option value="2">--select--</option>
                        <option value="1">High</option>
                        <option value="0">Low</option>
                    </select>
                    <p>{"\n"}</p>
                    <label>Rate {this.state.study.observed_output} on scale of (0-100) (0: Low, 100 High) </label>
                    <input style={{"width" : "20%"}} id="output" onChange={this.onOutputChange} placeholder="value in 0-100"></input>
                    <p>{"\n"}</p>
                    <button type="submit" className="all" onClick={this.saveDaybtnclick} >Save</button>
                    <p>{"\n"}</p>
                 </div>
                 :<div>
                     <label style={{"backgroundColor":"grey"}}>{this.state.displayMessage }</label>
                 </div>
                }
                <div style={{margin:"5px"}}>
                {tablecomponent}
                </div>
               
            </div>
        )
    }
}

export default RecordStudy

