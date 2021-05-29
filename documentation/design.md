# PBP: Design

Pagination on a web page is not a trivial exercise. The PBP module tries to
handle the hard part of the pagination, without being too opinionated on
_what_ it is that is being paginated.

In order for pagination to be incorporated into a project, there has to be
some setup and integration that needs to be handled. This page will document
how the PBP side of this setup and integration works.

PBP operates under the assumption that the project will provide a fully sized
DOM element, `pbp-container`, which is sized and resized appropriately when
the browser window resizes. The project handles everything else on the page,
PBP makes sure the `pbp-container` will be populated and updated.

## Columns

In order to provide the illusion of pagination, PBP uses _columns_ to display
the content.
```
+---------------------------------------------------
|        |        |        |        |        |
| page 1 | page 2 | page 3 | page 4 | page 5 | ...
|        |        |        |        |        |
+---------------------------------------------------
```

The content element is moved underneath the viewport, so that at any time,
only the desired page will be visible to the user.
```
              <-- |        | -->
                  |viewport|
+---------------------------------------------------
|        |        |        |        |        |
| page 1 | page 2 | page 3 | page 4 | page 5 | ...
|        |        |        |        |        |
+---------------------------------------------------
                  |        |
```




## Resizing

When the user resizes the browser window, ideally the “current page” will be
updated so that the reader’s position in the text is maintained. Since PBP
doesn’t know where on the page the reader exactly is, it will have to do some
approximation with this determination of the “current” position.

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
