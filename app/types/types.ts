type ItemType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

type PurchaseBook = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
};

type PurchaseProps = {
  purchaseData: PurchaseBook[];
};

type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type { ItemType, PurchaseBook, User, PurchaseProps };
