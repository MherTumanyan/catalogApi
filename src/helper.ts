import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { faker } from "@faker-js/faker";

import { sequelize } from "./db";
import { User, Catalog, Asset, Product } from "./models";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Function to compare plain text password with hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error(`Error comparing passwords: ${err}`);
    return false;
  }
};

const NUM_CATALOGS = Number(process.env.NUM_CATALOGS) || 10;
const NUM_USERS = Number(process.env.NUM_USERS) || 10;
const NUM_ASSETS = Number(process.env.NUM_ASSETS) || 10;
const NUM_PRODUCTS = Number(process.env.NUM_PRODUCTS) || 10;

export const generateFakeData = async () => {
  try {
    await sequelize.sync({ force: true }); // Drop and recreate the database tables

    // Generate users
    for (let i = 0; i < NUM_USERS; i++) {
      const password = `${i}`.repeat(6);
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email: `test${i}@gmail.com`,
        password: hashedPassword,
        address: faker.random.alphaNumeric(9),
        cash1: faker.datatype.number(),
        cash2: faker.datatype.number(),
        cash3: faker.datatype.number(),
      });
    }
    // Generate assets
    for (let i = 0; i < NUM_ASSETS; i++) {
      const user = await User.findOne({
        order: sequelize.random(),
      });
      await Asset.create({
        type: faker.datatype.number({ min: 1, max: 3 }),
        level: faker.datatype.number({ min: 1, max: 10 }),
        address: user?.address,
      });
    }
    // Generate catalogs
    for (let i = 0; i < NUM_CATALOGS; i++) {
      await Catalog.create({
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
        url: faker.internet.url(),
        cost1: faker.datatype.number(),
        cost2: faker.datatype.number(),
        cost3: faker.datatype.number(),
        req1: faker.datatype.number(),
        req2: faker.datatype.number(),
        req3: faker.datatype.number(),
        category: faker.datatype.number(),
      });
    }

    // Generate products
    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const user = await User.findOne({
        order: sequelize.random(),
      });
      const catalog = await Catalog.findOne({
        order: sequelize.random(),
      });

      await Product.create({
        id: catalog?.id,
        address: user?.address,
      });
    }

    console.log("Data generation complete");
  } catch (error) {
    console.log(error);
  }
};

export const transformCatalogItem = (
  catalogItem: Catalog
): TransformedCatalogItem => {
  const {
    id,
    name,
    description,
    url,
    cost1,
    cost2,
    cost3,
    req1,
    req2,
    req3,
    category,
  } = catalogItem;

  const output = {
    id,
    name,
    description,
    imageUrl: url,
    price: { cost1, cost2, cost3 },
    req: { req1, req2, req3 },
    category,
  };

  return output;
};

export const getUserByAddress = async (
  address: string
): Promise<User | null> => {
  return await User.findOne({ where: { address } });
};

export const getCatalogItemById = async (
  id: number
): Promise<Catalog | null> => {
  return await Catalog.findByPk(id);
};

export const doesUserMeetAssetRequirement = async (
  type: number,
  user: User,
  level: number
): Promise<boolean> => {
  return !!(await Asset.findOne({
    where: { type, address: user.address, level: { [Op.gte]: level } },
  }));
};

export const validatePurchase = async (
  user: User | null,
  catalogItem: Catalog | null
): Promise<string | null> => {
  if (user === null) {
    return "User does not exist";
  }

  if (catalogItem === null) {
    return "Catalog item does not exist";
  }

  if (
    user.cash1 < catalogItem.cost1 ||
    user.cash2 < catalogItem.cost2 ||
    user.cash3 < catalogItem.cost3
  ) {
    return "User does not have enough resources";
  }

  if (
    catalogItem.req1 !== null &&
    !(await doesUserMeetAssetRequirement(1, user, catalogItem.req1))
  ) {
    return "User does not meet asset requirement 1";
  }

  if (
    catalogItem.req2 !== null &&
    !(await doesUserMeetAssetRequirement(2, user, catalogItem.req2))
  ) {
    return "User does not meet asset requirement 2";
  }

  if (
    catalogItem.req3 !== null &&
    !(await doesUserMeetAssetRequirement(3, user, catalogItem.req3))
  ) {
    return "User does not meet asset requirement 3";
  }

  return null;
};

export const deductResourcesFromUser = async (
  user: User,
  catalogItem: Catalog
): Promise<User> => {
  return await user.update({
    cash1: user.cash1 - catalogItem.cost1,
    cash2: user.cash2 - catalogItem.cost2,
    cash3: user.cash3 - catalogItem.cost3,
  });
};

export const createProduct = async (
  id: number,
  address: string
): Promise<Product> => {
  return await Product.create({ id, address });
};
