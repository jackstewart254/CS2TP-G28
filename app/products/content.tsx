"use client";

import { useEffect, useState } from "react";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../payment/components/ProductCard";
import { PageLoader } from "@/components/page-loader";

import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/ui/button-group";
import { useFetchUser } from "@/lib/hooks/useFetchUser";
import ColourfulText from "@/components/ui/colourful-text";
import { useFetchCart } from "@/lib/hooks/useFetchCart";
import { useRemoveFromCart } from "@/lib/hooks/useRemoveFromCart";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { ShoppingCart } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Vortex } from "@/components/ui/vortex";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { StarRating } from "@/components/star-rating";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [hideCart, setHideCart] = useState<boolean>(true);
  const { products, loading } = useFetchProducts();
  const { categories, loading: catLoading } = useFetchCategories();
  const { cartItems, refetch } = useFetchCart();
  const { removeFromCart } = useRemoveFromCart();
  const { addToCart, error } = useAddToCart();
  const {
    user: { fname },
    loading: userLoading,
  } = useFetchUser();

  useEffect(() => {
    if (cartItems.length > 0) {
      setHideCart(false);
    } else {
      setHideCart(true);
    }
  }, [cartItems]);

  useEffect(() => {
    if (!catLoading) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const checkCartPresence = (id: string) => {
    console.log(cartItems);
    const item = cartItems.find((c) => c.product_id === id);
    console.log("cart presence", item);

    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const renderCart = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="
        fixed bottom-28 right-10 z-[60]
        w-72 max-h-[60vh]
        bg-white dark:bg-neutral-900
        border border-blue-400/40 
        shadow-xl rounded-xl 
        p-4 backdrop-blur
        flex flex-col
      "
      >
        <h2 className="font-semibold mb-3 text-lg">Your Cart</h2>
        <Separator className="mb-3" />

        {/* SCROLLABLE LIST AREA */}
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
          {cartItems.length === 0 ? (
            <p className="text-neutral-500 text-sm">Your cart is empty</p>
          ) : (
            cartItems.map((item) => {
              const cartItem = products.find((p) => p.id === item.product_id);

              return (
                <div key={item.id} className="mb-3">
                  <p className="font-medium">{cartItem.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    £{cartItem.price}
                  </p>
                  <Separator className="my-2" />
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER BUTTON */}
        <Button className="mt-4 w-full" disabled={!(cartItems.length > 0)}>
          Checkout
        </Button>
      </motion.div>
    );
  };

  const callAddToCard = async (cartItem: string) => {
    const result = await addToCart(cartItem);

    if (result.success) {
      console.log("Added to cart!");
      refetch(); // optional → refresh cart UI
    } else {
      console.log("Error:", error);
    }
  };

  const callRemoveFromCart = async (cartItem: string) => {
    await removeFromCart(cartItem);
    refetch();
  };

  const contentPanel = (item: any) => {
    return (
      <div className="p-4 z-10 flex flex-col gap-4 bg-white rounded-xl w-[75%] border">
        <p className="leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>
    );
  };

  const titlePanel = (item: any) => {
    return (
      <div className="w-[25%] relative flex h-full overflow-clip p-4">
        <DottedGlowBackground />

        <div className="flex flex-col z-10 backdrop-blur-[2px] bg-white h-min w-full border p-4 rounded-xl gap-3">
          <p className="text-base">
            <span className="font-semibold">{item.name}</span>
          </p>
          <p>£5.00</p>

          {checkCartPresence(item.id) ? (
            <Button
              className="w-full border-red-600"
              variant="outline"
              onClick={() => callRemoveFromCart(item.id)}
            >
              Remove from cart
            </Button>
          ) : (
            <Button className="w-full" onClick={() => callAddToCard(item.id)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (loading || catLoading) {
    return <PageLoader text="Loading our products..." />;
  }

  return (
    <div className="flex p-4 lg:p-10 w-full items-center justify-center relative">
      <div className="flex flex-col max-w-7xl w-full gap-6">
        <div
          className="w-full grid grid-cols-5 gap-2"
          onMouseLeave={() => setHovered(null)}
        >
          {categories.map((item) => {
            const isSelected = selectedCategory === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setSelectedCategory(item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium cursor-pointer select-none",
                  "flex items-center justify-center rounded-lg transition-all duration-300",
                  isSelected
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="hovered"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="
              absolute inset-0 h-full w-full rounded-xl
              
              border border-[#1e3a8a]/40
              shadow-[0_0_10px_rgba(30,58,138,0.25)]
            "
                  />
                )}

                <span className="relative z-10">{item.name}</span>
              </div>
            );
          })}
        </div>

        <Separator />
        <div className="grid grid-rows-5 gap-4">
          {products
            .filter((p) => p.category_id === selectedCategory)
            .map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="w-full  gap-4 flex flex-row relative border rounded-xl"
                >
                  {index % 2 === 0 ? (
                    <div className="flex flex-row w-full h-full p-4 gap-4">
                      {titlePanel(item)} {contentPanel(item)}
                    </div>
                  ) : (
                    <div className="flex flex-row w-full h-full p-4 gap-4">
                      {contentPanel(item)}
                      {titlePanel(item)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {!hideCart && (
        <>
          {showCart && renderCart()}

          <button
            className="fixed z-50 bottom-10 right-10 p-4 rounded-full border border-blue-400 bg-white/80 dark:bg-neutral-900/80 shadow-lg backdrop-blur"
            onClick={() => setShowCart(!showCart)}
          >
            <div
              className="
    absolute -top-2 -right-2 
    bg-blue-600 text-white 
    text-xs font-semibold 
    h-6 min-w-6 px-2 
    flex items-center justify-center 
    rounded-full 
    shadow-md
  "
            >
              £{cartItems.length * 5}
            </div>

            <ShoppingCart />
          </button>
        </>
      )}
    </div>
  );
};

export default Products;
