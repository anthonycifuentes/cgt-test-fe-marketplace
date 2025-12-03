import { type FC, useState } from 'react'
import { Button } from '@/core/components/ui/button'

interface CouponFormProps {
  onApply: (code: string) => void
  appliedCode: string | null
  onRemove: () => void
}

export const CouponForm: FC<CouponFormProps> = ({ onApply, appliedCode, onRemove }) => {
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      onApply(code.trim())
      setCode('')
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Apply Coupon</h3>
      <p className="mt-1 text-muted-foreground text-sm">Using a Promo Code ?</p>

      {appliedCode ? (
        <div className="mt-4 flex items-center justify-between rounded-md border border-green-500 bg-green-50 px-4 py-2 dark:bg-green-900/20">
          <span className="font-medium text-green-700 dark:text-green-400">{appliedCode}</span>
          <button
            onClick={onRemove}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon Code"
            className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" variant="default" className="bg-foreground text-background hover:bg-foreground/90">
            Apply
          </Button>
        </form>
      )}
    </div>
  )
}
