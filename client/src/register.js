import React from 'react';

class register extends React.Component {
    constructor(props){
        super();
        this.state= {
            email: '',
            password: '',
            name:'',
            ErrorDisplay : 'None'
        }
    }

    onNameChange = (event) => {
        this.setState({name : event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password : event.target.value})
    }

    onSubmitRegister = () => {
           
        if(this.state.email.length>0 && this.state.password.length>0 && this.state.name.length>0){
            fetch('/register', {
                method:'post',
                headers:{'content-Type': 'application/json'},
                body:JSON.stringify({
                    email: this.state.email,
                   password:  this.state.password,
                   name: this.state.name
                })
            })
            .then(response => response.json())
            .then(user=>{
                this.props.loadUser(user)
                this.props.onRouteChange('signin');
                       
                
            })
        }
        else{
            this.setState({ErrorDisplay:'inline'})
        }
               
        
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 46px 5px 5px"}} >Name</label>
                <input id="name" type="text" onChange={this.onNameChange} placeholder="Your Full Name..." ></input>
                </div>
                <p>{"\n"}</p>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 5px 5px 5px"}}>Username</label>
                <input id="email" type="text" onChange={this.onEmailChange} placeholder="Your Login Name" ></input>
                </div>
                <p>{"\n"}</p>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 5px 5px 5px"}} >Password</label>
                <input id="password" type="password" onChange={this.onPasswordChange} ></input>
                </div>
                <p>{"\n"}</p>
                <button className="all" type="submit" onClick={this.onSubmitRegister}>Register</button>
                <div>
                <p>{"\n"}</p>
                <label style={{margin:"5px", backgroundColor : 'red', display: this.state.ErrorDisplay }} >Please fill all details</label>
                </div>
            </div>

        );
    }
}

export default register;