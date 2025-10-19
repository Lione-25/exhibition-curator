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

  const { data } = await axios.get(url, {
    headers: { Accept: "application/json" },
  });

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
export async function fetchScienceMuseumObjects(
  items: { id: string; type: string }[]
) {
  const results = await Promise.all(
    items.map(async (item) => {
      try {
        const res = await axios.get(`${BASE_URL}/${item.type}/${item.id}`, {
          headers: { Accept: "application/json" },
        });
        const data = res.data;

        const attributes = data?.data?.attributes ?? {};

        console.log("attributes=", attributes);

        const title = Array.isArray(attributes.title)
          ? attributes.title[0]?.value || "Untitled"
          : "Untitled";

        const image =
          attributes.multimedia?.[0]?.["@processed"]?.medium?.location ||
          attributes?.default_image ||
          null;

        const largeImage =
          attributes.multimedia?.[0]?.["@processed"]?.large?.location ||
          attributes?.default_image ||
          null;

        let artist =
          attributes.ceation?.maker?.[0]?.summary?.title ||
          attributes.creation?.maker?.[0]?.name?.[0]?.value ||
          "Unknown Maker";
        if (artist === "Unknown maker") {
          artist = "Unknown Maker";
        }

        interface DescriptionItem {
          type: string;
          value: string;
          primary?: boolean;
        }

        let description = "No description available";

        if (Array.isArray(attributes.description)) {
          const descs = attributes.description as DescriptionItem[];
          description =
            descs.find((d) => d.type === "web description")?.value ||
            descs.find((d) => d.primary)?.value ||
            description;
        }

        return {
          id: item.id,
          type: item.type,
          title,
          image,
          largeImage,
          artist,
          description,
          link: `${BASE_URL}/${item.type}/${item.id}`,
          source: "Science Museum Group",
        };
      } catch (err) {
        console.error(`Failed to fetch ${item.type}/${item.id}:`, err);
        return null;
      }
    })
  );
  console.log(results);
  return results.filter(Boolean);
}
