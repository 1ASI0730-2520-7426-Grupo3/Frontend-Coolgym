<template>
  <section class="panel">
    <h2 class="panel__title">My Machines</h2>

    <div class="cards">
      <MachineCard
        v-for="m in myMachines"
        :key="m.id"
        :img="m.img"
        :title="m.name"
      />
    </div>
  </section>
</template>

<script setup>
import MachineCard from '@/shared-kernel/presentation/ui/components/machine-card.component.vue'

const myMachines = [
  { id: 1, name: 'Treadmill Pro X', img: '/assets/images/treadmill.png' },
  { id: 2, name: 'Stationary Bike GX', img: '/assets/images/bike.png' },
  { id: 3, name: 'Elliptical Trainer E-500', img: '/assets/images/bike.png' },
]
</script>

<style scoped>
.panel {
  background: var(--panel);
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(23, 43, 77, 0.08);
}

.panel__title {
  margin-bottom: 16px;
  color: var(--primary);
  font-size: 1.6rem;
  font-weight: 800;
}

.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
