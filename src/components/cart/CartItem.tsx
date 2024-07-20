import { Component } from 'react';

type CartItemProps = {
    title: string;
    price: number;
    quantity: number;
    attributes: object[];
}

export default class CartItem extends Component<CartItemProps> {
    render () {
        return (
            <div className='item flex'>
                <div className='flex flex-col flex-grow gap-y-2'>
                    <h3 className='font-extralight'>{this.props.title}</h3>
                    <span className='font-medium'>${this.props.price.toFixed(2)}</span>
                    {/* First higher-level map through options array */}
                    {this.props.attributes.map((element, index) => {
                        const option = JSON.parse(JSON.stringify(element))
                        console.log(option.name)

                        /* Conditional rendering to check if options are colors */
                        if (option.name === 'Color') {                            
                            return (
                                /* Second lower-level map through selections array */
                                <div>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex gap-x-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))
                                            return <button className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}}></button>
                                        })}
                                    </div>
                                </div>
                            )
                        } else {
                            /* If not colors then render component normally */
                            return (
                                <div>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex gap-x-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))
                                            return <button className='border-[1px] p-1 border-black text-sm'>{selection.displayValue}</button>
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
                        <g clip-path="url(#clip0_92234_46)">
                        <path d="M12 8V16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 12H16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
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
                        <path d="M8 12H16" stroke="#1D1F22" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </button>
                </div>
                <img src="" alt="item-image"/>
            </div>
        )
    }
}