fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(res => (res.ok ? res.json() : Promise.reject(res)))
.then(res=>{
    const tableContainer = document.getElementById("table-stats")
    const eventsArr = res.events

    let upcommingStats = eventsArr.filter(event => event.date > res.currentDate)
    let pastStats = eventsArr.filter(event => event.date < res.currentDate)

    let createTable = ()=>{
        tableContainer.innerHTML = `
            <table class="table table-bordered ">
                <tr>
                    <th colspan="3" class="ttl_spacing_table table-dark">EVENTS STATICS</th>
                </tr>
                <tbody>
                    <tr>
                        <td class="text-dark"><b>Events with the highest percentage of attendance</b></td>
                        <td class="text-dark"><b>Events with the lowest percentage of attendance</b></td>
                        <td class="text-dark"><b>Event with larger capacity</b></td>
                    </tr>
                    ${returnAttendance(returnStats(eventsArr), Math.max)}
                    ${returnAttendance(returnStats(eventsArr), Math.min)}
                    ${returnMaxCapacity(eventsArr)}
                    <tr>
                        <th colspan="3" class="ttl_spacing_table table-dark">UPCOMING EVENTS STATICS BY CATEGORY</th>
                    </tr>
                    <tr>
                        <td class="text-dark"><b>Categories</b></td>
                        <td class="text-dark"><b>Revenues</b></td>
                        <td class="text-dark"><b>Percentage of attendance</b></td>
                    </tr>
                    ${renderStats(returnStats(upcommingStats))}
                    <tr>
                        <th colspan="3" class="ttl_spacing_table table-dark">PAST EVENTS STATICS BY CATEGORY</th>
                    </tr>
                    <tr>
                        <td class="text-dark"><b>Categories</b></td>
                        <td class="text-dark"><b>Revenues</b></td>
                        <td class="text-dark"><b>Percentage of attendance</b></td>
                    </tr>
                    ${renderStats(returnStats(pastStats))}
                </tbody>
            </table>
        `
    }
    
    createTable()
    
})
.catch(err => err)


let returnAttendance = (op, methodApply)=>{
    let attendance = methodApply(...op.map(event => event.attendance))
    let template;
    
    op.forEach(event => event.attendance.includes(attendance) ? template = `<td class="text-dark">${event.name} %${attendance}</td>` : `No events` )
    
    return template
}

let returnMaxCapacity = (op)=>{
    let maxCapacity = (Math.max(...op.map(event => event.capacity)))
    let template;
    op.forEach(event => event.capacity === maxCapacity ? template = `<td class="text-dark">${event.name} ${event.capacity}</td>` : `No events`)
    return template
}

let renderStats = (op)=>{
    let tableTr = "";
    op.forEach(event => {
        tableTr += `
            <tr>
                <td class="text-dark">${event.category}</td>
                <td class="text-dark">${event.revenues}</td>
                <td class="text-dark">${event.attendance}</td>
            </tr>`
    })

    return tableTr
}

let returnStats = (op)=>{    
    let arrayStats = [];
    op.forEach(event => arrayStats.push({ 
                            name: event.name,
                            category: event.category,
                            revenues: event.estimate ? event.estimate * event.price : event.assistance * event.price,
                            attendance: event.estimate ? (event.estimate * 100 / event.capacity).toFixed(2) : (event.assistance * 100 / event.capacity).toFixed(2)
                        })
                )

    return arrayStats
}


