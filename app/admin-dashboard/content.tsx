"use client";

import { motion } from "framer-motion";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6">
      {/* This is code for the heading/welcome message */}
      <h1 className="text-left text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
        Welcome to the Dashboard, Dominik!
      </h1>

      {/* This is code for the 4 boxes with stats */}
      <div className="mt-10 grid grid-cols-3 gap-4">

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }} 
            className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow">

            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-3xl font-bold mt-2">5432</p>
          </motion.div> 

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow">
            
            
            <p className="text-sm text-gray-600">Sales Today</p>
            <p className="text-3xl font-bold mt-2">7893</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow">
            
            <p className="text-sm text-gray-600">Monthly Sales</p>
            <p className="text-3xl font-bold mt-2">32145</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow">
            
            <p className="text-sm text-gray-600">Yearly Sales</p>
            <p className="text-3xl font-bold mt-2">456321</p>
          </motion.div>
        </div>

        {/* This is code for the transactions section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="col-span-2 p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow">
          
          <h2 className="text-sm font-medium text-gray-700 mb-4">Transactions</h2>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border">
                    <td className="border p-3"></td>
                    <td className="border p-3"></td>
                    <td className="border p-3"></td>
                    <td className="border p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* This is code for fake placeholder pagination, this doesn't do anything right now */}
          <div className="flex justify-end items-center space-x-2 mt-3 text-sm">
            <button className="text-gray-600">← Previous</button>
            <span className="px-2 py-1 bg-black text-white rounded">1</span>
            <span>2</span>
            <span>3</span>
            <span>…</span>
            <span>67</span>
            <span>68</span>
            <button className="text-gray-600">Next →</button>
          </div>
        </motion.div>

          {/* This is code for the sales by category section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow h-60">
              
            <h2 className="text-sm font-medium text-gray-700 mb-4">Sales by Category</h2>

            <div className="w-full h-full flex justify-center items-center">
              {/* This is code for a placeholder pie chart  */}
              <svg width="150" height="150" className="text-gray-700">
                <circle
                  cx="75"
                  cy="75"
                  r="50"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M75 25 A50 50 0 0 1 125 75 L75 75 Z"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

          {/* This is code for the monthly sales chart section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="col-span-2 p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:shadow-lg transition-shadow h-60">

            <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly Sales Chart</h2>

            <div className="w-full h-full flex justify-center items-center">

              {/* This is code for a placeholder line graph  */}
              <svg width="300" height="150" className="text-gray-700">
                <polyline
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  points="0,120 40,115 80,115 120,100 160,110 200,130 240,80 280,90 300,60"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default AdminDashboard;
