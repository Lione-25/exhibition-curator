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
      return {
        id,
        title: res.data.title,
        artist: res.data.artistDisplayName,
        image: res.data.primaryImageSmall,
        source: "The Met",
      };
    })
  );

  return results;
}
