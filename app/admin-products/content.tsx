"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: 25, category:"School" },
    { id: 2, name: "Product B", price: 50, category:"Traffic" },
    { id: 3, name: "Product C", price: 75, category:"Environmental" },
    { id: 4, name: "Product D", price: 50, category:"Tech" },
    { id: 5, name: "Product E", price: 25, category:"School" },
    { id: 6, name: "Product F", price: 50, category:"Traffic" },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !categoryFilter || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter, products]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen p-6">
      {/* This is the code for the heading/welcome message */}
      <h1 className="text-left text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
        Welcome to the Product Page
      </h1>

      {/* This is code for the create section */}
      <div className="mt-10 p-6 mb-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <h2 className="mb-4 font-medium text-lg text-black dark:text-white">Create a new product</h2>
        <div className="flex justify-end">
          <div
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-black text-white rounded cursor-pointer select-none"
          >
            Create
          </div>
        </div>
      </div>

      {/* This is the code for the search and category filter */}
      <div className="flex items-center gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border flex-1"
          placeholder="Search"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {search && (
          <div
            onClick={() => setSearch("")}
            className="px-3 py-2 rounded-full bg-white border cursor-pointer select-none"
          >
            ×
          </div>
        )}
      </div>

      {/* This is the code for the product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-32 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between shadow hover:shadow-lg transition-shadow"
            >

              <div>
                <span className="text-sm font-medium">{product.name}</span>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-xs text-green-600 font-semibold">
                  £{product.price.toFixed(2)}
                </p>
              </div>

              <div
                onClick={() => {
                  setSelected(product);
                  setShowDeleteModal(true);
                }}
                className="self-end px-3 py-1 bg-red-600 text-white rounded text-xs cursor-pointer select-none"
              >
                Delete
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* This code will display "No products found" if the filter find no products */}
        {filtered.length === 0 && (
          <p className="text-gray-700 col-span-full text-center py-10">
            No products found.
          </p>
        )}
      </div>

      {/* This is the code for the create modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Create Product</h2>

              <label className="text-sm">Product Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mt-2 mb-4 px-4 py-2 border rounded"
                placeholder="Enter product name"
              />

              <label className="text-sm">Category</label>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full mt-2 mb-4 px-4 py-2 border rounded"
                placeholder="Enter category"
              />

              <label className="text-sm">Price</label>
              <div className="relative w-full mt-2 mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                  £
                </span>
                <input
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full pl-7 pr-4 py-2 border rounded"
                  placeholder="0.00"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <div
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer select-none"
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    const priceValue = parseFloat(newPrice);
                    if (!newName.trim() || !newCategory.trim() || isNaN(priceValue)) return;
                    setProducts((prev) => [
                      ...prev,
                      { id: Date.now(), name: newName.trim(), category: newCategory.trim(), price: priceValue},
                    ]);
                    setNewName("");
                    setNewCategory("");
                    setShowCreateModal(false);
                  }}
                  className="px-4 py-2 bg-black text-white rounded cursor-pointer select-none"
                >
                  Create
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* This is the code for the delete modal */}
      <AnimatePresence>
        {showDeleteModal && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-3">Delete Product</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selected.name}</span>?
              </p>
              <div className="flex justify-end gap-2">
                <div
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer select-none"
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    setProducts((prev) => prev.filter((p) => p.id !== selected.id));
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer select-none"
                >
                  Delete
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
