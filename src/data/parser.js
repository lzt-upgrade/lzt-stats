function findYouInEl(likeTextEl) {
  // find "You" in el for sympathies and likes
  return (
    likeTextEl.innerText.includes("Это нравится Вам") ||
    likeTextEl.innerText.includes("Вам нравится это") ||
    likeTextEl.innerText.includes("You like this") ||
    likeTextEl.innerText.includes("You and") ||
    likeTextEl.innerText.includes("You,")
  )
}

function getHTMLFromString(HTMLString) {
  const parser = new DOMParser()
  return parser.parseFromString(HTMLString, "text/html")
}

export { findYouInEl, getHTMLFromString }
