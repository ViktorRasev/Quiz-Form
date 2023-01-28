<script setup>
import { ref } from "vue"

// Score and time from local storage
const storedResultsData = JSON.parse(localStorage.getItem("scoreData"))

const sortedResults = ref(null)

// Sort by score
// Sort by time if score is equal
if (storedResultsData && storedResultsData.length) {
  sortedResults.value = storedResultsData.sort((a, b) => {
    if (a.scorePercentage !== b.scorePercentage) {
      return b.scorePercentage - a.scorePercentage
    }
    else {
      return a.time - b.time;
    }
  });
}

// Format seconds into MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
</script>

<template>
  <div class="container" v-if="sortedResults" v-for="result in sortedResults">
    <div class="single-result">
      <div>
        <h4>Success: {{ result.scorePercentage }}%</h4>
        <h4>Time: {{ formatTime(result.time) }}</h4>
      </div>
      <div>
        <h2>{{ result.completionDate }}</h2>
        <h2>{{ result.completionTime }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1000px;

}

.single-result {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #ebebebc7;
  background-color: #242424;
  border-radius: 8px;
  width: 100%;
  padding: .5rem;
  margin: .3rem 0;
  border-left:  3px solid #42b883;
  border-right:  3px solid #42b883;
}

@media (max-width:600px) {
  .single-result {
    flex-direction: column;
    align-items: flex-start;

  }

  h4:last-child {
    margin-bottom: 1.5rem;
  }
}

h4 {
  font-size: 25px;
}

h2 {
  font-size: 15px;
}
</style>