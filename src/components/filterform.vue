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
 
      <select v-model="sortBy">
        <option value="title">SORTING:TITLE</option>
        <option >SORTING:YEAR</option>
        <option value="rating">SORTING:RATING</option>

      </select>
      <button>RESET</button>
       
      </div> 
</template>
