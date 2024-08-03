import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProductType } from '@/types/product';

import { CartContext, CartContextType } from '@/context/CartContext';

// Used react-html-parser to avoid use of dangerouslysetinnerhtml
import ReactHtmlParser from 'react-html-parser'
import Carousel from '@/components/Carousel';
import Option from '@/components/Option'

import file from '../data.json'

interface MatchParams {
    id: string;
}

interface DetailsProps extends RouteComponentProps<MatchParams> {}

type DetailsState = {
    product: ProductType;
    loading: boolean;
    error: any | null;
    selectionIndices: number[];
}

export default class Details extends Component<DetailsProps, DetailsState> {
    static contextType = CartContext;
    id = this.props.match.params.id;

    state = {
        product: {} as ProductType,
        selectionIndices: [] as number[],
        loading: true,
        error: null,
    }

    fetchProduct = async () => {
        const url = 'http://localhost:8080';
        const query = `{ 
                        product(id: "${this.id}") { 
                            id
                            name
                            inStock
                            description
                            gallery
                            category 
                            brand
                            __typename
                            attributes {
                                id
                                items {
                                    displayValue
                                    value
                                    id
                                }
                                name
                                type
                            }
                            prices {
                                amount
                                currency {
                                    label
                                    symbol
                                }
                            }
                        }
                    }`;
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        })
        .then(response => response.json())
        .then(data => {
            const product = data.data.product;
            this.setState({product: product, selectionIndices: Array(product.attributes.length).fill(0), loading: false});
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
    
    componentDidMount(): void {
        // Fetch product details and handle loading/error states
        this.fetchProduct();
    }

    handleAddClicked = () => {
        const ctx = this.context as CartContextType;
        const temp = [...this.state.selectionIndices]; // Copying array to avoid passing byRef
        const product = {product: this.state.product, quantity: 1, selectionIndices: temp, listIndex: ctx.cartItems.length};
        
        ctx.addProductToCart(product)
    }

    handleOptionRecieved = (index: number, option: number) => {
        let temp = this.state.selectionIndices;
        temp[index] = option;
        
        this.setState({selectionIndices: temp});
    }

    render () {
        if (this.state.loading) {
            return <div>Loading...</div>
        }

        if (this.state.error) {
            return <div>An error has occurred!</div>
        }

        if (!this.state.product.inStock) {
            return (
                <div className="w-full lg:grid lg:grid-cols-2 px-16 py-12">
                    <Carousel images={this.state.product.gallery}/>
                    <div className='max-w-80 flex flex-col gap-y-6 my-8 lg:my-0'>
                        <h1 className='text-2xl font-medium block'>{this.state.product.name}</h1>
                        {
                            this.state.product.attributes.map((element, index) => {
                                const option = JSON.parse(JSON.stringify(element))
                                return <Option 
                                            key={index} 
                                            name={option.name} 
                                            items={option.items} 
                                            isClickable={false}
                                            selected={0}
                                        />
                            })
                        }
                        <div className='font-semibold'>
                            <h3 className='my-2'>PRICE:</h3>
                            <span className='text-xl my-2'>{this.state.product.prices[0].currency.symbol}{this.state.product.prices[0].amount.toFixed(2)}</span>
                        </div>
                        <button disabled className='py-4 text-white bg-[#7d7d7d]'>ADD TO CART</button>
                        <div className='parsed'>
                            {ReactHtmlParser(this.state.product.description)}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="w-full lg:grid lg:grid-cols-2 px-16 py-12">
                <Carousel images={this.state.product.gallery}/>
                <div className='max-w-80 flex flex-col gap-y-6 mt-10 lg:mt-0'>
                    <h1 className='text-2xl font-medium block'>{this.state.product.name}</h1>
                    {
                        this.state.product.attributes.map((element, index) => {
                            const option = JSON.parse(JSON.stringify(element))
                            return <Option 
                                        key={index} 
                                        name={option.name} 
                                        items={option.items} 
                                        isClickable={true}
                                        selected={0}
                                        onOptionChange={(selection) => this.handleOptionRecieved(index, selection)}
                                    />
                        })
                    }
                    <div className='font-semibold'>
                        <h3 className='my-2'>PRICE:</h3>
                        <span className='text-xl my-2'>{this.state.product.prices[0].currency.symbol}{this.state.product.prices[0].amount.toFixed(2)}</span>
                    </div>
                    <button 
                        className='py-4 text-white bg-[#5ECE7B]'
                        onClick={this.handleAddClicked}
                    >ADD TO CART</button>
                    <div className='parsed'>
                        {ReactHtmlParser(this.state.product.description)}
                    </div>
                </div>
            </div>
        )
    }
}