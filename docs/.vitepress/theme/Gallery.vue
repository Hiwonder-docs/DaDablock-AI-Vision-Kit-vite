<template>
  <div class="project-gallery"><slot /></div>
</template>

<style scoped>
.project-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
  gap: 20px;
  margin: 24px 0;
}
</style>
