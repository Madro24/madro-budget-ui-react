'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import NewTransactionForm from '@/components/new-transaction-form'
import { logout } from '@/app/services/auth'

export default function Header() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            OlaFinanzas
          </Link>
          {pathname !== '/' && (
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          )}
        </div>
        <nav>
          <ul className="flex space-x-4">
            {/* <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li> */}
            <li>
              <NewTransactionForm />
            </li>
            <li>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}