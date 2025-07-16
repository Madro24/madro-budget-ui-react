export default class Transaction {
    id?: number;
    amount: number;
    description: string;
    date?: string;
    categoryId: number;
    status: string;

    constructor(object: { id: number; amount: number; description: string; date: string; categoryId: number; status: string; }) {
        this.id = object?.id || 0;
        this.amount = object?.amount || 0;
        this.description = object?.description || '';
        this.date = object?.date || '';
        this.categoryId = object?.categoryId || 0;
        this.status = object?.status || '';
    }
}