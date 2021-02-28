<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta http-equiv='Content-Type' content='text/html;charset=utf-8' />
    <link href='http://fonts.googleapis.com/css?family=Droid+Serif:400,400italic,700' rel='stylesheet' type='text/css'/>
    <link href='http://fonts.googleapis.com/css?family=Nova+Square' rel='stylesheet' type='text/css'/>
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'>
    <style type='text/css'>
    @import url('framework.css');
    @import url('book.css');
    </style>
    <script src='paginate.js'></script>
    <title>Pagination Test Page</title>
  </head>
  <body class='alpha'>
    <div class='menu'>
      <h1>Pagination Test Page</h1>
      <p>
        This is a test page for the pagination module. It shows a left area
        (this area) which can contain navigation and other information,
        maybe a book cover.
      </p>
      <p>
        In the middle is the content area, which has navigation buttons at the
        top, and the actual paginated container below it.
      </p>
      <p>
        The content area has a "max width" to show that the paginated container
        can be limited in different ways.
      </p>

      <p class='prevnext'>
        <span class='prev'>
          <a href='#' onclick='onClickLeft(); return false;'>Prev</a>
        </span>
        <span class='next'>
          <a href='#' onclick='onClickRight(); return false;'>Next</a>
        </span>
        <a href='#' title='Table of Contents'>
          <i class='fa fa-bars'></i>
        </a>
      </p>
    </div>
    <div id="wrapper" class='content hyphenate'>
      <p class='prevnext'>
        <span class='prev'>
          <a href='#' onclick='onClickLeft(); return false;'>Prev</a>
        </span>
        <span class='next'>
          <a href='#' onclick='onClickRight(); return false;'>Next</a>
        </span>
        <a href='#' title='Table of Contents'>
          <i class='fa fa-bars'></i>
        </a>
      </p>
      <div id='container'>
        Loading the book...
      </div>
      <div id='bottom'>&nbsp;</div>
    </div>
    <div id="content">
      <?php include("great-expectations.html"); ?>
    </div>
  </body>
  <script>
    paginate('container', 'content', {
    });
  </script>
</html>
