"use client"

import { useState, useEffect, use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { getBudgetDetail } from '@/app/services/budgets'
import Budget from '@/app/modules/budget'
import Category from '@/app/modules/category'
import useTransactionStore from '../store/transactionStore'

export default function Home() {
  const [budgetActive, setBudgetActive] = useState<Budget | null>(null);
  const [totalPlanned,setTotalPlanned] = useState<number>(0);
  const [totalExpenses,setTotalExpenses] = useState<number>(0);
  const [balance,setBalance] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedCategories, setPaginatedCategories] = useState<Category[]>([]);
  const ITEMS_PER_PAGE = 10;
  const { isDataUpdated, updateData} = useTransactionStore();

  useEffect(() => {
    getBudgetDetail(setBudgetActive);
    updateData(false);
  }, [isDataUpdated]);
  
  useEffect(() => {
    setCategories(budgetActive?.categories ?? []);
    setTotalPlanned(budgetActive?.categories.reduce((sum, category) => sum + category.planned, 0) ?? 0);
    setTotalExpenses(budgetActive?.categories.reduce((sum, category) => sum + category.expenses, 0) ?? 0);
    setBalance(totalPlanned - totalExpenses);
    setTotalPages(Math.ceil(categories.length / ITEMS_PER_PAGE));
    setPaginatedCategories(categories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE));
  }, [budgetActive]);

  const handleUpdateCategory = (id: number, field: 'planned' | 'expenses', value: number) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, [field]: value } : category
    ));
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(()=>{
    setPaginatedCategories(categories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE));
  }, [currentPage])


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Planned</p>
              <p className="text-2xl font-semibold text-gray-900">${totalPlanned.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Planned</TableHead>
                <TableHead>Expenses</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={category.planned}
                      onChange={(e) => handleUpdateCategory(category.id, 'planned', parseFloat(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={category.expenses}
                      onChange={(e) => handleUpdateCategory(category.id, 'expenses', parseFloat(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell className={category.planned - category.expenses >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${(category.planned - category.expenses).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {<Link href={`/category/${category.id}`}>
                      <Button variant="outline">View Details</Button>
                     </Link> }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pagination-controls">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}