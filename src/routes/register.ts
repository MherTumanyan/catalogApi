import { faker } from "@faker-js/faker";
import { pool } from "../db";

export const register = async (
  email: string,
  password: string
): Promise<number | null> => {
  try {
    // Check if user already exists
    const checkQuery = {
      text: "SELECT id FROM users WHERE email = $1",
      values: [email],
    };

    const checkResult = await pool.query(checkQuery);
    if (checkResult.rows.length > 0) {
      return null;
    }
    const address = faker.random.alphaNumeric(9);
    const cash1 = faker.datatype.number();
    const cash2 = faker.datatype.number();
    const cash3 = faker.datatype.number();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    // Insert new user
    const insertQuery = {
      text: 'INSERT INTO users (email, password, address, cash1, cash2, cash3, "createdAt", "updatedAt" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        email,
        password,
        address,
        cash1,
        cash2,
        cash3,
        createdAt,
        updatedAt,
      ],
    };
    const insertResult = await pool.query(insertQuery);
    return insertResult.rows[0].id;
  } catch (error) {
    console.error("Error while registering user:", error);
    throw error;
  }
};
