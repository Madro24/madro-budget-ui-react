"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTransactionsByCategory } from '@/app/services/transactions';
import Category, { CategoryDetails } from '@/app/modules/category';
import useTransactionStore from '@/app/store/transactionStore';

export default function CategoryPage({params}: {params:{id: number}}) {
  const categoryId = params.id;
  const [title,setTitle] = useState('');
  const [totalPlanned,setTotalPlanned] = useState<number>(0);
  const [totalExpenses,setTotalExpenses] = useState<number>(0);
  const [balance,setBalance] = useState<number>(0);
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>(new CategoryDetails(
                                                      {
                                                        category: new Category({name: '', id: 0, planned: 0, expenses: 0}), 
                                                        transactions: []
                                                      }));
  const { isDataUpdated, updateData, updateSelectedCategory } = useTransactionStore();

  useEffect(() => {
    getTransactionsByCategory(categoryId, setCategoryDetails);
    updateData(false);
    updateSelectedCategory(categoryId);
  }, [params, isDataUpdated]);

  useEffect(() => {
    setTitle((categoryDetails.category.name ?? 'Unknown').charAt(0).toUpperCase() + (categoryDetails.category.name ?? 'Unknown').slice(1));
    setTotalPlanned(categoryDetails.category.planned);
    setTotalExpenses(categoryDetails?.transactions.reduce((sum, transaction) => sum + transaction.amount, 0) ?? 0);
    setBalance(totalPlanned - totalExpenses);
  }, [categoryDetails]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title} Summary</CardTitle>
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
          <CardTitle>{title} Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow key={categoryId}>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryDetails.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}