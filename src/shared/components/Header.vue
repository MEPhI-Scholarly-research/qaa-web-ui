<template>
  <header>
    <nav class="headerMenu">
      <div class="logo">
        <span class="logoLabel">
          <router-link :to="{ name: 'home' }"> QUAN </router-link>
        </span>
      </div>
      <ul class="menu">
        <li>
          <router-link :to="{ name: 'home' }">
            <span class="itemLabel">Home</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'invite' }">
            <span class="itemLabel">Play</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'MainHeader'
}
</script>

<style lang="scss">
header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60px;
  background-color: #ffffff7f;
  backdrop-filter: blur(5px);
  padding: 0 32px;

  nav.headerMenu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logoLabel {
      font-family: MontserratBlack;
      letter-spacing: 2px;
      font-size: 18px;
      a {
        color: var(--text-main-color);
      }
    }

    .menu {
      display: flex;
      gap: 8px;
      .itemLabel {
        font-family: Montserrat;
        font-size: 15px;
        color: var(--text-main-color);
        transition: border-bottom 0.15s ease-in-out;
        cursor: pointer;
        &:hover {
          border-bottom: 1px solid var(--accent-color);
        }
      }
    }
  }
}
</style>
