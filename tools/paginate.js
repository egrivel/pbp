let glPageNr = 0;

// column width is calculated at initial paginate()
let glColumnWidth = 0;
let glColumnHeight = 0;
let glLastPage = 0;
let glContentId;
let glContainerId;
let glFirstOnPage = 0;

let leftOffset = 0;
let topOffset = 0;

const FIXED_CONTAINER_ID = "pbp-fixed-container";
const REAL_CONTENT_ID = "pbp-real-content";
const END_ID = "pbp-end";

const glCallbacks = [];

// Event: page number changes
const EVENT_PAGE_NR = "pbp-page-nr";
// Event: table of contents changes (after a redraw)
const EVENT_TOC = "pbp-toc";

function pbpGetHeight(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    return element.clientHeight;
  }
  return 0;
}

function pbpGetWidth(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    return element.clientWidth;
  }
  return 0;
}

function pbpGetPixels(value) {
  return "" + value + "px";
}

function pbpSetPosition(nr) {
  contentElement = document.getElementById(REAL_CONTENT_ID);

  const newLeft = glPageNr * glColumnWidth;
  if (nr) {
    contentElement.style.left = "-" + pbpGetPixels(newLeft);
  } else {
    contentElement.style.left = 0;
  }

  const containerElement = document.getElementById(glContainerId);
  const containerRect = containerElement.getBoundingClientRect();
  const topLeft = document.elementFromPoint(
    containerRect.left,
    containerRect.top
  );
  if (topLeft.dataset) {
    glFirstOnPage = topLeft.dataset.itemId;
    // console.log("Set topleft to " + glFirstOnPage);
    // } else {
    //   console.log("topleft has no dataset");
  }
  document.querySelectorAll("[data-foo='1']");

  if (glCallbacks[EVENT_PAGE_NR]) {
    glCallbacks[EVENT_PAGE_NR](nr + 1);
  }
}

function pbpOnClickLeft(event) {
  if (glPageNr > 0) {
    glPageNr--;
  }
  pbpSetPosition(glPageNr);
  return false;
}

function pbpOnClickRight(event) {
  if (glPageNr < glLastPage - 1) {
    glPageNr++;
  }
  pbpSetPosition(glPageNr);
  return false;
}

function pbpGoToPage(pageNr) {
  if (pageNr && pageNr >= 0 && pageNr < glLastPage) {
    glPageNr = pageNr;
    pbpSetPosition(glPageNr);
  }
  return false;
}

function pbpUpdateToc() {
  if (glCallbacks[EVENT_TOC]) {
    const toc = [];
    glHeadingNode.forEach((node) => {
      const title = node.childNodes[0].nodeValue;
      const rect = node.getBoundingClientRect();
      const pageNr = Math.floor(rect.left / glColumnWidth) + 1;
      toc.push({ title, pageNr });
    });
    glCallbacks[EVENT_TOC](toc);
  }
}

/**
 * Calculate the internal sizes. This function is called on initial load,
 * and also on the `window.resize` event.
 */
function pbpCalculateSizes() {
  const containerElement = document.getElementById(glContainerId);

  glColumnWidth = Math.floor(containerElement.clientWidth);
  glColumnHeight = Math.floor(containerElement.clientHeight);

  const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
  fixedContainer.style.width = pbpGetPixels(glColumnWidth);
  fixedContainer.style.height = pbpGetPixels(glColumnHeight);

  // The container element may have a client width that is not a whole number.
  // Note that the clientWidth attribute always seems to be a whole number
  // (the floor() above is probably not needed), but the bounding client
  // rectangle can give the underlying fractional sizes.
  // This causes the "real content" to have some space left. Give the
  // container some padding to force the real content width to be actually
  // the whole number it is expected to be.
  // Note: shouldn't be necessary anymore, now that we have the
  // fixed container in-between? It never worked anyway.
  const containerRect = fixedContainer.getBoundingClientRect();
  /*
  const padding = containerRect.right - containerRect.left - glColumnWidth;
  if (padding) {
    containerElement.style.paddingRight = pbpGetPixels(padding);
  }
  */

  // Create the real content and prepare it
  const realContent = document.getElementById(REAL_CONTENT_ID);
  realContent.style.width = pbpGetPixels(2 * glColumnWidth);
  realContent.style.height = pbpGetPixels(glColumnHeight);
  realContent.style.columnWidth = pbpGetPixels(glColumnWidth);
  realContent.style.columnGap = 0;

  // The element with id "end" is at the end of the input, so it should be
  // on the last page. Use it to get the number of pages
  const endElement = document.getElementById(END_ID);
  endElement.style.width = 0;
  endElement.style.height = 0;

  const rect = endElement.getBoundingClientRect();
  glLastPage = Math.floor(rect.left / glColumnWidth) + 1;

  const selector = '[data-item-id="' + glFirstOnPage + '"]';
  const prevTopLeft = document.querySelector(selector);
  if (prevTopLeft) {
    const prevRect = prevTopLeft.getBoundingClientRect();
    // console.log(
    //   "container.left=" + containerRect.left + ", right=" + containerRect.right
    // );
    // console.log(
    //   "prevTopLeft.left=" + prevRect.left + ", right=" + prevRect.right
    // );
    let right = (prevRect.left + prevRect.right) / 2;
    const oldPageNr = glPageNr;
    while (right > containerRect.right) {
      right -= glColumnWidth;
      glPageNr++;
    }
    while (right < containerRect.left) {
      right += glColumnWidth;
      glPageNr++;
    }
    // if (glPageNr !== oldPageNr) {
    //   console.log("Page number " + oldPageNr + "-->" + glPageNr);
    // }
    // } else {
    //   console.log("No prevTopLeft found for " + selector);
  }
  if (glPageNr > glLastPage) {
    glPageNr = glLastPage;
  }
  pbpSetPosition(glPageNr);
  pbpUpdateToc();
}

function pbpPaginate(containerId, contentId, options) {
  glContainerId = containerId;
  glContentId = contentId;
  glOptions = options;
  glPageNr = 0;

  const containerElement = document.getElementById(glContainerId);
  const contentElement = document.getElementById(glContentId);
  if (!containerElement || !contentElement) {
    // Without a container or content there is nothing to paginate
    return;
  }

  glColumnWidth = Math.floor(containerElement.clientWidth);
  glColumnHeight = Math.floor(containerElement.clientHeight);

  containerElement.style.overflowX = "hidden";
  containerElement.position = "relative";
  // Remove any content of the container (it should be empty)
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }

  const fixedContainer = document.createElement("div");
  fixedContainer.id = FIXED_CONTAINER_ID;
  fixedContainer.style.position = "relative";
  fixedContainer.style.top = 0;
  fixedContainer.style.left = 0;
  fixedContainer.style.width = pbpGetPixels(glColumnWidth);
  fixedContainer.style.height = pbpGetPixels(glColumnHeight);
  fixedContainer.style.overflowX = "hidden";
  fixedContainer.style.overflowY = "hidden";

  // Create the real content and prepare it
  const realContent = document.createElement("div");
  realContent.id = REAL_CONTENT_ID;
  realContent.style.position = "relative";
  realContent.style.top = 0;
  realContent.style.left = 0;
  realContent.style.width = pbpGetPixels(2 * glColumnWidth);
  realContent.style.height = pbpGetPixels(glColumnHeight);
  realContent.style.columnWidth = pbpGetPixels(glColumnWidth);
  realContent.style.columnCount = 2;
  realContent.style.columnGap = 0;
  realContent.style.columnFill = "auto";

  let count = 0;
  glHeading = [];
  glHeadingNode = [];
  while (contentElement.children.length) {
    const node = contentElement.children[0];
    contentElement.removeChild(contentElement.children[0]);

    const tagName = node.tagName.toLowerCase();
    if (tagName === "h1" || tagName === "h2") {
      // Keep list of heading elements
      const index = glHeading.length;
      glHeading[index] = count;
      glHeadingNode[index] = node;
    }

    node.dataset.itemId = count++;
    realContent.appendChild(node);
  }

  // add an element that marks the end of the content, this is used to
  // calculate the last page.
  endElement = document.createElement("div");
  endElement.id = END_ID;
  endElement.style.width = 0;
  endElement.style.height = 0;
  realContent.appendChild(endElement);

  fixedContainer.appendChild(realContent);

  containerElement.appendChild(fixedContainer);
  // Setup is complete. Complete initialization by calling the
  // `pbpCalculateSizes` function, then register the same function to handle
  // window resizing.
  pbpCalculateSizes();
  window.addEventListener("resize", pbpCalculateSizes);
}

function pbpRegister(event, func) {
  if (!event) {
    return;
  }

  if (func) {
    glCallbacks[event] = func;
  } else if (glCallbacks[event]) {
    delete glCallbacks[event];
  }
}
