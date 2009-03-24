<?php 
	include('db.php');
	$msgid = $_POST['id'];
	$subject = $_POST['subject'];
	$desc = $_POST['description'];
	// update subject
	if($subject != NULL){
		$sql = "UPDATE messages SET subject = '$subject' WHERE id = '$msgid'";
		mysql_query($sql);		
	}
	
	// update description
	if($desc != NULL){
		$sql = "UPDATE messages SET description = '$desc' WHERE id = '$msgid'";
		mysql_query($sql);		
	}

?>
