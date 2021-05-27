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
  content will be displayed.
- A _content_ element named `pbp-content` that contains the content to be
  paginated.
- A call to the `pbpPaginate()` function to start pagination.

### Container Element

The container element tells PBP where to display the paginated content. This
element should be empty (any content will be overwritten by PBP) and must have
the exact desired size.

### Content Element

The content element should be styled with a `display: hide` style so it does
not affect the page layout. PBP will take all the child elements from the
content and move them over to the container.

### Identifying Position

PBP identifies the current position based on the top-level child elements
provided in the content. Each of the top-level child elements will get
its own unique identifier upon load. For example, if the document to load
looks like:

```
<h1>This is an example</h1>
<p>
  The top level <b>paragraph</b> element contains multiple <em>child</em>
  elements. The child elements do <em>not</em> get their own identifier,
  only the paragraph element.
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
