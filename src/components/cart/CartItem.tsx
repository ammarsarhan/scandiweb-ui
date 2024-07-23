import { Component } from 'react';
import { CartItemType } from '@/types/cart';

export default class CartItem extends Component<CartItemType> {
    render () {
        return (
            <div className='item grid grid-cols-3'>
                <div className='flex flex-col flex-grow gap-y-2'>
                    <h3 className='font-extralight'>{this.props.product.name}</h3>
                    <span className='font-medium'>{this.props.product.prices[0].currency.symbol}{this.props.product.prices[0].amount}</span>
                    {/* First higher-level map through options array */}
                    {this.props.product.attributes.map((element, index) => {
                        const option = JSON.parse(JSON.stringify(element))
                        const selected = this.props.selectionIndices[index]
                        /* Conditional rendering to check if options are colors */
                        if (option.name === 'Color') {                            
                            return (
                                /* Second lower-level map through selections array */
                                <div key={index}>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex flex-wrap items-center gap-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))

                                            // If the index matches the selected index add different border-color
                                            if (index === selected) {
                                                return (
                                                    <div className='border-[1px] border-[#5ECE7B] p-[2px]'>
                                                        <div className="w-5 h-5" style={{backgroundColor: selection.value}} key={index}></div>
                                                    </div>
                                                )
                                            } else {
                                                return <div className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}} key={index}></div>
                                            }

                                        })}
                                    </div>
                                </div>
                            )
                        } else {
                            /* If not colors then render component normally */
                            return (
                                <div key={index}>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex flex-wrap gap-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))

                                            // If the index matches the selected index add background color and change text color
                                            if (index === selected) {
                                                return <div className='border-[1px] p-1 border-black bg-black text-white text-sm' key={index}>{selection.displayValue}</div>
                                            } else {
                                                return <div className='border-[1px] p-1 border-black text-sm' key={index}>{selection.displayValue}</div>
                                            }
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='flex flex-col items-center px-8'>
                    {/* Increment button copied from figma design */}
                    <button>
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
                    <span className='flex-grow flex-center'>{this.props.quantity}</span>
                    {/* Decrement button copied from figma design */}
                    <button>
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