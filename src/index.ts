import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import {
  createProduct,
  deductResourcesFromUser,
  generateFakeData,
  generateToken,
  getCatalogItemById,
  getUserByAddress,
  transformCatalogItem,
  validatePurchase,
} from "./helper";
import { verifyToken } from "./middlewares/authenticateUser";
import { login, register } from "./routes";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Login endpoint
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken({ id: user.id, email });
    return res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Registration endpoint
app.post("/register", async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user already exists
    const userId = await register(email, hashedPassword);
    if (userId === null) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Generate token
    const token = generateToken({ id: userId, email });
    return res.json({ token });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get catalog item by id
app.get("/catalog/:id", verifyToken, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const catalogItem = await getCatalogItemById(id);
    if (!catalogItem) {
      return res.status(404).json({ error: "Catalog not found" });
    }
    const output = transformCatalogItem(catalogItem);
    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/buyProduct",
  verifyToken,
  async (req: Request, res: Response): Promise<BuyProductOutput> => {
    try {
      const { id, address } = req.body as BuyProductInput;

      const user = await getUserByAddress(address);
      const catalogItem = await getCatalogItemById(id);

      const validationResult = validatePurchase(user, catalogItem);
      if (validationResult !== null) {
        res.status(400).json({
          success: false,
          error: { errorMessage: validationResult },
        });
        return;
      }

      const updatedUser = await deductResourcesFromUser(user, catalogItem);
      await createProduct(id, address);

      res.json({
        success: true,
        data: {
          resources: {
            cash1: updatedUser.cash1,
            cash2: updatedUser.cash2,
            cash3: updatedUser.cash3,
          },
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: { errorMessage: "Internal server error" },
      });
    }
  }
);

app.listen(PORT, async () => {
  // Populate database with fake data
  await generateFakeData();
  console.log(`Server running on port ${PORT}`);
});
