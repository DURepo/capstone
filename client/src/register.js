import React from 'react';

class register extends React.Component {
    constructor(props){
        super();
        this.state= {
            email: '',
            password: '',
            name:''
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
            this.props.onRouteChange('home');
                   
            
        })       
        
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 40px 5px 5px"}} >Name</label>
                <input id="name" type="name" onChange={this.onNameChange} placeholder="Your Name..." ></input>
                </div>
                <p>{"\n"}</p>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 45px 5px 5px"}}>Email</label>
                <input id="email" type="email" onChange={this.onEmailChange} placeholder="abc@gmail.com" ></input>
                </div>
                <p>{"\n"}</p>
                <div style={{display:"flex"}}> 
                <label style={{margin:"5px 5px 5px 5px"}} >Password</label>
                <input id="password" type="password" onChange={this.onPasswordChange} ></input>
                </div>
                <p>{"\n"}</p>
                <button className="all" type="submit" onClick={this.onSubmitRegister}>Register</button>
            </div>

        );
    }
}

export default register;