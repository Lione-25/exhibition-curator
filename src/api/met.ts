import axios from "axios";

// Fetch from The Met Museum API
export async function fetchMetArt(query: string) {
  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
  const { data } = await axios.get(searchUrl);

  if (!data.objectIDs) return [];

  // Just grab first 10 results
  const ids = data.objectIDs.slice(0, 10);

  const results = await Promise.all(
    ids.map(async (id: number) => {
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
