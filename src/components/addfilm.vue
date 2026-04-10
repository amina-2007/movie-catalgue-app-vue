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
      <p v-if="filteredMovies.length===0">NO RESULT</p>
      <ul>
        <li v-for="movie in filteredMovies" :key="movie.id">
{{movie.title}}
{{movie.year}}
{{movie.rating}}
<button @click="$emit('toggle, movie')">{{movie.liked ? "👳🏿‍♂️":"🤶🏿"}}</button>
<button @click="$emit('remove, movie.id')">*</button>

        </li>
      </ul>

    </div>
 </template>
 
 <script setup>
import { stringifyQuery } from "vue-router";

 defineProps({
 title:String,
year:Number,
rating:Number,
error:String,
filteredMovies:Array
 });

 defineEmits([
 'update:title',
 'update:year',
 'update:rating',
 'update:error',
 'add',
 'toggle'
 ]);
 </script>
  