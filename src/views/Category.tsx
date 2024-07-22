import { Component } from 'react';
import Card from '@/components/Card';

import file from '../data.json'

type CategoryProps = {
    variant: string
}

export default class Category extends Component<CategoryProps> {
    render () {
        // Capitalize the first letter of the variant
        const label = this.props.variant.charAt(0).toUpperCase() + this.props.variant.slice(1);
        return (
            <main className='px-16 py-12'>
                <h1 className='text-4xl font-light my-8'>{label}</h1>
                <div className='mt-16 overflow-visible grid lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16 2xl:gap-28'>
                    {/* Mock data to test the layout for now */}
                    {
                        file.data.products.map((product, index) => {
                            return (
                                <Card key={index} title={product.name} price={product.prices[0].amount} imageSource={product.gallery[0]} inStock={product.inStock} id={product.id}/>
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}
