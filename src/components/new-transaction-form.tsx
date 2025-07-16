'use client'

import { useState, useEffect, use } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getCategories } from '@/app/services/categories';
import { saveTransaction } from '@/app/services/transactions'
import Category from '@/app/modules/category'
import { Loader2 } from 'lucide-react'
import useTransactionStore from '@/app/store/transactionStore'


export default function NewTransactionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('COMPLETED');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const { updateData, selectedCategory } = useTransactionStore();

  useEffect(() => {
    getCategories(setCategories);
  }, [])

  useEffect(() => {
    if (!!selectedCategory) {
      setCategory(selectedCategory.toString())
    }
  }, [selectedCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category && description && amount && status) {
      setIsLoading(true);
      // Here you would typically send the data to your backend or state management solution
      console.log({ category, description, amount, status })
      saveTransaction({
        categoryId: parseInt(category),
        description,
        amount: parseFloat(amount),
        status
      }, setResponse)
      updateData(true);

      setIsOpen(false)
      // Reset form fields
      resetForm()
      setIsLoading(false);
    } else {
      alert('Please fill in all fields')
    }
  }

  function resetForm() {  
    setCategory('')
    setDescription('')
    setAmount('')
    setStatus('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Transaction</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory} 
              disabled={isLoading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the transaction"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} disabled={isLoading}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Add Transaction'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}