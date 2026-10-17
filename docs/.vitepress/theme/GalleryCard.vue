<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{ number: string; title: string; href: string }>()
</script>

<template>
  <a class="project-card" :href="withBase(href)">
    <div class="project-card-image"><slot /></div>
    <div class="project-card-caption">
      <span class="project-card-number">{{ number }}</span>
      <span>{{ title }}</span>
      <span class="project-card-arrow" aria-hidden="true">→</span>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color .2s, box-shadow .2s;
}
.project-card:hover, .project-card:focus-visible {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 20px var(--vp-c-default-soft);
}
.project-card-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  padding: 16px;
  background: #fff;
}
.project-card-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 0;
}
.project-card-caption {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 14px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
}
.project-card-number { color: var(--vp-c-text-3); font-size: 12px; }
.project-card-arrow { margin-left: auto; color: var(--vp-c-brand-1); }
</style>
