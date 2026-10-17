<script setup lang="ts">
import { ref } from 'vue'
import KitVersionDialog from './KitVersionDialog.vue'

const dialog = ref<InstanceType<typeof KitVersionDialog> | null>(null)
</script>

<template>
  <div class="kit-version-guide">
    <button type="button" class="kit-version-guide__button" @click="dialog?.open()">
      Choose version
    </button>
    <KitVersionDialog ref="dialog" />
  </div>
</template>

<style scoped>
.kit-version-guide {
  margin: 24px 0;
}

.kit-version-guide__button {
  padding: 10px 20px;
  border-radius: 8px;
  background: #ff9d28;
  color: #422100;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.kit-version-guide__button:hover {
  background: #ffae4f;
}

.kit-version-guide__button:focus-visible {
  outline: 3px solid #b45b00;
  outline-offset: 3px;
}
</style>
