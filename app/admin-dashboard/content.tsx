"use client";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-6">
      {/* Heading */}
      <h1 className="text-left text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
        Welcome to the Dashboard, Dominik!
      </h1>

      {/* The 4 boxes with stats */}
      <div className="mt-10 grid grid-cols-3 gap-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-3xl font-bold mt-2">5432</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Sales Today</p>
            <p className="text-3xl font-bold mt-2">7893</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Monthly Sales</p>
            <p className="text-3xl font-bold mt-2">32145</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Yearly Sales</p>
            <p className="text-3xl font-bold mt-2">456321</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white col-span-2 p-6 rounded-lg shadow">
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

          {/* Placeholder fake pagination */}
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
        </div>

          {/* Sales by Category */}
          <div className="bg-white p-6 rounded-lg shadow h-60">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Sales by Category</h2>

            <div className="w-full h-full flex justify-center items-center">
              {/* Placeholder chart */}
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
          </div>

          {/* Monthly Sales Chart */}
          <div className="bg-white col-span-2 p-6 rounded-lg shadow h-60">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Monthly Sales Chart</h2>

            <div className="w-full h-full flex justify-center items-center">
              {/* Placeholder line chart */}
              <svg width="300" height="150" className="text-gray-700">
                <polyline
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  points="0,120 40,115 80,115 120,100 160,110 200,130 240,80 280,90 300,60"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
