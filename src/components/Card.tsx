import { Component } from "react";
import CartIcon from '@/static/assets/Cart-Alt.svg';
import '@/static/card.css';

import { ProductType } from "@/types/product";
import { CartContext, CartContextType } from "@/context/CartContext"

import { Link } from "react-router-dom";

export default class Card extends Component<{product: ProductType}> {
    static contextType = CartContext;
    
    render () {
        // Render card component without functionality if out of stock
        if (!this.props.product.inStock) {
            return (
                <Link to={`/details/${this.props.product.id}`}>
                    <div className="w-full h-full flex-center">
                        <div className="card out-of-stock w-96 p-3">
                            {/* Out of stock overlay wrapper */}
                            <div className="w-full h-80 relative">
                                {/* Out of stock overlay */}
                                <div className="overlay absolute h-full w-full flex-center">
                                    <h6>OUT OF STOCK</h6>
                                </div>
                                <img src={this.props.product.gallery[0]} alt={`${this.props.product.name}-image`} className="w-full h-full object-contain opacity-50"/>
                            </div>
                            <div className="mt-6 flex flex-col gap-1">
                                <h3 className="font-light">{this.props.product.name}</h3>
                                <span>{this.props.product.prices[0].currency.symbol}{this.props.product.prices[0].amount}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        } else {
            const ctx = this.context as CartContextType;
            // Render card component with full functionality if not out of stock
            return (
                <div className="flex-center h-full w-full">
                    <div className="card relative p-3">
                        <Link to={`/details/${this.props.product.id}`} className="block w-96 p-0">
                            <div className="w-96">
                                <img src={this.props.product.gallery[0]} alt={`${this.props.product.name}-image`} className="w-full h-80 object-contain"/>
                                <div className="mt-6 flex flex-col gap-1">
                                    <h3 className="font-light">{this.props.product.name}</h3>
                                    <span>{this.props.product.prices[0].currency.symbol}{this.props.product.prices[0].amount}</span>
                                </div>
                            </div>
                        </Link>
                        <button 
                            onClick={() => ctx.addProductToCart({product: this.props.product, quantity: 1, selectionIndices: [], listIndex: ctx.cartItems.length + 1})} 
                            className="card-button flex-center absolute bottom-16 right-6 p-3 rounded-full z-[99]">
                                <img src={CartIcon} alt="cart-icon"/>
                        </button>
                    </div>
                </div>
            )
        }
    }
}