// "use client";
// import React, { useEffect, useState } from "react";
// import { parseStringPromise } from "xml2js";

// interface EcoPulseItem {
//   id: string;
//   Headline: string;
//   Content: string;
//   Image: string;
//   Date: string;
// }

// const EcoPulse: React.FC = () => {
//   const [items, setItems] = useState<EcoPulseItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRSSFeed = async () => {
//       setIsLoading(true);
//       try {
//         // The RSS feed URL
//         const rssUrl = "https://rss.app/feeds/tTQQFKTL9HZORhqv.xml";

//         // Create a proxy URL to avoid CORS issues
//         const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
//           rssUrl
//         )}`;

//         const response = await fetch(proxyUrl);
//         if (!response.ok) {
//           throw new Error("Failed to fetch RSS feed");
//         }

//         const data = await response.json();
//         const xmlContent = data.contents;

//         // Parse the XML content
//         const result = await parseStringPromise(xmlContent, {
//           explicitArray: false,
//         });

//         if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
//           throw new Error("Invalid RSS feed format");
//         }

//         // Extract the items from the feed
//         const feedItems = Array.isArray(result.rss.channel.item)
//           ? result.rss.channel.item
//           : [result.rss.channel.item];

//         // Transform the RSS items to match our EcoPulseItem interface
//         const transformedItems = feedItems.map((item, index) => {
//           // Extract the image URL from the content if available, otherwise use a placeholder
//           let imageUrl =
//             "https://placehold.co/600x400/green/white?text=EcoPulse";

//           if (item.enclosure && item.enclosure.$.url) {
//             imageUrl = item.enclosure.$.url;
//           } else if (item["media:content"] && item["media:content"].$.url) {
//             imageUrl = item["media:content"].$.url;
//           }

//           return {
//             id: item.guid || `item-${index}`,
//             Headline: item.title || "No Title",
//             Content: item.description || "",
//             Image: imageUrl,
//             Date: item.pubDate || new Date().toISOString(),
//           };
//         });

//         // Sort by date, newest first
//         transformedItems.sort(
//           (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
//         );

//         setItems(transformedItems);
//       } catch (err) {
//         console.error("Error fetching RSS feed:", err);
//         setError(
//           err instanceof Error ? err.message : "Failed to fetch RSS feed"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRSSFeed();
//   }, []);

//   return (
//     <div className="transition-colors duration-300 min-h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
//       <div className="mt-20 max-w-6xl mx-auto">
//         {/* Header with Theme Toggle */}
//         <div className="flex justify-center items-center mb-10">
//           <h2 className="text-4xl font-bold">
//             <span className="text-green-500 dark:text-green-400">Eco</span>
//             <span className="text-blue-500 dark:text-blue-400">Pulse</span>
//           </h2>
//         </div>

//         {isLoading && (
//           <div className="flex justify-center items-center p-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//             <p>{error}</p>
//             <p>Please try again later or check the RSS feed URL.</p>
//           </div>
//         )}

//         {!isLoading && !error && (
//           <div className="grid grid-cols-1 gap-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-lg p-6 shadow-md border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-700">
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="md:w-1/2">
//                       <img
//                         src={item.Image}
//                         alt={item.Headline}
//                         className="w-full h-48 object-cover rounded-lg shadow-md"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.src =
//                             "https://placehold.co/600x400/green/white?text=EcoPulse";
//                         }}
//                       />
//                     </div>

//                     <div className="md:w-2/3">
//                       <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
//                         {item.Headline}
//                       </h4>
//                       <div
//                         className="mb-4 text-gray-700 dark:text-gray-300"
//                         dangerouslySetInnerHTML={{ __html: item.Content }}
//                       />
//                       <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
//                         {new Date(item.Date).toLocaleDateString()}
//                       </p>

//                       <a
//                         href={`https://rss.app/feeds/tTQQFKTL9HZORhqv.xml#${item.id}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:opacity-90 inline-block">
//                         Read More
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {!isLoading && items.length === 0 && !error && (
//           <div className="text-center p-12 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
//             <p className="text-xl">No items found in the RSS feed.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EcoPulse;
"use client";
import React, { useEffect, useState } from "react";

interface EcoPulseItem {
  id: string;
  Headline: string;
  Content: string;
  Image: string;
  Date: string;
  Source: string;
  Url: string;
}

const EcoPulse: React.FC = () => {
  const [items, setItems] = useState<EcoPulseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        // Since your RSS feed is expired, we'll use a sample news fetch
        // In a real app, you would replace this with a working news API
        // Example: const response = await fetch(`https://newsapi.org/v2/everything?q=climate+change&apiKey=YOUR_API_KEY`);

        // For demonstration, we'll use a mock response with environment-related news
        const mockNewsData = [
          {
            id: "1",
            title:
              "Study Shows Significant Progress in Renewable Energy Adoption",
            description:
              "A new study has found that renewable energy adoption has accelerated globally, with solar and wind power installations breaking records in the past year.",
            urlToImage:
              "https://placehold.co/600x400/green/white?text=Renewable+Energy",
            publishedAt: "2025-03-17T14:25:00Z",
            source: { name: "EcoNews" },
            url: "https://example.com/renewable-energy-progress",
          },
          {
            id: "2",
            title:
              "Innovative Carbon Capture Technology Shows Promise in Latest Tests",
            description:
              "Scientists have developed a new carbon capture system that can remove CO2 from the atmosphere with 40% greater efficiency than existing technologies.",
            urlToImage:
              "https://placehold.co/600x400/blue/white?text=Carbon+Capture",
            publishedAt: "2025-03-16T09:45:00Z",
            source: { name: "Science Daily" },
            url: "https://example.com/carbon-capture-innovation",
          },
          {
            id: "3",
            title: "Coastal Cities Accelerate Climate Adaptation Plans",
            description:
              "Major coastal cities worldwide are investing billions in climate adaptation infrastructure to prepare for rising sea levels and increased flooding risks.",
            urlToImage:
              "https://placehold.co/600x400/teal/white?text=Coastal+Adaptation",
            publishedAt: "2025-03-15T11:30:00Z",
            source: { name: "Urban Development Today" },
            url: "https://example.com/coastal-adaptation",
          },
          {
            id: "4",
            title:
              "Electric Vehicle Sales Surpass Traditional Cars in Major Markets",
            description:
              "For the first time, electric vehicle sales have overtaken traditional combustion engine cars in several major markets, signaling a significant shift in consumer preferences.",
            urlToImage:
              "https://placehold.co/600x400/green/white?text=Electric+Vehicles",
            publishedAt: "2025-03-14T16:20:00Z",
            source: { name: "Auto Trends" },
            url: "https://example.com/ev-sales-milestone",
          },
          {
            id: "5",
            title:
              "Reforestation Projects Show Promising Results for Biodiversity",
            description:
              "Large-scale reforestation initiatives across multiple continents are reporting significant increases in local biodiversity and carbon sequestration.",
            urlToImage:
              "https://placehold.co/600x400/darkgreen/white?text=Reforestation",
            publishedAt: "2025-03-13T10:15:00Z",
            source: { name: "Nature Conservation Report" },
            url: "https://example.com/reforestation-biodiversity",
          },
          {
            id: "6",
            title: "New Climate Policy Framework Adopted by G20 Nations",
            description:
              "G20 nations have agreed on a new climate policy framework that sets more ambitious emissions reduction targets and establishes a carbon pricing mechanism.",
            urlToImage:
              "https://placehold.co/600x400/navy/white?text=Climate+Policy",
            publishedAt: "2025-03-12T14:05:00Z",
            source: { name: "Global Policy Watch" },
            url: "https://example.com/g20-climate-framework",
          },
        ];

        // Transform the news data to match our EcoPulseItem interface
        const transformedItems = mockNewsData.map((item) => ({
          id: item.id,
          Headline: item.title,
          Content: item.description,
          Image: item.urlToImage,
          Date: item.publishedAt,
          Source: item.source.name,
          Url: item.url,
        }));

        setItems(transformedItems);
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch news data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="transition-colors duration-300 min-h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="mt-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-4xl font-bold">
            <span className="text-green-500 dark:text-green-400">Eco</span>
            <span className="text-blue-500 dark:text-blue-400">Pulse</span>
          </h2>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
            <p>Please check your API configuration or try again later.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg p-6 shadow-md border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-700">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img
                        src={item.Image}
                        alt={item.Headline}
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/600x400/green/white?text=EcoPulse";
                        }}
                      />
                    </div>

                    <div className="md:w-2/3">
                      <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
                        {item.Headline}
                      </h4>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        {item.Content}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.Date).toLocaleDateString()} ·{" "}
                          {item.Source}
                        </span>
                        <a
                          href={item.Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:opacity-90 inline-block">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && items.length === 0 && !error && (
          <div className="text-center p-12 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
            <p className="text-xl">No news items found.</p>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Looking for real-time climate news? Check out these free resources:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://www.nasa.gov/climate-change/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-600 dark:hover:text-green-400">
              NASA Climate
            </a>
            <a
              href="https://www.un.org/en/climatechange"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-600 dark:hover:text-green-400">
              UN Climate Action
            </a>
            <a
              href="https://www.bbc.com/news/science-environment"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-600 dark:hover:text-green-400">
              BBC Environment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPulse;
