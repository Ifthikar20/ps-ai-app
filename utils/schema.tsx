import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const AIOutput = sqliteTable("aiOutput", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formData: text("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: text("templateSlug").notNull(),
  createdBy: text("createdBy").notNull(),
  createdAt: text("createdAt"),
});