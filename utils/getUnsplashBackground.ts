import { RawUnsplashSettings } from "@/contexts/unsplashSettingsContext";
import * as SecureStore from "expo-secure-store";
import zod from "zod";
import { ofetch } from "ofetch";

export const getUnsplashBackground = async (settings: RawUnsplashSettings) => {
  const accessKey = await SecureStore.getItemAsync("unsplashAccessKey");
  if (!accessKey) {
    throw new Error("Unsplash Access Key not configured");
  }

  const headers = {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${accessKey}`,
  };

  const unsplashImage = zod.object({
    urls: zod.object({
      raw: zod.string(),
    }),
  });

  switch (settings.sourceType) {
    case "topic":
      const getTopicImage = async () => {
        const topicSettings = settings.settings.topic;

        const data = await ofetch<unknown>(
          `https://api.unsplash.com/topics/${topicSettings.topic}/photos`,
          {
            query: {
              per_page: 1,
              order_by: topicSettings.orderBy,
              orientation: topicSettings.orientation,
            },
            headers,
          }
        );

        const result = zod.array(unsplashImage).safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        const image = result.data.at(0)?.urls.raw;

        if (!image) {
          throw new Error("Unsplash response does not contain an image");
        }

        return image;
      };

      return getTopicImage();

    case "search":
      const getSearchImage = async () => {
        const searchSettings = settings.settings.search;
        const data = await ofetch<unknown>(
          "https://api.unsplash.com/search/photos",
          {
            query: {
              query: searchSettings.query,
              per_page: 1,
              order_by: searchSettings.orderBy,
              collections: searchSettings.collections,
              color:
                searchSettings.color === "all"
                  ? undefined
                  : searchSettings.color,
              orientation: searchSettings.orientation,
            },
            headers,
          }
        );

        const result = zod
          .object({
            results: zod.array(unsplashImage),
          })
          .safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        return result.data.results.at(0)?.urls.raw;
      };

      return getSearchImage();
    case "collections":
      const getCollectionImage = async () => {
        const collectionSettings = settings.settings.collections;
        const data = await ofetch<unknown>(
          `https://api.unsplash.com/collections/${collectionSettings.collectionId}/photos`,
          {
            query: {
              per_page: 1,
              orientation: collectionSettings.orientation,
            },
            headers,
          }
        );

        const result = zod.array(unsplashImage).safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        return result.data.at(0)?.urls.raw;
      };

      return getCollectionImage();
    case "user":
      const getUserImage = async () => {
        const userSettings = settings.settings.user;
        const data = await ofetch<unknown>(
          `https://api.unsplash.com/users/${userSettings.username}/photos`,
          {
            query: {
              per_page: 1,
              order_by: userSettings.orderBy,
              orientation: userSettings.orientation,
            },
            headers,
          }
        );

        const result = zod.array(unsplashImage).safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        return result.data.at(0)?.urls.raw;
      };

      return getUserImage();
    case "random":
      const getRandomImage = async () => {
        const randomSettings = settings.settings.random;
        const data = await ofetch<unknown>(
          "https://api.unsplash.com/photos/random",
          {
            query: {
              collections: randomSettings.collections,
              topics: randomSettings.topics,
              username: randomSettings.username,
              query: randomSettings.query,
              orientation: randomSettings.orientation,
            },
            headers,
          }
        );

        const result = unsplashImage.safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        return result.data.urls.raw;
      };

      return getRandomImage();
    case "photo":
      const getPhotoImage = async () => {
        const photoSettings = settings.settings.photo;
        const data = await ofetch<unknown>(
          `https://api.unsplash.com/photos/${photoSettings.photoId}`,
          {
            headers,
          }
        );

        const result = unsplashImage.safeParse(data);

        if (!result.success) {
          throw new Error("Invalid Unsplash response");
        }

        return result.data.urls.raw;
      };

      return getPhotoImage();
  }
};
