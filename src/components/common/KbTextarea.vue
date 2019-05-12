<template>
  <div class="kb-textarea">
    <label>
      <span class="kb-label">{{ label }}</span>
      <textarea class="kb-inner-textarea" rows="3" :value="value" @input="onInput"/>
    </label>
    <span v-if="hasError" class="kb-error-message">{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  props: {
    label: { type: String, required: true },
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
.kb-textarea{
  margin: 0.5em 0;
}

.kb-label {
  display: block;
  font-size: 0.9rem;
}

.kb-inner-textarea {
  display: block;
  resize: none;
  box-sizing: border-box;
  border: 1px solid var(--theme-color-2);
  width: 100%;
  padding: 0.3rem;
  font-family: Roboto;
  font-size: 1rem;
  overflow-y: scroll;
  transition: 0.4s;
}

.kb-inner-textarea:focus {
  outline: none;
  box-shadow: 2px 2px var(--theme-color-3);
}

.kb-error-message {
  display: block;
  font-size: 0.8rem;
  color: red;
}
</style>
