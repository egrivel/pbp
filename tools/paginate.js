let glPageNr = 0;

// column width is calculated at initial paginate()
let glColumnWidth = 0;
let glColumnHeight = 0;
let lastPage = 0;
let glContentId;
let glContainerId;

let leftOffset = 0;
let topOffset = 0;

function getHeight(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    return element.clientHeight;
  }
  return 0;
}

function getWidth(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    return element.clientWidth;
  }
  return 0;
}

function getPixels(value) {
  return "" + value + "px";
}

function setPosition(nr) {
  contentElement = document.getElementById('js-real-content');

  const newLeft = glPageNr * glColumnWidth;
  if (nr) {
    contentElement.style.left = "-" + getPixels(newLeft);
  } else {
    contentElement.style.left = 0;
  }
}

function onClickLeft(event) {
  if (glPageNr > 0) {
    glPageNr--;
  }
  setPosition(glPageNr);
  return false;
}

function onClickRight(event) {
  if (glPageNr < (lastPage - 1)) {
    glPageNr++;
  }
  setPosition(glPageNr);
  return false;
}

function calculateSizes() {
  const containerElement = document.getElementById(glContainerId);
  const contentElement = document.getElementById(glContentId);

  glColumnWidth = containerElement.clientWidth;
  glColumnHeight = containerElement.clientHeight;

  // Create the real content and prepare it
  const realContent = document.getElementById('js-real-content');
  realContent.style.width = getPixels(2 * glColumnWidth);
  realContent.style.height = getPixels(glColumnHeight);
  realContent.style.columnWidth = getPixels(glColumnWidth);
  realContent.style.columnGap = 0;

  // The element with id "end" is at the end of the input, so it should be
  // on the last page. Use it to get the number of pages
  const endElement = document.getElementById('js-end');
  endElement.style.width = 0;
  endElement.style.height = 0;

  const rect = endElement.getBoundingClientRect();
  lastPage = Math.floor(rect.left / glColumnWidth) + 1;
  if (glPageNr > lastPage) {
    glPageNr = lastPage;
  }
  setPosition(glPageNr);
}

function paginate(containerId, contentId, options) {
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

  containerElement.style.overflowX = 'hidden';
  containerElement.position = 'relative';
  // Remove any content of the container (it should be empty)
  while (containerElement.firstChild) {
    containerElement.removeChild(containerElement.firstChild);
  }

  // Create the real content and prepare it
  const realContent = document.createElement("div");
  realContent.id = 'js-real-content';
  realContent.style.position = 'relative';
  realContent.style.top = 0;
  realContent.style.left = 0;
  realContent.style.width = getPixels(2 * glColumnWidth);
  realContent.style.height = getPixels(glColumnHeight);
  realContent.style.columnWidth = getPixels(glColumnWidth);
  realContent.style.columnCount = 2;
  realContent.style.columnGap = 0;
  realContent.style.columnFill = 'auto';

  const iterator = contentElement.children;
  for (i = 0; i < iterator.length; i++) {
    realContent.appendChild(iterator[i].cloneNode(true));
  }

  endElement = document.createElement('div');
  endElement.id = 'js-end';
  endElement.style.width = 0;
  endElement.style.height = 0;
  realContent.appendChild(endElement);

  containerElement.appendChild(realContent);

  calculateSizes();
  window.addEventListener("resize", calculateSizes);
}
