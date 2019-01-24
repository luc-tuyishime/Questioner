

CREATE TABLE public.comments
(
  id_comment serial PRIMARY KEY,
  id_user integer,
  id_question integer,
  body text
);


CREATE TABLE public.meetup
(
  location character varying(30),
  topic character varying(30),
  happeningon character varying(30),
  tags character varying(30),
  createdon date,
  id_meetup serial PRIMARY KEY
);

CREATE TABLE public.question
(
  id_question serial PRIMARY KEY,
  id_user integer,
  id_meetup integer,
  title character varying(30),
  body character varying(250)
);

CREATE TABLE public.rsvp
(
  response character varying,
  id_user integer,
  id_meetup integer,
  id_rsvp serial PRIMARY KEY
);

CREATE TABLE public.users
(
  username character varying NOT NULL,
  email character varying(255) NOT NULL,
  password character varying NOT NULL,
  firstname character varying(255) NOT NULL,
  lastname character varying(255) NOT NULL,
  isadmin boolean,
  registered date NOT NULL DEFAULT CURRENT_DATE,
  othername character varying(255) NOT NULL,
  user_id serial PRIMARY KEY
);


CREATE TABLE public.votes
(
  id_vote serial PRIMARY KEY,
  id_question integer,
  votes integer
);
