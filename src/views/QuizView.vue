<script setup>
import { ref, watch } from "vue"
import questionsData from "../data/questions.json"
import Quiestion from "../components/Question.vue"
import Result from "../components/Result.vue"
import { useTimerStore } from "../store/timer"

const timerStore = useTimerStore()

const { stopTimer } = timerStore

// Sort questions in random order 
const questionsInRandomOrder = ref(questionsData.slice().sort(() => Math.random() - 0.5))

const currentQuestionIndex = ref(0)
const correctAnswers = ref(0)
const showResults = ref(false)
const completionDate = ref("")
const completionTime = ref("")

const getCompletionDateAndTime = () => { 
    const currentDate = new Date();
    completionDate.value = currentDate.toLocaleDateString('cs-CZ');
    completionTime.value = currentDate.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })
}


// Receive value from submited answer, increment correctAnswers if answer was correct
// If it was last question, show Result component and stop timer
const onOptionSubmitted = (isCorrect) => {
    if (isCorrect) {
        correctAnswers.value++
    }
    if (questionsInRandomOrder.value.length - 1 === currentQuestionIndex.value) {
        showResults.value = true
        stopTimer()
        getCompletionDateAndTime()
    }
    currentQuestionIndex.value++
}
 // Percentage of progress
let questionProgress = ref(0) // 
watch(() => currentQuestionIndex.value, () => { 
    questionProgress = `${currentQuestionIndex.value / questionsInRandomOrder.value.length * 100}%`
})
</script>

<template>
    <main>
        <div class="content-container">
            <Quiestion 
            v-if="!showResults" 
            :allQuestions="questionsInRandomOrder"
            :question="questionsInRandomOrder[currentQuestionIndex]"
            :currentQuestionIndex="currentQuestionIndex"
            :questionProgress="questionProgress"
            @submitOption="onOptionSubmitted"
             />
             
            <Result
             v-else 
             :questionsLength="questionsInRandomOrder.length"
             :numberOfCorrectAnswers="correctAnswers"
             :completionDate="completionDate"
             :completionTime="completionTime"
             />
        </div>
    </main>
</template>



