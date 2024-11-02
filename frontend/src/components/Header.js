import React from "react";

export default function Header() {
  return (
    <header class="fixed top-0 left-0 z-20 w-full p-4 bg-white border-b border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Weather Forecast
      </span>
      {/* Navigation Links */}
      <div class="flex justify-center items-center md:justify-end md:space-x-6">
        <a href="/" class="p-4 text-gray-500 hover:text-gray-900">
          Home
        </a>
        <a href="/about" class="p-4 text-gray-500 hover:text-gray-900">
          About Us
        </a>
        <a href="/models" class="p-4 text-gray-500 hover:text-gray-900">
          Our Models
        </a>
      </div>
    </header>
  );
}
