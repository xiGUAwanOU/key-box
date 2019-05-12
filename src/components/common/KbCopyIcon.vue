<template>
  <button class="kb-copy-icon" @click="copyToClipboard">
    <font-awesome-icon icon="copy"/>
  </button>
</template>

<script>
import ClipboardService from '@/services/ClipboardService'

export default {
  props: {
    text: { type: String, required: true }
  },

  methods: {
    copyToClipboard () {
      ClipboardService.copy(this.text)
    }
  }
}
</script>

<style scoped>
.kb-copy-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0 0.7rem;
  border: none;
  border-radius: 50%;
  color: var(--content-color-3);
  background-color: var(--theme-color-2);
  cursor: pointer;
  transition: 0.4s;
}

.kb-copy-icon:focus {
  outline: none;
}

.kb-copy-icon:hover {
  box-shadow: 2px 2px var(--theme-color-3);
}
</style>
