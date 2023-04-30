CREATE TABLE obes.books (
	id serial primary key,
	title varchar(100) not null,
	description varchar(500),
	category varchar(50),
	image_url varchar(200),
	type_book varchar(50),
	available varchar(5),
	preco float(24)
);