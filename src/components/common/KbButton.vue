<template>
  <button class="kb-button" @click="onClick">
    <font-awesome-icon v-if="icon" class="kb-button-icon" :icon="icon"/>
    <span v-if="$slots.default" class="kb-button-text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: '' }
  },

  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.kb-button {
  border: 1px solid var(--theme-color-2);
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  color: var(--content-color-3);
  background-color: var(--theme-color-2);
  cursor: pointer;
  transition: 0.4s;
}

.kb-button:focus {
  outline: none;
}

.kb-button:hover {
  box-shadow: 2px 2px var(--theme-color-3);
}

.kb-button-icon+.kb-button-text {
  margin-left: 0.5rem;
}
</style>
