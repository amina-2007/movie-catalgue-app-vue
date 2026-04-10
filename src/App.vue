<script setup>
import {ref, computed} from 'vue'
import filterform from './components/filterform.vue'
import addfilm from './components/addfilm.vue'
const movies=ref([
  {id:1, title:"a",year:2008, rating:6.2, liked:true},
  {id:2, title:"h",year:2079, rating:8.2, liked:true},
  {id:3, title:"f",year:4010, rating:7.2, liked:true},
  {id:4, title:"g",year:2011, rating:3.2, liked:false},
  {id:5, title:"d",year:2012, rating:9, liked:true}
])
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
  const id=movies.length===0?1:movies.length+1
  movies.push({
    id, 
    title:newTitle.value,
    year:newYear.value,
    rating:newRating.value,
    liked:false
  })
  newTitle.value=''
  newRating.value=''
  newYear.value=''
}

function resetFilter()
{
  sortBy.value='tile'
  search.value=''
  onlyLiked.value=false
  onlyNew.value=false
}

</script>
  
<template>

    <div>


<addfilm
v-model:title="title"
v-model:year="year"
v-model:rating="rating" 
:error="error"
@add="addMovie"
@toggle="toggleLike(movie)"
@remove="removeMovie(movie.id)"
/>

<filterform
v-model:search="search"
v-model:onlyLiked="onlyLiked"
v-model:onlyNew="onlyNew"
v-model:sortBy="sortBy"
@reset="resetFilter"
/>

     
     
      </div> 
</template>

<style scoped></style>
