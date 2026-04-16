<template>
    <div>
        <addfilm
 v-model:title="newTitle"
  v-model:year="newYear"
  v-model:rating="newRating"
  :error="error"
  :filteredMovies="filteredMovies"
  @add="addMovie"
  @toggle="toggleLike"
  @remove="removeMovie"
/>
    </div>
</template>

<script setup>
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
</script>
