import { getServerSession } from "next-auth";
import Item from "./commponents/Item";
import { getAllBooks } from "./lib/microcms/client";
import { ItemType, PurchaseBook, PurchaseProps, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  // 疑似データ
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBookIds: string[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData: PurchaseBook[] = await response.json();
    console.log(purchasesData);

    purchaseBookIds = purchasesData.map(
      (purchaseBook: PurchaseBook) => purchaseBook.bookId
    );
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((content: ItemType) => (
          <Item
            key={content.id}
            item={content}
            isPurchased={purchaseBookIds.includes(content.id)}
          />
        ))}
      </main>
    </>
  );
}
