<?php
	header("Content-Type: text/xml");
	
	include('db.php');
	$timestamp = date("F d Y H:i:s");
	$subject = $_POST['subject'];
	$desc = $_POST['description'];
	$sql = "INSERT INTO messages (subject,description,timestamp) VALUES ('$subject','$desc','$timestamp')";
	mysql_query($sql);
	
	$sql = "select max(id) from messages";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$msgID = $row[0];
?>
	

<message>
	<messageid><?php echo $msgID; ?></messageid>
	<subject><?php echo htmlspecialchars($subject);?></subject>
	<description><?php echo htmlspecialchars($desc);?></description>
</message>

