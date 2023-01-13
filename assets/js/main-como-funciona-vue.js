const {createApp} = Vue 

//Metodo de Vue
createApp({
    data(){
        return {
            //Aca estan y se crean las propiedades que usamos en la app, las tengamos o no, si esta aca lo puedo usar despues
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
    }, //Hooks, metodos para ejecutar acciones en las diferentes fases  de la app
    /*beforeCreated(){

    },*/
    //Se ejecuta una sola vez, cuando carga la app
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
    //Va el html. Si no encuentra el template, usa lo que hay en el html
    //Las directivas son atributos de vue que se ponen en el elemento de html, para imagenes sirve v-bind o :
    //Se puede usar v-if para condicion, v-for para bucle
    /*template: `
                <div class="card m-4 cardTransition2" style="width: 20rem;">
                    <img :src="event.image" class="card-img-top h-img" alt="${this.event.name}" title="${this.event.name}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${this.event.name}</h5>
                        <p class="card-text text-center">${event.description}</p>
                        <div class="d-flex justify-content-between price_btn_bottom">
                            <p class="fs-5 txt_color_logo">Price: ${event.price}</p>
                            <a href="./detail.html?id=${event._id}" class="btn btn-primary">See more..</a>
                        </div>
                    </div>
                </div>
    ` ,*/
    //En method se ponen las funciones, las funciones se ponen como metodos
    methods: {
        returnValuesCheck(arrayOrigin, arrayFilter){
            //Para saber el value de los input se usa v-model="se pone la propiedad creada en el return" y esto retorna lo se toca en el input y lo guarda
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
        
    },
    //Antes de que monte, se le puede pedir que haga algo, como un fetch
    /*beforeMount(){

    },
    mounted(){
        
    }*/
}).mount('#app')//A donde se pone la aplicacion de Vue