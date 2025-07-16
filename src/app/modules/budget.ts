import  Category  from './category';
// Define the Budget interface
export default class Budget {
    id: number;
    expenses: number;
    planned: number;
    startDate: string;
    categories: Category[];

    constructor(object: { id: number; expenses: number; planned: number; startDate: string; categories: never[]; }) {
        this.id = object?.id || 0;
        this.expenses = object?.expenses || 0;
        this.planned = object?.planned || 0;
        this.startDate = object?.startDate || '';
        this.categories = object?.categories || [];
    }
}
