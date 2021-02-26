# Design

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
