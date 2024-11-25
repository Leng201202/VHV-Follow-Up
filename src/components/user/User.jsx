import {React,useState} from 'react'
import {Menu} from 'antd';
import {HomeOutlined,DashboardOutlined, UnorderedListOutlined, LikeOutlined, OrderedListOutlined} from '@ant-design/icons';
import { Footer } from 'antd/es/layout/layout';
import {Link, useNavigate} from 'react-router-dom'
import { Routes ,Route} from 'react-router-dom';
import History from './History'
import UserDashboard from './UserDashboard'
import GetPatientList from './GetPatientList';
import PatientDataform from './PatientDataform';
import UserProfile from './UserProfile';
const User = () => {
  return (
    <>
      <Header/>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideMenu />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
              {/* Notice how the paths are now relative */}
              <Route path="/" element={<UserDashboard/>} />
              <Route path="my-profile" element={<UserProfile/>} />
              <Route path="getpatientlist" element={<GetPatientList/>}/>
              <Route path="recordform" element={<PatientDataform/>} />
              <Route path="history" element={<History />} />
              
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}
function Header(){
  const navigate=useNavigate();
    const [token,setToken]=useState(true)
  return<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#87909E",height:"70px"}}>
  <h2 style={{paddingLeft:'15px'}}>VHV User </h2>

  <div style={{display:"flex",gap:"20px",alignItems:"center"}}>
      {
          token
          ? <div className='container'>
              <img className='profile-image' src='https://www.pngkey.com/png/full/202-2024792_profile-icon-png.png' alt='' style={{ position:'absolute',width: '50px', height: '50px',right:'50px',top:'5px' }}/>
              <img className='settings-icon' src='https://th.bing.com/th/id/OIP.-nNvWLvx3MfEpdQM0iQjQQHaHa?rs=1&pid=ImgDetMain' alt='' style={{ position:'absolute',width: '20px', height: '20px',right:'10px',top:'20px' }}/>
              <div className='dropdown'>
                  <div className='dropdown-content'style={{ position:'absolute',width: '50px', height: '100px',right:'2px',top:'5px',boxSizing:'border-box',padding:'10px',borderRadius:'5px' }}>
                      <p onClick={()=>navigate('my-profile')} className='dropdown-item'>Profile</p>
                      <hr></hr>
                      <p onClick={()=>navigate('/login')} className='dropdown-item'>Log out</p>
                  </div>
              </div>
          </div>
          : <button className='btn-login' onClick={()=>navigate('/login')} ></button>
      }

  </div>
</div>

}


function SideMenu(){
  const navigate=useNavigate();
  return(
            <Menu style={{backgroundColor:"#87909E",height:"300vh",width:"200px"}} onClick={({key})=>{
              navigate(key);

              }} items={[
              {label:"Dashboard",key:"/user",icon:<HomeOutlined/>},
              {label:"Patient List",key:"/user/getpatientlist",icon:<OrderedListOutlined/>},
              {label:"Record Patient",key:"/user/recordform",icon:<DashboardOutlined/>},
              {label:"History",key:"/user/history",icon:<UnorderedListOutlined/>}
            ]}>

            </Menu>
            
          );
}

export default User