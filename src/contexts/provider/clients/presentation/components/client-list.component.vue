<template>
  <div class="panel client-panel">
    <h2 class="panel__title">{{ $t('provider.clients.title') }}</h2>
    <div class="list">
      <div class="list-item">
        <span class="list-label">FitLife Gym S.A.C.</span>
        <span class="list-date">15/04/25</span>
      </div>
      <div class="list-item">
        <span class="list-label">PowerHouse Training SRL</span>
        <span class="list-date">10/04/25</span>
      </div>
      <div class="list-item">
        <span class="list-label">UrbanFit Studio S.A.C.</span>
        <span class="list-date">09/04/25</span>
      </div>
    </div>
    <a href="#" class="view-link">{{ $t('provider.clients.viewHistory') }}</a>
  </div>
</template>

<script setup>
// Lógica de obtención de datos de clientes y manejo de API va aquí.
</script>

<style scoped>
.client-panel {
  flex-grow: 1;
}
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

.list-date {
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
