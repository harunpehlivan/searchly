<?php

$id = $_GET["id"];

$f = fopen("sites.json", "r");
$dat = fread($f, filesize("sites.json"));
fclose($f);

$s = json_decode($dat, true);
$url = $s[$id]["url"];


$clicks = strval($s[$id]["clicks"]);

$s[$id]["reports"] = strval(((int) $s[$id]["reports"]) + 1);

if ($s[$id]["reports"] > $clicks * 3 + 5)
{
  $s[$id]["title"] = "Website removed";
  $s[$id]["url"] = "siteremoved.html";
  $s[$id]["desc"] = "This website has been removed as it recieved many reports. Stay safe online!";
}

$j = json_encode($s);

$f = fopen("sites.json", "w");
fwrite($f, $j);
fclose($f);

echo "<h1>Thanks for making Searchly better! We really appreciate it!</h1><p>You can press the back arrow now to go back to your search results.";

?>