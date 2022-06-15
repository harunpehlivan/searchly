<?php
$title = $_GET["title"];
$url = $_GET["url"];
$desc = $_GET["desc"];

$f = fopen("sites.json", "r");
$dat = fread($f, filesize("sites.json"));
fclose($f);

$s = json_decode($dat, true);

for ($i=0; $i<count($s); $i++)
{
  if ($s[$i]["title"] == $title)
  {
    echo ("Please choose a different title - the title you entered already exists! (press the back button to return to the add menu)");
    die;
  }
  if ($s[$i]["url"] == $url)
  {
    echo ("Please choose a different url - the url you entered already exists! (press the back button to return to the add menu)");
    die;
  }
}

$s[count($s)] = array("title"=>$title, "url"=>$url, "desc"=>$desc, "clicks"=>"0", "reports"=>"0");

$j = json_encode($s);

$f = fopen("sites.json", "w");
fwrite($f, $j);
fclose($f);

echo "<script>location.href = '/';</script>";


die;


?>