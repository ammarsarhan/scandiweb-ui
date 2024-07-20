import { Component } from "react";
import '@/static/card.css';

// To be filled with data from API and then passed to the Card component through .map() and props
type CardProps = {
    title: string;
    price: number;
    imageSource: string;
    outOfStock: boolean;
}

export default class Card extends Component<CardProps> {
    render() {
        return (
            <div className="w-full h-full flex-center xl:block">
                <div className="card w-96 p-3">
                    <img src="" alt={`${this.props.title}-image`} className="w-full h-80 bg-black"/>
                    <div className="mt-6 flex flex-col gap-1">
                        <h3 className="font-light">{this.props.title}</h3>
                        <span>${this.props.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        )
    }
}