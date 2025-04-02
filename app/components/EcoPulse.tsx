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
  Category: string;
}

interface FeedSource {
  name: string;
  url: string;
  category: string;
}

const EcoPulse: React.FC = () => {
  const [items, setItems] = useState<EcoPulseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Get fallback image based on category
  const getFallbackImage = (category: string): string => {
    switch (category) {
      case "Water Resources":
        return "https://placehold.co/600x400/blue/white?text=Water+Resources";
      case "Environmental Science":
        return "https://placehold.co/600x400/teal/white?text=Environmental+Science";
      case "Climate Tech":
        return "https://placehold.co/600x400/purple/white?text=Climate+Tech";
      case "Hydrology Journal":
        return "https://placehold.co/600x400/navy/white?text=Hydrology";
      case "General Environment":
        return "https://placehold.co/600x400/green/white?text=Environment+News";
      default:
        return "https://placehold.co/600x400/gray/white?text=EcoPulse";
    }
  };

  const feedSources: FeedSource[] = [
    {
      name: "Times of India - Environment",
      url: "https://timesofindia.indiatimes.com/rssfeeds/2647163.cms",
      category: "General Environment",
    },
    {
      name: "Water Resources Research",
      url: "https://agupubs.onlinelibrary.wiley.com/feed/19447973/most-recent",
      category: "Water Resources",
    },
    {
      name: "Journal of Water Resources Planning and Management",
      url: "https://ascelibrary.org/action/showFeed?type=etoc&feed=rss&jc=jwrmd5",
      category: "Water Resources",
    },
    {
      name: "Journal of Hydrology",
      url: "https://rss.sciencedirect.com/publication/science/00221694",
      category: "Hydrology Journal",
    },
    {
      name: "Environmental Science & Technology",
      url: "https://www.climate.gov/feeds/news-features/climatetech.rss",
      category: "Climate Tech",
    },
  ];

  // Extract unique categories for the filter
  const categories = [
    "All",
    ...new Set(feedSources.map((source) => source.category)),
  ];

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        // Fetch from all sources
        const allItems: EcoPulseItem[] = [];
        const corsProxy = "https://api.allorigins.win/raw?url=";

        // Process each feed
        const fetchPromises = feedSources.map(async (source) => {
          try {
            const response = await fetch(
              `${corsProxy}${encodeURIComponent(source.url)}`
            );

            if (!response.ok) {
              console.warn(
                `Failed to fetch from ${source.name}: ${response.status}`
              );
              return [];
            }

            const xmlData = await response.text();
            const parser = new XMLParser({
              ignoreAttributes: false,
              attributeNamePrefix: "@_",
              textNodeName: "#text",
            });

            const result = parser.parse(xmlData);

            // Different feeds have different structures, handle accordingly
            let newsItems: any[] = [];

            if (result.rss?.channel?.item) {
              // Standard RSS 2.0 structure
              newsItems = Array.isArray(result.rss.channel.item)
                ? result.rss.channel.item
                : [result.rss.channel.item];
            } else if (result.feed?.entry) {
              // Atom feed structure
              newsItems = Array.isArray(result.feed.entry)
                ? result.feed.entry
                : [result.feed.entry];
            }

            // Transform according to feed type
            const transformedItems: EcoPulseItem[] = newsItems.map(
              (item: any, index: number) => {
                // Extract title based on feed structure
                const title = item.title
                  ? typeof item.title === "string"
                    ? item.title
                    : item.title["#text"] || "No title"
                  : "No title";

                // Extract description/content based on feed structure
                let description = "No description available";
                if (item.description) {
                  description =
                    typeof item.description === "string"
                      ? item.description.replace(/<[^>]*>/g, "").trim()
                      : "No description available";
                } else if (item.content) {
                  description =
                    typeof item.content === "string"
                      ? item.content.replace(/<[^>]*>/g, "").trim()
                      : item.content["#text"]
                      ? item.content["#text"].replace(/<[^>]*>/g, "").trim()
                      : "No description available";
                } else if (item.summary) {
                  description =
                    typeof item.summary === "string"
                      ? item.summary.replace(/<[^>]*>/g, "").trim()
                      : item.summary["#text"]
                      ? item.summary["#text"].replace(/<[^>]*>/g, "").trim()
                      : "No description available";
                }

                // Extract image - start with default fallback image based on category
                let imageUrl = "";

                // Try to get image from enclosure
                if (item.enclosure && item.enclosure["@_url"]) {
                  imageUrl = item.enclosure["@_url"];
                }
                // Try to extract from description
                else if (typeof item.description === "string") {
                  const imgMatch = item.description.match(
                    /<img[^>]+src="([^">]+)"/
                  );
                  if (imgMatch && imgMatch[1]) {
                    imageUrl = imgMatch[1];
                  }
                }

                // If no image was found, leave it empty so we can use the fallback later
                // Do not assign a fallback here - we'll do that during rendering

                // Extract link
                let link = "#";
                if (item.link) {
                  link =
                    typeof item.link === "string"
                      ? item.link
                      : item.link["@_href"] || item.link[0]?.["@_href"] || "#";
                }

                // Extract date
                let pubDate = new Date().toISOString();
                if (item.pubDate) {
                  pubDate = item.pubDate;
                } else if (item.published) {
                  pubDate = item.published;
                } else if (item.updated) {
                  pubDate = item.updated;
                }

                // Extract author
                let author = source.name;
                if (item["dc:creator"]) {
                  author =
                    typeof item["dc:creator"] === "string"
                      ? item["dc:creator"]
                      : item["dc:creator"]["#text"] || source.name;
                } else if (item.author) {
                  author =
                    typeof item.author === "string"
                      ? item.author
                      : item.author.name ||
                        (typeof item.author["#text"] === "string"
                          ? item.author["#text"]
                          : source.name);
                }

                return {
                  id: `${source.name}-${index}`,
                  Headline: title.substring(0, 150),
                  Content: description,
                  Image: imageUrl, // This might be empty
                  Date: pubDate,
                  Source: author,
                  Url: link,
                  Category: source.category,
                };
              }
            );

            return transformedItems;
          } catch (err) {
            console.error(`Error fetching from ${source.name}:`, err);
            return [];
          }
        });

        // Wait for all fetches to complete
        const results = await Promise.all(fetchPromises);

        // Combine all results
        results.forEach((items) => {
          allItems.push(...items);
        });

        // Sort by date (newest first)
        allItems.sort((a, b) => {
          return new Date(b.Date).getTime() - new Date(a.Date).getTime();
        });

        setItems(allItems);

        if (allItems.length === 0) {
          setItems(getFallbackData());
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch news data"
        );
        // Use fallback mock data in case of error
        setItems(getFallbackData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Handle image error
  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Get the appropriate image source for an item
  const getImageSource = (item: EcoPulseItem) => {
    // If this image previously failed to load, or doesn't have a source, use the fallback
    if (failedImages[item.id] || !item.Image) {
      return getFallbackImage(item.Category);
    }
    return item.Image;
  };

  // Filter items based on active category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.Category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.Headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fallback data based on the partial RSS feed provided
  const getFallbackData = (): EcoPulseItem[] => {
    return [
      {
        id: "1",
        Headline:
          "7 largest reptiles on earth 'six times' larger than a human – from green anaconda to saltwater crocodile",
        Content:
          "Reptiles have existed for millions of years, demonstrating remarkable resilience and adaptations. The seven largest reptiles on Earth play crucial roles in maintaining ecological balance.",
        Image:
          "https://static.toiimg.com/photo/msid-119766346,imgsize-153862.cms",
        Date: "2025-03-31T09:00:00+05:30",
        Source: "TOI Trending Desk",
        Url: "https://timesofindia.indiatimes.com/etimes/trending/7-largest-reptiles-on-earth-six-times-larger-than-a-human-from-green-anaconda-to-saltwater-crocodile/articleshow/119765337.cms",
        Category: "General Environment",
      },
      {
        id: "2",
        Headline:
          "Not 800, green panel nod to shift 691 trees for Kolkata's Joka Metro project",
        Content:
          "The Purple line metro project in Kolkata has received clearance from the Central Empowered Committee to transplant 691 trees on the Maidan.",
        Image:
          "https://static.toiimg.com/photo/msid-119783077,imgsize-171682.cms",
        Date: "2025-03-31T07:10:15+05:30",
        Source: "Ajanta Chakraborty",
        Url: "https://timesofindia.indiatimes.com/city/kolkata/not-800-green-panel-nod-to-shift-691-trees-for-kolkatas-joka-metro-project/articleshow/119783008.cms",
        Category: "General Environment",
      },
      {
        id: "3",
        Headline: "Dynamic management of water resources under scarcity",
        Content:
          "This research demonstrates innovative approaches to managing water resources during periods of scarcity, with applications for drought-prone regions worldwide.",
        Image: "", // Empty to test fallback system
        Date: new Date().toISOString(),
        Source: "Water Resources Research",
        Url: "https://agupubs.onlinelibrary.wiley.com/journal/19447973",
        Category: "Water Resources",
      },
      {
        id: "4",
        Headline: "Advances in Urban Water Management Systems",
        Content:
          "New methodologies for planning and optimizing urban water distribution networks that account for climate change impacts and population growth.",
        Image: "", // Empty to test fallback system
        Date: new Date().toISOString(),
        Source: "Journal of Water Resources Planning and Management",
        Url: "https://ascelibrary.org/journal/jwrmd5",
        Category: "Water Resources",
      },
      {
        id: "5",
        Headline:
          "Microplastics in Freshwater Ecosystems: Detection and Mitigation Strategies",
        Content:
          "Recent developments in detecting and removing microplastic pollution from freshwater sources, with implications for ecosystem and human health.",
        Image: "", // Empty to test fallback system
        Date: new Date().toISOString(),
        Source: "Environmental Science & Technology",
        Url: "https://pubs.acs.org/journal/esthag",
        Category: "Environmental Science",
      },
    ];
  };

  return (
    <div className="transition-colors duration-300 min-h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="mt-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold">
            <span className="text-green-500 dark:text-green-400">Eco</span>
            <span className="text-blue-500 dark:text-blue-400">Pulse</span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
            Environmental & Water Resources News Hub
          </p>
        </div>

        {/* Filter and Search */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
            <p>Using fallback environment news instead.</p>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 gap-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-t border-green-500">
                    <div className="relative h-48">
                      <img
                        src={getImageSource(item)}
                        alt={item.Headline}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(item.id)}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-between items-end">
                        <span className="text-xs font-medium text-white bg-green-600 px-2 py-1 rounded-full">
                          {new Date(item.Date).toLocaleDateString()}
                        </span>
                        <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full">
                          {item.Category}
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
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-xl">No matching articles found.</p>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}
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
            <a
              href="https://www.circleofblue.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
              Circle of Blue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPulse;
