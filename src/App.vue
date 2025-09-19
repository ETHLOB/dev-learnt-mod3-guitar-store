<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { type guitarraType, guitarraNull } from '@/types/guitarra.ts'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Guitars from '@/components/Guitars.vue'
  import db from '@/data/db.ts'

  const database = ref<Array<guitarraType>>([])
  const cart = ref<Array<guitarraType>>([])
  const headerGuitar = ref<guitarraType>(guitarraNull)

  onMounted(() => {
    database.value = db
    headerGuitar.value = db[3]
  })

  const addToCart = (guitarra: guitarraType): void => {
    const existsInCart = cart.value.findIndex(item => item.id === guitarra.id)

    if (existsInCart === -1) {
      guitarra.cantidad = 1
      cart.value.push(guitarra)
      return
    }

    cart.value[existsInCart].cantidad = (cart.value[existsInCart].cantidad ?? 1) + 1
  }

  const removeFromCart = (id: number): void => {
    cart.value = cart.value.filter(guitarra => guitarra.id !== id)
  }

  const increaseProductAmount = (id: number): void => {
    const index = cart.value.findIndex(item => item.id === id)
    
    if (cart.value[index].cantidad! >= 100) return
    
    cart.value[index].cantidad!++
  }

  const decreaseProductAmount = (id: number): void => {
    const index = cart.value.findIndex(item => item.id === id)
    
    cart.value[index].cantidad!--
    
    if (cart.value[index].cantidad! <= 0) {
      removeFromCart(id)
      return
    }
  }

</script>

<template>
  <Header
    :cart = "cart"
    :header-guitar = "headerGuitar"
    @add-to-cart="addToCart"
    @increase-product-amount="increaseProductAmount"
    @decrease-product-amount="decreaseProductAmount"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>
    <div class="row mt-5">
      <Guitars
        v-for="guitarra in database"
        :guitarra="guitarra"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <Footer />
</template>
