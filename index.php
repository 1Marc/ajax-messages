<!doctype html>
<html>
<head>
  <title>Ajax Messages - Demo of Ajax</title>
  <script>
  	path = '/resources/ajax-messages/';
  </script>
  <script src="/resources/ajax-messages/js/common.js"></script>
  <script src="/resources/ajax-messages/js/site.js"></script>
  <link rel="stylesheet" href="/resources/ajax-messages/css/site.css">
</head>
<body>
<form class="messagesForm" action="/resources/ajax-messages/">
    <h3>Compose a new ajax message</h3>
    <div><label>Subject:</label><input id="subject" type="text" size="30" /></div>
    <div><label>Message:</label><textarea id="description" rows="4" cols="40" ></textarea></div>
    <div><input class="button" type="submit" value="Add New Message" onclick="ajaxRequest.addMessage();return false" /></div>
</form>
    
<h2>User messages</h2>
<div id="messages">
<?php 
	include('db.php');  
	$sql = "SELECT * FROM messages ORDER BY timestamp DESC";
	$result = mysql_query($sql) or print ("Can't select entries from ajax messages table.<br />" . $sql . "<br />" . mysql_error());
	
	while($row = mysql_fetch_array($result)) {
		$id = $row['id'];
		$desc = htmlspecialchars(stripslashes($row['description']));
		$subject = htmlspecialchars(stripslashes($row['subject']));
		$timestamp = $row['timestamp'];
?>
		<div id="<?php echo $id; ?>" class="message">
			<div><label>Subject:</label></div>
			<p class="DBsub"><?php echo $subject; ?></p>
			<div><label>Description:</label></div>
			<p class="DBdesc"><?php echo $desc; ?></p>
			<a class="delete" onclick="ajaxRequest.deleteMessage(this)"></a>
			<label class="timestamp"><?php echo $timestamp; ?></label>
		</div>
<?php
	}
?>
</div>

<div class="static">
	<div><label>Subject:</label></div>
	<p>Welcome to Ajax Messages!</p>
	<div><label>Description:</label></div>
	<p>Thank you for taking the time to view my Ajax Messages application!</p> 
	<p><a href="http://marcgrabanski.com">MarcGrabanski.com</a></p>
</div>
<div style="clear: both;"></div>

<h2>About Ajax Messages</h2>
<div class="container">
	<h4>Description:</h4> 
	<p>Demonstration of Ajax. You never need to see a page refresh even though the data is being stored and retrieved from the database.</p>
	<h4>Code Features:</h4>
	<ul>
		<li>Insert, update and add new messages automagically.</li>
		<li>Clicking on a message automagically changes into an editable textbox!</li>
		<li>Object oriented Javascript.</li>
	</ul>
	<p><a href="http://github.com/1Marc/ajax-messages">Download Ajax Messages Source Code on Github</a></p>
</div>

</html>