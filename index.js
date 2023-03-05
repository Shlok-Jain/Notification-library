class NotificationJS {

    constructor(json) {


        if (!document.getElementsByClassName('Notification-library-myid')[0]) {
            const Notification_library_myid = document.createElement("div")
            Notification_library_myid.classList.add("Notification-library-myid")
            document.body.appendChild(Notification_library_myid)
        }

        var my_div = document.createElement("div");
        var my_loader = document.createElement("div")
        var content = document.createElement("div")
        var icon = document.createElement("div")
        var message = document.createElement("div")

        this.loader = my_loader
        this.div = my_div
        this.json = json

        switch (this.json.theme) {
            case 'light':
                my_div.classList.add("Notification-library-notification-light")
                break

            case 'dark':
                my_div.classList.add("Notification-library-notification-dark")
                break

        }
        switch (this.json.type) {
            case 'success':
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#1bff00" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg> `
                my_loader.classList.add("Notification-library-loader-success")
                break
            case 'alert':
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="yellow" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>`
                my_loader.classList.add("Notification-library-loader-alert")
                break
            case 'error':
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>`
                my_loader.classList.add("Notification-library-loader-error")
                break
            case 'normal':
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="orange" class="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>`
                my_loader.classList.add("Notification-library-loader-normal")
                break
        }

        content.classList.add("Notification-library-content")
        icon.classList.add("Notification-library-icon")
        message.classList.add("Notification-library-message")
        var text = document.createTextNode(this.json.message)
        message.appendChild(text)
        content.appendChild(icon)
        content.appendChild(message)
        my_div.appendChild(content)
        my_div.appendChild(my_loader)
        document.getElementsByClassName("Notification-library-myid")[0].prepend(my_div)

        // notification_library_list.push(this.div)
    }
    show() {
        if(this.json.sound){
            const sound = new Audio('https://cdn.jsdelivr.net/gh/Shlok-Jain/Notification-library@latest/notification.mp3')
            sound.play();
        }

        this.div.style.animation = `show forwards 325ms`
        this.loader.style.animation = `loader linear forwards ${this.json.duration}ms`


        window.addEventListener("focus", (event)=> {
            // do something when window gets focus
            this.loader.style.animationPlayState = 'running'
        }, false);
        
        window.addEventListener("blur", (event)=> {
            // do something when window loses focus
            this.loader.style.animationPlayState = 'paused'
          }, false);

        //swipe
        var ini_x
        var fin_x
        var delta
        this.div.addEventListener('touchstart', (e) => {                 //use arraow function here to access this keyword
            this.loader.style.animationPlayState = 'paused'
            ini_x = e.touches[0].clientX;
        })
        this.div.addEventListener('touchmove', (e) => {
            fin_x = e.touches[0].clientX;
            delta = fin_x - ini_x;
            this.notification_container.style.transform = `translateX(${delta}px)`
        })
        this.div.addEventListener('touchend', () => {
            var ratio = delta / window.innerWidth;
            if (Math.abs(ratio) > 0.4) {
                this.hide()
            }
            else {
                this.div.style.transform = `translateX(0px)`
            }
            this.loader.style.animationPlayState = 'running'
        })

        this.div.addEventListener('mouseenter', () => {
            this.loader.style.animationPlayState = 'paused'
        })
        this.div.addEventListener('mouseleave', () => {
            this.loader.style.animationPlayState = 'running'
        })



        this.loader.addEventListener('animationend', () => {
            this.div.style.animation = "hide 325ms forwards"
            setTimeout(() => {
                this.loader.style.animation = ""
                this.div.remove()
             }, 325)
        })
        
    }
    hide() {
        this.div.style.animation = "hide 325ms forwards"
        setTimeout(() => {
            this.loader.style.animation = ""
            this.notification_container.remove()
        }, 325)
    }
}
