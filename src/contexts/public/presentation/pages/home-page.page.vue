<template>
  <section class="grid">
    <!-- My machines -->
    <div class="panel">
      <h2 class="panel__title">My machines</h2>
      <template v-if="isLoading.myMachines">
        <p class="muted">Cargando tus máquinas...</p>
      </template>
      <template v-else-if="error.myMachines">
        <p class="text-red-500">Error al cargar máquinas: {{ error.myMachines.message }}</p>
      </template>
      <div v-else class="cards">
        <!-- Mostrar My Machines -->
        <MachineCard v-for="m in myMachines" :key="m.id" :img="m.img" :title="m.name" />
      </div>
      <p v-if="!isLoading.myMachines && myMachines.length === 0" class="muted spacer">
        No tienes máquinas asignadas.
      </p>
    </div>

    <!-- Rent machines -->
    <div class="panel">
      <h2 class="panel__title">Rent machines</h2>
      <template v-if="isLoading.rentMachines">
        <p class="muted">Cargando máquinas de renta...</p>
      </template>
      <template v-else-if="error.rentMachines">
        <p class="text-red-500">Error al cargar rentas: {{ error.rentMachines.message }}</p>
      </template>
      <div v-else class="cards">
        <!-- Mostrar Rent Machines -->
        <MachineCard
          v-for="m in rentMachines"
          :key="m.id"
          :img="m.img"
          :title="m.name"
          :subtitle="m.price"
          :isPrice="true"
        />
      </div>
      <p v-if="!isLoading.rentMachines && rentMachines.length === 0" class="muted spacer">
        No hay máquinas disponibles para renta.
      </p>
    </div>

    <!-- Maintenance -->
    <div class="panel">
      <h2 class="panel__title">Maintenance</h2>
      <template v-if="isLoading.maintenance">
        <p class="muted">Cargando solicitudes de mantenimiento...</p>
      </template>
      <template v-else-if="error.maintenance">
        <p class="text-red-500">Error de mantenimiento: {{ error.maintenance.message }}</p>
      </template>
      <ul v-else-if="maintenance.length > 0" class="list">
        <!-- El status "Done" usa badge--ok, "Pending" usa badge--warn -->
        <li class="list__item" v-for="i in maintenance" :key="i.id">
          <span class="list__label">{{ i.equipmentName }}</span>
          <span class="badge" :class="i.status === 'Done' ? 'badge--ok' : 'badge--warn'">{{
              i.status
            }}</span>
        </li>
      </ul>
      <p v-else class="muted spacer">
        Aquí se mostrarán las solicitudes de mantenimiento de tu equipo.
      </p>
    </div>

    <!-- Account statement -->
    <div class="panel">
      <h2 class="panel__title">Account statement</h2>
      <template v-if="isLoading.account">
        <p class="muted">Cargando extracto de cuenta...</p>
      </template>
      <template v-else-if="error.account">
        <p class="text-red-500">Error de cuenta: {{ error.account.message }}</p>
      </template>
      <ul v-else-if="account.length > 0" class="list">
        <li class="list__item" v-for="t in account" :key="t.id">
          <span class="list__label">{{ t.entity }}</span>
          <!-- Aseguramos que el monto tenga formato de moneda (ej: S/.) -->
          <span class="list__amount">{{ t.amount }}</span>
          <!-- Usamos las clases correctas (Done = badge--ok, Pending/Open = badge--warn) -->
          <span class="badge" :class="t.status === 'Done' ? 'badge--ok' : 'badge--warn'">{{
              t.status
            }}</span>
        </li>
      </ul>
      <p v-else class="muted spacer">Aquí se mostrará el estado de cuenta de tus transacciones.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Asegúrate de que esta ruta sea correcta para tu proyecto
import MachineCard from '@/shared-kernel/presentation/ui/components/machine-card.component.vue'
import { http } from '@/shared-kernel/infrastructure/http' // Cliente HTTP simulado o real

// --- Estados Reactivos ---
const myMachines = ref([])
const rentMachines = ref([])
const maintenance = ref([])
const account = ref([])

// Estados de Carga (para cada sección)
const isLoading = ref({
  myMachines: true,
  rentMachines: true,
  maintenance: true,
  account: true,
})

// Estados de Error
const error = ref({
  myMachines: null,
  rentMachines: null,
  maintenance: null,
  account: null,
})

// --- Constantes de Filtrado (Se mantienen) ---
const myMachineIds = [1, 2]
const rentOrder = [2, 1]
const USER_ID = 1;

// --- Lógica de Ayuda ---

/**
 * Función auxiliar para formatear montos a moneda.
 */
const formatCurrency = (amount, currency = 'PEN') => {
  if (typeof amount !== 'number') {
    return amount;
  }
  // Formato para Soles Peruanos (S/.) o la moneda especificada
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Función auxiliar para capitalizar el estado y mapear estados internos a visualización.
 */
const capitalizeStatus = (status) => {
  if (!status) return 'N/A';
  const lowerStatus = status.toLowerCase();

  // Mapea a 'Done' para estados completados o pagados (color verde)
  if (lowerStatus === 'paid' || lowerStatus === 'completed' || lowerStatus === 'resolved' || lowerStatus === 'done') return 'Done';

  // Mapea a 'Pending' para estados que requieren atención (color rojo/amarillo)
  if (lowerStatus === 'pending' || lowerStatus === 'pending_maintenance' || lowerStatus === 'open') return 'Pending';

  // Capitaliza si no es ninguno de los anteriores
  return status.charAt(0).toUpperCase() + status.slice(1);
};


// --- Lógica de Carga de Datos ---

/**
 * Carga los datos de las máquinas (propias y de renta).
 */
const fetchEquipment = async () => {
  isLoading.value.myMachines = true
  isLoading.value.rentMachines = true
  error.value.myMachines = null
  error.value.rentMachines = null

  try {
    const { data: equipmentDataRaw } = await http.get('/equipment')
    const { data: rentalCatalog } = await http.get('/rentalCatalog')

    // 1. Crear mapa de equipos base
    const equipmentMap = new Map(equipmentDataRaw.map((e) => [e.id, {
      id: e.id,
      name: e.name,
      price: e.price,
      img: e.images && e.images.length > 0 ? e.images[0] : '/assets/images/placeholder.png',
      isPrice: !!e.price,
    }]));

    // 2. Filtrar My Machines (Se mantiene la lógica original)
    myMachines.value = myMachineIds
      .map(id => equipmentMap.get(id))
      .filter(m => m !== undefined);


    // 3. Filtrar Rent Machines y aplicar orden y precios del catálogo (Se mantiene la lógica original)
    const rentalMap = new Map(rentalCatalog.map(r => [r.id, r]));

    rentMachines.value = rentOrder
      .map((id) => {
        const catalogItem = rentalMap.get(id);
        if (catalogItem) {
          return {
            id: id,
            name: catalogItem.equipmentName,
            img: catalogItem.imageUrl || equipmentMap.get(id)?.img || '/assets/images/placeholder.png',
            price: formatCurrency(catalogItem.monthlyPriceUSD, catalogItem.currency) + ' / month',
            isPrice: true,
          }
        }
        return null
      })
      .filter((m) => m !== null)
  } catch (err) {
    console.error('Error al cargar equipos o rentas:', err)
    error.value.myMachines = err
    error.value.rentMachines = err
  } finally {
    isLoading.value.myMachines = false
    isLoading.value.rentMachines = false
  }
}

/**
 * Carga y CONSOLIDA las solicitudes de mantenimiento.
 * Usa un mapa para asegurar que cada equipo solo aparezca una vez.
 */
const fetchMaintenance = async () => {
  isLoading.value.maintenance = true
  error.value.maintenance = null
  maintenance.value = []

  try {
    const [
      { data: requests },
      { data: equipment }
    ] = await Promise.all([
      http.get('/maintenanceRequests'),
      http.get('/equipment'),
    ]);

    // Mapeamos los equipos base para tener su nombre
    const equipmentMap = new Map(equipment.map(e => [e.id, e]));

    // Usaremos un Map para consolidar el mantenimiento por ID de equipo.
    // La clave es el ID del equipo (ej: 3, 4).
    const consolidatedMaintenance = new Map();

    // 1. Prioridad Baja: Solicitudes de Mantenimiento Manuales (requests)
    // Se añaden primero. Si el equipo ya está, no se reemplaza.
    requests.forEach(req => {
      const equip = equipmentMap.get(req.equipmentId);
      if (equip) {
        // Si ya hay un registro (por ejemplo, de una alerta de equipo), no lo reemplazamos.
        if (!consolidatedMaintenance.has(req.equipmentId)) {
          consolidatedMaintenance.set(req.equipmentId, {
            id: req.equipmentId,
            equipmentName: equip.name,
            status: capitalizeStatus(req.status),
            source: 'Request'
          });
        }
      }
    });

    // 2. Prioridad Alta: Alertas de Estado (equipment con status 'pending_maintenance')
    // Esto reemplaza cualquier solicitud manual si el equipo está en alerta activa.
    equipment
      .filter(equip => equip.status === 'pending_maintenance')
      .forEach(equip => {
        // Siempre reemplazamos o establecemos si hay una alerta activa
        consolidatedMaintenance.set(equip.id, {
          id: equip.id,
          equipmentName: equip.name,
          status: capitalizeStatus(equip.status), // Será 'Pending'
          source: 'Alert'
        });
      });

    // 3. Convertir el mapa consolidado a un array para Vue
    maintenance.value = Array.from(consolidatedMaintenance.values());

  } catch (err) {
    console.error('Error al cargar datos de mantenimiento:', err)
    error.value.maintenance = err
  } finally {
    isLoading.value.maintenance = false
  }
}

/**
 * Carga el extracto de cuenta desde el endpoint '/billingInvoices'.
 */
const fetchAccountStatement = async () => {
  isLoading.value.account = true
  error.value.account = null
  account.value = []

  try {
    const { data: invoices } = await http.get('/billingInvoices')

    account.value = invoices
      .filter(t => t.userId === USER_ID)
      .map((t) => ({
        id: t.id,
        entity: t.companyName,
        amount: formatCurrency(t.amount, t.currency),
        // Usamos la función corregida para obtener 'Done' o 'Pending'
        status: capitalizeStatus(t.status),
      }))
  } catch (err) {
    console.error('Error al cargar /billingInvoices (Account Statement):', err)
    error.value.account = err
  } finally {
    isLoading.value.account = false
  }
}

// Llama a todas las funciones de carga cuando el componente se monta
onMounted(() => {
  fetchEquipment()
  fetchMaintenance()
  fetchAccountStatement()
})
</script>

<style scoped>
/* Las variables CSS deben estar definidas globalmente o en el componente */
:root {
  --primary: #4169e1;
  --ok: #2ecc71; /* Verde para Done (Pagado/Resuelto) */
  --warn: #e74c3c; /* Rojo para Pending (Pendiente de atención) */
  --muted: #7f8c8d;
  --panel: #fdfdfd;
}

.grid {
  display: grid;
  gap: 22px;
  grid-template-columns: 1fr 1fr;
}
.panel {
  background: var(--panel);
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(23, 43, 77, 0.08);
}
.panel__title {
  margin: 6px 0 14px;
  color: var(--primary);
  font-size: 1.6rem;
  font-weight: 800;
}
.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}
.list__item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px 14px;
  box-shadow: 0 6px 20px rgba(23, 43, 77, 0.08);
}
.list__label {
  font-weight: 600;
  /* Asegura que no se desborde en el espacio de la etiqueta */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list__amount {
  /* Alineación a la derecha para montos, como en el listado de cuenta */
  text-align: right;
  font-weight: 700;
}
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  background: #f2f4f7;
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap; /* Evita que el badge se rompa en varias líneas */
}
.badge--ok {
  background: #e9f8ee;
  color: var(--ok);
}
.badge--warn {
  background: #ffecec;
  color: var(--warn);
}
.muted {
  color: var(--muted);
}
.spacer {
  margin-top: 14px;
}
/* Estilo para mensajes de error */
.text-red-500 {
  color: var(--warn);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
