import { httpGet } from '@/app/utils/httpUtils';
import Budget from '@/app/modules/budget';

export function getBudgetDetail(setBudgetDetail: (budget: Budget) => void) {
    const URL = process.env.NEXT_PUBLIC_API_BUDGET_ACTIVE_URL;
    httpGet(URL, setBudgetDetail);
}