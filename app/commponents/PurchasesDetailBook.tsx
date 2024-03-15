import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ItemType } from "../types/types";
type detailItemProps = {
  detailBook: ItemType;
};
const PurchasesDetailBook = ({ detailBook }: detailItemProps) => {
  return (
    <div>
      <Link
        href={`/item/${detailBook.id}`}
        className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
      >
        <Image
          priority
          src={detailBook.thumbnail.url}
          alt={detailBook.title}
          width={450}
          height={350}
          className="rounded-t-md"
        />
        <div className="px-4 py-4 bg-slate-100 rounded-b-md">
          <h2 className="text-lg font-semibold">{detailBook.title}</h2>
          {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
          <p className="mt-2 text-md text-slate-700">
            値段：{detailBook.price}円
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PurchasesDetailBook;
