<template>
  <div class="chat-box">
    <div class="chat-side-bar">
      <div class="discussions">
        <button v-for="conv in convsCache" :key="conv[0]" class="button" @click="changeActiveChat(conv[0])">
          {{ conv[1].name }}
        </button>
      </div>
      <button class="add-chat" i="ic-outline-plus" />
    </div>

    <div class="right-side">
      <div class="chat-top-bar">
        <div>{{ activeChat.name }}</div>
        <button class="settings" i="ic-baseline-settings" />
      </div>

      <div v-if="activeChat" id="chat" class="messages" @scroll="onScrollChange()">
        <div
          v-for="msg in activeChat.messages"
          :key="msg.name"
          class="message"
          :class="user.value.data.uid === msg.author ? 'selfMsg' : 'otherMsg'"
        >
          <div class="aMessage">
            {{ msg.content }}
          </div>
        </div>
      </div>
      <div v-else>
        Lul
      </div>
      <div v-if="!scrollIsEnd" class="setScrollEnd" @click="setScrollEnd()">
        <div class="scrollText">
          Retour en bas du chat
        </div>
      </div>
      <div class="content">
        <form class="send-message">
          <button class="add-image" i="ic-baseline-image" />
          <Entry id="chat-entry" v-model="chatsValue[activeChat.id]" label="" type="text" placeholder="Envoyer un message" />
          <input class="send-button" value="" i="ic-round-send" @click="newMessage()">
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from '~/logic/data/auth/auth-manager'
import type { Conversation } from '~/logic/data/firestore/datas/Conversations'
import { convsCache, getFirstConvId, sendMessage } from '~/logic/data/firestore/datas/Conversations'

// Todo corriger la touche entrée dans le chat
// Ajouter le bouton et la fonction pour extand la conv

const chatsValue = reactive({})

const scrollIsEnd = ref(true)
const scrollStart = ref(true)
setTimeout(() => scrollStart.value = false, 700)

const onScrollChange = () => {
  const elem = document.getElementById('chat')
  if (elem && !scrollStart.value)
    scrollIsEnd.value = false
}

const setScrollEnd = () => {
  const elem = document.getElementById('chat')
  if (elem) {
    scrollStart.value = true
    setTimeout(() => scrollStart.value = false, 700)
    elem.scrollTop = elem.scrollHeight
    scrollIsEnd.value = true
  }
}

setTimeout(() => {
  setScrollEnd()
}, 100)

const activeChat = ref<Conversation | undefined>(convsCache.get(getFirstConvId()))

const newMessage = () => {
  const msg = chatsValue[activeChat.value.id]
  if (!activeChat.value || !msg) return
  sendMessage(activeChat.value.id, msg)
  chatsValue[activeChat.value.id] = ''
}



</script>

<style scoped>

.chat-box {
  display: flex;
  height: 70vh;
  width: 100vh;
  font-size: 2.5vh;
  background-color: var(--color-light-gray);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.add-chat {
  align-self: flex-start;
  font-size: 3.7vh;
  margin-left: 1vh;
  margin-bottom: 1vh;

}

.chat-side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--main-background);
  width: 50%;
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  z-index: 4;
}

.discussions {
  gap: 7px;
  font-size: 15.01px;
  display: flex;
  flex-direction: column-reverse;
}

.chat-top-bar {
  display: flex;
  padding: 1.5vh;
  justify-content: space-between;
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  z-index: 3;
  font-size: 15.01px;

}

.right-side {
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  justify-content: space-between;
}

.send-message {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5vh;
  gap: 7px;

}

.box {
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  height: 25px;
  width: 250px;
  padding: 3px;

}

.add-image {
  font-size: 3.3vh;
}

.send-button {
  font-size: 3.3vh;
  cursor: pointer;
}

.message {
  margin: 0 20px;
  max-width: 45%;
  width: fit-content;
  overflow: hidden;
}

.messages {
  overflow: auto;
  scroll-behavior: smooth;
}

.selfMsg {
  display: flex;
  width: fit-content;
  margin-left: auto;
  background-color: #296aa3;
  padding: 7px;
  border-radius: 10px;
  margin-bottom: 15px;

}

.otherMsg {
  background-color: #43b581;
  padding: 7px;
  width: fit-content;
  border-radius: 10px;
  margin-bottom: 15px;

}

.setScrollEnd {
  position: relative;
  top: -40px;
  left: 35%;
  cursor: pointer;
  width: 100%;
  height: 0px;
}

.scrollText {
  width: fit-content;
  padding: 6px;
  border-radius: 10px;
  background-color: #0000001d;
  font-size: 16px;

}

</style>
