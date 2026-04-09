<script setup>
import {ref, computed} from 'vue'
const movies=ref([
  {id:1, title:"a",year:2008, rating:6.2, liked:true},
  {id:2, title:"h",year:2079, rating:8.2, liked:true},
  {id:3, title:"f",year:4010, rating:7.2, liked:true},
  {id:4, title:"g",year:2011, rating:3.2, liked:false},
  {id:5, title:"d",year:2012, rating:9, liked:true}
])

const search=ref('');
const onlyLiked=ref(false);
const onlyNew=ref(false);
const sortBy=ref('title');

const error=ref('')
const newTitle=ref('')
const newYear=ref('')
const newRating=ref('')


const filteredMovies=computed(()=>{
  const q=search.value.toLowerCase()
  let list=movies.value
  .filter(m=>m.title.toLowerCase().includes(q))
  .filter(m=>!onlyNew.value||m.year>2010)
  .filter(m=>!onlyLiked.value||m.liked)

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
     
      <h3>ADD MOVIE</h3>

      <input type="text" placeholder="TITLE">
      <input type="text" placeholder="RATING">
      <input type="text" placeholder="YEAR">

      <button @click="addMovie">SUBMIT</button>
      <p v-if="error">{{error}}</p>
      <p v-if="filteredMovies.length===0">NO RESULT</p>
      <ul>
        <li v-for="movie in filteredMovies" :key="movie.id">
{{movie.title}}
{{movie.year}}
{{movie.rating}}
<button @click="toggleLike(movie)">{{movie.liked ? "👳🏿‍♂️":"🤶🏿"}}</button>
<button @click="removeMovie(movie.id)">*</button>

        </li>
      </ul>

      </div> 
</template>

<style scoped></style>
