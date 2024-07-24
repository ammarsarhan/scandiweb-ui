import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProductType } from '@/types/product';

// Used react-html-parser to avoid use of dangerouslysetinnerhtml
import ReactHtmlParser from 'react-html-parser'
import Carousel from '@/components/Carousel';

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
    id = this.props.match.params.id;

    state = {
        product: {} as ProductType,
        loading: true,
        error: null,
        selectionIndices: []
    }

    componentDidMount(): void {
        // Fetch product details and handle loading/error states
        const data = file.data.products.find((product: ProductType) => product.id === this.id) as ProductType;
        this.setState({ product: data, loading: false });
    }

    render () {
        if (this.state.loading) {
            return <div>Component to handle loading!</div>
        }

        if (this.state.error) {
            return <div>Component to handle error!</div>
        }

        return (
            <div className="w-full lg:grid lg:grid-cols-2 px-16 py-12">
                <Carousel images={this.state.product.gallery}/>
                <div className='max-w-80 flex flex-col gap-y-8'>
                    <h1 className='text-2xl font-medium block'>{this.state.product.name}</h1>
                    <div className='font-semibold'>
                        <h3 className='my-2'>PRICE:</h3>
                        <span className='text-lg my-2'>{this.state.product.prices[0].currency.symbol}{this.state.product.prices[0].amount.toFixed(2)}</span>
                    </div>
                    <button className='py-4 text-white bg-[#5ECE7B]'>ADD TO CART</button>
                    <div className='parsed'>
                        {ReactHtmlParser(this.state.product.description)}
                    </div>
                </div>
            </div>
        )
    }
}