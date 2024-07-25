import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { SourceSettings } from "@/contexts/sourceContext";
import type {
  SourceType as UnsplashSourceType,
  UnsplashColor,
  UnsplashOrientation,
} from "@/contexts/unsplashSettingsContext";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  settings: text("settings", { mode: "json" })
    .notNull()
    .$type<Exclude<SourceSettings, "isValid" | "touchAll">>(),
  source: text("source", { enum: ["unsplash", "facebook"] }).notNull(),
  sourceSettings: text("sourceSettings", { mode: "json" }).notNull().$type<{
    sourceType: UnsplashSourceType;
    settings: {
      topic: {
        topic: string;
        orderBy: "popular" | "latest" | "oldest";
        orientation: UnsplashOrientation;
      };
      search: {
        query: string;
        orderBy: "latest" | "relevant";
        collections: string | undefined;
        color: UnsplashColor;
        orientation: "portrait" | "landscape" | "all";
      };
      collections: {
        collectionId: string;
        orientation: UnsplashOrientation;
      };
      user: {
        username: string;
        orderBy: "popular" | "latest" | "views" | "downloads" | "oldest";
        orientation: UnsplashOrientation;
      };
      random: {
        collections: string | undefined;
        topics: string | undefined;
        username: string | undefined;
        query: string | undefined;
        orientation: UnsplashOrientation;
      };
      photo: {
        photoId: string;
      };
    };
  }>(),
});
