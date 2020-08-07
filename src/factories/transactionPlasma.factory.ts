import {TxPayDataStruct} from "../contracts/child_chain/struct/txPayData.struct";
import {TxStruct} from "../contracts/child_chain/struct/tx.struct";
import {TransactionPlasmaEntity} from "../entities/transactionPlasma.entity";

export class TransactionPlasmaFactory {
    public build(txData: TxStruct, txPayData: TxPayDataStruct): TransactionPlasmaEntity {
        const plasmaTx = new TransactionPlasmaEntity();
        plasmaTx.fileUuid = txData.fileUuid;
        plasmaTx.type = txData.txType;
        plasmaTx.hash = txData.hash;
        plasmaTx.queueNumber = txData.queueNumber;
        plasmaTx.serviceNode = txData.serviceNode;
        plasmaTx.dataValidator = txData.dataValidator;
        plasmaTx.dataMart = txData.dataMart;
        plasmaTx.dataOwner = txData.dataOwner;
        plasmaTx.amount = txData.value;
        plasmaTx.valueInServiceNode = txPayData.valueInServiceNode;
        plasmaTx.valueInDataValidator = txPayData.valueInDataValidator;
        plasmaTx.valueInDataMart = txPayData.valueInDataMart;
        plasmaTx.valueInDataOwner = txPayData.valueInDataOwner;
        plasmaTx.valueOutServiceNode = txPayData.valueOutServiceNode;
        plasmaTx.valueOutDataValidator = txPayData.valueOutDataValidator;
        plasmaTx.valueOutDataMart = txPayData.valueOutDataMart;
        plasmaTx.valueOutDataOwner = txPayData.valueOutDataOwner;
        plasmaTx.createdAt = new Date(txData.created_at);
        return plasmaTx;
    }
}
