notification_library_list = []
class NotificationJS {

    constructor(json) {

        
        if(!document.getElementsByClassName('Notification-library-myid')[0]){
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

        switch(this.json.theme){
            case 'light':
                my_div.classList.add("Notification-library-notification-light")
                break

            case 'dark':
                my_div.classList.add("Notification-library-notification-dark")
                break
                
        }
        switch(this.json.type){
            case 'success':
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/Shlok-Jain/Notification-library@latest/icons/success.png" class="Notification-library-image"/> '
                my_loader.classList.add("Notification-library-loader-success")
                break
            case 'alert':
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/Shlok-Jain/Notification-library@latest/icons/alert.png" class="Notification-library-image"/> '
                my_loader.classList.add("Notification-library-loader-alert")
                break        
            case 'error':
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/Shlok-Jain/Notification-library@latest/icons/error.png" class="Notification-library-image"/> '
                my_loader.classList.add("Notification-library-loader-error")
                break
            case 'normal':
                icon.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/Shlok-Jain/Notification-library@latest/icons/normal.png" class="Notification-library-image"/> '
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
        document.getElementsByClassName("Notification-library-myid")[0].appendChild(my_div)
        notification_library_list.push(this.div)
    }
    show() {
        
        this.div.style.animation = `show forwards 325ms`
        this.loader.style.animation = `loader linear forwards ${this.json.duration}ms`




        if(!(notification_library_list.length == 1)){
            for(let i=0 ; i<notification_library_list.length-1 ; i++){
                var current_top = window.getComputedStyle(notification_library_list[i]).top.replace('px','')
                var final_top = parseInt(current_top) + parseInt(window.getComputedStyle(this.div).height.replace('px','')) + 7;
                notification_library_list[i].style.top = final_top + "px"
            }
        }
        //swipe

        var ini_x
        var fin_x
        var delta

        this.div.addEventListener('touchstart', (e)=>{                 //use arraow function here to access this keyword
            this.loader.style.animationPlayState = 'paused'
            ini_x = e.touches[0].clientX;
        })
        this.div.addEventListener('touchmove', (e)=>{
            fin_x = e.touches[0].clientX;
            delta = fin_x - ini_x;
            this.div.style.transform = `translateX(${delta}px)`
        })
        

        this.div.addEventListener('touchend', ()=>{
            var ratio = delta/window.innerWidth;
            if(Math.abs(ratio)>0.4){
                this.hide()
            }
            else{
                this.div.style.transform = `translateX(0px)`
            }
            this.loader.style.animationPlayState = 'running'
        })
        this.div.addEventListener('mouseenter', ()=>{
            this.loader.style.animationPlayState = 'paused'
        })
        this.div.addEventListener('mouseleave', ()=>{
            this.loader.style.animationPlayState = 'running'
        })


        this.loader.addEventListener('animationend',()=>{
            this.div.style.animation = "hide 325ms forwards"
            setTimeout(()=>{
                this.loader.style.animation = ""
                this.div.remove()
            },325)
        })
        
    }
    hide(){
        this.div.style.animation = "hide 325ms forwards"
            setTimeout(()=>{
                this.loader.style.animation = ""
                this.div.remove()
            },325)
    }
}
