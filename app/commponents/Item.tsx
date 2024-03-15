"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ItemType } from "../types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ItemProps = {
  item: ItemType;
  isPurchased: boolean;
};

const Item = ({ item, isPurchased }: ItemProps) => {
  const [modalFlag, setModalFlag] = useState(false);
  const { data: session } = useSession();
  const user: any = session?.user;
  const router = useRouter();

  const startCheckOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            title: item.title,
            price: item.price,
            userId: user?.id,
            bookId: item.id,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  const handleByOut = () => {
    if (isPurchased) {
      alert("その商品は購入済みです。");
    } else {
      setModalFlag(true);
    }
  };
  const handleCancel = () => {
    setModalFlag(false);
  };

  const onclickPuchaseConfirm = () => {
    if (!user) {
      setModalFlag(false);
      //ログインページへリダイレクト
      router.push("/login");
    } else {
      //ストライプで決済する
      startCheckOut();
    }
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handleByOut}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={item.thumbnail.url}
            alt={item.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段:{item.price}</p>
          </div>
        </a>

        {modalFlag && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={onclickPuchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;
