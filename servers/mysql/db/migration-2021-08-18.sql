
    
create table `stage`(
	id int primary key not null,
    name varchar(255) unique not null
);

INSERT INTO `stage`
    (id, name)
VALUES
    (0, "Draft"),
    (1, "Preliminary"),
    (2, "Brackets"),
    (3, "Finished")
;

ALTER TABLE `tournament` ADD stage_id int not null default 1;
ALTER TABLE `tournament` ADD CONSTRAINT stage_id_fk FOREIGN KEY (stage_id) REFERENCES stage(id);
