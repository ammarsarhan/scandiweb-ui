import { ProductType } from '@/types/product';

export type CartItemType = {
    product: ProductType;
    quantity: number;
    selectionIndices: number[];
    listIndex: number;
}