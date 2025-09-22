<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { type guitarraType, guitarraNull } from "@/types/guitarra.ts";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Guitars from "@/components/Guitars.vue";
import db from "@/data/db.ts";

const database = ref<Array<guitarraType>>([]);
const cart = ref<Array<guitarraType>>([]);
const headerGuitar = ref<guitarraType>(guitarraNull);

watch(
  cart,
  () => {
    cartPersistence();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  database.value = db;

  headerGuitar.value = db[3] ?? guitarraNull;

  const cartFromLocalStorage = localStorage.getItem("cart");
  if (cartFromLocalStorage) {
    cart.value = JSON.parse(cartFromLocalStorage);
  }
});

const cartPersistence = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const addToCart = (guitarra: guitarraType): void => {
  const indexInCart = cart.value.findIndex(item => item.id === guitarra.id);

  if (indexInCart === -1) {
    guitarra.cantidad = 1;
    cart.value.push(guitarra);
    return;
  }

  cart.value[indexInCart]!.cantidad =
    (cart.value[indexInCart]!.cantidad ?? 1) + 1;
};

const removeFromCart = (id: number): void => {
  cart.value = cart.value.filter(guitarra => guitarra.id !== id);
};

const clearCart = (): void => {
  cart.value = [];
};

const increaseProductAmount = (id: number): void => {
  const indexInCart = cart.value.findIndex(item => item.id === id);

  if (cart.value[indexInCart]!.cantidad! >= 100) return;

  cart.value[indexInCart]!.cantidad!++;
};

const decreaseProductAmount = (id: number): void => {
  const indexInCart = cart.value.findIndex(item => item.id === id);

  cart.value[indexInCart]!.cantidad!--;

  if (cart.value[indexInCart]!.cantidad! <= 0) {
    removeFromCart(id);
    return;
  }
};
</script>

<template>
  <Header
    :cart="cart"
    :header-guitar="headerGuitar"
    @add-to-cart="addToCart"
    @remove-from-cart="removeFromCart"
    @clean-cart="clearCart"
    @increase-product-amount="increaseProductAmount"
    @decrease-product-amount="decreaseProductAmount"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>
    <div class="row mt-5">
      <Guitars
        v-for="guitarra in database"
        :key="guitarra.id"
        :guitarra="guitarra"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <Footer />
</template>
