<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>The Ultimate Country Capital Test</title>

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    
    <script src="js/capitals.js"></script>
    <!-- https://github.com/Glench/fuzzyset.js -->
    <script src="js/fuzzyset.js"></script>
    <script src="js/helper.js"></script>
    <script src="js/results.js"></script>

    <link rel="stylesheet" href="css/results.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <div class="box">

        <div class = "row header">
            <h1 id="page-title">The Ultimate Country Capital Test - Your Results</h1>
            <h2 id="score-summary"></h2>

            <div class="banner good">Remembered exactly: <span id="num-remembered"></span></div>
            <div id="remembered"></div>

            <div class="banner good">Remembered with approximate spelling: <span id="num-spelling"></span></div>
            <div id="spelling"></div>
            
            <div class="banner bad">Guessed incorrectly: <span id="num-incorrect"></span></div>
            <div id="incorrect"></div>

            <div class="banner bad">Not remembered: <span id="num-not-remembered"></span></div>
            <div id="not-remembered"></div>

        <div class = "row footer padded">
            
        </div>
    </div>
    <div class="row footer">
        <a href="play.html"><h2>Click here to play again!</h2></a>
        <p>or <a href="index.html" target="_blank">Go back to the instructions page</a></p>
    </div>
</body>

</html>