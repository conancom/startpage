/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"udAUaCV1THVtbQIk","label":"entertainment","bookmarks":[{"id":"81NLBS7PFIpwtQ6N","label":"Youtube","url":"https://www.youtube.com"},{"id":"7GsM61HsdUJkNI7M","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"2bAzIfqgTqk8aRhO","label":"Ani-Cloud","url":"https://anicloud.io/"}]},{"id":"ixU0Ctf74alEJCem","label":"design tools","bookmarks":[{"id":"zeeDyoOUEXLo9sEc","label":"Canva","url":"https://www.canva.com/"},{"id":"epWq75jRDWISCEVq","label":"Lucid Chart","url":"https://lucid.app/users/login#/login"}]},{"id":"1XzFRHQl4NTx9BTS","label":"university","bookmarks":[{"id":"xl4NZxp7pcnoKmwn","label":"Reg","url":"http://reg.siit.tu.ac.th/registrar/home.asp"},{"id":"J23HUTcRZhnIE9ED","label":"Lecture Notes","url":"http://lecture.siit.tu.ac.th/"},{"id":"EDgvlCM5GPN4CvFk","label":"Time Sheet","url":"https://sa.siit.tu.ac.th/sts/note_cant_access.php"}]},{"id":"rjAtxldREhvf2nam","label":"sources","bookmarks":[{"id":"6PJzeEp3fDhPdQVs","label":"Github","url":"https://github.com/"},{"id":"LQHf1WVMCJp6LsVy","label":"TryHackMe","url":"https://tryhackme.com/dashboard"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
