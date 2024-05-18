export type Member = {
  id: string
  memberNo: number
  name: string
  email?: string
  phoneNo?: string
  status: 'active' | 'inactive'
  paymentStatus?: 'paid' | 'unpaid'
}
