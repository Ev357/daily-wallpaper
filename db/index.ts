import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "@/db/schema";

const expoDb = openDatabaseSync("db.db", { enableChangeListener: true });
export const db = drizzle(expoDb, { schema });
