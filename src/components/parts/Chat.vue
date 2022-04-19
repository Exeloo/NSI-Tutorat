<template>
  <div class="chat-box">
    <div v-for="conv in convs" :key="conv.id" class="conv">

      {{ conv.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>

const convs = ref([
  {
    id: '1',
    name: undefined,
    entrants: ['id_personne_1', 'id_personne_2'], // Il n'y a que 2 personnes, donc il n'y a pas de nom
    messages: [
      { content: 'un message', author: 'id_personne_2', timestamp: 'je sais pas je connais pas l\'heure d\'envoie du msg' },
      { content: 'un autre message', author: 'id_personne_1', timestamp: 'je sais pas je connais pas l\'heure d\'envoie du msg non plus' },
    ],
  },
  {
    id: '2',
    name: 'une conv A',
    entrants: ['id_personne_1', 'id_personne_2', 'id_personne_3'], // Il y a 3 personnes, donc on pourrait mettre un nom de groupe (pas obligatoire)
    messages: [
      { content: 'un message', author: 'id_personne_2', timestamp: 'je sais pas je connais toujours pas l\'heure d\'envoie du msg' },
      { content: 'un autre message', author: 'id_personne_3', timestamp: 'vous commencez vraiment à m\'emerder avec cet heure' },
    ],
  },
])
type Message = { content: string; author: string; timestamp: Date }
type Conv = { id: string; name: string; entrants: string[]; messages: Message[] }
const activeConv = ref<Conv>({ id: '', name: '', entrants: [], messages: [] })

</script>

<style scoped>

.chat-box {
  height: 70vh;
  width: 40vh;
  background-color: var(--main-background);
  font-size: 2.5vh;
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

</style>
