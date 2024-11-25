import {Routes,Route,useNavigate,useLocation} from 'react-router-dom'
import React,{useState} from 'react';
function Header(){
    const navigate=useNavigate();
      const [token,setToken]=useState(true)
    return<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#87909E",height:"70px"}}>
    <h2>VHV Admin </h2>
  
    <div style={{display:"flex",gap:"20px",alignItems:"center"}}>
        {
            token
            ? <div className='container'>
                <img className='profile-image' src='https://www.pngkey.com/png/full/202-2024792_profile-icon-png.png' alt='' style={{ position:'absolute',width: '50px', height: '50px',right:'50px',top:'5px' }}/>
                <img className='settings-icon' src='https://th.bing.com/th/id/OIP.-nNvWLvx3MfEpdQM0iQjQQHaHa?rs=1&pid=ImgDetMain' alt='' style={{ position:'absolute',width: '20px', height: '20px',right:'10px',top:'20px' }}/>
                <div className='dropdown'>
                    <div className='dropdown-content' style={{ position:'absolute',width: '50px', height: '100px',right:'2px',top:'5px',boxSizing:'border-box',padding:'10px',borderRadius:'5px' }}>
                        <p onClick={()=>navigate('my-profile')} className='dropdown-item'>Profile</p>
                        <hr></hr>
                        <p onClick={()=>navigate('/login')} className='dropdown-item'>Log out</p>
                    </div>
                </div>
            </div>
            : <button className='btn-login' onClick={()=>navigate('/login')} >Create Account</button>
        }
  
    </div>
  </div>
  
  }
  export default Header;