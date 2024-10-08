const friendrequests = document.querySelector<HTMLDivElement>("#fr")
const friendrequestButton = document.querySelector<HTMLButtonElement>("#frbtn")
const searchFRInput = document.querySelector<HTMLInputElement>("#search-fr")
const friendrequestCloseButton = document.querySelector<HTMLDivElement>("#frclsbtn")

async function loadFriendRequests() {
    const frResults = document.querySelector<HTMLDivElement>("#fr-results")
    if (frResults == null) return
    if (friendrequests == null || friendrequestCloseButton == null || searchFRInput == null) return

    searchFRInput.value = ""
    frResults.innerHTML = ""

    const uid = await ScCloneUser.getkey("userid")
    const ufrqsts = await ScCloneUser.getkey("friendRequests")
    const fr_requests = await getAllUserFriendRequests()
    if (!Array.isArray(fr_requests) || !Array.isArray(ufrqsts) || fr_requests == null) return

    for (let i = 0; i < fr_requests.length; i++) {
        const fr_request = fr_requests[i];
        if (ufrqsts.includes(fr_request.userid)) {
            const personComponent = frComponent.personAccept(fr_request.color, fr_request.displayname, fr_request.username, fr_request.userid)
            frResults.innerHTML += personComponent
        } else continue
    }

    friendrequests.classList.add("show")
    searchFRInput.focus()
    friendrequestCloseButton.addEventListener("click", async () => {
        friendrequests.classList.remove("show")
    })
}

friendrequestButton?.addEventListener("click", async () => { await loadFriendRequests() })

searchFRInput?.addEventListener("keyup", async () => {
    const frResults = document.querySelector<HTMLDivElement>("#fr-results")
    if (searchFRInput == null || searchFRInput.value == null || searchFRInput.value == "") return
    if (searchFRInput.value.includes(" ")) return
    if (frResults == null) return
    frResults.innerHTML = ""

    const results = await searchusers(searchFRInput.value)
    const uid = await ScCloneUser.getkey("userid")
    const ufrqsts = await ScCloneUser.getkey("friendRequests")
    if (!Array.isArray(results) || !Array.isArray(ufrqsts) || results == null) return

    for (let i = 0; i < results.length; i++) {
        if (ufrqsts.includes(results[i].userid)) {
            const personComponent = frComponent.personAccept(results[i].color, results[i].displayname, results[i].username, results[i].userid)
            frResults.innerHTML += personComponent
        } else if (results[i].friendRequests.includes(uid)) {
            const personComponent = frComponent.personSent(results[i].color, results[i].displayname, results[i].username, results[i].userid)
            frResults.innerHTML += personComponent
        } else {
            const personComponent = frComponent.person(results[i].color, results[i].displayname, results[i].username, results[i].userid)
            frResults.innerHTML += personComponent
        }
    }
})

async function addFriend(userid: string) {
    if (friendrequestCloseButton == null) return
    const response = await sendFriendRequest(userid)
    if (response == "success") friendrequestCloseButton.click() 
}

async function acceptFr(userid: string) {
    if (friendrequestCloseButton == null) return
    const response = await acceptFriendRequest(userid)
    if (response == "success") friendrequestCloseButton.click()
}
