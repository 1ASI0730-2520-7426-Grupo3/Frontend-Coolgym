<script setup>
import { ref } from 'vue';


import treadmillImage from '@/assets/images/treadmill.png';
import stationaryBikeImage from '@/assets/images/stationary-bike.png';
import rowingMachineImage from '@/assets/images/rowing-machine.png';
import ellipticalTrainerImage from '@/assets/images/elliptical-trainer.png';

const machines = ref([
  {
    id: 1,
    name: 'Treadmill Pro X',
    price: 200,
    image: treadmillImage
  },
  {
    id: 2,
    name: 'Stationary Bike GX',
    price: 99,
    image: stationaryBikeImage
  },
  {
    id: 3,
    name: 'Rowing Machine R-300',
    price: 200,
    image: rowingMachineImage
  },
  {
    id: 4,
    name: 'Elliptical Trainer E-500',
    price: 99,
    image: ellipticalTrainerImage
  }
]);

// Función para manejar el clic en el botón "Request".
// Puedes agregar aquí la lógica que necesites.
const handleRequest = (machine) => {
  console.log('Requested:', machine.name);
  alert(`You have requested the ${machine.name}.`);
};

// Función para el botón de retroceder
const goBack = () => {
  // Asume que estás usando Vue Router
  window.history.back();
};
</script>

<template>
  <div class="rent-container">
    <h1 class="page-title">Rent Gym Machines</h1>

    <div class="machines-grid">
      <div v-for="machine in machines" :key="machine.id" class="machine-card">
        <img :src="machine.image" :alt="machine.name" class="machine-image" />
        <h3 class="machine-name">{{ machine.name }}</h3>
        <p class="machine-price">{{ machine.price }} $ / month</p>
        <button class="request-button" @click="handleRequest(machine)">
          Request
        </button>
      </div>
    </div>

    <button class="back-button" @click="goBack" aria-label="Go back">
      &larr;
    </button>
  </div>
</template>

<style scoped>
.rent-container {
  padding: 40px 60px;
  /* Asegúrate de tener la fuente 'Inter' importada en tu proyecto */
  font-family: 'Inter', Arial, sans-serif;
  position: relative;
  background-color: #f8f9fa;
  min-height: 80vh;
}

.page-title {
  text-align: center;
  color: #0078D7; /* Tono de azul del diseño */
  margin-bottom: 50px;

  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 64px;
  letter-spacing: -0.017em; /* Equivalente a -1.7% */
}

.machines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;
}

.machine-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.machine-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.machine-image {
  max-width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 20px;
}

.machine-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #343a40;
  margin: 0 0 10px 0;
}

.machine-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc3545;
  margin: 0 0 20px 0;
}

.request-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.request-button:hover {
  background-color: #218838;
}

/* --- ESTILOS DEL BOTÓN DE REGRESO (ACTUALIZADO) --- */
.back-button {
  position: fixed;
  bottom: 47px; /* Posición ajustada */
  left: 47px;   /* Posición ajustada */
  cursor: pointer;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;

  /* Especificaciones de la imagen */
  width: 66px;
  height: 66px;
  background-color: #0078D7;
  color: white;
  font-size: 2.2rem; /* Tamaño de la flecha ajustado */
  line-height: 1; /* Asegura centrado vertical */
}

.back-button:hover {
  background-color: #005fa3; /* Tono más oscuro para el hover */
  transform: scale(1.05);
}

.back-button {
  position: fixed;
  bottom: 40px;
  left: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff; /* Azul principal */
  color: white;
  border: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
