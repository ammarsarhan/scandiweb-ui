import { Component } from 'react';

type CategoryProps = {
    variant: string

}

export default class Category extends Component<CategoryProps> {
    render () {
        const category = this.props.variant.charAt(0).toUpperCase() + this.props.variant.slice(1);
        return (
            <main className='mx-16 my-12'>
                <h1 className='text-4xl font-light'>{category}</h1>
            </main>
        )
    }
}