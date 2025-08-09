import { httpGet, httpPost } from '@/app/utils/httpUtils';
import { CategoryDetails } from '../modules/category';
import Transaction from '../modules/transaction';

export function getTransactionsByCategory(category: number, setTransactions: (categoryDetails: CategoryDetails) => void) {
    const URL = `${process.env.NEXT_PUBLIC_API_CATEGORY_TX_URL}/${category}`;
    httpGet(URL, setTransactions);
}

export function saveTransaction(transaction: Transaction, setResponse: (response: Transaction) => void) {
    const URL = process.env.NEXT_PUBLIC_API_TRANSACTION_URL;
    httpPost(URL,transaction, setResponse);
}