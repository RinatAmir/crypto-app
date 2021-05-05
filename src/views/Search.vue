<template>
  <div class="search">
    <div class="searchBar">
      <input
        type="text"
        class="searchTerm"
        placeholder="What are you looking for?"
        v-model="coinName"
        @keyup.enter="submit"
      />
      <button type="submit" class="searchButton" @click="submit">
        <Magnify></Magnify>
      </button>
    </div>
    <div v-if="coinData" class="coinData">
      <div class="coinData-img">
        <img :src="coinData.url" :alt="coinData.name" />
      </div>
      <div class="coinData-details">
        <h1>Name: {{ coinData.name }}</h1>
        <div class="coinData-moreDetails">
          <h3>Symbol: {{ coinData.symbol }}</h3>
          <h3>Price: ${{ coinData.price.toFixed(2) }}</h3>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="isData">
        <p class="search-error">{{ isData }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Magnify } from "mdue";

export default {
  components: { Magnify },
  setup() {
    const store = useStore();
    const coinName = ref("");

    const submit = computed(() => {
      store.dispatch("search", coinName.value);
      coinName.value = "";
    });
    const coinData = computed(() => store.getters.getCoin);

    const isData = computed(() => store.getters.isData);

    return { coinName, submit, coinData, isData };
  },
};
</script>

<style lang="scss">
$black-color: #000;
$white-color: #fff;

.search {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .searchBar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .searchTerm {
      width: 300px;
      border: 3px solid $black-color;
      border-right: none;
      padding: 5px;
      height: 20px;
      border-radius: 5px 0 0 5px;
      outline: none;
      color: #9dbfaf;
      &:focus {
        color: $black-color;
      }
    }
    .searchButton {
      width: 40px;
      height: 36px;
      border: 1px solid $black-color;
      background: $black-color;
      text-align: center;
      color: $white-color;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 20px;
      color: white;
    }
  }
  .coinData {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 100px;
    min-height: 200px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    &-img {
      width: 70px;
      height: 70px;
      margin: 10px;
      padding: 20px;
      border-radius: 50%;
      background-color: $white-color;
      text-align: center;
      animation: rotate 7s linear infinite;
      img {
        width: inherit;
      }
    }
  }
  &-error {
    color: red;
  }
}

@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

@media only screen and (max-width: 1200px) {
  .search .coinData {
    width: 60%;
  }
}
@media only screen and (max-width: 800px) {
  .search .coinData {
    &-img {
      width: 50px;
      height: 50px;
    }

    &-details h1 {
      font-size: 25px;
    }
  }
}
@media only screen and (max-width: 650px) {
  .search .coinData {
    width: 80%;
    &-img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>