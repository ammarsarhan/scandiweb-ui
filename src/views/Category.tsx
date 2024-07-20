import { Component } from 'react';
import Card from '@/components/Card';

type CategoryProps = {
    variant: string
}

export default class Category extends Component<CategoryProps> {
    render () {
        // Capitalize the first letter of the variant
        const label = this.props.variant.charAt(0).toUpperCase() + this.props.variant.slice(1);
        return (
            <main className='mx-16 my-12'>
                <h1 className='text-4xl font-light'>{label}</h1>
                <div className='mt-16 overflow-visible grid lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16 2xl:gap-28'>
                    {/* Mock data to test the layout for now */}
                    <Card title='Running Short' price={50.00} imageSource='' outOfStock={false}/>
                    <Card title='Running Short' price={50.00} imageSource='' outOfStock={false}/>
                    <Card title='Running Short' price={50.00} imageSource='' outOfStock={true}/>
                    <Card title='Running Short' price={50.00} imageSource='' outOfStock={false}/>
                    <Card title='Running Short' price={50.00} imageSource='' outOfStock={false}/>
                </div>
            </main>
        )
    }
}