<template>
  <div class="account-details">
    <div class="account-details-toolbar">
      <kb-button class="edit-button" icon="edit" @click="emitEditEvent">Edit</kb-button>
      <kb-button class="delete-button" icon="trash-alt" @click="emitDeleteEvent">Delete</kb-button>
    </div>

    <table class="key-value-table">
      <tr>
        <td class="key-column">Name</td>
        <td class="value-column">{{ account.name }}</td>
      </tr>
      <tr>
        <td class="key-column">Username</td>
        <td class="value-column">
          {{ account.username }}
          <kb-copy-icon :text="account.username"/>
        </td>
      </tr>
      <tr>
        <td class="key-column">Password</td>
        <td class="value-column">
          &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;
          <kb-copy-icon :text="account.password"/>
        </td>
      </tr>
      <tr>
        <td class="key-column">Description</td>
        <td class="value-column">{{ account.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    account: { type: Object, required: true }
  },

  methods: {
    emitEditEvent () {
      this.$emit('edit', this.account)
    },

    emitDeleteEvent () {
      this.$emit('delete', this.account)
    }
  }
}
</script>

<style scoped>
.delete-button {
  margin-left: 0.6rem;
}

.key-value-table {
  margin-top: 1rem;
}

.key-column,
.value-column {
  height: 30px;
  vertical-align: baseline;
}

.key-column {
  width: 100px;
  font-weight: bold;
}
</style>
