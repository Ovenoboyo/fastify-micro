import { Database } from "./database";
import { InMemoryRetention } from "./database/memory";

export const database: Database = new InMemoryRetention()
