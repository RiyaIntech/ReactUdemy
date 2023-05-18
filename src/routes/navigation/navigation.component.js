import React, { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {
      NavigationContainer,
      LogoContainer,
      NavLinks,
      NavLink,
    } from './navigation.style.js';


function Navigation() {
      const { currentUser } = useContext(UserContext);

      const {isCartOpen} = useContext(CartContext);

      return (
            <Fragment>
            <NavigationContainer>
            <LogoContainer to='/'>
              <CrwnLogo />
            </LogoContainer>
            <NavLinks>
              <NavLink to='/shop'>SHOP</NavLink>
    
              {currentUser ? (
                <NavLink as='span' onClick={signOutUser}>
                  SIGN OUT
                </NavLink>
              ) : (
                <NavLink to='/auth'>SIGN IN</NavLink>
              )}
              <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
          </NavigationContainer>
                  <Outlet />
            </Fragment>
      );
}

export default Navigation;
