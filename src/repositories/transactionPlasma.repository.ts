import {EntityManager, EntityRepository} from "typeorm";
import {TransactionPlasmaEntity} from "../entities/transactionPlasma.entity";
import {paginate, IPaginationOptions, Pagination} from "nestjs-typeorm-paginate/index";

@EntityRepository()
export class TransactionPlasmaRepository {
    constructor(private readonly manager: EntityManager) {}

    public save(tx: TransactionPlasmaEntity): Promise<TransactionPlasmaEntity> {
        return this.manager.save(tx);
    }

    public findByHash(hash: string): Promise<TransactionPlasmaEntity|undefined> {
        return this.manager.findOne(TransactionPlasmaEntity, {hash});
    }

    public addressTransactionByTypePaginate(options: IPaginationOptions, address: string, type: string): Promise<Pagination<TransactionPlasmaEntity>> {
        const queryBuilder = this.manager.createQueryBuilder(TransactionPlasmaEntity, 'c');
        queryBuilder
            .where('(c.serviceNode = :address OR c.dataValidator = :address OR c.dataMart = :address OR c.dataOwner = :address)')
            .andWhere('c.type = :type')
            .setParameters({ address, type });
        return paginate<TransactionPlasmaEntity>(queryBuilder, options);
    }
}
