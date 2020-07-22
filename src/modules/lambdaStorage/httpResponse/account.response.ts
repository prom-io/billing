export interface AccountResponse {
    type: string,
    value: {
        address: string,
        coins: [{
            denom: string,
            amount: string
        }],
        public_key,
        account_number: string,
        sequence: string
    }
}
