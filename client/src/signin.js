import React from 'react';

class signin extends React.Component {
    constructor(props){
        super();
        this.state= {
            signinEmail: '',
            signinPassword: '',
            ErrorDisplay : 'None'
        }
    }
    onEmailChange = (event) => {
        this.setState({signinEmail : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword : event.target.value})
    }

    onSubmitSigin = () => {
           

        fetch('/signin', {
            method:'post',
            headers:{'content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.signinEmail,
               password:  this.state.signinPassword
            })
        })
        .then(response => 
            
            {if(!(response.status === 400)){
                console.log('RESPONSE: ', response)
                response.json()
                .then(user=>{  
                    console.log('USER:', user)          
                    if(user){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                     
                    }
                    else{
                        console.log("failsigin")
        
                    }           
                    
                })
                
            }   
            else{
                console.log('wrong response: ', response)
                this.setState({ErrorDisplay:'inline'})
            }
            }      
            //response.json()
            )       
       
        
    }
    render(){
        const {onRouteChange} = this.props

    
    return (
        <div>
            <div style={{display:"flex"}}> 
            <label style={{margin:"5px 45px 5px 5px"}} >Email</label>            
            <input id="email" type="email" onChange={this.onEmailChange} placeholder="abc@gmail.com" ></input>
            </div>
            <p>{"\n"}</p>
            
            <div style={{display:"flex"}}> 
            <label style={{margin:"5px"}} >Password</label>
            <input id="password" type="password" onChange={this.onPasswordChange} ></input>
            
            </div>
            <p>{"\n"}</p>
            <button type="submit" className="all" onClick={this.onSubmitSigin}>Sign in</button>
            <div>
            <p>{"\n"}</p>
            <label style={{margin:"5px", backgroundColor : 'red', display: this.state.ErrorDisplay }} >Please enter Valid Credentials</label>
            </div>


        </div>

        // <main className="pa4 white-80" center="true">
        // <form className="measure">
        // <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        // <legend className="f4 fw6 ph0 mh0">Sign In</legend>
        // <div className="mt3">
        //     <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        //     <input                 
        //         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        //         type="email" 
        //         name="email-address"  
        //         id="email-address"
        //         onChange ={this.onEmailChange}/>
        // </div>
        // <div className="mv3">
        //     <label className="db fw6 lh-copy f6" for="password">Password</label>
        //     <input 
        //     className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        //     type="password" 
        //     name="password"  
        //     id="password"
        //     onChange ={this.onPasswordChange}/>
        // </div>        
        //     </fieldset>
        // <div className="">
        // <input
        //     onClick = {this.onSubmitSigin} 
        //     className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
        // </div>
        // <div className="lh-copy mt3">
        // <p onClick = {() => onRouteChange('register')}  className="f6 link dim black db pointer">Register</p>        
        // </div>
        // </form>
        // </main>

    );
 }
}


export default signin;