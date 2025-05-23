import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CommodityRequest } from './commodityRequest.model';

@Table({ tableName: 'commodities', timestamps: true })
export class Commodity extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true // Make description optional
    })
    description?: string;

    @HasMany(() => CommodityRequest)
    requests!: CommodityRequest[];
}