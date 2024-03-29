
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/waves.png";

var ps;
function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <>
      <div
        className="sidebar"
        data-color={props.bgColor}
        data-active-color={props.activeColor}
      >
        <div className="logo">
          <a className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a className="simple-text logo-normal">SEDORA</a>
        </div>
        <div className="sidebar-wrapper" ref={sidebar}>
          <Nav>
            {props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              margin: "10%",
              color: "#ffffff",
              padding: "0",
              fontSize: "1.2vh",
            }}
          >
            <p>Copyright &copy; 2021</p>
            <p>Innostar Limited (UK)</p>
            <a
              className="simple-text logo-normal"
              href="https://innostar.co.uk"
            >
              Innostar.co.uk
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
