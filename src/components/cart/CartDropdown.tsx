import { Component } from 'react'
import { CartContext } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'

// Dummy data for testing
const one = [
    {
      "id": "Capacity",
      "items": [
        {
          "displayValue": "256GB",
          "value": "256GB",
          "id": "256GB",
          "__typename": "Attribute"
        },
        {
          "displayValue": "512GB",
          "value": "512GB",
          "id": "512GB",
          "__typename": "Attribute"
        }
      ],
      "name": "Capacity",
      "type": "text",
      "__typename": "AttributeSet"
    },
    {
      "id": "With USB 3 ports",
      "items": [
        {
          "displayValue": "Yes",
          "value": "Yes",
          "id": "Yes",
          "__typename": "Attribute"
        },
        {
          "displayValue": "No",
          "value": "No",
          "id": "No",
          "__typename": "Attribute"
        }
      ],
      "name": "With USB 3 ports",
      "type": "text",
      "__typename": "AttributeSet"
    },
    {
      "id": "Touch ID in keyboard",
      "items": [
        {
          "displayValue": "Yes",
          "value": "Yes",
          "id": "Yes",
          "__typename": "Attribute"
        },
        {
          "displayValue": "No",
          "value": "No",
          "id": "No",
          "__typename": "Attribute"
        }
      ],
      "name": "Touch ID in keyboard",
      "type": "text",
      "__typename": "AttributeSet"
    }
]

const two = [
    {
      "id": "Color",
      "items": [
        {
          "displayValue": "Green",
          "value": "#44FF03",
          "id": "Green",
          "__typename": "Attribute"
        },
        {
          "displayValue": "Cyan",
          "value": "#03FFF7",
          "id": "Cyan",
          "__typename": "Attribute"
        },
        {
          "displayValue": "Blue",
          "value": "#030BFF",
          "id": "Blue",
          "__typename": "Attribute"
        },
        {
          "displayValue": "Black",
          "value": "#000000",
          "id": "Black",
          "__typename": "Attribute"
        },
        {
          "displayValue": "White",
          "value": "#FFFFFF",
          "id": "White",
          "__typename": "Attribute"
        }
      ],
      "name": "Color",
      "type": "swatch",
      "__typename": "AttributeSet"
    },
    {
      "id": "Capacity",
      "items": [
        {
          "displayValue": "512G",
          "value": "512G",
          "id": "512G",
          "__typename": "Attribute"
        },
        {
          "displayValue": "1T",
          "value": "1T",
          "id": "1T",
          "__typename": "Attribute"
        }
      ],
      "name": "Capacity",
      "type": "text",
      "__typename": "AttributeSet"
    }
]

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
                      <div className="overflow-y-auto absolute right-10 cart-dropdown bg-white z-50 p-5">
                          <h6 className='mt-4 mb-8'><span className='font-semibold'>My Bag,</span> 3 items</h6>
                          <div className='flex flex-col gap-y-8 h-96 overflow-y-auto'>
                              <CartItem title="Running Short" price={50} quantity={1} attributes={one}/>
                              <CartItem title="Running Short" price={50} quantity={2} attributes={two}/>
                          </div>
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