<template>
  <card>
    <template #title>
      Login
    </template>
    <template #label>
      Log in to your account to give feedback
    </template>

    <div class="login-options">
      <Button type="primary" @click="loginRedirect" :full-width="true">
        Login
      </Button>
    </div>
    <p style="text-align: center;">or sign in with</p>
    <div class="sso-options">
      <Button type="secondary" @click="loginWithDiscourse" :full-width="true">
        <img src="../../assets/discourse-logo.png" alt="Discourse" class="sso-logo" />
        Community
      </Button>
      <Button type="secondary" @click="loginWithFreshdesk" :full-width="true">
        <img src="../../assets/discourse-logo.png" alt="Freshdesk" class="sso-logo" />
        Developer
      </Button>
      <Button type="secondary" @click="loginWithFreshservice" :full-width="true">
        <img src="../../assets/freshservice-logo.png" alt="Freshservice" class="sso-logo" />
        Freshservice
      </Button>
      <Button type="secondary" @click="loginWithGmail" :full-width="true">
        <img src="../../assets/google-logo.png" alt="Google" class="sso-logo" />
        Google
      </Button>
    </div>
  </card>
</template>

<script setup lang="ts">
import { router } from "../../router";

// components
import Card from "../ui/Card.vue";
import Button from "../ui/Button.vue";

function loginRedirect() {
  const route = router.currentRoute.value;

  router.push({
    path: "/login",
    query: {
      redirect: route.fullPath
    }
  });
}

const loginWithDiscourse = () => {
  window.location.href = "https://community.freshworks.dev/login";
};

const loginWithFreshdesk = () => {
  window.location.href = "https://developers.freshworks.com/developer/";
};

const loginWithFreshservice = () => {
  window.location.href = "https://freshworksssotest.freshworks.com";
};

const loginWithGmail = () => {
  window.location.href = "https://accounts.google.com/signin";
};
</script>

<style scoped>
.login-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.sso-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.sso-logo {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}
</style>
