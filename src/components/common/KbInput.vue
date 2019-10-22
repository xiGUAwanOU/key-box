<template>
  <div class="kb-input">
    <label>
      <span class="kb-label">{{ label }}</span>
      <div class="kb-inner-input-container">
        <input class="kb-inner-input" :type="type" :value="value" @input="onInput" autofocus>
        <div class="kb-inner-input-appended">
          <slot name="appended"/>
        </div>
      </div>
    </label>
    <span v-if="hasError" class="kb-error-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  props: {
    label: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
    hasError: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' }
  },

  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.kb-input {
  margin: 0.5em 0;
}

.kb-label {
  display: block;
  font-size: 0.9rem;
}

.kb-inner-input-container {
  display: flex;
}

.kb-inner-input {
  flex-grow: 1;
  box-sizing: border-box;
  border: 1px solid var(--theme-color-2);
  padding: 0.3rem;
  font-family: Roboto;
  font-size: 1rem;
  transition: 0.4s;
}

.kb-inner-input:focus {
  outline: none;
  box-shadow: 2px 2px var(--theme-color-3);
}

.kb-error-message {
  display: block;
  font-size: 0.8rem;
  color: red;
}
</style>
