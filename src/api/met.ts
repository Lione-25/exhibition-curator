import axios from "axios";

export async function fetchMetArt(query: string, page = 1, pageSize = 10) {
  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
  const { data } = await axios.get(searchUrl);

  if (!data.objectIDs) return { results: [], total: 0 };

  const start = (page - 1) * pageSize;
  const ids = data.objectIDs.slice(start, start + pageSize);

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

  return { results, total: data.total };
}
