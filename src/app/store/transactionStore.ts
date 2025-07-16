import { create } from 'zustand'

interface TransactionState {
    isDataUpdated: boolean
    updateData: (isModified: boolean) => void
    selectedCategory: number
    updateSelectedCategory: (categoryId: number) => void
  }

export const useTransactionStore = create<TransactionState>((set) => ({
    isDataUpdated: false,
    updateData: (isUpdated: boolean) => set({ isDataUpdated: isUpdated }),
    selectedCategory: 0,
    updateSelectedCategory: (categoryId: number) => set({ selectedCategory: categoryId })
  
}))

export default useTransactionStore;
