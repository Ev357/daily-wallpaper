import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { SourceSettings } from "@/contexts/sourceContext";
import type { RawUnsplashSettings } from "@/contexts/unsplashSettingsContext";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  settings: text("settings", { mode: "json" })
    .notNull()
    .$type<Exclude<SourceSettings, "isValid" | "touchAll">>(),
  source: text("source", { enum: ["unsplash", "facebook"] }).notNull(),
  sourceSettings: text("sourceSettings", { mode: "json" })
    .notNull()
    .$type<RawUnsplashSettings>(),
});
