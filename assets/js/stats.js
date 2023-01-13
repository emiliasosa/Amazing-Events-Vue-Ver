const {createApp} = Vue 

createApp({
    data(){
        return{
            events: undefined,
            pastEvents: undefined,
            pastStats: undefined,
            upcommingEvents: undefined,
            upcommingStats: undefined,
            highestAttendance: undefined,
            lowestAttendance: undefined,
            maxCapacity: undefined,
            maxAttendance: undefined
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res => res.json())
        .then(res => {
            this.events = res.events
            this.pastEvents = res.events.filter(event => event.date < res.currentDate)
            this.pastStats = this.returnStats(this.pastEvents)
            this.upcommingEvents = res.events.filter(event => event.date > res.currentDate)
            this.upcommingStats = this.returnStats(this.upcommingEvents)
            this.maxAttendance = Math.max(...this.pastStats.map(event => event.attendance))
            this.highestAttendance = this.returnAttendance(this.maxAttendance)
            this.minAttendance = Math.min(...this.pastStats.map(event => event.attendance))
            this.lowestAttendance = this.returnAttendance(this.minAttendance,'lowestAttendance')
            this.maxCapacity = this.events.filter(event => event.capacity === Math.max(...this.events.map(event => event.capacity)))
        })
        .catch(err => console.log(err))
    },
    methods: {
        returnStats(arrayToRemake){    
            let arrayStats = [];
            arrayToRemake.forEach(event => arrayStats.push({ 
                                    name: event.name,
                                    category: event.category,
                                    revenues: event.estimate ? event.estimate * event.price : event.assistance * event.price,
                                    attendance: event.estimate ? (event.estimate * 100 / event.capacity).toFixed(2) : (event.assistance * 100 / event.capacity).toFixed(2)
                                })
                        )
            return arrayStats
        },

        returnAttendance(attendance, where){
            let finalAttendance;
            
            this.pastStats.forEach(event => event.attendance.includes(attendance)?finalAttendance = `${event.name} %${attendance}` : `no events`)

            if(where === 'lowestAttendance'){
                return this.lowestAttendance = finalAttendance
            }else{
                return this.highestAttendance = finalAttendance
            }
        }
    }
}).mount('#app')