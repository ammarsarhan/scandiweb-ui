import { Component } from "react";
import CartIcon from '@/static/assets/Cart-Alt.svg';
import '@/static/card.css';

import { ProductType } from "@/types/product";
import { CartContext, CartContextType } from "@/context/CartContext"

import mock from '../data.json'
import { Link } from "react-router-dom";

// To be filled with data from API and then passed to the Card component through .map() and props
type CardProps = {
    title: string;
    price: number;
    imageSource: string;
    inStock: boolean;
    id: string;
}

export default class Card extends Component<CardProps> {
    static contextType = CartContext;

    addToCart = (product: ProductType) => {
       (this.context as CartContextType).cartItems.push(product);
    }

    render () {
        // Render card component without functionality if out of stock
        if (!this.props.inStock) {
            return (
                <Link to={`/details/${this.props.id}`}>
                    <div className="w-full h-full flex-center">
                        <div className="card out-of-stock w-96 p-3">
                            {/* Out of stock overlay wrapper */}
                            <div className="w-full h-80 relative">
                                {/* Out of stock overlay */}
                                <div className="overlay absolute h-full w-full flex-center">
                                    <h6>OUT OF STOCK</h6>
                                </div>
                                <img src={this.props.imageSource} alt={`${this.props.title}-image`} className="w-full h-full object-contain opacity-50"/>
                            </div>
                            <div className="mt-6 flex flex-col gap-1">
                                <h3 className="font-light">{this.props.title}</h3>
                                <span>${this.props.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        } else {
            // Render card component with full functionality if not out of stock
            return (
                <Link to={`/details/${this.props.id}`}>
                    <div className="w-full h-full flex-center">
                        <div className="card w-96 p-3 relative">
                            <img src={this.props.imageSource} alt={`${this.props.title}-image`} className="w-full h-80 object-contain"/>
                            <div className="mt-6 flex flex-col gap-1">
                                <h3 className="font-light">{this.props.title}</h3>
                                <span>${this.props.price.toFixed(2)}</span>
                            </div>
                            <button className="card-button flex-center absolute bottom-16 right-8 p-3 rounded-full">
                                {/* Mock data to add to cart */}
                                <img src={CartIcon} alt="cart-icon" onClick={() => this.addToCart(mock.data.products[3])}/>
                            </button>
                        </div>
                    </div>
                </Link>
            )
        }
    }
}