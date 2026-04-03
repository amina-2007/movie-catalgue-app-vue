<script setup>
import {ref, computed} from 'vue'
const movies=ref([
  {id:1, title:"TWILIGHT",year:2008, rating:6.2, liked:true},
  {id:2, title:"TWILIGHT NEW MOON",year:2009, rating:8.2, liked:true},
  {id:3, title:"TWILIGHT ECLIPSE",year:2010, rating:7.2, liked:true},
  {id:4, title:"TWILIGHT BREAKING DAWN P1",year:2011, rating:3.2, liked:false},
  {id:5, title:"TWILIGHT BREAKING DAWN P2",year:2012, rating:9, liked:true}
])

const search=ref('');
const onlyLiked=ref(false);
const onlyNew=ref(false);
const sortBy=ref('title');

const filteredMovies=computed(()=>{
  const q=search.value.toLowerCase()
  let list=movies.value
  .filter(m=>m.title.toLowerCase().includes(q))
  .filter(m=>!onlyNew.value||m.year>2010)
  .filter(m=>!onlyLiked.value||m.liked)
  return list;

})

</script>
  
<template>
    <div>
      <h1>MOVIE CATALOGUE</h1>
      <p>
        TOTAL:   |  FEATURED:    |  SHOWED:
      </p>
      <input type="text" placeholder="SEARCH" v-model="search">
      <label>
<input type="checkbox" v-model="onlyLiked"> FEATURED ONLY 
      </label>

      <label>
<input type="checkbox" v-model="onlyNew"> LATER 2010 ONLY 
      </label>
 
      <select >
        <option >SORTING:TITLE</option>
        <option >SORTING:YEAR</option>
        <option >SORTING:RATING</option>

      </select>
      <button>RESET</button>
      <h3>ADD MOVIE</h3>

      <input type="text" placeholder="TITLE">
      <input type="text" placeholder="RATING">
      <input type="text" placeholder="YEAR">

      <button>SUBMIT</button>
      <p v-if="filteredMovies.length===0">NO RESULT</p>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
{{movie.title}}
{{movie.year}}
{{movie.rating}}
<button @click="click">{{movie.liked ? "👳🏿‍♂️":"🤶🏿"}}</button>
        </li>
      </ul>

      </div> 
</template>

<style scoped></style>
