<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialValue: Boolean
})

const emit = defineEmits(['changed'])

const flipped = ref(props.initialValue)

watch(flipped, (val) => {
  emit('changed', val)
})
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="flipped" />
    <span class="slider"></span>
  </label>
</template>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 2.5em;
  height: 1.3em;
  border-radius: 0.65em;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 0.65em;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.1em;
  width: 1.1em;
  left: 0.1em;
  bottom: 0.1em;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 0.55em;
}

input:checked + .slider {
  background-color: hsl(202, 100%, 37%);
}

input:focus + .slider {
  box-shadow: 0 0 1px hsl(202, 100%, 37%);
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.2em);
  -ms-transform: translateX(1.2em);
  transform: translateX(1.2em);
}

/* Rounded sliders */
.slider.round {
  border-radius: 1.3em;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
