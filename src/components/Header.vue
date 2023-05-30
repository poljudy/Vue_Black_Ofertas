<template>
  <header class="header hide-for-mobile">
    <div class="header__link">
      <router-link to="/home">Vue ecommerce</router-link>
    </div>

    <div class="header__link">
      <q-icon name="shopping_cart" size="2rem" color="white"/>
      <router-link to="/cart">Carrinho</router-link>
    </div>
  </header>
</template>

<style>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 1.25rem 2.5rem;
  }

  .header__link{
    display: flex;
    align-items: center;
  }

  .header__link a{
    color: #fff;
    margin-left: .5rem;
  }
</style>