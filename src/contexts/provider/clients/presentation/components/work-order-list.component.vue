<template>
  <div class="panel work-orders-panel">
    <h2 class="panel__title">{{ $t('provider.workOrders.title') }}</h2>
    <div class="work-orders-list">
      <p class="order-item">Order #00087 - Preventive Maintenance - 15/04/2025</p>
      <p class="order-item">Order #00086 - Compressor Repair - 10/04/2025</p>
      <p class="order-item">Order #00085 -General Inspection - 09/04/2025</p>
    </div>
    <a href="#" class="view-link">{{ $t('provider.workOrders.viewOrders') }}</a>
  </div>
</template>

<script setup>
// Lógica de obtención de datos de órdenes de trabajo y manejo de API va aquí.
</script>

<style scoped>
.work-orders-panel {
  flex-grow: 1;
}

.work-orders-list {
  border-top: 1px solid #000;
  padding: 10px 0;
  margin-bottom: 10px;
}

.order-item {
  padding: 10px 0;
  border-bottom: 1px solid #000;
  font-weight: 600;
}

.order-item:last-child {
  border-bottom: none;
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
