<!-- src/contexts/public/presentation/pages/home-page.page.vue -->
<template>
  <section class="grid">
    <!-- My machines -->
    <div
      class="panel panel--link"
      role="button"
      tabindex="0"
      @click="goTo('machines')"
      @keydown="onKey($event, 'machines')"
    >
      <h2 class="panel__title">My machines</h2>
      <div class="cards">
        <MachineCard v-for="m in myMachines" :key="m.id" :img="m.img" :title="m.name" />
      </div>
    </div>

    <!-- Rent machines -->
    <div
      class="panel panel--link"
      role="button"
      tabindex="0"
      @click="goTo('rent')"
      @keydown="onKey($event, 'rent')"
    >
      <h2 class="panel__title">Rent machines</h2>
      <div class="cards">
        <MachineCard
          v-for="m in rentMachines"
          :key="m.id"
          :img="m.img"
          :title="m.name"
          :subtitle="m.price"
          :isPrice="true"
        />
      </div>
    </div>

    <!-- Maintenance -->
    <div
      class="panel panel--link"
      role="button"
      tabindex="0"
      @click="goTo('maintenance')"
      @keydown="onKey($event, 'maintenance')"
    >
      <h2 class="panel__title">Maintenance</h2>
      <ul class="list">
        <li class="list__item" v-for="i in maintenance" :key="i.id">
          <span class="list__label">{{ i.name }}</span>
          <span class="badge" :class="i.status === 'Done' ? 'badge--ok' : 'badge--warn'">{{ i.status }}</span>
        </li>
      </ul>
      <p class="muted spacer">Here, the maintenance of your equipment will be displayed.</p>
    </div>

    <!-- Account statement -->
    <div
      class="panel panel--link"
      role="button"
      tabindex="0"
      @click="goTo('account-statement')"
      @keydown="onKey($event, 'account-statement')"
    >
      <h2 class="panel__title">Account statement</h2>
      <ul class="list">
        <li class="list__item" v-for="t in account" :key="t.id">
          <span class="list__label">{{ t.entity }}</span>
          <span class="list__amount">{{ t.amount }}</span>
          <span class="badge" :class="t.status === 'Paid' ? 'badge--ok' : 'badge--warn'">{{ t.status }}</span>
        </li>
      </ul>
      <p class="muted spacer">Here you can view your pending and paid receipts.</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MachineCard from '@/shared-kernel/presentation/ui/components/machine-card.component.vue'
import { http } from '@/shared-kernel/infrastructure/http'

const router = useRouter()
const goTo = (name) => router.push({ name })
const onKey = (e, name) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    goTo(name)
  }
}

// MOCK: luego lo conectamos a /api/* con json-server
const imgBike = '/assets/images/bike.png'
const imgTreadmill = '/assets/images/treadmill.png'

const myMachines = [
  { id: 1, name: 'Treadmill Pro X', img: imgTreadmill },
  { id: 2, name: 'Stationary Bike GX', img: imgBike }
]

const rentMachines = [
  { id: 3, name: 'Stationary Bike GX', img: imgBike, price: '200 $ / month' },
  { id: 4, name: 'Treadmill Pro X', img: imgTreadmill, price: '99 $ / month' }
]

const maintenance = [
  { id: 1, name: 'Rowing Machine R-300', status: 'Pending' },
  { id: 2, name: 'Elliptical Trainer E-500', status: 'Done' }
]

const account = [
  { id: 1, entity: 'FRITMO CORP', amount: 'S/. 2351.23', status: 'Paid' },
  { id: 2, entity: 'COOLPROV S.A.C.', amount: 'S/. 458.5', status: 'Pending' }
]

onMounted(async () => {
  try {
    const { data } = await http.get('/equipment')
    console.log('Datos /equipment:', data)
  } catch (err) {
    console.error('Error al cargar /equipment:', err)
  }
})
</script>

<style scoped>
.grid{display:grid;gap:22px;grid-template-columns:1fr 1fr}
.panel{background:var(--panel);padding:16px;border-radius:14px;box-shadow:0 6px 20px rgba(23,43,77,.08)}
.panel__title{margin:6px 0 14px;color:var(--primary);font-size:1.6rem;font-weight:800}
.cards{display:grid;gap:16px;grid-template-columns:repeat(2,minmax(0,1fr))}
.list{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.list__item{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:12px;background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 6px 20px rgba(23,43,77,.08)}
.list__label{font-weight:600}
.list__amount{font-weight:700}
.badge{padding:4px 10px;border-radius:999px;background:#f2f4f7;font-weight:700}
.badge--ok{background:#e9f8ee;color:var(--ok)}
.badge--warn{background:#ffecec;color:var(--warn)}
.muted{color:var(--muted)} .spacer{margin-top:14px}

/* Clickable panels */
.panel--link{cursor:pointer;transition:transform .08s ease, box-shadow .08s ease}
.panel--link:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(23,43,77,.12)}
.panel--link:focus-visible{outline:3px solid #7aa6ff;outline-offset:3px}

@media (max-width:980px){ .grid{grid-template-columns:1fr} .cards{grid-template-columns:1fr 1fr} }
@media (max-width:640px){ .cards{grid-template-columns:1fr} }
</style>
