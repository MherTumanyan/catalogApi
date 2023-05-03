import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

class Catalog extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public url!: string;
  public cost1!: number;
  public cost2!: number;
  public cost3!: number;
  public req1!: number;
  public req2!: number;
  public req3!: number;
  public category!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Catalog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "catalogs",
    sequelize,
  }
);

export { Catalog };
