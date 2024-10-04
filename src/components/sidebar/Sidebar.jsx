import "./sidebar.css"
import SidebarLogo1 from "../topbar/logo/sidebarLogo1"
import SidebarLogo2 from "../topbar/logo/sidebarLogo2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../topbar/logo/logo';

import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="topLeft">
        <span className="logo_text">
          <div className="logo"><Logo /></div>
          <div className="text">E-Legal</div>
        </span>
      </div>
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              
              <span className="sidebarIconText">
                <SidebarLogo1 className="sidebarLogo" />
                <span className="sidebarText">User</span>
              </span>
            </li>
            
            <li className="sidebarListItem">
              <span className="sidebarIconText">
                <SidebarLogo2 className="sidebarLogo" />
                <Link to={"/application"}>
                <span className="sidebarText">Müraciətlər 
                </span>   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                </Link>
              </span>
            </li>
            <li className="sidebarListItem">
              <span className="sidebarIconText">
                <FontAwesomeIcon icon={faUser} className="sidebarLogo" />
                <Link to={"/users"}>
                  <span className="sidebarText">İstifadəçilər </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="#9197B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </Link>
              </span>
            </li>
          </ul>
            </div>
          </div>
    </div>
    
  )
}

export default Sidebar

  // <span span className = "sidebarListItem2" > <SidebarLogo2 />Müraciətlər</span >
  //   <span className="sidebarListItem3"><SidebarLogo3 />İstifadəçilər</span>