CREATE TABLE  `messages` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `subject` varchar(45) NOT NULL default '',
  `description` text NOT NULL,
  `timestamp` varchar(30) NOT NULL default '',
  PRIMARY KEY  (`id`)
)