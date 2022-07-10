<template>
  <div class="planning-init-container">
    <div class="planning-init-top">
      <div class="planning-init-title">
        Plannification des disponibilités
      </div>
      <div class="planning-init-sub-title">
        Nous vous demandons ici de donner les horaires où vous êtes disponible afin de pouvoir sélectionner une personne qui serait disponible en même temps que vous. Vous pouvez remplir ci dessous les horaires que vous souhaitez. Ces données pourront être modifiées plus tard.
      </div>
    </div>
    <div class="planning-init-calendar-container">
      <Schedule
        :options="model"
      />
    </div>
    <div class="planning-init-calendar-input-container">
      <InputSchedule v-model="model" />
    </div>
    <div class="planning-init-calendar-complete">
      <Button id="complete" label="Terminer" styles="blurple" :options="{disabled: !isGoodSchedule(model)}" @click="onButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, user } from '~/logic/data/auth/auth-manager'
import { setUser } from '~/logic/data/auth/user'
import { togglePageState } from '~/logic/pages/login'
import { isGoodSchedule } from '~/logic/pages/login/planning.login'

const model = ref([[], [], [], [], [], [], []])

const isButtonLoading = ref(false)

const onButtonClick = async() => {
  if (!isGoodSchedule(model.value)) return
  isButtonLoading.value = true
  await setUser(user.value.uid, { planning: model.value.map((e) => { return { times: e } }) })
  togglePageState({ id: 'loading', value: '' })
  await login()
}

</script>

<style scoped>
.planning-init-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.planning-init-calendar-container {
  margin-top: 70px;
  width: 100%;

}

.planning-init-top {
  width: min(700px, 90%);
}

.planning-init-title {
  margin-top: 40px;
  font-size: 22px;
  font-weight: 550;
}

.planning-init-sub-title {
  margin-top: 20px;
  font-size: 14px;
  color: var(--secondary-text-color);
}

.planning-init-calendar-input-container {
  margin-top: 20px;
  min-width: 700px;
}

.planning-init-calendar-complete {
  margin: 20px 0;
}

@media screen and (max-width: 1020px){
  .planning-init-container {
    width: 97%;
    flex-direction: column;
    margin-left: 7px;
  }
  .planning-init-calendar-container {
    min-width: 0;
    width: 95%;
    padding-left: calc(7vw + 25px);
    align-self: flex-start;
  }
  .planning-init-calendar-input-container {
    min-width: 0;
    width: 100%;
  }
}

@media screen and (max-width: 520px){
  .planning-init-container {
    width: 97%;

    flex-direction: column;
  }
  .planning-init-calendar-container {
    width: 95%;

  }

}

</style>
