<template>
  <div class="TopBar">
    <div class="title">
      <div class="icon" i="ic-outline-school" />
      <div class="text">
        Tutorat Fde
      </div>
    </div>
    <div>
      <button class="">
        <div class="icon" i="carbon-notification" />
        <div class="text">
          Notifications
        </div>
      </button>

      <button class="">
        <div class="icon" i="ic-round-account-circle" />
        <div class="text">
          {{ user.value.data.displayName }}
        </div>
      </button>
    </div>
  </div>

  <div class="notif-popup popup">
    <div class="notif-topbar">
      Dernieres notifications :
    </div>
    <div v-for="notififications in notifs" :key="notifs.id" class="notif-content">
      -> {{ notififications.content }}
    </div>
  </div>

  <div class="profile-popup popup">
    <div class="profile-content">
      <div>content 1</div>
      <div>content 2</div>
      <div>content 3</div>
      <div>content 4</div>
      <div>content 5</div>
      <div>content 6</div>
      <div>content 7</div>
      <div>content 8</div>
    </div>

  </div>


</template>

<script setup lang="ts" await>
import { user } from '~/logic/data/auth/auth-manager'

const notifs = [
  {id:"1",date:"",lvl:"1",name:"new-message",content:"Vous avez une nouveau message"},
  {id:"2",date:"",lvl:"1",name:"new-class",content:"Cours ajouté pour le 16/09"},
  {id:"3",date:"",lvl:"1",name:"class-cancel",content:"Votre cours du 15/03 a 10h est annulé"},
  {id:"4",date:"",lvl:"1",name:"new-message",content:"Vous avez une nouveau message"}
]
</script>

<style scoped>

.TopBar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 2.5vh;
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

button {
  display: flex;
  align-items: center;
  padding: 2vh;
}

.TopBar * {
  display: flex;
}

.TopBar .title {
  display: flex;
  align-items: center;
  padding: 1.5vh;
  cursor: default;
}

.TopBar .text {
  margin-left: 1vh;
}

@media screen and (max-width: 520px){
  .TopBar .text{
    font-size: 0;
  }
}

.popup {
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

.notif-popup {
  position: absolute;
  height: 50vh;
  width: 40vh;
  top: 70px;
  right: 350px;
}

.profile-popup {
  position: absolute;
  height: 50vh;
  width: 40vh;
  top: 70px;
  right: 75px;
}

.notif-topbar {
  font-size: 3vh;
  padding-top: 1vh;
  padding-left: 1.5vh;
  padding-bottom: 0.7vh;
  border-width: 0 0 1px 0;

}

.profile-content {
  font-size: 3.5vh;
}

.notif-content {
  border-width: 0 0 0.5px 0;
  font-size: 2.5vh;
}

</style>
