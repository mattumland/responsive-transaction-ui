export type AccountType = {
    id: string;
    created_at: string;
    updated_at: string;
    status: string;
    name: string;
    account_number: string;
    routing_number: string;
}

export type TransactionType = {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  date: string;
  description: string;
  enriched_description: string;
  amount_in_cents: number
  company_name: string;
  trace_number: string;
  transaction_id: string;
  status: 'SENT' | 'PROCESSING' | 'RETURNED' | 'PENDING' | 'FAILED' | 'DONE'
  method: string;
  company_description: string;
  processed_dt: string;
  metadata?: {
    institution_payment: {
      id: string;
      type: string;
      status: string;
      institution: {
        id: string;
        name: string;
      },
      beneficiary: {
        id: string;
        first_name: string;
        last_name: string;
      },
      enrollment_period: {
        id: string;
        description: string;
      }
    }
  }
}

export type MetadataType = {
  id: string;
  type: string;
  status: string;
  institution: {
    id: string;
    name: string;
  },
  beneficiary: {
    id: string;
    first_name: string;
    last_name: string;
  },
  enrollment_period: {
    id: string;
    description: string;
  }
}