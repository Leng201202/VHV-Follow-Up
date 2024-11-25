import {Menu} from 'antd';
import {HomeOutlined,DashboardOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Routes,Route,useNavigate,useLocation} from 'react-router-dom'
function SideMenu(){
    const navigate=useNavigate();
    return(
              <Menu style={{backgroundColor:"#87909E",height:"270Vh",width:"200px"}} onClick={({key})=>{
                navigate(key);
  
                }} items={[
                {label:"Dashboard",key:"/admin/",icon:<HomeOutlined/>},
                {label:"List of Patient",key:"/admin/listofpatient",icon:<DashboardOutlined/>},
                {label:"Recorded Data",key:"/admin/patientrecordeddata",icon:<UnorderedListOutlined/>}
              ]}>
  
              </Menu>
              
            );
  }
export default SideMenu;