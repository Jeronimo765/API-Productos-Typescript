export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

export let products: Product[] = [
    { id: 1, name: "Laptop", price: 3500, category: "electronics" },
    { id: 2, name: "Keyboard", price: 150, category: "electronics" },
    { id: 3, name: "Shirt", price: 80, category: "clothing" },
    { id: 4, name: "Book", price: 40, category: "books" }
];