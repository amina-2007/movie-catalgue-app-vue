<template>

    <div>
      <h1>MOVIE CATALOGUE</h1>
      <p>
        TOTAL:   |  FEATURED:    |  SHOWED:
      </p>
      <input  :value="search" 
      @input="$emit('update:search', $event.target.value)"
       placeholder="SEARCH"  >
      <label>
<input type="checkbox"
:checked="onlyLiked"
 @change="$emit('update:onlyLiked', $event.target.checked)"> FEATURED ONLY 
      </label>

      <label>
<input type="checkbox" :checked="onlyLiked"
 @change="$emit('update:onlyNew', $event.target.checked)"> LATER 2010 ONLY 
      </label>
 
      <select :value="sortBy" @change="emit('update:sortBy', $event.target.value)">
        <option value="title">SORTING:TITLE</option>
        <option value="year">SORTING:YEAR</option>
        <option value="rating">SORTING:RATING</option>

      </select>
      <button @click="$emit('reset')">RESET</button>
       
      </div> 
</template>

<script setup>
defineProps({
  search:String,
  onlyLiked:Boolean,
  onlyNew: Boolean,
  sortBy:String
})

defineEmits([
  'update:search',
  'update:onlyLiked',
  'update:onlyNew',
  'update:sortBy', 
  'reset'
])
</script>
