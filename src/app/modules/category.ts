import Transaction from "./transaction";

export default class Category {
    name: string;
    id: number;
    planned: number;
    expenses: number;

    constructor(object: { name: string; id: number; planned: number; expenses: number; }) {
        this.name = object?.name || '';
        this.id = object?.id || 0;
        this.planned = object?.planned || 0;
        this.expenses = object?.expenses || 0;
    }
}

export class CategoryDetails {
    category: Category;
    transactions: Transaction[];

    constructor(object: { category: Category; transactions: Transaction[];}) {
        this.category = object?.category || new Category({name: '', id: 0, planned: 0, expenses: 0});
        this.transactions = object?.transactions || [];
    }
}
