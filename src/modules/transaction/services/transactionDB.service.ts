import {Injectable} from "@nestjs/common";
import {TransactionService} from "../../../contracts/child_chain/transaction.service";
import {TransactionPlasmaRepository} from "../../../repositories/transactionPlasma.repository";
import {TransactionPlasmaFactory} from "../../../factories/transactionPlasma.factory";

@Injectable()
export class TransactionDBService {
    constructor(
        private readonly transactionPlasmaService: TransactionService,
        private readonly transactionPlasmaRepository: TransactionPlasmaRepository,
        private readonly transactionPlasmaFactory: TransactionPlasmaFactory,
    ) {}

    public async saveTxToDb(hash: string) {
        const txPlasma = await this.transactionPlasmaService.getTransactionByHash(hash);
        const txPlasmaPayData = await this.transactionPlasmaService.transactionPayDataByHash(hash);
        const txPlasmaEntity = this.transactionPlasmaFactory.build(txPlasma, txPlasmaPayData);
        await this.transactionPlasmaRepository.save(txPlasmaEntity);
    }
}
