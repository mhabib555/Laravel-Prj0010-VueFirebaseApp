<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Project 10</title>
        <link rel="stylesheet" href="css/app.css">
    </head>
    <body>
        <div class="container" id="app">
            <router-view></router-view>
            <!-- set progressbar -->
            <vue-progress-bar></vue-progress-bar>
        </div>
        <script src="js/app.js"></script>
    </body>
</html>
