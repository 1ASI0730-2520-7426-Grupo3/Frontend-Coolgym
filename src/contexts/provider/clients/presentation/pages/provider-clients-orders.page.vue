<template>
  <div class="wrap">
    <div class="content-grid">
      <div class="column-container">
        <ClientList />
        <TechnicianList />
      </div>

      <div class="column-container">
        <WorkOrderList />
      </div>
    </div>
  </div>
</template>

<script setup>
import ClientList from '../components/client-list.component.vue'
import TechnicianList from '../components/technician-list.component.vue'
import WorkOrderList from '../components/work-order-list.component.vue'

// Lógica de la página (e.g., carga de datos, gestión de estados, si es necesario)
</script>

<style scoped>
.wrap {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  font-size: 1.2rem;
  color: var(--muted);
  font-weight: 500;
  margin-bottom: 20px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.column-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 980px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
