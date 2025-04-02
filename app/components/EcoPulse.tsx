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
import { XMLParser } from "fast-xml-parser";

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
        // Using a CORS proxy to access the Times of India RSS feed
        const corsProxy = "https://api.allorigins.win/raw?url=";
        const rssUrl =
          "https://timesofindia.indiatimes.com/rssfeeds/2647163.cms";
        const response = await fetch(
          `${corsProxy}${encodeURIComponent(rssUrl)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch RSS feed: ${response.status}`);
        }

        const xmlData = await response.text();
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
          textNodeName: "#text",
        });

        const result = parser.parse(xmlData);
        const newsItems = result.rss?.channel?.item || [];

        // Transform the news data to match our EcoPulseItem interface
        const transformedItems = newsItems.map((item: any, index: number) => {
          // Extract image from description if available
          let imageUrl =
            "https://placehold.co/600x400/green/white?text=Environment+News";

          // First try to get image from enclosure
          if (item.enclosure && item.enclosure["@_url"]) {
            imageUrl = item.enclosure["@_url"];
          }
          // Then try to extract from description
          else {
            const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
              imageUrl = imgMatch[1];
            }
          }

          // Clean description text by removing HTML tags
          const contentText = item.description
            ? typeof item.description === "string"
              ? item.description.replace(/<[^>]*>/g, "").trim()
              : "No description available"
            : "No description available";

          // Get creator/author information safely
          let author = "Times of India";
          if (item["dc:creator"]) {
            if (typeof item["dc:creator"] === "string") {
              author = item["dc:creator"];
            } else if (typeof item["dc:creator"]["#text"] === "string") {
              author = item["dc:creator"]["#text"];
            }
          }

          return {
            id: typeof item.guid === "string" ? item.guid : index.toString(),
            Headline: typeof item.title === "string" ? item.title : "No title",
            Content: contentText,
            Image: imageUrl,
            Date:
              typeof item.pubDate === "string"
                ? item.pubDate
                : new Date().toISOString(),
            Source: author,
            Url: typeof item.link === "string" ? item.link : "#",
          };
        });

        setItems(transformedItems);
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch news data"
        );
        // Use fallback mock data in case of error
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
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl font-bold">
            <span className="text-green-500 dark:text-green-400">Eco</span>
            <span className="text-blue-500 dark:text-blue-400">Pulse</span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            Quick Glimpse of Whats New!
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
            <p>Using fallback environment news instead.</p>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-t border-green-500">
                  <div className="relative h-48">
                    <img
                      src={item.Image}
                      alt={item.Headline}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400/green/white?text=EcoPulse";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-xs font-medium text-white bg-green-600 px-2 py-1 rounded-full">
                        {new Date(item.Date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">
                      {item.Headline}
                    </h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.Content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                        By: {item.Source}
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
              ))}
            </div>
          </div>
        )}

        {!isLoading && items.length === 0 && !error && (
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-xl">No news items found.</p>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p className="font-medium text-lg mb-2">
            More Environmental Resources
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://www.nasa.gov/climate-change/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
              NASA Climate
            </a>
            <a
              href="https://www.un.org/en/climatechange"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
              UN Climate Action
            </a>
            <a
              href="https://www.bbc.com/news/science-environment"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
              BBC Environment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPulse;
