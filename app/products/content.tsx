"use client";
import { useState } from "react";
/* Product Types  */
type ProductId =
  | "jobMarket"
  | "universityPerformance"
  | "studentCareerTools"
  | "employerRecruitmentTools"
  | "educationAndSkills";

interface Product {
  id: ProductId;
  name: string;
  description: string;
  apis: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

interface BasketItem {
  product: string;
  api: string;
  type: "single" | "package";
}

/* Product Data based on ids to display  */

const PRODUCTS: Product[] = [
  {
    id: "jobMarket",
    name: "Job Market Data Packs",
    monthlyPrice: 25,
    yearlyPrice: 300,
    description: "Live insight into skills, roles, and market demand.",
    apis: [
      "Top Skills Report - Gives up to date information on relevant and in demand skills",
      "Industry Trends Pack - Gives live data on which industries are or could succeed or decline",
      "Salary Insights Pack - Gives real world salary expectations",
      "Role Demand Report - Gives live insight into which roles are in demand",
      "Location Hotspots Pack - Gives real-time data on which geographical locations offer good roles, good salaries, and good quality of life",
    ],
  },
  {
    id: "universityPerformance",
    name: "University Performance Insights",
    monthlyPrice: 25,
    yearlyPrice: 300,
    description: "Improve employability with data-driven insights.",
    apis: [
      "Employability Scorecard - Bases your modules to data on employability rates and skills",
      "Skills Gap Summary - Gives data on if your modules and courses are offering the skills that are needed in the employment market",
      "Course Improvement Suggestions - Gives insight in how to improve the courses taught by looking at what employers are looking for",
      "Graduate Outcome Comparison - Gives data across many institutions of graduate outcomes",
      "Student Feedback Insight - Summarizes feedback gained from students into concise notes and suggestions of improvement based on feedback",
    ],
  },
  {
    id: "studentCareerTools",
    name: "Student Career Tools",
    monthlyPrice: 25,
    yearlyPrice: 300,
    description: "Tools that help students navigate the job market.",
    apis: [
      "Career Match Quiz - A quiz based from algorithms to match you to a career",
      "Skill Gap Checker - Reads over your CV and looks for keywords and suggests if you match for a role",
      "Keyword Optimiser - Finds relevant search terms employers are looking for and suggests them to boost your position in the job market",
      "Interview Prep Pack - Gives tips and live examples on how interviews are conducted",
      "Learning Roadmap - A tool which takes the content of your modules and makes an academic planner in chronological order of the content being taught",
    ],
  },
  {
    id: "employerRecruitmentTools",
    name: "Employer & Recruitment Tools",
    monthlyPrice: 25,
    yearlyPrice: 300,
    description: "Insight and intelligence for smarter hiring.",
    apis: [
      "University Talent Finder - Gives employers direct live insight into top performing universities",
      "Hiring Trends Dashboard - Allows employers to see live which roles and skills are required",
      "Employer Brand Insights - Gives a company an insight into what the general public and employees think about what the culture, pay and balance the company offers",
      "Campus Recruitment Planner - Employers have the chance to visit top performing universities within their field and scout potential employees",
      "Job Posting Keyword Tool - A live tool which scours the internet looking for specific keywords for potential employees",
    ],
  },
  {
    id: "educationAndSkills",
    name: "Education & Skill Development",
    monthlyPrice: 25,
    yearlyPrice: 300,
    description: "Data-driven tools for shaping future-ready curriculums.",
    apis: [
      "Emerging Skills Pack - Gives live insight into which skills are emerging and are to be useful",
      "Learning Resource Bundle - Using your course, this bundle gives the best resources available to help you learn",
      "Certification Value Guide - Gives insight to students on which certifications hold value to employers",
      "Skill Development Tracker - A tracker based on real world useful skills and development over time",
      "Workshop Ideas Pack - Gives institutions personalised workshop plans based on student grades and interests and goals",
    ],
  },
];

/* Component  */
export default function ProductsContent() {
  const [expandedProduct, setExpandedProduct] = useState<ProductId | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>(() => []);
  const [isMonthly, setIsMonthly] = useState(true); // State for toggling between monthly and yearly pricing

  const toggleExpand = (productId: ProductId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  /* Allows customer to buy / add/remove a single API product */
  const handleCheckboxChange = (product: string, api: string) => {
    setBasket((prev) => {
      const exists = prev.some(
        (item) => item.product === product && item.api === api && item.type === "single"
      );

      if (exists) {
        return prev.filter(
          (i) => !(i.product === product && i.api === api && i.type === "single")
        );
      }

      return [...prev, { product, api, type: "single" }];
    });
  };

  /* Select Whole Package To Buy */
  const toggleWholePackage = (product: Product) => {
    const exists = basket.some(
      (item) => item.product === product.name && item.type === "package"
    );

    if (exists) {
      setBasket((prev) =>
        prev.filter((item) => !(item.product === product.name && item.type === "package"))
      );
    } else {
      setBasket((prev) => [
        ...prev,
        { product: product.name, api: "Whole Package Subscription", type: "package" },
      ]);
    }
  };

  /* Checkout Basket icon handling */
  const handleCheckout = () => {
    if (basket.length === 0) {
      alert("Your basket is empty!");
      return;
    }

    alert(
      "Proceeding to checkout with:\n\n" +
        basket.map((item) => `${item.api} — (${item.product})`).join("\n")
    );
  };

  // Toggle between monthly and yearly price
  const togglePricing = () => {
    setIsMonthly((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen px-6 py-10 bg-white dark:bg-black transition-colors duration-300">
      {/* Pricing Toggle Button */}
      <div className="text-center mb-6">
        <button
          onClick={togglePricing}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isMonthly ? "Switch to Yearly Prices" : "Switch to Monthly Prices"}
        </button>
      </div>

      {/* Product Title Page */}
      <h1 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
        Our Product Packages
      </h1>

      {/* Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => {
          const price = isMonthly ? product.monthlyPrice : product.yearlyPrice;

          return (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {product.name}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

              <p className="text-lg font-bold text-black dark:text-white mb-2">
                £{price} {isMonthly ? "/ month" : "/ year"}
              </p>

              {/* Expands for more detail on selected card */}
              <button
                onClick={() => toggleExpand(product.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {expandedProduct === product.id ? "Hide Details" : "View Details"}
              </button>

              {/* Add whole package button to add all APIs under 1 package */}
              {expandedProduct === product.id && (
                <button
                  onClick={() => toggleWholePackage(product)}
                  className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {basket.some(
                    (item) => item.product === product.name && item.type === "package"
                  )
                    ? "Remove Whole Package"
                    : "Add Whole Package to Checkout"}
                </button>
              )}

              {/* Expanded items shown */}
              {expandedProduct === product.id && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Whole pack includes:
                  </h3>

                  <ul className="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside space-y-1">
                    {product.apis.map((api) => (
                      <li key={api}>{api}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Select Individual APIs £5 each:
                  </h4>

                  <div className="space-y-2">
                    {product.apis.map((api) => {
                      const isChecked = basket.some(
                        (item) =>
                          item.product === product.name && item.api === api && item.type === "single"
                      );

                      return (
                        <label key={api} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(product.name, api)}
                          />
                          <span className="text-gray-800 dark:text-gray-300">{api}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Checkout Button with badge showing amount of items in the basket */}
      <button
        onClick={handleCheckout}
        className="fixed bottom-10 right-10 z-50 bg-red-500 text-white w-20 h-20 rounded-full shadow-lg flex items-center justify-center text-sm font-bold hover:bg-green-800 transition relative"
      >
        Checkout
        {basket.length > 0 ? (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {basket.length}
          </span>
        ) : null}
      </button>

      {/* Our reviews */}
      <div className="bg-gray-50 dark:bg-gray-900 mt-16 py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
          What Our Customers Have Said
        </h2>

        

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <p className="text-gray-700 dark:text-gray-300 italic mb-2">
              "This platform transformed our hiring pipeline. The insights are unreal and true to the market standards."
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white">Michael S. — Hiring Manager</h4>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <p className="text-gray-700 dark:text-gray-300 italic mb-2">
              "In-depth insight into our module programs. Helped our university redesign modules to make them more relevant to the rapidly changing markets."
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white">Richard L. — Academic Lead</h4>
          </div>
        </div>
      </div>
    </div>
  );
}