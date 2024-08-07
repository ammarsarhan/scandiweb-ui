import { Component } from 'react'
import { CartContext } from '@/context/CartContext'

import CartItem from '@/components/cart/CartItem'

export default class CartDropdown extends Component {
  render () {
    return (
      // Remove local state and use Context API to globalize dropdown state
      <CartContext.Consumer>
        {(context) => {
            if (context.dropdownActive) {
              // Stop user from scrolling while dropdown is active
              document.body.style.overflow = 'hidden';
              // And return dropdown & overlay
              return (
                  <>
                      {/* Actual dropdown section */}
                      <div className="absolute md:right-10 cart-dropdown bg-white z-50 p-5 w-full h-full md:w-[26rem] md:h-auto">
                          <h6 className='mt-4 mb-8'>
                            <span className='font-semibold'>My Bag</span>
                            {context.getQuantity() > 1 && `, ${context.getQuantity()} items`}
                            {context.getQuantity() === 1 && `, ${context.getQuantity()} item`}
                          </h6>
                          <div className='flex flex-col gap-y-12 max-h-96 md:max-h-80 overflow-y-auto'>
                              {
                                context.cartItems.map((item, index) => {
                                  return <CartItem key={index} listIndex={index} product={item.product} quantity={item.quantity} selectionIndices={item.selectionIndices}/>
                                })
                              }
                          </div>
                          <div className='flex justify-between items-center font-semibold my-8'>
                            <span>Total</span>
                            <span data-testid='cart-total'>${context.getTotal().toFixed(2)}</span>
                          </div>
                          {
                            context.cartItems.length === 0 ?
                            <button className='text-center font-medium block w-full px-16 py-4 my-4 text-white bg-[#7d7d7d]' disabled>PLACE ORDER</button> :
                            <button className='text-center font-medium block w-full px-16 py-4 my-4 text-white bg-[#5ECE7B]' onClick={context.placeOrder}>PLACE ORDER</button>
                          }
                      </div>
                      {/* Overlay to gray out */}
                      <div className="overlay fixed w-full h-full bg-black opacity-20 z-30" onClick={context.switchDropdownActive}></div>
                  </>
              )
          } else {
              // Allow user to scroll again when dropdown is inactive
              document.body.style.overflow = 'visible';
              return <></>
          }
        }}
      </CartContext.Consumer>
    )
  }
}