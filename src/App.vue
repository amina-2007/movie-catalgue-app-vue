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

function addMovie()
{
  error.value=''
  if(!newTitle.value)
  {
    error.value="INPUT TITLE"
    return
  }
 const id = movies.value.length === 0 ? 1 : Math.max(...movies.value.map(m => m.id)) + 1
  movies.value.push({
   id, 
  title: newTitle.value,
  year: Number(newYear.value) || 0,
  rating: Number(newRating.value) || 0,
  liked: false
  })
  newTitle.value=''
  newRating.value=''
  newYear.value=''
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
<addfilm
 v-model:title="newTitle"
  v-model:year="newYear"
  v-model:rating="newRating"
  :error="error"
  :filteredMovies="filteredMovies"
  @add="addMovie"
  @toggle="toggleLike"
  @remove="removeMovie"
/>-->
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
