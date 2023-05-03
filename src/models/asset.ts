import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Asset extends Model {
  public id!: number;
  public type!: number;
  public level!: number;
  public address!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Asset.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]],
      },
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "address",
      },
    },
  },
  {
    tableName: "assets",
    sequelize,
  }
);

export { Asset };
