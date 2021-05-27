# PBP: Design

Pagination should be easy to set up, and work mostly by itself. To make this
module as simple as possible, the goal is for the web developer to

- create a container with the ID `js-body` which contains the actual body
  of the part to be paginated.
- optionally create a container with ID `js-top` to contain the top part,
  which is displayed on each page.
- optionally create a container with ID `js-bottom` to contain the bottom
  part, which is displayed on each page.
- call the `paginate()` function which will paginate the content of the
  `js-body` container.

The module uses CSS columns to create the illusion of pages.

Whenever the container resizes, the paginate function will

- identify the current position as the first character in the currently
  displayed chunk
- re-calculate the chunks
- determine in which new chunk the current position falls
- display that new chunk as the current one.

## Testing

To support testing, an HTML copy of the book _Great Expectations_ by
Charles Dickens is included. This is over a megabyte of marked-up text,
plus images, that will give PBP a good work-out. A testing _harness_ is
also included: an HTML page that incorporates PBP to provide paginated
content.

## Structure of the DOM

The application provides a _container_ that will be the window onto the page
to display. PBP creates a _real content_ element, which has the exact height
of the container, and is set up with CSS columns. Each of the columns has the
width of the container.

In order to address rounding errors (the application-provided container may
have fractional sizes), an intermediate _fixed container_ element is created
inside the application-provided container which has the same size as the
container element, except with width and height rounded down to integer
pixels.
