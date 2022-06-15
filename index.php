<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Searchly</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body onclick="endsitepreview();">
  <input id="sb" placeholder="Search the internet..." />
  <button onclick="search();" class="search"><i class="fa-solid fa-magnifying-glass"></i></button>
  <a href="add.html"><button>Add a site</button></a>

  <br />
  <br />
  
  <div id="results">
    
  </div>

  <iframe id="sitepreview" style="visibility: hidden" ></iframe>

  <script src="https://kit.fontawesome.com/84c26f1f66.js" crossorigin="anonymous"></script>

  <script src="script.js"></script>

</body>
</html>