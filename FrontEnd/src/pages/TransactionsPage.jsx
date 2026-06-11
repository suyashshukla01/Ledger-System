import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAccounts } from '../hooks/useAccounts'
import { transactionApi } from '../services/api'
import TransactionTable from '../components/TransactionTable'
import { PageHeader, Button, Spinner, Empty } from '../components/ui'

export default function TransactionsPage() {
  const { accounts, loading, load } = useAccounts()

  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await transactionApi.getAll()
        setTransactions(data.transactions || [])
      } catch (error) {
        console.error('Failed to load transactions:', error)
      } finally {
        setTransactionsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const myAccountIds = accounts.map((a) => a._id)

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Your payment history"
      />

      {loading || transactionsLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : accounts.length === 0 ? (
        <Empty
          icon="⇄"
          message="No accounts found. Create an account first."
          action={
            <Link to="/accounts">
              <Button variant="primary">
                Create account
              </Button>
            </Link>
          }
        />
      ) : transactions.length === 0 ? (
        <Empty
          icon="⇄"
          message="No transactions found."
        />
      ) : (
        <TransactionTable
          transactions={transactions}
          myAccountIds={myAccountIds}
        />
      )}
    </div>
  )
}