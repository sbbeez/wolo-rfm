CREATE TABLE project (
  id integer PRIMARY KEY NOT NULL,
  name varchar(100) NOT NULL,
  description varchar(100),
  created_by varchar(100),
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
CREATE TABLE environment (
  id integer PRIMARY KEY NOT NULL,
  project_id integer NOT NULL,
  name varchar(100) NOT NULL,
  key varchar(100) NOT NULL,
  description varchar(100),
  created_by varchar(100),
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
CREATE TABLE feature (
  id integer PRIMARY KEY NOT NULL,
  project_id integer NOT NULL,
  environment_id integer NOT NULL,
  name varchar(100) NOT NULL,
  key varchar(100) NOT NULL,
  description varchar(100),
  created_by varchar(100),
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
CREATE TABLE version_type (
  id integer PRIMARY KEY NOT NULL,
  type varchar(100) NOT NULL,
  description varchar(100),
  is_enabled integer NOT NULL,
  created_by varchar(100),
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
CREATE TABLE version (
  id integer PRIMARY KEY NOT NULL,
  key varchar(100) NOT NULL,
  version_type_id integer NOT NULL,
  feature_id integer NOT NULL,
  description varchar(100),
  created_by varchar(100),
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
CREATE TABLE feature_version (
  id integer PRIMARY KEY NOT NULL,
  created_by varchar(100),
  version_id integer NOT NULL,
  feature_id integer NOT NULL,
  created timestamp,
  last_modified timestamp,
  last_modified_by varchar(100),
  deleted timestamp,
  deleted_by varchar(100)
);
ALTER TABLE "environment"
ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");
ALTER TABLE "feature"
ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");
ALTER TABLE "feature"
ADD FOREIGN KEY ("environment_id") REFERENCES "environment" ("id");
ALTER TABLE "version"
ADD FOREIGN KEY ("version_type_id") REFERENCES "version_type" ("id");
ALTER TABLE "version"
ADD FOREIGN KEY ("feature_id") REFERENCES "feature" ("id");
ALTER TABLE "feature_version"
ADD FOREIGN KEY ("version_id") REFERENCES "version" ("id");
ALTER TABLE "feature_version"
ADD FOREIGN KEY ("feature_id") REFERENCES "feature" ("id");
CREATE INDEX "fkIdx_36" ON "environment" ("project_id");
CREATE INDEX "fkIdx_77" ON "feature" ("project_id");
CREATE INDEX "fkIdx_84" ON "feature" ("environment_id");
CREATE INDEX "fkIdx_114" ON "version" ("version_type_id");
CREATE INDEX "fkIdx_99" ON "version" ("feature_id");
CREATE INDEX "fkIdx_128" ON "feature_version" ("feature_id");
CREATE INDEX "fkIdx_131" ON "feature_version" ("version_id");