import { Component } from 'react';
import Card from '@/components/Card';

type CategoryProps = {
    variant: string
}

export default class Category extends Component<CategoryProps> {
    state = {
        products: []
    }

    fetchProducts = async () => {
        const url = 'http://localhost:8080';
        const query = `{ 
                        products (category: "${this.props.variant}") { 
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
          const products = data.data.products;
          this.setState({products: products})
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }

    componentDidMount(): void {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps: Readonly<CategoryProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.variant !== this.props.variant) {
            this.fetchProducts();
        }
    }

    render () {
        // Capitalize the first letter of the variant
        const label = this.props.variant.charAt(0).toUpperCase() + this.props.variant.slice(1);
        return (
            <main className='px-16 py-12'>
                <h1 className='text-4xl font-light my-8'>{label}</h1>
                <div className='mt-16 overflow-visible grid lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16 2xl:gap-28'>
                    {
                        this.state.products.map((product, index) => {
                            return <Card key={index} product={product}/>
                        })
                    }
                </div>
            </main>
        )
    }
}
