import { defineStore } from "pinia"

export const useTimerStore = defineStore("timer", {
    state: () => ({
        timer: 0,
        intervalId: null
    }),
    actions: { 
     startTimer() { 
        this.intervalId =setInterval(() => { 
            this.timer++
        }, 1000)
     },
     stopTimer(){
        clearInterval(this.intervalId)
     },
     resetTimer(){
        this.timer = 0
     }
    },
    
})