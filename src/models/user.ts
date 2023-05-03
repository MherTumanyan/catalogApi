import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Asset } from "./asset";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public address!: string;
  public cash1!: number;
  public cash2!: number;
  public cash3!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // Define associations
  public readonly assets: Asset[];
  public static associations: {};
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    cash1: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cash2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cash3: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.hasMany(Asset, { foreignKey: "address" });

export { User };
