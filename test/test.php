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
      function goToPage() {
        const inp = document.getElementById('inp_page');
        let value;
        if (inp) {
          value = Number(inp.value) - 1;
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
            text += `<li><a href="#" onClick="{pbpGoToPage(${pageNr}-1); `;
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
  <body class='alpha'>
    <div class='menu'>
      <h1>Pagination Test Page</h1>
      <p>
        This is a test page for the pagination module. It shows a left area
        (this area) which can contain navigation and other information,
        maybe a book cover.
        On the right is the content area, which has navigation buttons at the
        top, and the actual paginated container below it.
      </p>
      <p>
        <input type="text" id="inp_page" name="page" size="3"
          onEnter="return goToPage();" />
        <input type="submit" name="do_goto"
          value="Go To Page" onClick="return goToPage();" />
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
    <div id="wrapper" class='content hyphenate'>
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
      <div id='pbp-container'>
        Loading the book...
      </div>
      <div id="bottom">
        Page 1
      </div>
    </div>
    <div id="pbp-content">
      <?php
        if (isset($_GET["content"])) {
          include($_GET["content"]);
        } else {
          include("great-expectations.html");
        }
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
    const inp = document.getElementById('inp_page');
    if (inp) {
      inp.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          goToPage();
        }
      });
    }

    // Invoke pagination, building the actual paginated book
    pbpPaginate('pbp-container', 'pbp-content', {});
  </script>
</html>
