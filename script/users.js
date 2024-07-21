import { users, settings } from "./dom.js"
import { clickListener } from "./functions.js"

settings.altSetSettings()
users.printList()

console.log(users.name.innerText)

clickListener(users.list, (e) => {
    if (!e.target.dataset.name) return
    let user = localStorage.getItem(e.target.dataset.name).split(",")
    users.showUserStats(user)
})

clickListener(users.stats, (e) => {
    if (!e.target.parentNode.dataset.action) return
    //let action = e.target.parentNode.dataset.action
    console.log(users.name.innerText)
    let action = {
        remove: users.removeUser(users.name.innerText),
        edit: null
    } 

    action[e.target.parentNode.dataset.action]
    
})