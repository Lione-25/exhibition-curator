import axios from "axios";

// Step 1: Search once, get all IDs
export async function searchMetArt(query: string): Promise<number[]> {
  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
  const { data } = await axios.get(searchUrl);
  return data.objectIDs ?? [];
}

// Step 2: Given IDs, fetch a single "page"
export async function fetchMetObjects(
  ids: number[],
  page: number,
  pageSize: number
) {
  const start = (page - 1) * pageSize;
  const slice = ids.slice(start, start + pageSize);

  const results = await Promise.all(
    slice.map(async (id: number) => {
      const res = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      const data = res.data;
      console.log(data);
      // Build a description from available fields
      const description =
        data.description ||
        [data.objectName, data.culture, data.period, data.medium]
          .filter(Boolean)
          .join(", ") ||
        "No description available";

      return {
        id,
        title: data.title || "Untitled",
        artist: data.artistDisplayName || "Unknown Artist",
        image: data.primaryImageSmall || data.primaryImage || null,
        largeImage: data.primaryImage || null,
        link: data.objectURL, // link to view on the Met website
        description,
        location: data.repository
          ? `📍 ${data.repository}${
              data.GalleryNumber ? `, Gallery ${data.GalleryNumber}` : ""
            }`
          : "Location Unknown",
        source: "The Metropolitan Museum of Art Collection",
      };
    })
  );

  return results;
}
