"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, Clock, TrendingUp } from "lucide-react"
import { FinanceTable } from "@/finance-table-kzq7mLZjNcnvNewvubhVjDkS6wisQ1"
import { InsightsSidebar } from "@/insights-sidebar-f0XkEg9ggkgHRUsS7pSlVrIC2EFO25"
import { CreateFinanceModal } from "@/create-finance-modal-GFSNgyolr3vzpTTiHTxFBQZkOU8nwh"
import { AgingBarChart, AgingDonutChart } from "@/aging-chart-MNH7GcApFVhAoURwDcFhKCZ5rvVAj1"
import { DraggableSplitter } from "@/draggable-splitter-KtpE9y1rIomvpyWmQl4hK0NmJWPUTm"
import type { Payable, Receivable, AgingBucket, FinanceInsights } from "@/lib/types/finance"

export default function FinanceFlowPage() {
  const [accountingMethod, setAccountingMethod] = useState<"accrual" | "cash">("accrual")
  const [activeTab, setActiveTab] = useState<"payables" | "receivables">("payables")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filterBucket, setFilterBucket] = useState<string>("")
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createModalType, setCreateModalType] = useState<"payable" | "receivable">("payable")
  const [splitterPosition, setSplitterPosition] = useState(75)

  // Mock data
  const mockPayables: Payable[] = [
    {
      id: "p1",
      invoiceNumber: "INV-001",
      vendor: { id: "v1", name: "Office Supplies Co", email: "billing@officesupplies.com" },
      amount: 1250,
      dueDate: "2024-02-15",
      status: "unpaid",
    },
    {
      id: "p2",
      invoiceNumber: "INV-002",
      vendor: { id: "v2", name: "Tech Solutions Inc", email: "accounts@techsolutions.com" },
      amount: 3500,
      dueDate: "2024-01-30",
      status: "overdue",
    },
  ]

  const mockReceivables: Receivable[] = [
    {
      id: "r1",
      invoiceNumber: "INV-101",
      customer: { id: "c1", name: "ABC Corporation", email: "ap@abccorp.com" },
      amount: 5000,
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "unpaid",
    },
    {
      id: "r2",
      invoiceNumber: "INV-102",
      customer: { id: "c2", name: "XYZ Ltd", email: "finance@xyzltd.com" },
      amount: 2750,
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "paid",
    },
  ]

  const mockAgingData: AgingBucket[] = [
    { label: "0-30 days", amount: 15000, count: 5, percentage: 45 },
    { label: "31-60 days", amount: 8000, count: 3, percentage: 24 },
    { label: "61-90 days", amount: 6000, count: 2, percentage: 18 },
    { label: "90+ days", amount: 4000, count: 1, percentage: 13 },
  ]

  const mockInsights: FinanceInsights = {
    avgPaymentTime: 32,
    dso: 28,
    topOverdueVendors: [
      {
        vendor: { id: "v2", name: "Tech Solutions Inc", email: "accounts@techsolutions.com" },
        amount: 3500,
        daysPastDue: 15,
      },
    ],
    topCustomers: [
      {
        customer: { id: "c1", name: "ABC Corporation", email: "ap@abccorp.com" },
        amount: 5000,
      },
    ],
  }

  const currentData = activeTab === "payables" ? mockPayables : mockReceivables
  const totalAmount = currentData.reduce((sum, item) => sum + item.amount, 0)
  const overdueAmount = currentData
    .filter((item) => item.status === "overdue")
    .reduce((sum, item) => sum + item.amount, 0)

  const handleBulkAction = async (action: "markPaid" | "export", ids: string[]) => {
    console.log(`Bulk action: ${action}`, ids)
    // Implement bulk actions
  }

  const handleCreateSubmit = async (data: any) => {
    console.log("Creating:", data)
    // Implement creation logic
  }

  const handleBucketClick = (bucket: AgingBucket) => {
    setFilterBucket(bucket.label)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Flow</h1>
          <p className="text-gray-600">Manage accounts payable and receivable</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="accounting-method"
              checked={accountingMethod === "accrual"}
              onCheckedChange={(checked) => setAccountingMethod(checked ? "accrual" : "cash")}
            />
            <Label htmlFor="accounting-method">{accountingMethod === "accrual" ? "Accrual" : "Cash"} Accounting</Label>
          </div>
          <Button
            onClick={() => {
              setCreateModalType(activeTab === "payables" ? "payable" : "receivable")
              setCreateModalOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create {activeTab === "payables" ? "Bill" : "Invoice"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {currentData.length} {activeTab === "payables" ? "bills" : "invoices"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {activeTab === "payables" ? "Avg Payment Time" : "DSO"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeTab === "payables" ? mockInsights.avgPaymentTime : mockInsights.dso} days
            </div>
            <p className="text-xs text-muted-foreground">
              {activeTab === "payables" ? "Industry avg: 35 days" : "Target: ≤ 30 days"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "payables" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("payables")}
        >
          Accounts Payable
        </Button>
        <Button
          variant={activeTab === "receivables" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("receivables")}
        >
          Accounts Receivable
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: `${splitterPosition}% 1fr` }}>
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Aging Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aging Analysis - Bar Chart</CardTitle>
                  <CardDescription>Click bars to filter table</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgingBarChart data={mockAgingData} onBucketClick={handleBucketClick} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aging Analysis - Distribution</CardTitle>
                  <CardDescription>Percentage breakdown by age</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgingDonutChart data={mockAgingData} onBucketClick={handleBucketClick} />
                </CardContent>
              </Card>
            </div>

            {/* Filter Badge */}
            {filterBucket && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Filtered by: {filterBucket}</Badge>
                <Button variant="ghost" size="sm" onClick={() => setFilterBucket("")}>
                  Clear Filter
                </Button>
              </div>
            )}

            {/* Finance Table */}
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === "payables" ? "Bills" : "Invoices"}</CardTitle>
                <CardDescription>
                  Manage your {activeTab === "payables" ? "accounts payable" : "accounts receivable"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinanceTable
                  data={currentData}
                  type={activeTab}
                  selectedIds={selectedIds}
                  onSelectionChange={setSelectedIds}
                  onBulkAction={handleBulkAction}
                  filterBucket={filterBucket}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Insights */}
          <InsightsSidebar insights={mockInsights} type={activeTab} />
        </div>

        {/* Draggable Splitter */}
        <DraggableSplitter
          direction="horizontal"
          initialPosition={splitterPosition}
          minPosition={60}
          maxPosition={85}
          onPositionChange={setSplitterPosition}
          storageKey="finance-flow-splitter"
        />
      </div>

      {/* Create Modal */}
      <CreateFinanceModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        type={createModalType}
        onSubmit={handleCreateSubmit}
      />
    </div>
  )
}
