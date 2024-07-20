async function addMessages() {
    try {
        const response = await fetch('/messages/data');

        if (response.status === 200) {
            const messages = await response.json();
            let notifications = 0;

            for(let message of messages) {
                if(message.read === false) {
                    notifications +=1;
                }
            }

            if(notifications > 0) {
                const messageNav = document.querySelector('.messagesNav');
                const div = document.createElement('div');
                div.textContent = notifications
                messageNav.appendChild(div)
            } else {
                messages && messages.remove();
            }

        } else {
            const error = await response.json();
            console.log(error);
        }

    } catch (error) {
        console.error(error);
    }
}
addMessages()