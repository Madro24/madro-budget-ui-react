import { httpGet } from '@/app/utils/httpUtils';
import Category from '../modules/category';

export function getCategories(setCategories: (categories: Category[]) => void) {
    const URL = process.env.NEXT_PUBLIC_API_CATEGORY_URL;
    httpGet(URL, setCategories);
}