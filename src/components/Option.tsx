import { Component } from "react";
import { convertToKebabCase } from '@/utils/parse'

type OptionProps = {
    name: string;
    items: object[];
    isProduct: boolean;
    selected: number | null;
    onOptionChange?: (index: number) => void;
}

export default class Option extends Component<OptionProps> {
    state = {
        selected: this.props.selected
    }

    // If props updated, assign them to state!
    componentDidUpdate(previous: OptionProps) {
        if (previous.selected !== this.props.selected) {
            this.setState({ selected: this.props.selected });
        }
    }

    handleOptionClicked = (index: number) => {
        this.setState({selected: index});

        if (this.props.onOptionChange) {
            this.props.onOptionChange(index);
        }
    }

    render () {
        // Product Option
        if (this.props.isProduct) {
            if (this.props.name === "Color") {
                return (
                    <div data-testid={`product-attribute-${convertToKebabCase(this.props.name)}`}>
                        <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                        <div className='flex flex-wrap items-center gap-2'>
                            {this.props.items.map((selections: object, index: number) => {
                                const selection = JSON.parse(JSON.stringify(selections))
                                // If the index matches the selected index add different border-color
                                if (index === this.state.selected) {
                                    return (
                                        <button data-testid={`product-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`} onClick={() => this.handleOptionClicked(index)} className='border-[1px] border-[#5ECE7B] p-[2px]'>
                                            <div className="w-5 h-5" style={{backgroundColor: selection.value}} key={index}></div>
                                        </button>
                                    )
                                } else {
                                    return <button data-testid={`product-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`} onClick={() => this.handleOptionClicked(index)} className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}} key={index}></button>
                                }
                            })}
                        </div>
                    </div>
                )
            }
    
            /* If not colors then render component normally */
            return (
                <div data-testid={`product-attribute-${convertToKebabCase(this.props.name)}`}>
                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                    <div className='flex flex-wrap gap-2'>
                        {this.props.items.map((selections: object, index: number) => {
                            const selection = JSON.parse(JSON.stringify(selections))
    
                            // If the index matches the selected index add background color and change text color
                            if (index === this.state.selected) {
                                console.log(index, this.state.selected, selection.displayValue)
                                return <button data-testid={`product-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`} className='border-[1px] p-1 border-black bg-black text-white text-sm' key={index} onClick={() => this.handleOptionClicked(index)} >{selection.displayValue}</button>
                            } else {
                                return <button data-testid={`product-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`} className='border-[1px] p-1 border-black text-sm' key={index} onClick={() => this.handleOptionClicked(index)}>{selection.displayValue}</button>
                            }
                        })}
                    </div>
                </div>
            )
        }

        // Cart Item Option
        if (!this.props.isProduct) {
            if (this.props.name === "Color") {
                return (
                    <div data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}`}>
                        <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                        <div className='flex flex-wrap items-center gap-2'>
                            {this.props.items.map((selections: object, index: number) => {
                                const selection = JSON.parse(JSON.stringify(selections))
                                // If the index matches the selected index add different border-color
                                if (index === this.state.selected) {
                                    return (
                                        <div className='border-[1px] border-[#5ECE7B] p-[2px]'>
                                            <div className="w-5 h-5" style={{backgroundColor: selection.value}} key={index} data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}-selected`}></div>
                                        </div>
                                    )
                                } else {
                                    return <div 
                                        className="w-5 h-5 border-[1px]" 
                                        style={{backgroundColor: selection.value}} 
                                        key={index} 
                                        data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`}></div>
                                }
                            })}
                        </div>
                    </div>
                )
            }
    
            /* If not colors then render component normally */
            return (
                <div data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}`}>
                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                    <div className='flex flex-wrap gap-2'>
                        {this.props.items.map((selections: object, index: number) => {
                            const selection = JSON.parse(JSON.stringify(selections))
    
                            // If the index matches the selected index add background color and change text color
                            if (index === this.state.selected) {
                                return <div 
                                    className='border-[1px] p-1 border-black bg-black text-white text-sm' 
                                    key={index}
                                    data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}-selected`}>{selection.displayValue}</div>
                            } else {
                                return <div 
                                    className='border-[1px] p-1 border-black text-sm' 
                                    key={index}
                                    data-testid={`cart-item-attribute-${convertToKebabCase(this.props.name)}-${selection.displayValue}`}>{selection.displayValue}</div>
                            }
                        })}
                    </div>
                </div>
            )
        }
    }
}