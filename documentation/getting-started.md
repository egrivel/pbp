# PBP - Getting Started

PBP (Pretty Basic Pagination) is a JavaScript module to help display
book-like paginated content on a web page.

Before starting with PBP, you want to make sure this is the module for
you. PBP is not a finished product, it is a tool for _developers_ of web site
to include the pagination function in their work. If you are not familiar
with HTML, CSS, and in particular JavaScript coding, this module is not
for you.

## Simple Usage

In order to use the PBP module, three things must be provided:

- A _container_ element named `pbp-container` where the paginated
  content will be displayed. The container element should be empty; it will
  be populated by PBP.
- A _content_ element named `pbp-content` that contains the content to be
  paginated. The content element should be placed _outside_ of the container
  element.
- A call to the `pbpPaginate()` function to start pagination.

### Container Element

The container element tells PBP where to display the paginated content. This
element should be empty (any content will be overwritten by PBP) and must have
the exact desired size.

You are responsible for sizing and positioning the container element. PBP will
recognize when the container element gets resized, e.g. when someone changes
the browser window, and will update the content displayed inside the container
accordingly.

### Content Element

The content element should be styled with a `display: hide` style so it does
not affect the page layout when the page initially loads. PBP will take all
the child elements from the content and move them over to the container.

### Identifying Position

PBP identifies the current position based on the top-level child elements
provided in the content. Each of the top-level child elements will get
its own unique identifier upon load. For example, if the document to load
looks like:

```html
<h1>This is an example</h1>
<p>
  The top level <b>paragraph</b> element contains multiple
  <em>child</em> elements. The child elements do <em>not</em> get their own
  identifier, only the paragraph element.
</p>
```

then the `<h1>` and `<p>` elements get their own identifiers, but not the
`<em>` elements.

When the window is resized, the current
page will be updated so that the content element that starts the current
page will still be visible on the new page. This works best when the
children of the content element are as granular as possible. It is recommended
not to use `<div>` or other containers for whole chapters or sections, but to
have individual paragraphs of text as direct children of the content element.

## Example File

This repo contains an example file, `test.php`, which renders a long text
paginated in a web page. The example file is provided as a PHP file because
that provides a way to include different contents through a URL parameter.
If you cannot use PHP, or do not know how to use PHP, rename the file to
`test.html` and replace this part:

```html
<?php
  if (isset($_GET["content"])) {
    include($_GET["content"]);
  } else {
    include("great-expectations.html");
  }
?>
```

with the HTML content you want to render.

The `great-expectations.html` file is provided as the default content for the
example. This is the book _Great Expectations_ by Charles Dickens, for which
any copyright has expired so that it can be included in this module.

## Advanced Functions

When dealing with paginated contents, PBP provides a few advanced functions
through settings and callback functions.

### Change Page

PBP itself doesn't provide for navigation (moving from one page to another),
the application using PBP needs to handle that. It uses the function
`pbpGoToPage(nr)` to change the current page to the desired page. Page
numbers are one-based, so the first page is page #1.

### Current page number

The application can be informed of which page is currently displayed by PBP
through a callback function. The callback function will be called whenever
the page number changes.

```javascript
function handlePageChange(newPageNr) {
  ...
}

pbpRegister('pbp-page-nr', handlePageChange);
```

### Table of Contents

For longer text, presenting a table of contents with page numbers can be
useful. Since page numbers change when the page is resized, PBP provides
for the calculation of page numbers for elements to be included in a Table
of Contents.

In order enable table of contents processing, the `pbpPaginate` function
must include the `toc` option with an array of HTML elements which are to
be including tin the table of contents. Be sure to use lowercase names for
the HTML elements, e.g.:

```javascript
const options = {
  toc: ['h1', 'h2']
};
pbpPaginate(containerElement, contentElement, options);
```

Once PBP knows about the table of contents elements, a callback function
must be provided that PBP can call with the calculated table of contents.

```javascript
function handleToc(tocElements) {
  tocElements.forEach((item) => {
    const { id, pageNr, title } = item;
    // handle the item
  });
}

pbpRegister("pbp-toc", handleToc);
```

The callback function will be called with an array of table of contents items
(based on the HTML elements provided in the options). Each item is given the
`id` (HTML element ID), `title` (text content of the element) and `pageNr`
(the page the element is on).
