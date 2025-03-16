CREATE TABLE "study_material" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"courseType" varchar NOT NULL,
	"topic" varchar NOT NULL,
	"difficultyLevel" varchar DEFAULT 'Easy',
	"courseLayout" json,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"isMember" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
