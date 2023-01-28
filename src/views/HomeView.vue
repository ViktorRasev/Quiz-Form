<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useTimerStore } from "../store/timer"
import LastFiveResults from "../components/LastFiveResults.vue"

const router = useRouter()

const timerStore = useTimerStore()
const { startTimer } = timerStore

const localStorageArray = ref([])

const handleStart = () => {
  router.push("/quiz")
  startTimer()

  // Create empty array if scoreData in localStorage is false
  let localStorageArrayData = localStorage.getItem('scoreData');
  if (!localStorageArrayData) {
    localStorageArrayData = [];
    localStorage.setItem('scoreData', JSON.stringify(localStorageArrayData));
  }
  localStorageArray.value = localStorageArrayData
}
</script>

<template>
  <main>
    <div class="content-container">
      <button class="start-btn" @click="handleStart">Start</button>
    </div>
    <LastFiveResults v-if="localStorageArray.value !== [] && localStorageArray.value !== false" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

.start-btn {
  background-color: #42b883;
  color: #fff;
  font-size: 40px;
  border-radius: 8px;
  border: none;
  padding: 7px 20px;
  cursor: pointer;
  transition: 0.3s;
}

.start-btn:hover {
  background-color: #42b883ce;

  font-size: 43px;
}
</style>

#ebebeb99 text color