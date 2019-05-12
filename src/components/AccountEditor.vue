<template>
  <div class="account-editor">
    <div class="account-editor-toolbar">
      <kb-button class="confirm-button" icon="check" @click="emitSaveEvent">Save</kb-button>
      <kb-button class="cancel-button" icon="times" @click="emitCancelEvent">Cancel</kb-button>
    </div>
    <kb-input type="text" label="Name" v-model="accountForEditing.name"/>
    <kb-input type="text" label="Username" v-model="accountForEditing.username"/>
    <kb-input
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      v-model="accountForEditing.password"
    >
      <template slot="appended">
        <kb-button
          class="hide-password-button"
          :icon="showPassword ? 'eye-slash':'eye'"
          @click="showPassword = !showPassword"
        />
        <kb-button class="random-password-button" icon="dice" @click="generateRandomPassword"/>
      </template>
    </kb-input>
    <kb-textarea label="Description" v-model="accountForEditing.description"/>
  </div>
</template>

<script>
import AccountService from '@/services/AccountService'

export default {
  props: {
    account: { type: Object, required: true }
  },

  data () {
    return {
      accountForEditing: null,
      showPassword: false
    }
  },

  created () {
    this.accountForEditing = JSON.parse(JSON.stringify(this.account))
  },

  methods: {
    generateRandomPassword () {
      this.accountForEditing.password = AccountService.generateRandomPassword()
    },

    emitSaveEvent () {
      this.accountForEditing.modifiedAt = Date.now()
      this.$emit('save', this.accountForEditing)
    },

    emitCancelEvent () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.cancel-button {
  margin-left: 0.6rem;
}
</style>
