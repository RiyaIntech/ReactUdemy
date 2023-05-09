import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import  '../navigation/navigation.style.scss'
function Navigation() {
      return (
            <Fragment>
                  <div className="navigation">
                        <Link className="logo-container" to="/">
                              <CrwnLogo className="logo"></CrwnLogo>
                        </Link>

                        <div className="links-container">
                              <Link className="nav-link" to="/shop">
                                    Shop
                              </Link>
                              <Link className="nav-link" to="/auth">
                              Sign-In
                              </Link>
                        </div>
                  </div>
                  <Outlet />
            </Fragment>
      );
}

export default Navigation;
