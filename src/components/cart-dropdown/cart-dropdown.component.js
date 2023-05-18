import React, { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";
import {
      CartDropdownContainer,
      EmptyMessage,
      CartItems,
} from "./cart-dropdown.styles";

export default function CartDropdown() {
      const { cartItems } = useContext(CartContext);
      const navigate = useNavigate();

      const gotoCheckoutHandler = () => {
            navigate("/checkout");
      };
      return (
            <CartDropdownContainer>
                  <CartItems>
                        {cartItems.length ? (
                              cartItems.map((item) => (
                                    <CartItem key={item.id} cartItem={item} />
                              ))
                        ) : (
                              <EmptyMessage>Your cart is empty</EmptyMessage>
                        )}
                  </CartItems>
                  <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
            </CartDropdownContainer>
      );
}
