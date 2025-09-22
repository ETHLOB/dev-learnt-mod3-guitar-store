<script lang="ts" setup>
type guitarraType = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const props = defineProps<{
  guitarra: guitarraType;
}>();

const emit = defineEmits<{
  "add-to-cart": [guitarra: guitarraType];
}>();
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="`/img/${props.guitarra.imagen}.jpg`"
        :alt="`imagen de la guitarra ${props.guitarra.nombre}`"
      />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">
        {{ props.guitarra.nombre }}
      </h3>
      <p>{{ props.guitarra.descripcion }}</p>
      <p class="fw-black text-primary fs-3">${{ props.guitarra.precio }}</p>
      <button
        type="button"
        class="btn btn-dark w-100"
        @click="emit('add-to-cart', props.guitarra)"
      >
        Agregar al Carrito
      </button>
    </div>
  </div>
  <!-- FIN GUITARRA -->
</template>
