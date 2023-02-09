notification_library_list = []
class Notification {

    constructor(message) {
        var my_div = document.createElement("div");
        var my_loader = document.createElement("div")
        var content = document.createElement("div")
        this.loader = my_loader
        this.div = my_div

        my_div.classList.add("Notification-library-notification")
        content.classList.add("Notification-library-message")
        my_loader.classList.add("Notification-library-loader")
        var text = document.createTextNode(message)
        content.appendChild(text)
        my_div.appendChild(content)
        my_div.appendChild(my_loader)
        document.getElementsByClassName("Notification-library-myid")[0].appendChild(my_div)
        notification_library_list.push(this.div)
    }
    show(duration) {
        
        this.div.style.animation = `show forwards 325ms`
        this.loader.style.animation = `loader linear forwards ${duration}ms`

        if(!(notification_library_list.length == 1)){
            for(let i=0 ; i<notification_library_list.length-1 ; i++){
                var current_top = window.getComputedStyle(notification_library_list[i]).top.replace('px','')
                var final_top = parseInt(current_top) + parseInt(window.getComputedStyle(this.div).height.replace('px','')) + 7;
                notification_library_list[i].style.top = final_top + "px"
            }
        }
        this.div.addEventListener('touchstart', ()=>{                 //use arraow function here to access this keyword
            this.loader.style.animationPlayState = 'paused'
        })
        this.div.addEventListener('touchend', ()=>{
            this.loader.style.animationPlayState = 'running'
        })
        this.div.addEventListener('mouseenter', ()=>{
            this.loader.style.animationPlayState = 'paused'
        })
        this.div.addEventListener('mouseleave', ()=>{
            this.loader.style.animationPlayState = 'running'
        })

        Promise.all(
            this.loader.getAnimations().map(animation => animation.finished)
        ).then(() => {
            this.div.style.animation = "hide 325ms forwards"
            setTimeout(()=>{
                this.loader.style.animation = ""
                this.div.remove()
            },325)
        });
    }
}

window.onload = ()=>{

    const Notification_library_myid = document.createElement("div")
    Notification_library_myid.classList.add("Notification-library-myid")
    document.body.appendChild(Notification_library_myid)

}
