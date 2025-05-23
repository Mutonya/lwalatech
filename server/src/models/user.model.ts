import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { CommodityRequest } from './commodityRequest.model';

@Table({
    tableName: 'users',
    timestamps: true
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email!: string;

    @Column({
        type: DataType.ENUM('chw', 'cha'),
        allowNull: false
    })
    role!: 'chw' | 'cha';

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    supervisorId?: string;

    // As a CHW, can have many requests they created
    @HasMany(() => CommodityRequest, 'chwId')
    createdRequests!: CommodityRequest[];

    // As a CHA, can have many requests assigned to them
    @HasMany(() => CommodityRequest, 'chaId')
    assignedRequests!: CommodityRequest[];
}