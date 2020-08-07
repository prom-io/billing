import {EntityManager, EntityRepository} from "typeorm";
import {TransactionPlasmaEntity} from "../entities/transactionPlasma.entity";

@EntityRepository()
export class TransactionPlasmaRepository {
    constructor(private readonly manager: EntityManager) {}

    public save(tx: TransactionPlasmaEntity): Promise<TransactionPlasmaEntity> {
        return this.manager.save(tx);
    }

    public findByHash(hash: string): Promise<TransactionPlasmaEntity|undefined> {
        return this.manager.findOne(TransactionPlasmaEntity, {hash});
    }
}
