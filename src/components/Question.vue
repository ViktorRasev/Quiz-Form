<script setup>
import { defineProps, defineEmits, ref, computed , watch } from 'vue';

const { question,  currentQuestionIndex, allQuestions, questionProgress} = defineProps(["question", "currentQuestionIndex", "allQuestions", "questionProgress"])

//Pick answer's ID from radio buttons
const pickedAnswerId = ref('')  

// Take answer's ID from pickedAnswerId state and return option(answer) with same ID
const findAnswerById = (answerId) => { 
    return question.options.find((option) => { 
        return option.id === answerId
    })
}

const emit = defineEmits(["submitOption"]) 
const emitSubmittedOption = (isCorrect) => { 
    emit("submitOption", isCorrect)
}

// On submit send boolean value from option(answer) to parrent component
const handleSubmit = (value) => { 
emitSubmittedOption(value)
pickedAnswerId.value = ""

}
</script>

<template>
    <div class="question-container">
            <h1>{{ question.text }}</h1>
            <div v-for="option in question.options" :key="option.id">
                <div class="radio-btn-container">
                    <label>
                        <input type="radio" :id="option.id" name="option" :value="option.id" v-model="pickedAnswerId" class="radio-btn">
                        {{`${option.label}. ${option.text} `}}
                    </label>
                </div>
            </div>
            <button 
            @click="handleSubmit(findAnswerById(pickedAnswerId).isCorrect)"
            :disabled="!pickedAnswerId"
            :class="[!pickedAnswerId ? 'disabled-next-btn' : 'next-btn']"
            >Next question</button>
        </div>
        <div class="progress-bar">
            <div class="completion" :style="{width:questionProgress}"></div>
        </div>
</template>
 
<style scoped>

.question-container{ 
    text-align: center;
}

h1 { 
    color: #42b883;
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 2rem;
}
@media (max-width: 600px) {
    h1 { 

    font-size: 25px;
}
}

label { 
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
}

.radio-btn-container {
    accent-color: #42b883;
    background-color: #3f3e3e;
    margin-bottom: .5rem;
    padding: 0 10px;
    width: fit-content;
    border-radius: 16px;
    cursor: pointer;
    transition: .3s;
}
.radio-btn-container:hover {
    background-color: #3f3e3e99;
}
.radio-btn { 
    cursor: pointer;
}

.next-btn { 
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
.next-btn:hover { 
  background-color: #42b883ce;
}

.disabled-next-btn {
  background-color: #8c8c8c;
  opacity: 0.3;
  color: #fff;
  font-size: 25px;
  border-radius: 8px;
  border: none;
  padding: 5px 18px;
  transition: 0.3s;
  margin-top: 1rem;
}

.progress-bar { 
    position: absolute;
    width: 80%;
    border: 1px solid #42b883;
    height: .5rem;
    bottom: 0;
    border-radius: 40px 40px 0 0;
    transition: 0.3;
    overflow: hidden;
}
.completion { 
    height: 100%;
    background-color: #42b883;
    width:0%;
}

</style>