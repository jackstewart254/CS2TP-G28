"use client";

import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import { Minus, Plus, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "../payment/components/ProductCard";
import { ButtonGroup } from "@/components/ui/button-group";

const LeftPanel = ({ category, side }: { category: any; side: boolean }) => {
  return (
    <div
      className={`p-6 relative bg-neutral-50 dark:bg-neutral-900 ${
        side ? "border-r" : "border-l"
      }`}
    >
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      <div className="relative z-10 flex flex-col gap-5">
        <UserRound
          size={30}
          className="text-neutral-700 dark:text-neutral-200"
        />

        <h1 className="font-medium text-2xl">{category.name}</h1>

        <p className="text-neutral-500 dark:text-neutral-400">
          {category.description}
        </p>
        <Button className="w-min">Purchase bundle</Button>
      </div>
    </div>
  );
};

const RightPanel = ({ products }: { products: any[] }) => {
  return (
    <div className="p-3 bg-white dark:bg-neutral-950 flex flex-col gap-3">
      {products.map((item, index) => (
        <ProductCard
          key={item.id}
          index={index}
          name={item.name}
          price={item.price}
          description={item.description}
        />
      ))}
    </div>
  );
};

const CategoryRow = ({
  side,
  category,
  products,
}: {
  side: boolean;
  category: any;
  products: any[];
}) => {
  return (
    <div className="grid grid-cols-3 w-full border rounded-xl overflow-hidden">
      {side ? (
        <>
          <LeftPanel category={category} side={side} />
          <div className="col-span-2">
            <RightPanel products={products} />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2">
            <RightPanel products={products} />
          </div>
          <LeftPanel category={category} side={side} />
        </>
      )}
    </div>
  );
};

const Products = () => {
  const { products } = useFetchProducts();
  const { categories } = useFetchCategories();

  return (
    <div className="h-full p-20">
      <div className="flex flex-col gap-10 w-full">
        {categories.map((category, index) => (
          <CategoryRow
            key={category.id}
            side={index % 2 === 0}
            category={category}
            products={products.filter(
              (prod) => prod.category_id === category.id
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
