<?php
$source = "great-expectations";
if (isset($_GET["content"])) {
  $fname = $_GET["content"];
  if (file_exists("$fname.php") && file_exists("$fname.html")) {
    $source = $fname;
  }
}
// Load the variables that define the book.
include("$source.php");
?>
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta http-equiv='Content-Type' content='text/html;charset=utf-8' />
    <!-- Include the "Droid Serif" font from Google for better main serif
         text than Times New Roman. -->
    <link href='http://fonts.googleapis.com/css?family=Droid+Serif:400,400italic,700' rel='stylesheet' type='text/css'/>
    <!--
    <link href='http://fonts.googleapis.com/css?family=Nova+Square' rel='stylesheet' type='text/css'/>
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
    -->
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'>
    <link rel='stylesheet' href='pbp-sample.css' />
    <!--
    <style type='text/css'>
    @import url('framework.css');
    @import url('book.css');
    </style>
    -->
    <script src='paginate.js'></script>
    <script>
      // Global functions; additional functionality at the bottom of the page

      // Toggle the Table of Contents
      function toggleToc() {
        const element = document.getElementById('toc-background');
        if (element) {
          if (element.style.display === 'none') {
            element.style.display = 'block';
          } else {
            element.style.display = 'none';
          }
        }
      }

      // Implement the Go to Page functionality
      function goToPage(inputId) {
        const inp = document.getElementById(inputId);
        let value;
        if (inp) {
          value = Number(inp.value);
          pbpGoToPage(value);
        }
        return false;
      }

      // Register the callback when the page number changes
      pbpRegister('pbp-page-nr', nr => {
        const element = document.getElementById('bottom');
        if (element) {
          element.textContent = `Page ${nr}`;
        }
        const pageInput = document.getElementById('inp_page');
        if (pageInput) {
          pageInput.value = String(nr);
        }
      });

      // Register the callback when the Table of Contents changes
      pbpRegister('pbp-toc', toc => {
        // toc is an array of objects, {title, pageNr}
        let text = '';
        toc.forEach(item => {
          const {title, pageNr} = item;
          if (title && pageNr) {
            text += `<li><a href="#" onClick="{pbpGoToPage(${pageNr}); `;
            text += `return false;}">${title} . . . ${pageNr}</a></li>`;
          }
        });
        const list = document.getElementById('toc-list');
        if (list) {
          list.innerHTML = text;
        }
      });
    </script>
    <title>Pagination Test Page</title>
  </head>
  <body>
    <div class='left-area'>
      <h1><?php print $title; ?></h1>
      <div class='coverimg'>
        <img src="<?php print $cover; ?>" />
      </div>
      <p class='summary'>
        <?php print $summary; ?>
      </p>
      <p>
        <input type="text" id="inp_page" name="page" size="3"
          onEnter="return goToPage('inp_page2');" />
        <input type="submit" name="do_goto"
          value="Go To Page" onClick="return goToPage('inp_page');" />
      </p>

      <p class='prevnext'>
        <span class='prev'>
          <a href='#' onclick='pbpOnClickLeft(); return false;'>Prev</a>
        </span>
        <span class='next'>
          <a href='#' onclick='pbpOnClickRight(); return false;'>Next</a>
        </span>
        <a href='#' title='Table of Contents' onClick='toggleToc()'>
          <i class='fa fa-bars'></i>
        </a>
      </p>
    </div>
    <div class='center-area'>
      <div id="top" class='prevnext'>
        <h2><?php print $title; ?></h2>
        <span class='prev'>
          <a href='#' onclick='pbpOnClickLeft(); return false;'>Prev</a>
        </span>
        <span class='next'>
          <a href='#' onclick='pbpOnClickRight(); return false;'>Next</a>
        </span>
        <span class='toc'>
          <a href='#' title='Table of Contents' onClick='toggleToc()'>
            <i class='fa fa-bars'></i>
          </a>
        </span>
    </div>
      <div id='pbp-container' class='content'>
        Loading the book...
      </div>
      <div id="bottom" class='pagenr'>
        Page 1
      </div>
    </div>
    <div id="pbp-content" class='hidden-content'>
      <?php
      include("$source.html");
      ?>
    </div>
    <div id="toc-background" class="table-of-contents" style="display: none;" onClick="toggleToc();">
      <div class="toc-body">
        <h2>Table of Contents</h2>
        <ul id="toc-list">
        </ul>
      </div>
    </div>
  </body>
  <script>
    // Add a handler or the [Enter] key to the input box
    let inp = document.getElementById('inp_page');
    if (inp) {
      inp.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          goToPage('inp_page');
        }
      });
    }
    inp = document.getElementById('inp_page2');
    if (inp) {
      inp.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          goToPage('inp_page2');
        }
      });
    }

    // Invoke pagination, building the actual paginated book
    pbpPaginate('pbp-container', 'pbp-content', {
      toc: ['h1', 'h2']
    });
  </script>
</html>
