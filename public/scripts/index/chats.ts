

const chatContainer = document.querySelector<HTMLDivElement>("#chat")
const chatContainerCloseButton = document.querySelector<HTMLDivElement>("#chat-clsbtn")
const messageInputBox = document.querySelector<HTMLInputElement>("#chatbox-message")
const chatUserName = document.querySelector<HTMLDivElement>("#chat-profilename")
const chatUserIcon = document.querySelector<HTMLDivElement>("#chat-usricon")

const chatSnapButton = document.querySelector<HTMLDivElement>("#chats-msgbox-snap")

const chatBox = document.querySelector<HTMLDivElement>("#chats-chatspace")
let messagesHandler: any = null;
let lastMessage = {userid: "",messageid:"",chatid:""};

async function loadChatMessages(chatid: string) {
    if (chatBox == null) return
    const currentUser: any = await getCurrentUser()
    const lastMessagerReceived: any = await getLastMessage(chatid, lastMessage)

    if (lastMessagerReceived == undefined) return
    let lastMessagerReceived_Owner: any = await getUser(lastMessagerReceived.userid)
    lastMessagerReceived_Owner.displayname = (currentUser.displayname == lastMessagerReceived_Owner.displayname)
    ? "me"
    : lastMessagerReceived_Owner.displayname
    await renderMessage(lastMessagerReceived, lastMessagerReceived_Owner, currentUser)
    lastMessage = lastMessagerReceived
}

async function renderMessage(chat_message: any, chat_message_owner: any, currentUser: any) {
    if (chatBox == null) return
    const reply_message: any = (chat_message.replyto !== "")
    ? await getMessage(chat_message.replyto)
    : ""
    const reply_message_owner: any = (reply_message !== "")
    ? await getUser(reply_message.userid)
    : ""

    if (chat_message.type == "snap") {
        const messageHTML: string = (chat_message.userid == currentUser.userid)
        ? messageComponent.unopenedSnapMine(true, chat_message_owner.displayname, chat_message_owner.usercolor, chat_message.messageid)
        : messageComponent.unopenedSnap(true, chat_message_owner.displayname, chat_message_owner.usercolor, chat_message.messageid)

        chatBox.innerHTML += messageHTML
    } else {
        const messageHTML: string = (chat_message.replyto !== "")
        ? messageComponent.replyMessage(chat_message_owner.usercolor, chat_message_owner.displayname, chat_message.chat, chat_message.messageid, chat_message.saved, reply_message_owner.displayname, reply_message_owner.usercolor, reply_message.chat)
        : messageComponent.message(chat_message_owner.usercolor, chat_message_owner.displayname, chat_message.chat, chat_message.messageid, chat_message.saved, (lastMessage.userid !== chat_message_owner.userid) ? false : true)

        chatBox.innerHTML += messageHTML
    }
}

async function initialLoadingMessages(chatid: string) {
    if (chatBox == null) return
    const currentUser: any = await getCurrentUser()
    const chatMessages: any[] | unknown = await getChatMessages(chatid)
    if (!Array.isArray(chatMessages)) return
    if (chatMessages.length < 1) return

    for (let i = 0; i < chatMessages.length; i++) {
        const chat_message = chatMessages[i];
        let chat_message_owner: any = await getUser(chat_message.userid)
        chat_message_owner.displayname = (currentUser.displayname == chat_message_owner.displayname)
        ? "me"
        : chat_message_owner.displayname

        await renderMessage(chat_message, chat_message_owner, currentUser)
        lastMessage = chat_message
    }
    chatBox.scrollTop = chatBox.scrollHeight
}

async function openChat(chatid: string, userid: string) {
    if (messageInputBox == null || chatContainer == null) return
    if (chatUserName == null || chatUserIcon == null) return
    if (chatBox == null || chatSnapButton == null) return
    const chatUser: any = await getUser(userid)
    chatBox.innerHTML = ""

    chatUserName.innerHTML = chatUser.displayname
    chatUserIcon.setAttribute("style", `--color: ${chatUser.usercolor};`)
    chatContainer.animate([{ transform: "translateX(0)" }], { duration: 200, iterations: 1, fill: "forwards" })
    messageInputBox.focus()

    await initialLoadingMessages(chatid)
    messagesHandler = setInterval(async () => { await loadChatMessages(chatid) }, 1000)

    messageInputBox.addEventListener("keyup", async (event) => {
        event.preventDefault()
        const message = messageInputBox.value
        const replyto = chatContainer.getAttribute("replyto")
        const replyMessageBox = document.querySelector<HTMLDivElement>("#replytomsg")
        if (replyMessageBox == null) return
        if (event.keyCode !== 13 || message == "" || replyto == null) return

        messageInputBox.value = ""
        chatContainer.setAttribute("replyto", "")
        replyMessageBox.classList.remove("show")
        await sendMessage(chatid, message, "chat", replyto)
    })

    chatSnapButton.addEventListener("click", () => {
        sendASnap(chatid, userid)
    })
}

async function toggleSaveMsg(element: Element, messageid: string) {
    element.classList.toggle("saved")
    const saveState = (element.classList.contains("saved")) ? true : false;
    await togglesaveMessageInChat(messageid, saveState)
}

chatContainerCloseButton?.addEventListener("click", () => {
    clearInterval(messagesHandler)
    chatContainer?.animate([{ transform: "translateX(-100%)" }], { duration: 200, iterations: 1, fill: "forwards" })
})