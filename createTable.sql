
CREATE TABLE "user"
(
  id integer NOT NULL,
  login character varying(80),
  password character varying(80),
  CONSTRAINT primary_key PRIMARY KEY (id)
);


CREATE TABLE patient_profile
(
  name character varying(80),
  tree text,
  id integer NOT NULL,
  CONSTRAINT "Primary_key_patient_profile" PRIMARY KEY (id)
);

CREATE TABLE workday_conf
(
  id integer NOT NULL,
  tree text,
  user_id integer,
  CONSTRAINT workday_conf_pkey PRIMARY KEY (id),
  CONSTRAINT fk_workdayconf_userid FOREIGN KEY (user_id)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);