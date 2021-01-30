<?php

$json = json_encode($_POST, JSON_PRETTY_PRINT);

echo '<pre>';
echo $json;
echo '</pre>';

$fp = fopen('../json/scores.json', 'w');
fwrite($fp, $json);
fclose($fp);
?>