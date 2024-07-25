import { Component } from 'react';
import { CartContext, CartContextType } from '@/context/CartContext';
import { CartItemType } from '@/types/cart';

import Option from '@/components/Option';

export default class CartItem extends Component<CartItemType> {
    static contextType = CartContext;
    ctx = this.context as CartContextType;
    
    incrementQuantity = (index: number) => {
        this.ctx.incrementProduct(index);
    }
    
    decrementQuantity = (index: number) => {
        this.ctx.decrementProduct(index);
        this.forceUpdate();
    }

    render () {
        return (
            <div className='item grid grid-cols-3'>
                <div className='flex flex-col flex-grow gap-y-2'>
                    <h3 className='font-extralight'>{this.props.product.name}</h3>
                    <span className='font-medium'>{this.props.product.prices[0].currency.symbol}{this.props.product.prices[0].amount}</span>
                    {/* First higher-level map through options array */}
                    {this.props.product.attributes.map((element, index) => {
                        const option = JSON.parse(JSON.stringify(element))
                        return <Option key={index} name={option.name} items={option.items} isClickable={false} selected={this.props.selectionIndices[index]}/>
                    })}
                </div>
                <div className='flex flex-col items-center px-8'>
                    {/* Increment button copied from figma design */}
                    <button onClick={() => this.incrementQuantity(this.props.listIndex)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_92234_46)">
                                <path d="M12 8V16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_92234_46">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <span className='flex-grow flex-center'>{this.ctx.cartItems[this.props.listIndex].quantity}</span>
                    {/* Decrement button copied from figma design */}
                    <button onClick={() => this.decrementQuantity(this.props.listIndex)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22"/>
                            <path d="M8 12H16" stroke="#1D1F22" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className='h-full w-28 flex-center'>
                    <img src={this.props.product.gallery[0]} alt="item-image" className='object-contain h-full w-full'/>
                </div>
            </div>
        )
    }
}