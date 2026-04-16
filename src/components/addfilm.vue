 <template>
    <div>
        <h3>ADD MOVIE</h3>

      <input :value="title" 
      @input="$emit('update:title', $event.target.value)" placeholder="TITLE"/>
      <input :value="rating" 
      @input="$emit('update:rating', $event.target.value)" placeholder="RATING"/>
      <input :value="year" 
      @input="$emit('update:year', $event.target.value)" placeholder="YEAR"/>

      <button @click="$emit('add')">SUBMIT</button>
      <p v-if="error">{{error}}</p>
      

    </div>
 </template>
 
 <script setup>
import { stringifyQuery } from "vue-router";

 defineProps({
 title: String,
  year: [String, Number],
  rating: [String, Number],
  error: String,
  filteredMovies: Array
 });

 defineEmits([
  'update:title',
  'update:year',
  'update:rating',
  'add',
  'toggle',
  'remove'
 ]);
 </script>
  