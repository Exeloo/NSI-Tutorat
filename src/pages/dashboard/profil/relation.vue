<template>
  <div>
    <div class="relation-title">
      Mes Relations 
    </div>
    <div>
      <div class="relation-global">
        <div v-if="sortedRelations.request.length > 0" style="color: var(--color-danger)">
          Vous avez {{ sortedRelations.request.length }} requête(s) en attente de votre réponse !
        </div>
        <div v-if="sortedRelations.pending.length > 0">
          Vous avez {{ sortedRelations.pending.length }} requête(s) en attente de la réponse de quelqu'un d'autre.
        </div>
        <div v-if="sortedRelations.cancel.length > 0">
          Vous avez {{ sortedRelations.cancel.length }} relation(s) en attente de suppression.
        </div>
      </div>
      <div class="relation-users">
        <div v-for="[k, v] of [...sortedRelations.request, ...sortedRelations.pending, ...sortedRelations.cancel, ...sortedRelations.accepted]">
          <div class="relation-user-title">
            <div v-if="sortedRelations.request.map(([key, value]) => key).includes(k)" style="color: var(--color-danger)">
              En attente de votre réponse !
            </div>
            <div v-else-if="sortedRelations.pending.map(([key, value]) => key).includes(k)" style="color: var(--color-orange)">
              En attente de la réponse de quelqu'un.
            </div>
            <div v-else-if="sortedRelations.cancel.map(([key, value]) => key).includes(k)" style="color: var(--color-danger)">
              En cours de suppression !
            </div>
            <div v-else-if="sortedRelations.accepted.map(([key, value]) => key).includes(k)" style="color: var(--color-success)">
              Tutorat en cours !
            </div>
          </div>
          <div class="relation-user-infos">
            <div class="relation-user-infos-list">
              <div>
                <LabelValues label="Matière(s)" :value="v.subjects" prefix />
              </div>
              <div>
                <div>
                  Participants :
                </div>
                <div class="relation-user-infos-list-sub-value">
                  <div v-for="userId of v.entrants" :style="`color: ${getAdd(k, userId) ? getAdd(k, userId) !== ' ( N\'a pas répondu )' ? 'var(--color-danger)' : 'var(--color-orange)' : ''}`">
                    <div v-if="userId === user.uid">
                      - Vous | {{ v.helpers.includes(userId) ? 'Tutorant' : 'Tutoré(e)' }}{{ getAdd(k, userId) }}
                    </div>
                    <div v-else-if="!publicUsers.get(userId)">
                      - Utilisateur introuvable {{ userId}} | {{ v.helpers.includes(userId) ? 'Tutorant' : 'Tutoré(e)' }}{{ getAdd(k, userId) }}
                    </div>
                    <div v-else @click="redirectToProfile(userId)" class="relation-user-link">
                      - {{ publicUsers.get(userId).displayName }} | {{ v.helpers.includes(userId) ? 'Tutorant' : 'Tutoré(e)' }}{{ getAdd(k, userId) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
                Le {{  v.time.day }} de {{ v.time.start }} à {{ v.time.end }}
            </div>
          </div>
          
          <div class="relation-user-buttons">
            <div v-if="sortedRelations.request.map(([key, value]) => key).includes(k)">
              <Button id="accept" label="Accepter" styles="success" :options="{ disabled: !!isLoading }" :loading="`accept-${k}` === isLoading" @click="relationAccept(k)" />
              <Button id="deny" label="Refuser" styles="danger" :options="{ disabled: !!isLoading }" :loading="`deny-${k}` === isLoading" @click="relationDeny(k)" />
            </div>
            <div v-else>
              <Button id="delete" label="Quitter la relation" styles="danger" :options="{ disabled: isDeleting === k || !!isLoading || isAdding === k }" @click="() => { textDeleteModel = ''; isDeleting = k; isAdding = '' }" />
            </div>
            <div v-if="!sortedRelations.request.map(([key, value]) => key).includes(k)">
              <Button id="add" label="Ajouter quelqu'un à la relation" styles="blurple" :options="{ disabled: !!isLoading || isDeleting === k || isAdding === k }" @click="() => { addModel = {tutorant: false, text: ''}; isAdding = k; isDeleting = ''; addReturn = '' }" />
            </div>
            <div>
              <Button id="chat" label="Aller sur le chat" styles="blurple" :options="{ disabled: !!isLoading }" @click="chatRedirect(k)" />
            </div>
          </div>
          <div v-if="isDeleting === k" class="relation-user-delete">
            <div>
              <div>
                Veuillez expliquer la raison de votre choix
              </div>
              <div>
                <textarea v-model="textDeleteModel" class="relation-delete-text-area" />
              </div>
            </div>
            <div class="relation-user-delete-buttons">
              <Button id="undo" label="Annuler" styles="blurple" :options="{ disabled: !!isLoading }" @click="() => { textDeleteModel = ''; isDeleting = '' }" />
              <Button id="delete-final" label="Quitter la relation" styles="danger" :options="{ disabled: !textDeleteModel || !!isLoading }" :loading="`delete-${k}` === isLoading" @click="relationDelete(k)" />
            </div>
          </div>
          <div v-else-if="isAdding === k" class="relation-user-delete">
            <div>
              <Checkbox id="add-tutorant" v-model="addModel.tutorant" styles="blurple" label="Est-ce un tutorant ? ( une personne qui donnera de l'aide )" />
            </div>
            <div>
              <div>
                Veuillez entrer l'adresse mail de le personne ( exemple@pedagogiefde.org )
              </div>
              <div>
                <input type="text" v-model="addModel.text" class="relation-delete-text-area" />
              </div>
            </div>
            <div v-if="addReturn" class="cal-val-return">
              {{ addReturn }}
            </div>
            <div class="relation-user-delete-buttons">
              <Button id="undo" label="Annuler" styles="blurple" :options="{ disabled: !!isLoading }" @click="() => { addModel = {tutorant: false, text: ''}; isAdding = '' }" />
              <Button id="add-final" label="Ajouter la personne" styles="success" :options="{ disabled: !addModel.text || !addModel.text.endsWith('@pedagogiefde.org') || !!isLoading }" :loading="`add-${k}` === isLoading" @click="relationAdd(k)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from '~/logic/data/auth/auth-manager'
import { getEntrants, hasRelationDeny, RelationData, relationSetUserStatut, setRelation } from '~/logic/data/firestore/datas/Relations'
import { getRelations, hasRelationAccept, hasRelationLeft, hasAllResponses, hasRelationResponse } from '~/logic/data/firestore/datas/Relations'
import { getForcedUsers, getUsers, UserData } from '~/logic/data/firestore/datas/Users';
import { toggleLoadingPage } from '~/main';

const relations = ref<Map<string, RelationData>>()
const publicUsers = ref<Map<string, UserData>>(getUsers())
const isDeleting = ref('')
const isAdding = ref('')
const isLoading = ref('')
const textDeleteModel = ref('')
const addModel = ref({ tutorant: false, text: '' })
const addReturn = ref('')
const router = useRouter()
const relationAdds = ref<Map<string, Map<string, string>>>(new Map<string, Map<string, string>>())
type SortedRelationType = {
  request: [string, RelationData][]
  pending: [string, RelationData][]
  cancel: [string, RelationData][]
  accepted: [string, RelationData][]
}

const sortedRelations = ref<SortedRelationType>({
  request: [],
  pending: [],
  cancel: [],
  accepted: [],
})

const redirectToProfile = (uid: string) => {
  router.push(`/dashboard/search/${uid}`)
}

const chatRedirect = (id: string) => {
  router.push(`/dashboard/chat/${id}`)
}

const relationAccept = async (id: string) => {
  isLoading.value = `accept-${id}`
  await relationSetUserStatut(id, (<UserData>user.value).uid, { statut: 'accepted' })
  await load()
  isLoading.value = ''
}

const relationDeny = async (id: string) => {
  isLoading.value = `deny-${id}`
  await relationSetUserStatut(id, (<UserData>user.value).uid, { statut: 'refused' })
  await load()
  isLoading.value = ''
}

const relationDelete = async (id: string) => {
  if (!textDeleteModel.value) return
  isLoading.value = `delete-${id}`
  await relationSetUserStatut(id, (<UserData>user.value).uid, { statut: 'leaved', return: textDeleteModel.value })
  await load()
  isDeleting.value = ''
  isLoading.value = ''
}

const getAdd = (id: string, uid: string) => {
  return relationAdds.value.get(id)?.get(uid)
}

const relationAdd = async (id: string) => {
  const currentRelation = relations.value?.get(id)
  const newMember = [...publicUsers.value].map(([key, value]) => value).filter(e => e.email === addModel.value.text)[0]
  if (!currentRelation || !newMember) {
    addReturn.value = 'Utilisateur introuvable'
    setTimeout(() => {addReturn.value = ''}, 5000)
    return
  }
  if (currentRelation.entrants.includes(newMember.uid)) {
    addReturn.value = 'Vous ne pouvez pas ajouter un membre déjà présent dans la relation !'
    setTimeout(() => {addReturn.value = ''}, 5000)
    return
  }
  isLoading.value = `add-${id}`
  await setRelation(id, {
    entrants: [...currentRelation.entrants, newMember.uid],
    helpers: addModel.value.tutorant ? [...currentRelation.helpers, newMember.uid] : currentRelation.helpers,
    receivers: !addModel.value.tutorant ? [...currentRelation.receivers, newMember.uid] : currentRelation.receivers,
  })
  await load()
  isAdding.value = ''
  isLoading.value = ''
}

const load = async () => {
  sortedRelations.value = {
    request: [],
    pending: [],
    cancel: [],
    accepted: [],
  }
  relationAdds.value = new Map<string, Map<string, string>>()
  relations.value = await getRelations()
  const adds = {
    left: ' ( Quitté )',
    deny: ' ( Refusé )',
    response: ' ( N\'a pas répondu )',
    accept: '',
  }
  for (const [k, v] of relations.value) {
    const data = await getEntrants(k)
    if (hasRelationLeft(data.get((<UserData>user.value).uid)))
      continue
    if (!hasRelationAccept(data.get((<UserData>user.value).uid)))
      sortedRelations.value.request.push([k, v])
    else if (!v.entrants.every(e => data.has(e)))
      sortedRelations.value.pending.push([k, v])
    else
      sortedRelations.value.accepted.push([k, v])

    const map = new Map<string, string>()
    for (const e of v.entrants) {
      if (!hasRelationResponse(data.get(e)))
        map.set(e, adds.response)
      else if (hasRelationDeny(data.get(e)))
        map.set(e, adds.deny)
      else if (hasRelationAccept(data.get(e)))
        map.set(e, adds.accept)
      else
        map.set(e, adds.left)
    }
    relationAdds.value.set(k, map)
  }
}

const load2 = async () => {
  toggleLoadingPage(true)
  publicUsers.value = await getForcedUsers()
  toggleLoadingPage(false)  
}

load()
if (publicUsers.value.size === 0) 
  load2()


setTimeout(() => {
  window.scrollTo({ top: 0 })
}, 100)
</script>

<style scoped>
.relation-title {
  font-size: 22px;
  margin: 10px 0 15px 0;
}

.relation-global {
  font-style: italic;
}

.relation-users {
  margin-top: 40px;
}

.relation-users > * {
  margin: 30px 0;
  padding-top: 20px;
  border-top: 1px solid black;
}

.relation-user-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.relation-user-infos {
  margin-bottom: 20px;
}

.relation-user-infos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 30px;
}

.relation-user-infos-list-sub-value {
  margin-left: 20px;
}

.relation-user-link {
  cursor: pointer;
}

.relation-user-buttons {
  display: flex;
  gap: 3rem;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
}

.relation-user-buttons > * {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.relation-user-delete {
  margin-top: 30px;
}

.relation-delete-text-area {
  border: none;
  outline: none;
  resize: none;
  border: solid 1px rgba(60,60,60,0.26);
  border-radius: 4px;
  max-width: 85%;
  width: max(400px, 50%);
  margin: 10px 0 20px 10px;
}

.relation-user-delete-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cal-val-return {
  font-size: 13px;
  font-style: italic;
  margin-bottom: 20px;
  color: var(--color-danger)
}

</style>

<route lang="yaml">
meta:
  layout: profil
</route>
