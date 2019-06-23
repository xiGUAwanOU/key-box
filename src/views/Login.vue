<template>
  <div class="login">
    <h1>Key Box</h1>
    <kb-input
      type="password"
      label="Password"
      errorMessage="Password incorrect!"
      :has-error="error"
      v-model="password"
      @keyup.native.enter="unlock"
    />
    <kb-button icon="unlock-alt" @click="unlock">Unlock</kb-button>
  </div>
</template>

<script>
import AccountService from '@/services/AccountService'

export default {
  data () {
    return {
      showPassword: false,
      password: '',
      error: false
    }
  },

  methods: {
    async unlock () {
      if (await AccountService.initialize(this.password)) {
        this.error = false
        this.$router.push('accounts')
      } else {
        this.password = ''
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 300px;
  margin: 0 auto;
}
</style>
