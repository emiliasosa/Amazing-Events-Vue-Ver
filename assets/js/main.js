const {createApp} = Vue 

createApp({
    data(){
        return {
            events: undefined,
            pastEvents: undefined,
            upcommingEvents: undefined,
            categories: undefined,
            categoryCheck: [],
            searchValue: "",
            filterEvents: [],
            filterUpcommingEvents: [],
            filterPastEvents: [],
            filterDetailCard: undefined,
            paramLocation: undefined,
            params: undefined,
            id: undefined
        }        
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(res => res.json())
            .then(res => {
                this.events = res.events,
                this.filterEvents = [...this.events]
                this.pastEvents = res.events.filter(event => event.date < res.currentDate)
                this.filterPastEvents = [...this.pastEvents]
                this.upcommingEvents = res.events.filter(event => event.date > res.currentDate)
                this.filterUpcommingEvents = [...this.upcommingEvents]
                this.categories = new Set(res.events.map(event => event.category))
                this.paramLocation = location.search
                this.params = new URLSearchParams(this.paramLocation)
                this.id = this.params.get("id")
                this.filterDetailCard = this.events.find(card => card._id === this.id)                     
            })
            .catch(err => console.log(err))   
    },
    methods: {
        returnValuesCheck(arrayOrigin, arrayFilter){
            let search = arrayOrigin.filter(event => event.name.toLowerCase().includes( this.searchValue.toLowerCase()))
            let checkBox = search.filter(event => this.categoryCheck.includes(event.category) || this.categoryCheck.length === 0 )
            if(arrayFilter === 'filterPastEvents'){
                this.filterPastEvents = checkBox
            }else if(arrayFilter === 'filterUpcommingEvents'){
                this.filterUpcommingEvents = checkBox
            }else{
                this.filterEvents =checkBox
            }
        }
        
    }
}).mount('#app')