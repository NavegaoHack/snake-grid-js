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
        this.loginPopup = null;
    }

    toggleOpacity() {
        this.main.classList.toggle("--opacity")
    }
}

const index = new Index()

export { settings, index}