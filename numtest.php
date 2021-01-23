<?php
?>

<?php
$num = $_GET["number"];

echo "Number: ";
echo $num;
$numdata = new stdClass();
$numdata -> num = $num;
$json_data = json_encode($numdata);
file_put_contents('myfile.json', $json_data);
?>
