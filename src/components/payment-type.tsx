export type PaymentType = 0 | 1 | 2 | 3

interface PaymentTypeProps {
  paymentType: PaymentType
}
export const paymentTypeMap: Record<PaymentType, string> = {
  0: 'Dinheiro',
  1: 'Cartão de Crédito',
  2: 'Cartão de débito',
  3: 'Pagamento Eletrônico',
} as const
export function PaymentType({ paymentType }: PaymentTypeProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        {paymentType === 0 && (
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        )}
        {paymentType === 1 && (
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
        )}
        {paymentType === 2 && (
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
        )}{' '}
        {paymentType === 3 && (
          <span className="h-2 w-2 rounded-full bg-purple-900"></span>
        )}
        <span className="font-medium text-muted-foreground">
          {paymentTypeMap[paymentType]}
        </span>
      </div>
    </>
  )
}
