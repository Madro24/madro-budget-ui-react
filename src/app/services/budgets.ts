import { httpGet } from '@/app/utils/httpUtils';

export function getBudgetDetail(setBudgetDetail: (budget: any) => void) {
    const URL = process.env.NEXT_PUBLIC_API_BUDGET_ACTIVE_URL;
    httpGet(URL, setBudgetDetail);
}