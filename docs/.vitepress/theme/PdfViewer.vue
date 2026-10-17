<script setup lang="ts">
defineProps<{ src: string }>()
</script>

<template>
  <span class="pdf-viewer">
    <iframe :src="src" title="Assembly guide PDF" loading="lazy" />
    <a :href="src" target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a>
  </span>
</template>

<style scoped>
.pdf-viewer {
  display: block;
  margin: 16px 0;
}

.pdf-viewer iframe {
  display: block;
  width: 100%;
  height: 75vh;
  min-height: 360px;
  max-height: 800px;
  margin-bottom: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
