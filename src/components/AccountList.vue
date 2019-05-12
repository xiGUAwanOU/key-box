<template>
  <div class="account-list">
    <div
      v-for="account in accounts"
      :key="account.id"
      class="account-item"
      :class="{ 'account-item--selected': selectedAccount && selectedAccount.id === account.id }"
      @click="onItemClick(account)"
    >
      <span class="account-name">{{ account.name }}</span>
      <span class="account-username">({{ account.username }})</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accounts: { type: Array, required: true },
    selectedAccount: { type: Object, default: null }
  },

  methods: {
    onItemClick (account) {
      this.$emit('select', account)
    }
  }
}
</script>

<style scoped>
.account-list {
  height: 300px;
  border: 1px solid var(--theme-color-2);
  overflow-y: scroll;
}

.account-item {
  border-bottom: 1px solid var(--theme-color-2);
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.4s;
}

.account-item:hover {
  background-color: var(--theme-color-2);
}

.account-item--selected {
  background-color: var(--theme-color-3);
}

.account-name {
  font-weight: bold;
}

.account-username {
  font-size: 0.8rem;
  padding-left: 0.5rem;
}
</style>
