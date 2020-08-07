import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('transactions')
export class TransactionPlasmaEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'file_uuid' })
    public fileUuid: string;

    @Column({ name: 'type' })
    public type: string;

    @Column({ name: 'hash' })
    public hash: string;

    @Column({ name: 'queue_number' })
    public queueNumber: number;

    @Column({ name: 'service_node' })
    public serviceNode: string;

    @Column({ name: 'data_validator' })
    public dataValidator: string;

    @Column({ name: 'data_mart' })
    public dataMart: string;

    @Column({ name: 'data_owner' })
    public dataOwner: string;

    @Column({ name: 'amount', type: 'numeric' })
    public amount: number;

    @Column({ name: 'value_in_service_nide', type: 'numeric' })
    public valueInServiceNode: number;

    @Column({ name: 'value_in_data_validator', type: 'numeric' })
    public valueInDataValidator: number;

    @Column({ name: 'value_in_data_mart', type: 'numeric' })
    public valueInDataMart: number;

    @Column({ name: 'value_in_data_owner', type: 'numeric' })
    public valueInDataOwner: number;

    @Column({ name: 'value_out_service_node', type: 'numeric' })
    public valueOutServiceNode: number;

    @Column({ name: 'value_out_data_validator', type: 'numeric' })
    public valueOutDataValidator: number;

    @Column({ name: 'value_out_data_mart', type: 'numeric' })
    public valueOutDataMart: number;

    @Column({ name: 'value_out_data_owner', type: 'numeric' })
    public valueOutDataOwner: number;

    @Column({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;
}
