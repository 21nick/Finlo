import type React from "react"
import { Home, DollarSign, Receipt, TrendingUp } from "lucide-react"

import { Sidebar } from "@/components/sidebar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Add Expense", href: "/dashboard/add-expense", icon: DollarSign },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Finance Flow", href: "/dashboard/finance-flow", icon: TrendingUp },
  { name: "Forecast", href: "/dashboard/forecast", icon: TrendingUp },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <Sidebar navigation={navigation} />
      <main className="md:pl-72 pt-16">{children}</main>
    </div>
  )
}
