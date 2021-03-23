<template>
  <div class="accounts">
    <div class="action-buttons">
      <kb-button class="add-new-button" icon="plus-circle" @click="addNewAccount">Add new</kb-button>
      <kb-button class="import-button" icon="file-import" @click="selectAccountFile">Import</kb-button>
      <input ref="hiddenFileInput" type="file" hidden @change="importAccounts">
    </div>
    <div class="account-list-container">
      <kb-input type="text" label="Search" v-model="search">
        <template slot="appended">
          <kb-button icon="backspace" @click="clearSearch" />
        </template>
      </kb-input>
      <account-list
        :accounts="accountsForDisplaying"
        :selected-account="selectedAccount"
        @select="changeSelectedAccount"
      />
    </div>
    <div class="account-details-container">
      <account-details
        v-if="selectedAccount && !editingSelected"
        :account="selectedAccount"
        @edit="editAccount"
        @delete="deleteAccount"
      />
      <account-editor
        v-else-if="selectedAccount && editingSelected"
        :account="selectedAccount"
        @save="saveEditing"
        @cancel="cancelEditing"
      />
      <span v-else class="no-selected-message">Please select an account from the list above.</span>
    </div>
  </div>
</template>

<script>
import AccountService from '@/services/AccountService'

import AccountList from '@/components/AccountList.vue'
import AccountDetails from '@/components/AccountDetails.vue'
import AccountEditor from '@/components/AccountEditor.vue'

export default {
  components: {
    AccountList,
    AccountDetails,
    AccountEditor
  },

  data () {
    return {
      search: '',
      selectedAccount: null,
      editingSelected: false,
      accounts: []
    }
  },

  computed: {
    accountsForDisplaying () {
      const copiedAccounts = [...this.accounts]
      return copiedAccounts.sort((account1, account2) => {
        const name1 = account1.name.toLowerCase()
        const name2 = account2.name.toLowerCase()
        if (name1 < name2) {
          return -1
        } else if (name1 > name2) {
          return 1
        } else {
          return 0
        }
      }).filter(account => account.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },

  created () {
    this.reload()
  },

  methods: {
    async reload () {
      this.accounts = await AccountService.getAll()
    },

    clearSearch () {
      this.search = ''
    },

    addNewAccount () {
      this.selectedAccount = AccountService.getNew()
      this.editingSelected = true
    },

    selectAccountFile () {
      this.$refs.hiddenFileInput.click()
    },

    async importAccounts (event) {
      const accountFilePath = event.target.files[0].path
      await AccountService.mergeFromFile(accountFilePath)
      this.reload()
    },

    editAccount () {
      this.editingSelected = true
    },

    async deleteAccount () {
      const index = this.accounts.findIndex(account => account.id === this.selectedAccount.id)
      if (index >= 0) {
        this.accounts.splice(index, 1)
      }
      await AccountService.saveAll(this.accounts)
    },

    async saveEditing (modifiedAccount) {
      const index = this.accounts.findIndex(account => account.id === this.selectedAccount.id)
      if (index >= 0) {
        this.$set(this.accounts, index, modifiedAccount)
      } else {
        this.accounts.push(modifiedAccount)
      }
      this.selectedAccount = modifiedAccount
      this.editingSelected = false
      await AccountService.saveAll(this.accounts)
    },

    cancelEditing () {
      this.editingSelected = false
    },

    changeSelectedAccount (selectedAccount) {
      this.selectedAccount = selectedAccount
    }
  }
}
</script>

<style scoped>
.import-button {
  margin-left: 0.6em;
}

.account-details-container {
  height: 300px;
  margin-top: 0.5em;
  border: 1px solid var(--theme-color-2);
  padding: 0.5rem;
}
</style>
