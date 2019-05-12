<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  width: 400px;
  margin: auto;
}
</style>

<style>
:root {
  --background-color: #ffffff;
  --theme-color-1: #025951;
  --theme-color-2: #5ebfb5;
  --theme-color-3: #a0d9d3;
  --content-color-1: #222725;
  --content-color-2: #cef2ef;
  --content-color-3: #effff9;
}

@font-face {
  font-family: Roboto;
  font-weight: normal;
  src: url("assets/roboto/Roboto-Regular.ttf");
}

@font-face {
  font-family: Roboto;
  font-weight: bold;
  src: url("assets/roboto/Roboto-Bold.ttf");
}

@font-face {
  font-family: Roboto;
  font-weight: lighter;
  src: url("assets/roboto/Roboto-Light.ttf");
}

html {
  font-family: Roboto;
  font-size: 15px;
  color: var(--content-color-1);
  overflow-y: hidden;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--theme-color-2);
}
</style>
