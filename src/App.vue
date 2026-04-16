<script setup>
import {ref, computed} from 'vue'
import filterform from './components/filterform.vue'
import addfilm from './components/addfilm.vue'
import{movie} from './stores/movie.js'
              ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
const search=ref('');
const onlyLiked=ref(false);
const onlyNew=ref(false);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
const sortBy=ref('title');

const error=ref('');;;;;;;;;;;;;;;;;
const newTitle=ref('')
const newYear=ref('')
const newRating=ref('');;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


const filteredMovies=computed(()=>{ 
  const q=search.value.toLowerCase()
  let list=movies.value
  .filter(m=>m.title.toLowerCase().includes(q))
  .filter(m=>!onlyNew.value||m.year>2010)
  .filter(m=>!onlyLiked.value||m.liked)
;;;;;;;;;;;;;;;;;;;;;
  if (sortBy.value==='title')
  {
    list=[...list].sort((a,b)=>a.title.localeCompare(b.title))
  }
  if (sortBy.value==='rating')
  {
    list=[...list].sort((a,b)=>b.rating-a.rating);
  }
  if (sortBy.value==='year')
  {
    list=[...list].sort((a,b)=>b.year-a.year)
  }
  return list;

})

function toggleLike(movie) 
{
movie.liked=!movie.liked;
}

function removeMovie(id){
movies.value=movies.value.filter(m=>m.id!==id)
}



function resetFilter()
{
  sortBy.value='title'
  search.value=''
  onlyLiked.value=false
  onlyNew.value=false
}

</script>
  
<template>

    <div>




<filterform
v-model:search="search"
v-model:onlyLiked="onlyLiked"
v-model:onlyNew="onlyNew"
v-model:sortBy="sortBy"
@reset="resetFilter"
/>
<!--
-->
<router-link to="/movies/new">
<nav>
add film
</nav>
</router-link>

     
     <p v-if="filteredMovies.length===0">NO RESULT</p>
      <ul>
         
        <li v-for="movie in filteredMovies" :key="movie.id">
{{movie.title}}
{{movie.year}}
{{movie.rating}}
<button @click="$emit('toggle', movie)">{{movie.liked ? "👳🏿‍♂️":"🤶🏿"}}</button>
<button @click="$emit('remove', movie.id)">*</button>
<router-link :to="`/movies/${movie.id}/edit`">
  <button>edit</button>
</router-link> 
        </li>
      </ul>
      </div> 
</template>

<style scoped></style>
