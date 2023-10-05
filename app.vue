<script setup lang="ts">
const email = ref('')
const password = ref('')

async function signup() {
  const data = await $fetch('/api/auth/signup', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  })

  email.value = ''
  password.value = ''

  // eslint-disable-next-line no-console
  console.log(data)
}

async function login() {
  const data = await $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  })

  email.value = ''
  password.value = ''

  // eslint-disable-next-line no-console
  console.log(data)
}
</script>

<template>
  <div class="text-center">
    <!-- <NuxtWelcome /> -->
    <h1 class="text-gray-700 text-4xl mt-6">
      Cloudflare / Prisma + Neon
    </h1>
    <form action="#" class="mt-6 inline-block">
      <div class="mt-6">
        <label for="email">信箱：</label>
        <input id="email" v-model="email" type="email" class="border-gray-700 border rounded-md px-2 py-1">
      </div>
      <div class="mt-6">
        <label for="password">密碼：</label>
        <input id="password" v-model="password" type="password" class="border-gray-700 border rounded-md px-2 py-1">
      </div>
      <div class="mt-6">
        <button type="button" class="px-2 py-1 border border-gray-700 rounded-md hover:bg-slate-200" @click.prevent="signup">
          註冊
        </button>
        <button type="button" class="px-2 py-1 ml-4 border border-gray-700 rounded-md hover:bg-slate-200" @click.prevent="login">
          登入
        </button>
      </div>
    </form>
  </div>
</template>
