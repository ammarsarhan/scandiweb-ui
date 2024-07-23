import { Component } from "react";
import CartIcon from '@/static/assets/Cart-Alt.svg';
import '@/static/card.css';

import { ProductType } from "@/types/product";
import { CartItemType } from '@/types/cart'
import { CartContext, CartContextType } from "@/context/CartContext"

import { Link } from "react-router-dom";

export default class Card extends Component<{product: ProductType}> {
    static contextType = CartContext;
    
    quickAddToCart = (item: CartItemType) => {
        const ctx = this.context as CartContextType;
        let duplicateFlag = false;

        // Filling selectionIndices array with 0 (start of attributes index as default)
        item.selectionIndices = Array(item.product.attributes.length).fill(0);

        // Checking for duplicates of products in cart already
        ctx.cartItems.map((cartItem) => {
            if (cartItem.product === item.product) {
                // If the selectionIndices are the same, then it's a duplicate
                // Javascript treats Arrays by reference, so we need to stringify them
                if (JSON.stringify(cartItem.selectionIndices) === JSON.stringify(item.selectionIndices)) {
                    cartItem.quantity += 1;
                    duplicateFlag = true;
                }
            }

            return null;
        })

        // If no duplicates are found, push the item to the cart
        if (duplicateFlag === false) {
            ctx.cartItems.push(item);
        }
    }

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
                        <button className="card-button flex-center absolute bottom-16 right-8 p-3 rounded-full z-[99]">
                            <img src={CartIcon} alt="cart-icon" onClick={() => this.quickAddToCart({product: this.props.product, quantity: 1, selectionIndices: []})}/>
                        </button>
                    </div>
                </div>
            )
        }
    }
}