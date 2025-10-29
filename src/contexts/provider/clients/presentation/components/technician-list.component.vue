<template>
  <div class="panel technician-panel">
    <h2 class="panel__title">{{ $t('provider.technicians.title') }}</h2>
    <div class="list">
      <div class="list-item"><span class="list-label">Pinillos Uribe Óscar</span></div>
      <div class="list-item"><span class="list-label">Rodríguez Monteza Juan</span></div>
      <div class="list-item"><span class="list-label">Sanchez Quispe Harold</span></div>
    </div>
    <a href="#" class="view-link">{{ $t('provider.technicians.viewList') }}</a>
  </div>
</template>

<script setup>
// Lógica de obtención de datos de técnicos y manejo de API va aquí.
</script>

<style scoped>
.list {
  border-top: 1px solid #000;
  padding-top: 10px;
  margin-bottom: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #000;
  font-size: 1rem;
}

.list-item:last-child {
  border-bottom: none;
}

.list-label {
  font-weight: 600;
}

.view-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  display: block;
  margin-top: 10px;
}
</style>
