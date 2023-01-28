<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useTimerStore } from "../store/timer"
import { storeToRefs } from "pinia"

const timerStore = useTimerStore()
const { timer } = storeToRefs(timerStore)
const { resetTimer } = timerStore

const router = useRouter()

//Props
const { questionsLength, numberOfCorrectAnswers, questionPercentage, completionDate, completionTime } = defineProps(["questionsLength", "numberOfCorrectAnswers", "questionPercentage", "completionDate", "completionTime"])

const resultPercentage = parseInt(numberOfCorrectAnswers / questionsLength * 100)
const score = `${numberOfCorrectAnswers}/${questionsLength}` 

// Format seconds from timer into MM:SS
const formatTimer = () => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Save data from answer
const resultData = {
    scorePercentage: resultPercentage,
    time: timer.value,
    completionDate: completionDate,
    completionTime: completionTime
}

// Delete last item in array if there is more than 5
// Save most recent data from answer 
const handleLocalStorage = () => { 
    const storageArray = JSON.parse(localStorage.getItem("scoreData"))
    storageArray.length > 4 ? storageArray.pop() : null 
    storageArray.unshift(resultData)
    localStorage.setItem("scoreData", JSON.stringify(storageArray))
}

const navigateToHome = () => {
    router.push("/")
    handleLocalStorage()
    resetTimer()
}
</script>

<template>
    <div class="result-container">
        <h1>Result</h1>
        <div class="results">   
            <div class="result score">
                <h3>Correct answers</h3>
                <h2>{{ score }}</h2>
            </div>
            <div class="result percentage">
                <h3>Percentage</h3>
                <h2>{{ resultPercentage }}%</h2>
            </div>
            <div class="result time">
                <h3>Time</h3>
                <h2>{{ formatTimer() }}</h2>
            </div>
        </div>
        <button @click="navigateToHome" class="restart-btn">Restart</button>
    </div>

</template>

<style scoped>
.result-container { 
   text-align: center;
}
h1 {
    color: #42b883;
    font-weight: 600;
    font-size: 40px;
}

.results { 
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
}

@media (max-width: 600px) {
    .results { 

   flex-direction: column;
}
}
.result {
    display: flex;
    flex-direction: column;
    background-color: #414141;
    border-radius: 8px;
    padding: 5px 10px;
    margin: 5px;
    width: 150px;
}

.restart-btn { 
  background-color: #42b883;
  color: #fff;
  font-size: 25px;
  border-radius: 8px;
  border: none;
  padding: 5px 18px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1rem;
}
.restart-btn:hover { 
  background-color: #42b883ce;
}

h2 {
    font-size: 35px;
}
</style>