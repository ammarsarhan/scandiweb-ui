import { Component } from 'react';

type CartItemProps = {
    name: string;
    price: number;
    quantity: number;
    attributes: object[];
    imageSource: string;
}

export default class CartItem extends Component<CartItemProps> {
    render () {
        return (
            <div className='item grid grid-cols-3'>
                <div className='flex flex-col flex-grow gap-y-2'>
                    <h3 className='font-extralight'>{this.props.name}</h3>
                    <span className='font-medium'>${this.props.price.toFixed(2)}</span>
                    {/* First higher-level map through options array */}
                    {this.props.attributes.map((element, index) => {
                        const option = JSON.parse(JSON.stringify(element))
                        /* Conditional rendering to check if options are colors */
                        if (option.name === 'Color') {                            
                            return (
                                /* Second lower-level map through selections array */
                                <div key={index}>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex gap-x-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))
                                            return <div className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}} key={index}></div>
                                        })}
                                    </div>
                                </div>
                            )
                        } else {
                            /* If not colors then render component normally */
                            return (
                                <div key={index}>
                                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{option.name}:</span>
                                    <div className='flex gap-x-2'>
                                        {option.items.map((selections: object, index: number) => {
                                            const selection = JSON.parse(JSON.stringify(selections))
                                            return <div className='border-[1px] p-1 border-black text-sm' key={index}>{selection.displayValue}</div>
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
                    <img src={this.props.imageSource} alt="item-image" className='object-contain h-full w-full'/>
                </div>
            </div>
        )
    }
}