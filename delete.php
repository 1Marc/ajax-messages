<?php
	include('db.php');
	$id = $_POST['id'];
	$sql = "DELETE FROM messages WHERE id = $id";
	mysql_query($sql);
?>

