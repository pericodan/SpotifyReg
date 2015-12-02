CREATE TABLE user_profile(
	username	varchar(20) PRIMARY KEY,
	profile_number	serial UNIQUE,
	user_password	varchar(20) NOT NULL,
	name		varchar(30) NOT NULL,
	email		varchar
);

CREATE TABLE admin(
	admin_id	serial PRIMARY KEY,
	username	varchar(20) NOT NULL REFERENCES user_profile(username) ON UPDATE CASCADE ON DELETE CASCADE,
	authentication_code	serial NOT NULL UNIQUE
);

CREATE TABLE non_admin(
	non_admin_id	serial PRIMARY KEY,
	username	varchar(20) REFERENCES user_profile(username) ON UPDATE CASCADE ON DELETE CASCADE,
	approved_date date,
	admin_id	integer REFERENCES admin(admin_id) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE playlist(
	playlist_number	serial PRIMARY KEY,
	playlist_title 	varchar(20) NOT NULL,
	user_name 	varchar(20) REFERENCES user_profile(username) ON UPDATE CASCADE ON DELETE CASCADE		
);

CREATE TABLE playlist_genre(
	playlist_number	integer REFERENCES playlist(playlist_number) ON UPDATE CASCADE ON DELETE CASCADE,
	playlist_genre	varchar(20) NOT NULL,
	
	CONSTRAINT number_genre PRIMARY KEY (playlist_number, playlist_genre)
);

CREATE TABLE artist(
	artist_number	serial PRIMARY KEY,
	artist_name	varchar(20) NOT NULL
);

CREATE TABLE song(
	song_number	serial PRIMARY KEY,
	song_title	varchar(20) NOT NULL,
	times_played int default 0,
	

);

CREATE TABLE recommendations(
	song_number	integer REFERENCES song(song_number) ON UPDATE CASCADE ON DELETE CASCADE,
	username	varchar(20) NOT NULL REFERENCES user_profile(username) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT recommendation PRIMARY KEY (song_number, username)

);

CREATE TABLE song_genre(
	song_number	integer REFERENCES song(song_number) ON UPDATE CASCADE ON DELETE CASCADE,
	genre		varchar(20) NOT NULL,
	
	CONSTRAINT song_number_genre PRIMARY KEY (song_number, genre)
);

CREATE TABLE album(
	album_number	serial PRIMARY KEY,
	album_title	varchar(20) NOT NULL
);

CREATE TABLE create_song(
	artist_number	integer REFERENCES artist(artist_number) ON UPDATE CASCADE ON DELETE CASCADE,
	song_number	integer REFERENCES song(song_number) ON UPDATE CASCADE ON DELETE CASCADE,
	
	CONSTRAINT artist_song_number PRIMARY KEY (artist_number, song_number)
);

CREATE TABLE includes(
	song_number	integer REFERENCES song(song_number) ON UPDATE CASCADE ON DELETE CASCADE,
	artist_number	integer REFERENCES artist(artist_number) ON UPDATE CASCADE ON DELETE CASCADE,
	album_number	integer REFERENCES album(album_number) ON UPDATE CASCADE ON DELETE CASCADE,
	
	CONSTRAINT includes_pk PRIMARY KEY (song_number, artist_number, album_number)
);

CREATE TABLE belongs_in1(
	artist_number	integer REFERENCES artist(artist_number) ON UPDATE CASCADE ON DELETE CASCADE,
	song_number	integer REFERENCES song(song_number) ON UPDATE CASCADE ON DELETE CASCADE,
	playlist_number	integer REFERENCES playlist(playlist_number) ON UPDATE CASCADE ON DELETE CASCADE,
	
	CONSTRAINT belongs_in1_pk PRIMARY KEY (artist_number, song_number, playlist_number)
);


	




insert into song(song_title) values('Bad Blood');
insert into song_genre(song_number, genre) values ((select song_number from song where song_title='Bad Blood'), 'Pop');
insert into album(album_title) values('1989');
insert into artist(artist_name) values('Taylor Swift');
insert into includes(song_number, artist_number, album_number) values((select song_number from song where song_title='Bad Blood'), (select artist_number from artist where artist_name='Taylor Swift'), (select album_number from album where album_title='1989')); 

insert into user_profile(username, user_password, name, email) values('admin', 'admin1234', 'Admin 1', 'example@gmail.com');
insert into admin(username) values('admin');

insert into user_profile(username, user_password, name, email) values('perico', 'dan', 'Perico Dan Dionisio', 'perico.dionisio@gmail.com');
insert into non_admin(username) values('perico');	

select * from user_profile, non_admin where non_admin.username='perico' and user_profile.user_password='dan' and non_admin.username=user_profile.username;


select * from song, artist, album, includes where artist.artist_number=includes.artist_number and album.album_number=includes.album_number and song.song_number=includes.song_number;
