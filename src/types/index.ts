interface BuyProductInput {
  id: number;
  address: string;
}

interface BuyProductOutputSuccess {
  success: true;
  data: {
    resources: {
      cash1: number;
      cash2: number;
      cash3: number;
    };
  };
}

interface BuyProductOutputError {
  success: false;
  error: {
    errorMessage: string;
  };
}

type BuyProductOutput = BuyProductOutputSuccess | BuyProductOutputError;

type TransformedCatalogItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: {
    cost1: number;
    cost2: number;
    cost3: number;
  };
  req: {
    req1: number;
    req2: number;
    req3: number;
  };
  category: number;
};
