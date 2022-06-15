<?php

$id = $_GET["id"];

$f = fopen("sites.json", "r");
$dat = fread($f, filesize("sites.json"));
fclose($f);

$s = json_decode($dat, true);
$url = $s[$id]["url"];
$s[$id]["clicks"] = strval(((int) $s[$id]["clicks"]) + 1);
$j = json_encode($s);

$f = fopen("sites.json", "w");
fwrite($f, $j);
fclose($f);

echo "<script>location.href = '$url'</script>";

?>