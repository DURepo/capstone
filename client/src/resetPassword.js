import React from 'react';

class resetPassword extends React.Component {
    constructor(props){
        super();
        this.state={
            smode: "",
            checkUserErrorDisplay:'None',            
            signinEmail: '',
            signinPassword: '',
            invalidpwErrorDisplay:'None'
        }
    }

    onSaveNewPassword = () =>{
        console.log('EMILLLLLLLL: ', this.state.signinEmail)
        console.log('PW EMILLLLLLLL: ', this.state.signinPassword)
        
        if(this.state.signinPassword.length>0){
            fetch('/savenewpassword', {
                method:'post',
                headers:{'content-Type': 'application/json'},
                body:JSON.stringify({
                    email: this.state.signinEmail,
                   password:  this.state.signinPassword
                })
            })        
            .then(response =>{
                if(!(response.status === 400)){
                    response.json()
                    .then(this.setState({smode:"changepw",invalidpwErrorDisplay:'None', checkUserErrorDisplay:'inline'}))
                }
                else{
                    console.log(response)
                    
                }
    
            })
        }
        else{
            this.setState({invalidpwErrorDisplay:'inline'})
        }

        
        
    }

    onCheckUserName = () =>{
        console.log('CHECKNA: ',  this.state.signinEmail)
        fetch('/checkUserName/' + this.state.signinEmail,{
            method:'get',
            headers:{'Content-Type':'application/json'}
        })
        .then(response =>{
            if(response.status === 200){
                response.json()
                .then(this.setState({smode:"changepw", checkUserErrorDisplay:'None'}))
            }
            else{
                console.log(response)
                this.setState({checkUserErrorDisplay:'inline'})
            }

        })
        .catch((err)=>{
            console.log(err)
            this.setState({checkUserErrorDisplay:'inline'})
        })
    }
    onEmailChange = (event) => {
        this.setState({signinEmail : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword : event.target.value})
    }

    onsigninclick = () =>{
        this.props.onRouteChange('signin');
    }

    updatemode = (mode) =>{
        this.setState({smode:mode})
    }

    render(){
        
        if(this.state.smode==="changepw"){
            return(
                <div>
                    <div style={{display:"flex"}}> 
                    <label style={{margin:"5px 5px 5px 5px"}} >Password</label>    
                    <input style={{display:'None'}} id="password3" type="password" placeholder="Your New Password" ></input>        
                    <input id="password1" type="password" onChange={this.onPasswordChange} placeholder="Your New Password" ></input>
                    </div>
                    <div>
                    <button type="submit2" className="all" onClick={this.onSaveNewPassword}>Save</button>
                    </div>
                    <div>
                    <p>{"\n"}</p>
                    <label style={{margin:"5px", backgroundColor : 'red', display: this.state.invalidpwErrorDisplay }} >Please enter valid password</label>
                    <label style={{margin:"5px", backgroundColor : 'green', display: this.state.checkUserErrorDisplay }} >Saved!</label>
                    <div>
                    <p style={{fontFamily:"Times New Roman", fontStyle:"italic", display: this.state.checkUserErrorDisplay}} onClick={this.onsigninclick}>sign in</p>
                    </div>
                    
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <div style={{display:"flex"}}> 
                         <label style={{margin:"5px 5px 5px 5px"}} >Username</label>            
                         <input id="email1" type="text" onChange={this.onEmailChange} placeholder="Your Login Name" ></input>
                     </div>
                     <div>
                         <p>{"\n"}</p>
                         <button type="submit1" className="all" onClick={this.onCheckUserName}>Check User Name</button>
                         
                     </div>
                     <div>
                         <p>{"\n"}</p>
                         <label style={{margin:"5px", backgroundColor : 'red', display: this.state.checkUserErrorDisplay }} >User Name Does Not Exist.</label>
                         </div>
                </div>
             )
        }


    }


}

export default resetPassword;