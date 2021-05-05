<template>
  <header class="video-header">
    <video
      src="./assets/images/Circuit.mp4"
      autoplay
      loop
      playsinline
      muted
    ></video>
    <div class="viewport-header">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/search">Search</router-link>
      </div>
      <router-view />
    </div>
  </header>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch("getCoinsData"));
  },
};
</script>

<style lang="scss">
$base-text-color: #2c3e50;

#app,
body,
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  color: $base-text-color;
}

@mixin coverer {
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

.video-header {
  & #nav {
    padding: 30px;
    align-self: flex-start;

    a {
      font-weight: bold;
      color: $base-text-color;

      &.router-link-exact-active {
        color: #4283b9;
      }
    }
  }

  &,
  video,
  .viewport-header {
    @include coverer;
  }
  video {
    position: fixed;
  }
  .viewport-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    opacity: var(--headerOpacity);
    transform: scale(var(--headerScale));
  }
}
</style>
