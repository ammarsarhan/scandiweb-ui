import { Component } from "react";

type OptionProps = {
    name: string;
    items: object[];
    isClickable: boolean;
    selected: number;
    onOptionChange?: (index: number) => void;
}

export default class Option extends Component<OptionProps> {
    // Find a way to link state to props
    state = {
        selected: this.props.selected // Not reactive!
    }

    handleOptionClicked = (index: number) => {
        this.setState({selected: index})
        this.props.onOptionChange!(index)
    }

    render () {
        if (this.props.name === "Color") {
            return (
                <div>
                    <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                    <div className='flex flex-wrap items-center gap-2'>
                        {this.props.items.map((selections: object, index: number) => {
                            const selection = JSON.parse(JSON.stringify(selections))
                            // If the index matches the selected index add different border-color
                            if (index === this.state.selected) {
                                if (this.props.isClickable) {
                                    return (
                                        <button onClick={() => this.handleOptionClicked(index)} className='border-[1px] border-[#5ECE7B] p-[2px]'>
                                            <div className="w-5 h-5" style={{backgroundColor: selection.value}} key={index}></div>
                                        </button>
                                    )
                                }
                                
                                return (
                                    <div className='border-[1px] border-[#5ECE7B] p-[2px]'>
                                        <div className="w-5 h-5" style={{backgroundColor: selection.value}} key={index}></div>
                                    </div>
                                )
                            } else {
                                if (this.props.isClickable) {
                                    return <button onClick={() => this.handleOptionClicked(index)} className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}} key={index}></button>
                                }
                                return <div className="w-5 h-5 border-[1px]" style={{backgroundColor: selection.value}} key={index}></div>
                            }
                        })}
                    </div>
                </div>
            )
        }

        /* If not colors then render component normally */
        return (
            <div>
                <span className='block my-2 text-[#1D1F22] font-light text-sm'>{this.props.name}:</span>
                <div className='flex flex-wrap gap-2'>
                    {this.props.items.map((selections: object, index: number) => {
                        const selection = JSON.parse(JSON.stringify(selections))

                        // If the index matches the selected index add background color and change text color
                        if (index === this.state.selected) {
                            if (this.props.isClickable) {
                                return <button className='border-[1px] p-1 border-black bg-black text-white text-sm' key={index} onClick={() => this.handleOptionClicked(index)} >{selection.displayValue}</button>
                            }
                            return <div className='border-[1px] p-1 border-black bg-black text-white text-sm' key={index}>{selection.displayValue}</div>
                        } else {
                            if (this.props.isClickable) {
                                return <button className='border-[1px] p-1 border-black text-sm' key={index} onClick={() => this.handleOptionClicked(index)}>{selection.displayValue}</button>
                            }
                            return <div className='border-[1px] p-1 border-black text-sm' key={index}>{selection.displayValue}</div>
                        }
                    })}
                </div>
            </div>
        )
    }
}