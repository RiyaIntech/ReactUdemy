import React,{useContext} from 'react'
import '../cart-dropdown/cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/cart.context';
import {useNavigate} from 'react-router-dom';

export default function CartDropdown () {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const gotoCheckoutHandler = () => {
      navigate('/checkout')
    }
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  )
}
