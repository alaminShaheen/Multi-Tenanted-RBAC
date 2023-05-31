import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	primaryKey,
	uniqueIndex,
	text,
} from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 256 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		email: varchar("email", { length: 256 }).notNull(),
		applicationId: uuid("application_id").references(() => applications.id),
		password: varchar("password", { length: 256 }).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(users) => {
		return {
			cpk: primaryKey(users.email, users.applicationId),
			idIndex: uniqueIndex("users_id_index").on(users.id),
		};
	}
);

export const roles = pgTable(
	"roles",
	{
		id: uuid("id").defaultRandom().notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		applicationId: uuid("application_id").references(() => applications.id),
		permissions: text("permissions").array().$type<string[]>(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(roles) => {
		return {
			cpk: primaryKey(roles.name, roles.applicationId),
			idIndex: uniqueIndex("roles_id_index").on(roles.id),
		};
	}
);
