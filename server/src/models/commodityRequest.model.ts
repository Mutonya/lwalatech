import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Commodity } from './commodity.model';
import { User } from './user.model';

@Table({ tableName: 'commodity_requests', timestamps: true })
export class CommodityRequest extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.STRING)
    chwId!: string;

    @BelongsTo(() => User, 'chwId')
    chw!: User;

    @ForeignKey(() => User)
    @Column(DataType.STRING)
    chaId!: string;

    @BelongsTo(() => User, 'chaId')
    cha!: User;

    @ForeignKey(() => Commodity)
    @Column(DataType.INTEGER)
    commodityId!: number;

    @BelongsTo(() => Commodity)
    commodity!: Commodity;

    @Column(DataType.INTEGER)
    quantity!: number;

    @Column({
        type: DataType.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    })
    status!: 'pending' | 'approved' | 'rejected';
}