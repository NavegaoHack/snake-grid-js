const $ = (element) => document.querySelector(element);


//create settings section
class Settings {
    constructor() {
        this.dom = $(".settings");
        this.closeButton = $(".settings-head .--back-button");
        this.snakeSpeed = $("#snakeSpeed"); //speed of the snake, in blocks per second
        this.foods = $("#numberFood"); //number of foods displayed in the canvas
        this.askLogin = $("#askLogin");
        this.playWithAI = $("#AIPlay");
        this.twoPlayers = $("#twoPlayers");
        this.colorTheme = $("#colorTheme");
    }

    toggleShow() {
        this.dom.classList.toggle("--hide-settings")
    }
}

const settings = new Settings()

//create Index section
class Index {
    constructor() {
        this.settings = $(".settings-btn");
        this.play = $(".play-btn");
        this.users = $(".users-btn");
        this.main = $(".index")
        this.loginPopup = $(".popup-login");
    }

    toggleOpacity() {
        this.main.classList.toggle("--opacity")
    }
}



const index = new Index()

class LoginPopup {
    constructor() {
        this.main = $(".popup-login")
        this.alert = $(".popup-login__alert-msg")
        this.back = $(".popup-back-btn")
        this.continue = $(".popup-play-btn")
        this.login = $(".popup-login-btn")
        this.username = $("#loginUsername")
        this.password = $("#loginUserpassw")
    }

    getCredentials() {
        return {user: this.username.value, password: this.password.value}
    }

    alertMessage(message = false) {
        if (message) {
            console.log(message)
            this.alert.innerText = message
            return
        }
        this.alert.innerText = ""
    }

    cleanFields() {
        this.username.value = ""
        this.password.value = ""
    }
    
    showPopupLogin() {
        this.main.classList.toggle("popup-login-show",) ? 
            this.main.classList.add("popup-enable-display") :
            setTimeout(() => {this.main.classList.remove("popup-enable-display")}, 500)
    }
}

const loginPopup = new LoginPopup()

export { settings, index, loginPopup }