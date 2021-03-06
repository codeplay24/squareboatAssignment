PGDMP     %    1                y         
   squareboat    13.2    13.2      ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    58376 
   squareboat    DATABASE     n   CREATE DATABASE squareboat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE squareboat;
                postgres    false            ?            1259    58396 	   candidate    TABLE     ?   CREATE TABLE public.candidate (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.candidate;
       public         heap    postgres    false            ?            1259    58394    candidate_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.candidate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.candidate_id_seq;
       public          postgres    false    203            ?           0    0    candidate_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.candidate_id_seq OWNED BY public.candidate.id;
          public          postgres    false    202            ?            1259    58426    jobs    TABLE     ?   CREATE TABLE public.jobs (
    id integer NOT NULL,
    title character varying,
    description character varying,
    "recruiterId" integer,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.jobs;
       public         heap    postgres    false            ?            1259    58437    jobs2candidate    TABLE     ?   CREATE TABLE public.jobs2candidate (
    id integer NOT NULL,
    "jobId" integer NOT NULL,
    "candidateId" integer NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
 "   DROP TABLE public.jobs2candidate;
       public         heap    postgres    false            ?            1259    58435    jobs2candidate_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.jobs2candidate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.jobs2candidate_id_seq;
       public          postgres    false    207            ?           0    0    jobs2candidate_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.jobs2candidate_id_seq OWNED BY public.jobs2candidate.id;
          public          postgres    false    206            ?            1259    58424    jobs_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.jobs_id_seq;
       public          postgres    false    205            ?           0    0    jobs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;
          public          postgres    false    204            ?            1259    58385 	   recruiter    TABLE     ?   CREATE TABLE public.recruiter (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.recruiter;
       public         heap    postgres    false            ?            1259    58383    recruiter_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.recruiter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.recruiter_id_seq;
       public          postgres    false    201            ?           0    0    recruiter_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.recruiter_id_seq OWNED BY public.recruiter.id;
          public          postgres    false    200            8           2604    58399    candidate id    DEFAULT     l   ALTER TABLE ONLY public.candidate ALTER COLUMN id SET DEFAULT nextval('public.candidate_id_seq'::regclass);
 ;   ALTER TABLE public.candidate ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            9           2604    58429    jobs id    DEFAULT     b   ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);
 6   ALTER TABLE public.jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            :           2604    58440    jobs2candidate id    DEFAULT     v   ALTER TABLE ONLY public.jobs2candidate ALTER COLUMN id SET DEFAULT nextval('public.jobs2candidate_id_seq'::regclass);
 @   ALTER TABLE public.jobs2candidate ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            7           2604    58388    recruiter id    DEFAULT     l   ALTER TABLE ONLY public.recruiter ALTER COLUMN id SET DEFAULT nextval('public.recruiter_id_seq'::regclass);
 ;   ALTER TABLE public.recruiter ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            ?          0    58396 	   candidate 
   TABLE DATA           X   COPY public.candidate (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    203   E"       ?          0    58426    jobs 
   TABLE DATA           _   COPY public.jobs (id, title, description, "recruiterId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    205   ?"       ?          0    58437    jobs2candidate 
   TABLE DATA           ^   COPY public.jobs2candidate (id, "jobId", "candidateId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    207   ?*       ?          0    58385 	   recruiter 
   TABLE DATA           X   COPY public.recruiter (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    201   ^+       ?           0    0    candidate_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.candidate_id_seq', 13, true);
          public          postgres    false    202            ?           0    0    jobs2candidate_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.jobs2candidate_id_seq', 48, true);
          public          postgres    false    206            ?           0    0    jobs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.jobs_id_seq', 18, true);
          public          postgres    false    204            ?           0    0    recruiter_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.recruiter_id_seq', 7, true);
          public          postgres    false    200            >           2606    58404    candidate candidate_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.candidate DROP CONSTRAINT candidate_pkey;
       public            postgres    false    203            B           2606    58442 "   jobs2candidate jobs2candidate_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.jobs2candidate
    ADD CONSTRAINT jobs2candidate_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.jobs2candidate DROP CONSTRAINT jobs2candidate_pkey;
       public            postgres    false    207            @           2606    58434    jobs jobs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.jobs DROP CONSTRAINT jobs_pkey;
       public            postgres    false    205            <           2606    58393    recruiter recruiter_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.recruiter DROP CONSTRAINT recruiter_pkey;
       public            postgres    false    201            ?   ?   x???A
? ??x
/??SB?9H7?54JMDIKo_#-??????(ye?????'$bźS׎??B+r?H?yV" ??M?iº?0?)?o?|9ۖf
??L??*???!/c=?xZ?z!?<?ON      ?   	  x??X?n7}???ƶ?ػ??{???BFX#???]3M?M?I???O??<.???%9U잋.?z??&?U?N?*?????!_?sZ???R:?r!?X?R??Vո?????͍J?%???g?H??`???_C?6?w??HuѶ:Z7?H?>?ʑX?m??%????ˋ?t1??????tN??H?N?X?????]?q_?f=???^k??-mB?Q?ސ:???`??X?[?	^????^?????Cn?WU?U?׀I?B?U?k?)?q>:,Մ???H?F????}?|??ӤB?%5u؀W^?ǓZ??!???NO?-?(q??U??????~??DI?-2?V?as??F????V?&?6I5x??d##?T?+?'??Y?????eA?J??IN!`uꇽ<O|`ߴУsa?_%0???????g???٥:s??ե?ym?!?\5v??Όfj??m.?)?!?5^7:+A:?s?Rf???|?=?І?.-`?:?3?H0?E`?7z??^?N???8~????d??ɋ???=?Mf?WO?F"o??|`}9=p~_~??0??;??????ꔭQ?
`V?['D?P?t?!?ۺHC??J??.??؍???{ҥ^???c???.??79?Յ =G¢R>??^1?{?>F
F(???{??N߀YDR?Dh59?pN*??e????zc?f????V?,s.??Oq?#pl??@??J?ꫡ??????ށ?~!m?"
(v?X_???Y傹1????O;V#?#{2f?]?7?????]?)?a~?Oa???:?????G????Wr\??'????z??3????k????OZgk??ڟ????4	???Q?Y?? ?'N?Y??ۈb??{11?B+?m &	
?(2imiS?F??L?k?e???oT;?Vk?L?uFI?؋?ᅉC??*???僓wu?ӂ#????w2Ka?7:?^ڮ&2O?冥?:Gp?g???z?????E2Z-??){??&2??.j)FW???Q???c??1?U?z)n,kCe}!??fw#A???]????}(G?H?4??^c?h>??Ɠ?+???w???v?Beri.ud??Ί5????IW?4???Q?I jU8cz*=?(P??F?ͽ@????2/h? ;Aq`|m?f5????6]?qm2?I?cHEL??q??Ko?	?W?[?R?A?l???l>???L|?c??L???g&𠭠??ś??Xp??-???#F??BC_?E?ٲ={O?K?-???e?7??w?????I?醓?|5?vDV??+l#8??6?6{??/'?'R?j??	?9[?G??gE?>ەj?%?S_??6??C?"?I;?q??v????R????I??7???7g?h?AZ/x~B??
??p]?????$??,?L(?g???e??Kyz.3qs???X ??>x%r???????? ???:???A]??4??ݝ̅j??O=??`?%}?S?Bs2:a?{زx???0+Am?(
W4!R?~?;+?[ޝ????(??	%???K?y?????5?j???y?*????4?AU??<??t?#)4? ?????㔉2l???ɉ=5?As????0?,?cq??e???D?殱Ԟ??h????;??=cBt?	a??0N6nEb#????C?????e[L?v:$c?!???;??K??{2?3Y???@l7VH"0D?h?W??U>Z K?گ?׎nه?|<??;*??z/??*@\d?C?)???_8?Y?dB?l?J?m{?ݗ??ZrǾk??q|>T?ҖP??j?sݖ?od?P	?tZ?????)#?)q?H{?"??K	??????|??©sb????6^L???e??%????A?Ᾰ??2???A??*mP],??Ix?p?LV<[?EtvYШ??@???;?~K*?~???%?2t????)??x????]???ލ\7?ŝ?4>?B~??<??N ?+??p?L??$??d????HG?3)?A?_??p?`??>???R?a
?h[?A`Dg?G?????'O?$?|      ?   _   x?}?A? ?3????????E{?eI8??Y?u?UC????Z?!??? ^8?%??[,n	cg;?Q??H8τ??=???	?yRa?\??L?D      ?   ?   x?3??MM??KTN,?N,????s3s???s??FF????FFHL.΢Ĭ?????&?]?)gPbFi?BpFbQn"P1?C?f3???ԒD??ļ??J?b?h?????%?9
A??P&?zc???? ??V?     