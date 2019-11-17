import React from 'react';
import './App.css';

const Navigation = ({onRouteChange, isSignedIn})=>{
    
        if (isSignedIn){
        return(
        <nav style= {{display: 'flex', justifyContent:'flex-end'}}>
            <p  onClick={()=> onRouteChange('home')} className='nav f3 link dim white underlined pa3 pointer'>Home</p>
            <p onClick={()=> onRouteChange('signout')} className='nav f3 link dim white underlined pa3 pointer'>Sign Out</p>
        </nav>
        )
        }
        else{
        return(
        <nav style= {{display: 'flex', justifyContent:'flex-end' }}>
            <p onClick={()=> onRouteChange('signin')} className='nav f3 link dim white underlined pa3 pointer'>Sign In</p>
            <p onClick={()=> onRouteChange('register')} className='nav f3 link dim white underlined pa3 pointer'>Register</p>
        </nav>        
        )
        }
        
    
}

export default Navigation;