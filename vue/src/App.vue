<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { store } from './service/store'
import InfoModal from './components/InfoModal.vue'

watch(store, (val) => {
  if (val.nightMode) {
    document.body.classList.add('night')
  } else {
    document.body.classList.remove('night')
  }
})
</script>

<template>
  <router-view />
  <info-modal />
</template>

<style lang="scss">
body.night {
  background: black;
  color: #fff9ed;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsl(202, 100%, 37%);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(202, 100%, 37%, 0.2);
  }
}

body {
  display: flex;
  place-items: center;
}

#app {
  display: flex;
  width: 100%;
  padding: 0 2rem;
}

body,
input,
textarea {
  font-size: 20pt;
}

@media screen and (max-width: 400px) {
  body,
  input,
  textarea {
    font-size: 16pt;
  }
}
@media screen and (max-width: 320px) {
  body,
  input,
  textarea {
    font-size: 12pt;
  }
}

div {
  margin: 0;
  padding: 0;
}
.full-width,
.col,
.row {
  width: 100%;
}
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.btn,
input {
  color: unset;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.4em;
  padding: 0.4em 0.6em;
  font-size: 1em;
  cursor: pointer;
  &.danger {
    background-color: #c9c9c9;
  }
  body.night & {
    background-color: #ffffff40;
    border-color: #fff9ed;
  }
}
input {
  border-width: 2px;
}
*:focus {
  outline: none;
}
.semi-transparent,
.btn.danger {
  opacity: 0.4;
}

$directions: (
  't': 'top',
  'b': 'bottom',
  'l': 'left',
  'r': 'right'
);
$sizes: (
  '3': 3em,
  '2': 2em,
  '1': 1em,
  '05': 0.5em
);
$properties: (
  'p': 'padding',
  'm': 'margin'
);

@each $prop, $property in $properties {
  @each $sizeKey, $sizeValue in $sizes {
    @each $dirKey, $dirValue in $directions {
      .#{$prop}#{$dirKey}-#{$sizeKey} {
        #{$property}-#{$dirValue}: $sizeValue;
      }
    }
  }
}

.sm {
  font-size: 0.8em;
}

span.help {
  font-size: 0.7em;
  font-family: sans-serif;
  // border: 1px solid black;
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  font-weight: 800;
  transform: translateY(-0.15em);

  background-color: black;
  color: white;

  body.night & {
    color: black;
    background-color: #fff9ed;
  }
}
</style>
