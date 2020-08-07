export interface TxStruct {
    fileUuid: string,
    txType: string,
    hash: string,
    queueNumber: number,
    serviceNode: string,
    dataValidator: string,
    dataMart: string,
    dataOwner: string,
    value: number,
    created_at: number
}
