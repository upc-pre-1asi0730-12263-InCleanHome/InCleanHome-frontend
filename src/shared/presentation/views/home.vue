<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="home">
    <div class="home__hero">
      <h2>Bienvenido a InCleanHome</h2>
      <p>Tu plataforma para conectar con profesionales de limpieza confiables</p>
    </div>

    <div class="home__features">
      <div class="feature">
        <h3>Calificaciones y Reputación</h3>
        <p>Consulta las opiniones y calificaciones de profesionales antes de contratar.</p>
        <router-link to="/reviews" class="btn btn--primary">Ver Calificaciones</router-link>
      </div>

      <div class="feature">
        <h3>Nueva Calificación</h3>
        <p>Comparte tu experiencia calificando a los profesionales.</p>
        <router-link to="/reviews/new" class="btn btn--primary">Calificar Ahora</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
}

.home__hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #E6F9F2 0%, rgba(230, 249, 242, 0.5) 100%);
  border-radius: 16px;
  border: 2px solid #00B272;
}

.home__hero h2 {
  font-size: 2.2rem;
  color: #009960;
  margin: 0 0 1rem;
  font-weight: 700;
}

.home__hero p {
  font-size: 1.1rem;
  color: #3A4A5C;
  margin: 0;
}

.home__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature {
  background: white;
  border: 2px solid #E6F9F2;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 153, 96, 0.05);
}

.feature:hover {
  border-color: #00B272;
  box-shadow: 0 8px 24px rgba(0, 153, 96, 0.15);
  transform: translateY(-4px);
}

.feature h3 {
  font-size: 1.3rem;
  color: #009960;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.feature p {
  color: #7A8FA6;
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn--primary {
  background: linear-gradient(135deg, #009960 0%, #00B272 100%);
  color: white;
}

.btn--primary:hover {
  background: linear-gradient(135deg, #008050 0%, #009960 100%);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 153, 96, 0.3);
  transform: translateY(-2px);
}
</style>