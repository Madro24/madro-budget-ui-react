import { getBudgetDetail } from '@/app/services/budgets';

global.fetch = jest.fn();

describe('getBudgetDetail', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch budget details successfully', async () => {
    const mockResponse = { budget: 1000 };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getBudgetDetail();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BUDGET_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getBudgetDetail()).rejects.toThrow('HTTP error! status: 500');
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BUDGET_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = new Error('Network error');
    (fetch as jest.Mock).mockRejectedValue(mockError);

    await expect(getBudgetDetail()).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BUDGET_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});