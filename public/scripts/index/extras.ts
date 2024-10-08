async function searchusers(query: string) {
    return new Promise((resolve) => {
        fetch(`/fr/searchusers/${query}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getAllUserFriendRequests() {
    return new Promise((resolve) => {
        fetch(`/fr/allfr`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function sendFriendRequest(touserid: string) {
    return new Promise((resolve) => {
        fetch(`/fr/sendfr`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ touserid: touserid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function acceptFriendRequest(touserid: string) {
    return new Promise((resolve) => {
        fetch(`/fr/acceptfr`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ touserid: touserid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function loadUserFriends() {
    return new Promise((resolve) => {
        fetch(`/friends/allfriends`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getCurrentUser() {
    return new Promise((resolve) => {
        fetch("/user").then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getUser(userid: string | any) {
    return new Promise((resolve) => {
        fetch(`/chats/chatinfo/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function updateUser(key: string, value: string) {
    return new Promise((resolve) => {
        fetch(`/user/update/${key}/${value}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getChatInfo(chatid: string) {
    return new Promise((resolve) => {
        fetch(`/chats/${chatid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getLastMessage(chatid: string, lastMessage: any) {
    return new Promise((resolve) => {
        fetch(`/msgs/getlastmsg`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid, lastmsg: lastMessage })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function sendMessage(chatid: string, message: string, type: string, replyto: string) {
    return new Promise((resolve) => {
        fetch("/msgs/sendmsg", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid, message: message, msgtype: type, replytomsgid: replyto })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getChat(chatid: string) {
    return new Promise((resolve) => {
        fetch(`/chats/getchatjson/${chatid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getChatMessages(chatid: string) {
    return new Promise((resolve) => {
        fetch("/chats/getmsgs", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getMessageSnap(messageid: string) {
    return new Promise((resolve) => {
        fetch("/msgs/getmessagesnap", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getMessageSnapOwner(messageid: string) {
    return new Promise((resolve) => {
        fetch("/msgs/getmsgowner", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function togglesaveMessageInChat(messageid: string, saveState: boolean) {
    return new Promise((resolve) => {
        fetch("/msgs/togglesavemsg", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid, saveState: saveState })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getMessage(messageid: string) {
    return new Promise((resolve) => {
        fetch("/msgs/getmsg", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function addMessageReaction(chatid: string, messageid: string, reaction: string) {
    return new Promise((resolve) => {
        fetch("/msgs/addreaction", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid, messageid: messageid, reaction: reaction })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function editMessage(messageid: string, newMsg: string) {
    return new Promise((resolve) => {
        fetch("/msgs/editmsg", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid, message: newMsg })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function deleteMessage(messageid: string) {
    return new Promise((resolve) => {
        fetch("/msgs/deletemsg", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function openSnapMsg(messageid: string) {
    return new Promise((resolve) => {
        fetch("/msgs/opensnap", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageid: messageid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getChatTags(chatid: string, userid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/gettags/${chatid}/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function makeBestFriend(userid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/makebsf/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function removeBestFriend(userid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/rmbsf/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function removeFriend(userid: string, chatid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/rmfr/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function blockFriend(userid: string, chatid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/blockfr/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatid: chatid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getAllBlockedUsers() {
    return new Promise((resolve) => {
        fetch(`/misc/allblockedusers`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function unblockUserReq(userid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/unblockfr/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getCurrentUserBestFriend() {
    return new Promise((resolve) => {
        fetch(`/misc/getbsf`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getMiniBio(userid: string) {
    return new Promise((resolve) => {
        fetch(`/misc/getminibio`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function updateMiniBio(userid: string, emoji: string, text: string) {
    return new Promise((resolve) => {
        fetch(`/misc/mkminibio`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid: userid, emoji: emoji, text: text })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function loadFeedStories() {
    return new Promise((resolve) => {
        fetch(`/story/feedstories`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getUserStories(userid: string) {
    return new Promise((resolve) => {
        fetch(`/story/getstories/${userid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function getUserStory(userid: string, storyid: string) {
    return new Promise((resolve) => {
        fetch(`/story/getstory/${userid}/${storyid}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function viewAStory(owneruserid: string, storyid: string, currentUserId: string) {
    return new Promise((resolve) => {
        fetch(`/story/viewstory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ owneruserid: owneruserid, storyid: storyid, currentUserId: currentUserId })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function addAUserStory(img: string) {
    return new Promise((resolve) => {
        fetch(`/story/addStory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storyimg: img })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}

async function deleteStory(storyid: string) {
    return new Promise((resolve) => {
        fetch(`/story/deleteStory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storyid: storyid })
        }).then((response) => { return response.json() })
        .then((data) => resolve(data.message))
    })
}