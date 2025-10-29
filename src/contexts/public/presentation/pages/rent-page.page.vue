<template>
  <section class="panel">
    <h2 class="panel__title">Rent Machines</h2>

    <div v-if="isLoading" class="loading-message">Cargando máquinas disponibles para renta...</div>

    <div v-else-if="error" class="error-box">
      <p class="error-title">Error al cargar datos</p>
      <p class="error-detail">
        No se pudieron obtener las máquinas de renta. Por favor, verifica tu backend/servidor local.
        <span v-if="error?.message">Detalle: {{ error.message }}</span>
      </p>
    </div>

    <div v-else class="card-container">
      <div v-for="m in rentMachines" :key="m.id" class="machine-unit">
        <MachineCard
          :machineId="m.id"
          :img="m.img"
          :title="m.title"
          :subtitle="m.price"
          :isPrice="true"
        />

        <button @click="handleMachineSelect(m.id)" class="request-button">Request</button>
      </div>

      <p v-if="!isLoading && rentMachines.length === 0" class="no-data-message">
        No hay máquinas de renta disponibles en este momento.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MachineCard from '@/shared-kernel/presentation/ui/components/machine-card.component.vue'
import { http } from '@/shared-kernel/infrastructure/http.js'

const rentMachines = ref([])
const isLoading = ref(false)
const error = ref(null)

const formatCurrency = (amount, currency = 'USD') => {
  const numericAmount = parseFloat(amount)
  if (isNaN(numericAmount)) {
    return 'Precio no disponible'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount)
}

const fetchRentMachines = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await http.get('/rentalCatalog')

    if (Array.isArray(response.data)) {
      rentMachines.value = response.data.map((item) => ({
        id: item.id || crypto.randomUUID(),
        title: item.equipmentName || 'Máquina de Renta',
        img: item.imageUrl || 'https://placehold.co/400x300/4169e1/ffffff?text=No+Image',
        price: formatCurrency(item.monthlyPriceUSD, item.currency || 'USD') + ' / month',
      }))
    } else {
      throw new Error('La respuesta del servidor no devolvió una lista válida de máquinas.')
    }
  } catch (err) {
    console.error('Error fetching rental catalog:', err)
    error.value = err

    console.log(
      `[ERROR DE CARGA] No se pudieron obtener los datos: ${err.message || 'Error desconocido'}`,
    )
  } finally {
    isLoading.value = false
  }
}

const handleMachineSelect = (id) => {
  console.log(`[ACCION] Botón 'Request' presionado para la máquina ID: ${id}`)
}

onMounted(() => {
  fetchRentMachines()
})
</script>

<style scoped>
.panel {
  background: #fdfdfd;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  min-height: 80vh;
  margin: 20px;
}

.panel__title {
  margin-bottom: 25px;
  color: #3b82f6;
  font-size: 2rem;
  font-weight: bold;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 10px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.machine-unit {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.machine-unit > :deep(.machine-card) {
  flex-grow: 1;

  margin-bottom: 0;
  border-radius: 12px;
}

.request-button {
  margin-top: 15px;

  width: 100%;
  padding: 10px 15px;
  background-color: #10b981;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.1s;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
}

.request-button:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

.loading-message,
.no-data-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1rem;
  color: #6c757d;
}

.error-box {
  padding: 20px;
  background-color: #ffebeb;
  border: 1px solid #ff7f7f;
  color: #cc0000;
  border-radius: 8px;
  margin-top: 20px;
}

.error-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.error-detail {
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
