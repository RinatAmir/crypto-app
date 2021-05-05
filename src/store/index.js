import { createStore } from "vuex";
import axios from "axios";
import API_KEY from "../assets/api/coinLayer";

export default createStore({
  state: {
    coins: [],
    coinData: null,
    isData: "",
  },
  getters: {
    allCoins(state) {
      return state.coins;
    },
    getCoin(state) {
      return state.coinData;
    },
    isData(state) {
      return state.isData;
    },
  },
  mutations: {
    SET_ALL_COINS(state, allSymbols) {
      state.coins = allSymbols;
    },
    GET_COIN_DATA(state, coinName) {
      state.isData = "";
      state.coinData = null;
      state.coins.forEach((item) => {
        if (item.name == coinName || item.symbol == coinName) {
          state.coinData = item;
        } else {
          state.isData = "No Data Found";
        }
      });
    },
  },
  actions: {
    getCoinsData({ commit }) {
      let allSymbols = [];

      let details = `http://api.coinlayer.com/list?access_key=${API_KEY}`;
      let rates = `http://api.coinlayer.com/api/live?access_key=${API_KEY}`;

      const requestOne = axios.get(details);
      const requestTwo = axios.get(rates);

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const detailsResponse = responses[0].data.crypto;
            const ratesResponse = responses[1].data.rates;

            for (const key in detailsResponse) {
              for (const index in ratesResponse) {
                if (key === index) {
                  allSymbols.push({
                    name: detailsResponse[key].name.toUpperCase(),
                    symbol: detailsResponse[key].symbol.toUpperCase(),
                    price: ratesResponse[index],
                    url: detailsResponse[key].icon_url,
                  });
                }
              }
            }

            commit("SET_ALL_COINS", allSymbols);
          })
        )
        .catch((errors) => {
          console.error(errors);
        });
    },
    search({ commit }, coinName) {
      commit("GET_COIN_DATA", coinName.toUpperCase());
    },
  },
  modules: {},
});
