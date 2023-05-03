import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Catalog, User } from "./";

class Product extends Model {
  public address!: string;
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize,
  }
);

Product.belongsTo(User, { foreignKey: "address", targetKey: "address" });
Product.belongsTo(Catalog, { foreignKey: "id", targetKey: "id" });

export { Product };
