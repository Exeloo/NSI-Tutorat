import type { WhereFilterOp } from 'firebase/firestore'

export interface Query {
  param_1: string
  param_2: any
  comparator: WhereFilterOp
}
