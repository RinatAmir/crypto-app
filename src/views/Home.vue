
<template>
  <div class="home">
    <div class="home-content">
      <div class="home-content-title">
        <h1>All Cryptocurrencies</h1>
      </div>
      <div class="home-content-table">
        <table>
          <thead>
            <tr>
              <th>Crypto</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coin in allCoins" :key="coin">
              <td>{{ coin.name }}</td>
              <td>${{ coin.price.toFixed(2) }}</td>
              <td>
                <img
                  height="60"
                  width="60"
                  :src="coin.url"
                  :alt="coin.symbol"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},
  setup() {
    const store = useStore();
    const allCoins = computed(() => store.getters.allCoins);

    return { allCoins };
  },
};
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-content {
    width: 50%;
    display: flex;
    flex-direction: column;

    &-title {
      color: white;
    }
    &-table {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      background: white;
      border-radius: 20px;

      & table {
        width: inherit;
        border-radius: 20px;
        border-collapse: collapse;
        overflow: hidden;
        box-shadow: 5px 10px 20px #ffffff;
        & thead tr th {
          font-weight: 900;
        }

        & tbody tr:nth-child(odd) {
          background-color: #eee;
        }

        & td,
        th {
          width: 33.3%;
        }

        & th,
        td {
          padding: 15px;
        }
      }
    }
  }
}

@media only screen and (max-width: 920px) {
  .home .home-content {
    width: 80%;

    &-table {
      margin-top: 20px;
    }
  }
}
@media only screen and (max-width: 550px) {
  .home .home-content {
    width: 100%;
  }
}
</style>
