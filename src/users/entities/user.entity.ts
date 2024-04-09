import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  Table,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: true, unique: true })
  username: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false, defaultValue: false })
  isEmailVerified: boolean;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  emailOtp: number;

  @Column({ allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @Column({ allowNull: true })
  @DeletedAt
  deletedAt: Date;
}
