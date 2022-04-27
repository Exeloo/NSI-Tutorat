<template>
  <div class="chat-box">
    <div class="chat-side-bar">
      <div class="discussions">
        <button v-for="conv in convs" :key="conv.id" class="button" @click="changeActiveChat(conv.id)">
          {{ conv.name }}
        </button>
      </div>
      <button class="add-chat" i="ic-outline-plus" />
    </div>

    <div class="right-side">
      <div class="chat-top-bar">
        <div>{{ activeChat.name }}</div>
        <button class="settings" i="ic-baseline-settings" />
      </div>

      <div v-for="mess in activeChat.messages" :key="mess.id" >
        {{ mess.content }}
      </div>

      <div class="content">
        <form class="send-message">
          <button class="add-image" i="ic-baseline-image"/>
          <br>
          <textarea id="messageContent" class="box" /><br>
          <input class="send-button" value="" i="ic-round-send" @click="sendMessage()" >
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const convs = ref<Conv[]>([
  {
    id: '1',
    name: 'une conv A',
    entrants: ['id_personne_1', 'id_personne_2'], // Il n'y a que 2 personnes, donc il n'y a pas de nom
    messages: [
      { id: '1-1', content: 'un message', author: 'id_personne_2', timestamp: 'je sais pas je connais pas l\'heure d\'envoie du msg' },
      { id: '1-2', content: 'un autre message', author: 'id_personne_1', timestamp: 'je sais pas je connais pas l\'heure d\'envoie du msg non plus' },
    ],
  },
  {
    id: '2',
    name: 'une conv B',
    entrants: ['id_personne_1', 'id_personne_2', 'id_personne_3'], // Il y a 3 personnes, donc on pourrait mettre un nom de groupe (pas obligatoire)
    messages: [
      { id: '2-1', content: 'un message', author: 'id_personne_2', timestamp: 'je sais pas je connais toujours pas l\'heure d\'envoie du msg' },
      { id: '2-2', content: 'un autre message', author: 'id_personne_3', timestamp: 'vous commencez vraiment à m\'emerder avec cet heure' },
    ],
  },
])
interface Message { id: string; content: string; author: string; timestamp: string }
interface Conv { id: string; name: string; entrants: string[]; messages: Message[] }

const activeChat = ref<Conv>(convs.value[0])

const sendMessage = (message: string) => {
  console.log(document.getElementById("messageContent").value)
}

const changeActiveChat = (id: string) => {
  const filter = convs.value.filter(v => v.id === id)
  if (filter.length !== 0) activeChat.value = filter[0]
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
}


</style>
