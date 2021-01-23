<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>The Ultimate Country Capital Test</title>

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    
    <script src="capitals.js"></script>
    <!-- https://github.com/Glench/fuzzyset.js -->
    <script src="fuzzyset.js"></script>
    <script src="helper.js"></script>
    <script src="results.js"></script>

    <link rel="stylesheet" href="results.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="box">

        <div class = "row header">
            <h1 id="page-title">The Ultimate Country Capital Test - Your Results</h1>
            You remembered <span id="result-remembered"></span> out of <span id="result-not-remembered"></span> capitals.
            <div class="banner">
                Remembered: <span id="num-remembered"></span>
            </div>
            <div class="column-holder">
                <div class = "column" id="remembered-column-1"></div>
                <div class = "column" id="remembered-column-2"></div>
                <div class = "column" id="remembered-column-3"></div>
            </div>
            <div class="banner">
                Remembered (with spelling mistake): <span id="num-spelling"></span>
            </div>
            <div class="column-holder">
                <div class = "column" id="spelling-column-1"></div>
                <div class = "column" id="spelling-column-2"></div>
                <div class = "column" id="spelling-column-3"></div>
            </div>
            <div class="banner">
                Not remembered: <span id="num-not-remembered"></span>
            </div>
            <div class="column-holder">
                <div class = "column" id="not-remembered-column-1"></div>
                <div class = "column" id="not-remembered-column-2"></div>
                <div class = "column" id="not-remembered-column-3"></div>
            </div>

        <div class = "row footer padded">
            
        </div>
    </div>
</body>

</html>