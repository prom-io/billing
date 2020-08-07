import {Injectable, Logger} from "@nestjs/common";
import {TransactionPlasmaRepository} from "../../../repositories/transactionPlasma.repository";
import {TransactionService} from "../../../contracts/child_chain/transaction.service";
import {TransactionPlasmaFactory} from "../../../factories/transactionPlasma.factory";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class SyncAllTransactionCron {
    private readonly logger = new Logger();

    constructor(
        private readonly transactionPlasmaRepository: TransactionPlasmaRepository,
        private readonly transactionPlasmaFactory: TransactionPlasmaFactory,
        private readonly transactionService: TransactionService
    ) {}

    @Cron('* * * * *', {
        name: 'syncAllTransaction',
    })
    public async handle() {
        try {
            this.logger.debug('Sync with plasma transactions started');
            const transactionCount = await this.transactionService.queueNumber();
            console.log(transactionCount);
            for (let i = 1; i <= transactionCount; i++) {
                console.log(i);
                const tx = await this.transactionService.getTransaction(i);
                const txDB = await this.transactionPlasmaRepository.findByHash(tx.hash);

                if(txDB === undefined) {
                    this.logger.debug('TO TX DB save');
                    const txPayData = await this.transactionService.transactionPayDataByHash(tx.hash);
                    const txEntity = await this.transactionPlasmaFactory.build(tx, txPayData);
                    await this.transactionPlasmaRepository.save(txEntity);
                    this.logger.debug('TO TX DB save complete');
                }
            }
        } catch (e) {
            this.logger.error("ERROR");
            console.log(e);
        }
    }
}
