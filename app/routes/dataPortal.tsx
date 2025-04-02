import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    // Change page title
    document.title = "Data Portal - Coming Soon";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 mb-4">
          Coming Soon
        </h1>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
              Under Development
            </span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Our data portal is currently under construction. We're working hard to
          bring you a powerful tool for exploring and analyzing our datasets.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Check back soon for updates on our progress.
        </p>
      </div>
    </div>
  );
}
