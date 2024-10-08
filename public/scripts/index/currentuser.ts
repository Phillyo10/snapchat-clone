type User = {
    userid: string,
    displayname: string,
    username: string,
    usercolor: string,
    verified: boolean,
    snapscore: number
}
function isUser(object: any): object is User {
    return typeof object === 'object' &&
           object !== null &&
           typeof object.displayname === 'string' &&
           typeof object.username === 'string' &&
           typeof object.usercolor === 'string' &&
           typeof object.usercolor === 'string' &&
           typeof object.snapscore === 'number' &&
           typeof object.userid === 'string'
}

const currentUserProfile = document.querySelector<HTMLDivElement>("#currentuserprofile")
const currentUserProfileOpenButton = document.querySelector<HTMLDivElement>("#curretuser-openbtn")
const currentUserProfileCloseButton = document.querySelector<HTMLDivElement>("#curretuser-clsbtn")

const switchThemeButton = document.querySelector<HTMLDivElement>("#switch-main")
const bodyContainer = document.querySelector<HTMLDivElement>("#body-container")

const userIconElement = document.querySelector<HTMLDivElement>("#cup-usericon")
const userDNameElement = document.querySelector<HTMLDivElement>("#cup-dname")
const userNameElement = document.querySelector<HTMLDivElement>("#cup-username")
const userVerifiedTextElement = document.querySelector<HTMLDivElement>("#cup-vtxt")
const userTags = document.querySelector<HTMLDivElement>("#cup-tags")

const miniBio = document.querySelector<HTMLDivElement>("#cup-minibio")
const miniBioEmoji = document.querySelector<HTMLDivElement>("#cup-minibio-emoji")
const miniBioText = document.querySelector<HTMLDivElement>("#cup-minibio-text")

const userStories = document.querySelector<HTMLDivElement>("#stories-container")

const bestFriendContainer = document.querySelector<HTMLDivElement>("#bsf-container")
const blockedContainer = document.querySelector<HTMLDivElement>("#blocked-container")

currentUserProfileOpenButton?.addEventListener("click", async () => {
    if (currentUserProfile == null || userTags == null) return
    if (userDNameElement == null || userIconElement == null) return
    if (userNameElement == null || userVerifiedTextElement == null) return
    if (bestFriendContainer == null || userStories == null) return
    if (blockedContainer == null) return

    currentUserProfile.classList.add("show")

    const currentUser = await getCurrentUser()
    const currentUsersBestFriend = await getCurrentUserBestFriend()
    if (currentUser == undefined) return
    if (!isUser(currentUser)) return

    const currentUserMiniBio: any = await getMiniBio(currentUser.userid)
    const currentUsersStories: any = await getUserStories(currentUser.userid)

    userIconElement.setAttribute("style", `--color: ${currentUser.usercolor}`)
    userDNameElement.innerHTML = currentUser.displayname
    userNameElement.innerHTML = currentUser.username
    userVerifiedTextElement.innerHTML = (currentUser.verified) 
    ? "You are a verified user !" : "You are not a verified user !"
    
    userTags.innerHTML = aUserProfileComponents.snapscoreTag(number$.format(currentUser.snapscore))
    userTags.innerHTML += (typeof currentUserMiniBio == "object" && currentUserMiniBio !== undefined)
    ? miniBioComponent.load(currentUserMiniBio.emoji, currentUserMiniBio.text, "minibio-c")
    : miniBioComponent.load("👋", "no mini bio yet", "minibio-c")

    const miniBioContainer = document.querySelector<HTMLDivElement>("#minibio-c")
    miniBioContainer?.addEventListener("click", () => {
        ModalController.minibiomodal("Mini Bio", "Mini Bio Text", "", async (emoji: any, value: any) => {
            miniBioContainer.innerHTML = `${emoji} ${value}`
            await updateMiniBio(currentUser.userid, emoji, value)
        })
    })

    userStories.innerHTML = ""
    if (currentUsersStories.stories == undefined || currentUsersStories.stories.length < 1) {
        userStories.innerHTML = "No Stories"
    } else {
        for (let i = currentUsersStories.stories.length-1; i >= 0; i--) {
            const currentUserStory = currentUsersStories.stories[i];
            userStories.innerHTML += storyComponent.my_story(web_wtime.format(Date.now()-currentUserStory.timeout), `stories/${currentUserStory.storyimage}`, currentUserStory.storyid)
        }
    }
    
    if (typeof currentUsersBestFriend == "string") {
        bestFriendContainer.innerHTML = "You don't have a best friend"
    } else if (isUser(currentUsersBestFriend)) {
        const emojis: string[] = ['🔥','❤️','😊','💕']
        const animations: string[] = ['throb','flip','throbfade']

        bestFriendContainer.innerHTML = `
        <div class="bestfriend">
            <div class="bsf-usericon" id="bsf-usricon"><i class="fa-solid fa-user"></i></div>
            <div class="bsf-profilename" id="bsf-profilename"></div>
            <div class="emoji-animation" id="bsf-emojianim"></div>
        </div>`;

        const bestFriendUserIcon = document.querySelector<HTMLDivElement>("#bsf-usricon")
        const bestFriendUserName = document.querySelector<HTMLDivElement>("#bsf-profilename")
        const bestFriendEmojiAnimator = document.querySelector<HTMLDivElement>("#bsf-emojianim")
        if (bestFriendUserIcon == null) return
        if (bestFriendEmojiAnimator == null || bestFriendUserName == null) return

        let randomEmoji = emojis[Math.floor(Math.random()* emojis.length)]
        let randomAnimation = animations[Math.floor(Math.random()* animations.length)]

        bestFriendUserIcon.setAttribute("style", `--color: ${currentUsersBestFriend.usercolor}`)
        bestFriendUserName.innerHTML = currentUsersBestFriend.displayname
        bestFriendEmojiAnimator.setAttribute("class", `emoji-animation ${randomAnimation}`)
        bestFriendEmojiAnimator.innerHTML = randomEmoji
    }

    const allBlockedUsers: any = await getAllBlockedUsers()
    blockedContainer.innerHTML = ""

    if (allBlockedUsers == undefined || !Array.isArray(allBlockedUsers) || allBlockedUsers.length < 1) {
        blockedContainer.innerHTML = "No Blocked Users"
    } else {
        for (let i = 0; i < allBlockedUsers.length; i++) {
            const blockedUser = allBlockedUsers[i];
            blockedContainer.innerHTML += `
            <div class="bestfriend">
                <div class="bsf-usericon" id="bsf-usricon" style="--color: ${blockedUser.usercolor}"><i class="fa-solid fa-user"></i></div>
                <div class="bsf-profilename" id="bsf-profilename">${blockedUser.displayname}</div>
                <button class="danger" onclick="unblck('${blockedUser.userid}')">Unblock</button>
            </div>`
        }
    }
})

async function unblck(userid: string) {
    if (currentUserProfile == null) return
    currentUserProfile.classList.add("show")
    await unblockUserReq(userid)
    await allOnloadFunctions()
}

userDNameElement?.addEventListener("click", async () => {
    const currentUser = await getCurrentUser()
    if (currentUser == undefined || userDNameElement == null) return
    if (!isUser(currentUser)) return
    ModalController.inputmodal("Display Name", "New Display Name below", currentUser.displayname, async (value: any) => {
        userDNameElement.innerHTML = value
        await updateUser("displayname", value)
    })
})

userNameElement?.addEventListener("click", async () => {
    const currentUser = await getCurrentUser()
    if (currentUser == undefined || userNameElement == null) return
    if (!isUser(currentUser)) return
    ModalController.inputmodal("Username", "New Username below", currentUser.username, async (value: any) => {
        userNameElement.innerHTML = value
        await updateUser("username", value)
    })
})

userIconElement?.addEventListener("click", async () => {
    const currentUser = await getCurrentUser()
    if (currentUser == undefined) return
    if (!isUser(currentUser)) return
    ModalController.colorSlidermodal( async (value: any) => {
        userIconElement.setAttribute("style", `--color: ${value}`)
        await updateUser("usercolor", value)
    })
})

switchThemeButton?.addEventListener("click", () => {
    if (bodyContainer == null) return

    switchThemeButton.classList.toggle("tgl")
    switchThemeButton.innerHTML = (switchThemeButton.classList.contains("tgl"))
    ? `<i class="bi bi-moon-fill"></i> Dark` : `<i class="bi bi-brightness-high"></i> Light`;
    const theme = (switchThemeButton.classList.contains("tgl"))
    ? `dark` : `light`;
    bodyContainer.setAttribute("theme", theme)
})

currentUserProfileCloseButton?.addEventListener("click", async () => {
    if (currentUserProfile == null) return
    currentUserProfile.classList.remove("show")
    await allOnloadFunctions()
})
