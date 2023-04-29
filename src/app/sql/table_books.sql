CREATE TABLE obes.books (
	id serial primary key,
	title varchar(100) not null,
	author varchar(100) not null,
	publisher varchar(100) not null, 
	isbn varchar(50),
	description varchar(500),
	category varchar(50),
	image_url varchar(200),
	type_book varchar(50),
	available varchar(5)
);