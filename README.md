# Pretty Basic Pagination (PBP)

A JavaScript module designed to provide book-style pagination for large
content (books, articles) on a Web page. The module is designed to be
stand-alone (it does not use any framework like jQuery or Bootstrap)
and be—as much as possible—plug-and-play.

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
its own unique identifier upon load. When the window is resized, the current
page will be updated so that the content element that starts the current
page will still be visible on the new page. This works best when the
children of the content element are as granular as possible. It is recommended
not to use `<div>` or other containers for whole chapters or sections, but to
have individual paragraphs of text as direct children of the content element.
