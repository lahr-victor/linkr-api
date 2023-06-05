--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "postId" integer NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    url text NOT NULL,
    description text,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    photo text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (19, 'WelcomeToMyNightmare', '2023-06-05 01:12:10.445575-03', 26);
INSERT INTO public.hashtags VALUES (20, 'ImYourBoyfriendNowNancy', '2023-06-05 01:12:10.448489-03', 26);
INSERT INTO public.hashtags VALUES (23, 'KillKillKillHaHaHa', '2023-06-05 01:17:13.764429-03', 28);
INSERT INTO public.hashtags VALUES (24, 'ChhChhChhAhAhAh', '2023-06-05 01:17:13.765658-03', 28);
INSERT INTO public.hashtags VALUES (27, 'WelcomeToMyNightmare', '2023-06-05 01:20:43.036262-03', 30);
INSERT INTO public.hashtags VALUES (28, 'FreddysComingForYou', '2023-06-05 01:20:43.037484-03', 30);
INSERT INTO public.hashtags VALUES (31, 'TheNightHeCameHome', '2023-06-05 01:26:46.045369-03', 32);
INSERT INTO public.hashtags VALUES (32, 'EvilNeverDies', '2023-06-05 01:26:46.047781-03', 32);
INSERT INTO public.hashtags VALUES (33, 'TheDevilsEyes', '2023-06-05 01:26:46.049265-03', 32);
INSERT INTO public.hashtags VALUES (37, 'TheSawIsFamily', '2023-06-05 01:30:47.310392-03', 34);
INSERT INTO public.hashtags VALUES (38, 'TheFamilyThatSlaysTogether', '2023-06-05 01:30:47.31214-03', 34);
INSERT INTO public.hashtags VALUES (39, 'IWillStayAndBeBeautiful', '2023-06-05 01:30:47.313182-03', 34);
INSERT INTO public.hashtags VALUES (46, 'WannaPlay', '2023-06-05 01:34:12.918001-03', 37);
INSERT INTO public.hashtags VALUES (47, 'WellTearYourSoulApart', '2023-06-05 01:36:08.222623-03', 38);
INSERT INTO public.hashtags VALUES (51, 'IWillStayAndBeBeautiful', '2023-06-05 01:53:51.657954-03', 40);
INSERT INTO public.hashtags VALUES (52, 'WannaPlay', '2023-06-05 01:55:46.753811-03', 41);
INSERT INTO public.hashtags VALUES (53, 'IllBeBackIAlwaysComeBack', '2023-06-05 01:55:46.755411-03', 41);
INSERT INTO public.hashtags VALUES (54, 'WellTearYourSoulApart', '2023-06-05 01:56:35.203462-03', 42);
INSERT INTO public.hashtags VALUES (55, 'YourSufferingWillBeLegendary', '2023-06-05 01:56:35.204928-03', 42);
INSERT INTO public.hashtags VALUES (56, 'TheNightHeCameHome', '2023-06-05 01:57:37.954885-03', 43);
INSERT INTO public.hashtags VALUES (57, 'EvilNeverDies', '2023-06-05 01:57:37.956175-03', 43);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (24, 42, 6);
INSERT INTO public.likes VALUES (25, 40, 6);
INSERT INTO public.likes VALUES (26, 34, 6);
INSERT INTO public.likes VALUES (27, 28, 6);
INSERT INTO public.likes VALUES (28, 43, 4);
INSERT INTO public.likes VALUES (29, 42, 4);
INSERT INTO public.likes VALUES (30, 41, 4);
INSERT INTO public.likes VALUES (31, 40, 4);
INSERT INTO public.likes VALUES (32, 38, 4);
INSERT INTO public.likes VALUES (33, 37, 4);
INSERT INTO public.likes VALUES (34, 34, 4);
INSERT INTO public.likes VALUES (35, 32, 4);
INSERT INTO public.likes VALUES (36, 28, 4);
INSERT INTO public.likes VALUES (37, 32, 5);
INSERT INTO public.likes VALUES (38, 43, 5);
INSERT INTO public.likes VALUES (39, 43, 9);
INSERT INTO public.likes VALUES (40, 42, 9);
INSERT INTO public.likes VALUES (41, 40, 9);
INSERT INTO public.likes VALUES (42, 38, 9);
INSERT INTO public.likes VALUES (43, 34, 9);
INSERT INTO public.likes VALUES (44, 32, 9);
INSERT INTO public.likes VALUES (45, 30, 9);
INSERT INTO public.likes VALUES (46, 28, 9);
INSERT INTO public.likes VALUES (47, 26, 9);
INSERT INTO public.likes VALUES (48, 41, 8);
INSERT INTO public.likes VALUES (49, 37, 8);
INSERT INTO public.likes VALUES (52, 38, 3);
INSERT INTO public.likes VALUES (53, 30, 3);
INSERT INTO public.likes VALUES (54, 26, 3);
INSERT INTO public.likes VALUES (55, 32, 3);
INSERT INTO public.likes VALUES (56, 40, 3);
INSERT INTO public.likes VALUES (57, 43, 3);
INSERT INTO public.likes VALUES (58, 28, 3);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (26, 'https://www.imdb.com/title/tt0087800/?ref_=ext_shr_lnk', '#WelcomeToMyNightmare #ImYourBoyfriendNowNancy', 4, '2023-06-05 01:12:10.441667-03');
INSERT INTO public.posts VALUES (28, 'https://www.imdb.com/title/tt0080761/?ref_=ext_shr_lnk', '#KillKillKillHaHaHa #ChhChhChhAhAhAh', 5, '2023-06-05 01:17:13.762554-03');
INSERT INTO public.posts VALUES (30, 'https://www.imdb.com/title/tt0093629/?ref_=ext_shr_lnk', '#WelcomeToMyNightmare #FreddysComingForYou', 4, '2023-06-05 01:20:43.034387-03');
INSERT INTO public.posts VALUES (32, 'https://www.imdb.com/title/tt1502407/?ref_=ext_shr_lnk', '#TheNightHeCameHome #EvilNeverDies #TheDevilsEyes', 6, '2023-06-05 01:26:46.043113-03');
INSERT INTO public.posts VALUES (34, 'https://www.imdb.com/title/tt0072271/?ref_=ext_shr_lnk', '#TheSawIsFamily #TheFamilyThatSlaysTogether #IWillStayAndBeBeautiful', 8, '2023-06-05 01:30:47.306157-03');
INSERT INTO public.posts VALUES (37, 'https://www.imdb.com/title/tt8388390/?ref_=ext_shr_lnk', '#WannaPlay', 9, '2023-06-05 01:34:12.916259-03');
INSERT INTO public.posts VALUES (38, 'https://www.imdb.com/title/tt0093177/?ref_=ext_shr_lnk', '#WellTearYourSoulApart', 10, '2023-06-05 01:36:08.220898-03');
INSERT INTO public.posts VALUES (40, 'https://www.imdb.com/title/tt0324216/?ref_=ext_shr_lnk', '#IWillStayAndBeBeautiful', 8, '2023-06-05 01:53:51.654926-03');
INSERT INTO public.posts VALUES (41, 'https://www.imdb.com/title/tt0094862/?ref_=ext_shr_lnk', '#WannaPlay #IllBeBackIAlwaysComeBack', 9, '2023-06-05 01:55:46.751607-03');
INSERT INTO public.posts VALUES (42, 'https://www.imdb.com/title/tt0095294/?ref_=ext_shr_lnk', '#WellTearYourSoulApart #YourSufferingWillBeLegendary', 10, '2023-06-05 01:56:35.20118-03');
INSERT INTO public.posts VALUES (43, 'https://www.imdb.com/title/tt0077651/?ref_=ext_shr_lnk', '#TheNightHeCameHome #EvilNeverDies', 6, '2023-06-05 01:57:37.953142-03');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (3, 'Victor Lahr', 'https://noticiasdatv.uol.com.br/media/_versions/artigos_2021/o-exorcista-1973-linda-blair-warner-bros_fixed_large.jpg', 'lahr.victor@gmail.com', '$2b$10$0dPH2PMUVdmX5ux9ab25MuVm1s2gCx1XFZwkXl.Jxi1/890sQysCO');
INSERT INTO public.users VALUES (4, 'Freddy Krueger', 'https://rollingstone.uol.com.br/media/uploads/2023/05/freddy-krueger-personagem-ator-robert-englund-foto-divulgacao.jpg', 'freddy.krueger@gmail.com', '$2b$10$zeK.qOX/oTURbm4Thsb9iuUk9HDke/53p0YHc6s5opJKWVp.VKn6W');
INSERT INTO public.users VALUES (5, 'Jason Voorhees', 'https://cinevicio.com.br/wp-content/uploads/2022/11/image-1-20.jpg', 'jason.voorhess@gmail.com', '$2b$10$AYVLTWtBEvaxEt9jqMb2y.yc39xqO.RkN51dBpFJCoUjwcrakzDX2');
INSERT INTO public.users VALUES (6, 'Michael Myers', 'https://pbs.twimg.com/profile_images/1607454917244981249/hixabtds_400x400.jpg', 'michael.myers@gmail.com', '$2b$10$vqV2F.ujx6f0vHp5Dyq4Hu91Cp.bZ8gn6owTXVoUam8Fxmy531a9.');
INSERT INTO public.users VALUES (8, 'Leatherface', 'https://upload.wikimedia.org/wikipedia/en/9/94/Leatherface%2C_The_Texas_Chain_Saw_Massacre%2C_1974%2C_Colorized.jpg', 'leatherface@gmail.com', '$2b$10$BbhSzQB4WUYfJfbXz9BXWuufN5isEiBUuLadPMYk3ZmvMriRh7ySq');
INSERT INTO public.users VALUES (9, 'Chucky', 'https://uploads.jovemnerd.com.br/wp-content/uploads/2022/10/chucky_segunda_temporada_estreia__x64bel-1210x544.jpg', 'chucky@gmail.com', '$2b$10$Dj21v9CeZ6hh5FLMk68T8eeGKaY4FMqv6on32nsGY7jeiBt5EwSMm');
INSERT INTO public.users VALUES (10, 'Pinhead', 'https://1.bp.blogspot.com/-TUOnC0pk3EQ/YX6nN78CuGI/AAAAAAAALIE/0Qc20jAkfMAgArcV_DYAx7URi0Mo_yrLACLcBGAsYHQ/s540/pinhead%2Bhellraiser.jpg', 'pinhead@gmail.com', '$2b$10$3VMMsfgCrqQqogNovvA98OOqMWFh3JZFe1coxixHsvL7WcO0sDGXO');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 57, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 58, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 43, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: likes likes_postId_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_userId_key" UNIQUE ("postId", "userId");


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fki_likes_postId_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "fki_likes_postId_fkey" ON public.likes USING btree ("postId");


--
-- Name: hashtags_fk; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX hashtags_fk ON public.hashtags USING btree ("postId");


--
-- Name: hashtags hashtags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT "hashtags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE NOT VALID;


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

