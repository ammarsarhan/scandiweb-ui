type PricesType = {
    amount: number;
    currency: {
        label: string,
        symbol: string,
        __typename: string
    };
    __typename: string
}

export type ProductType = {
    id: string,
    name: string,
    inStock: boolean,
    gallery: string[],
    description: string,
    category: string,
    attributes: object[],
    prices: PricesType[],
    brand: string,
    __typename: string
}