import axios from "axios";

const BASE_URL = "https://collection.sciencemuseumgroup.org.uk";

/**
 * Step 1: Search for items across all categories (objects, people, documents)
 * Returns an array of { id, type, link }
 */
export async function searchScienceMuseum(
  query: string,
  page = 0,
  pageSize = 50
): Promise<{ id: string; type: string; link: string }[]> {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(
    query
  )}&page[number]=${page}&page[size]=${pageSize}`;

  const { data } = await axios.get(url);

  if (!data?.data) return [];

  return data.data.map((item: any) => ({
    id: item.id,
    type: item.type,
    link: item.links?.self,
  }));
}

/**
 * Step 2: Given a list of items (with type + id), fetch their details
 * Returns simplified objects with basic info (title/name, type, image, etc.)
 */
export async function fetchScienceMuseumItems(
  items: { id: string; type: string }[]
) {
  const results = await Promise.all(
    items.map(async (item) => {
      try {
        const res = await axios.get(`${BASE_URL}/${item.type}/${item.id}`);
        const data = res.data;

        const attributes = data?.data?.attributes ?? {};
        const title =
          attributes.title ||
          attributes.name ||
          attributes.summary_title ||
          "Untitled";

        const image =
          attributes.multimedia?.[0]?.processed?.medium?.location ||
          attributes?.default_image ||
          null;

        return {
          id: item.id,
          type: item.type,
          title,
          image,
          link: `${BASE_URL}/${item.type}/${item.id}`,
          source: "Science Museum Group",
        };
      } catch (err) {
        console.error(`Failed to fetch ${item.type}/${item.id}:`, err);
        return null;
      }
    })
  );

  return results.filter(Boolean);
}
