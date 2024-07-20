const listMessages = document.querySelector('.messages');

listMessages.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const clickedUl = clickedElement.closest('ul');
  let user = clickedUl.querySelector('li').dataset.email;
  
  readMessage(user);

  if (!clickedUl) {
    return;
  }

  clickedUl.classList.toggle('active-ul');

  if (clickedUl.parentElement) {
    for (const siblingUl of clickedUl.parentElement.querySelectorAll('ul')) {
      if (siblingUl !== clickedUl) {
        siblingUl.classList.remove('active-ul');
      }
    }
  }
});


async function addMessages() {
    try {
        const response = await fetch('/messages/data');

        if (response.status === 200) {
            const messages = await response.json();
            const groupesMessages = Object.values(grouperParEmail(messages));

            let notiMessage = 0;

            for(let groupe of groupesMessages) {
                const ul = document.createElement('ul');
                
                const reponse = document.createElement('div');
                reponse.classList.add('sendMessage');
                
                const textarea = document.createElement('textarea');
                const envoyer = document.createElement('button');
                envoyer.textContent = 'Envoyer';
                reponse.appendChild(textarea);
                reponse.appendChild(envoyer);

                const notifications = document.createElement('div');
                notifications.classList.add('notifications');
                let nbre = 0;

                for(let message of groupe) {
                    if(message.read === false) {
                        nbre +=1;
                        notiMessage +=1;
                    }
                    const li = document.createElement('li');
                    li.setAttribute('data-email', message.email);
                    const div = document.createElement('div');
                    div.classList.add('head')
        
                    const nom = document.createElement('div');
                    nom.textContent = message.nom;
                    const date = document.createElement('div');
                    date.classList.add('date')
                    date.textContent = dateConvers(message.date);
        
                    const text = document.createElement('p'); 
                    text.textContent = message.message; 
                    
                    div.appendChild(nom);
                    div.appendChild(date);
                    li.appendChild(div);
                    li.appendChild(text);
                    ul.appendChild(li);
                    ul.appendChild(reponse);
                    ul.appendChild(notifications);
                }
                if(nbre > 0) {
                  notifications.textContent = nbre;
                } else {
                  notifications && notifications.remove();
                }
                listMessages.appendChild(ul);
            }
            
            if(notiMessage > 0) {
              const messageNav = document.querySelector('.messagesNav');
              const div = document.createElement('div');
              div.textContent = notiMessage
              messageNav.appendChild(div)
            } else {
              messageNav && messages.remove();
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

/* MESSAGE SELON EMAIL */
function grouperParEmail(messages) {
    const groupes = {};
  
    for (const message of messages) {
      const email = message.email;
      if (!groupes[email]) {
        groupes[email] = [];
      }
      groupes[email].push(message);
    }

    return groupes;
}

/* READ MESSAGES */
async function readMessage(user) {

    try {
        const postData = {
            email: user
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        const response = await fetch('/messages', requestOptions);

        if (response.status === 200) {
          console.log('ok');
        } else {
          console.log('erreur');
        }

    } catch (error) {
        console.error(error);
    }
}

/* FORMAT DATE */
function dateConvers(enterDate) {
  const dateString = enterDate
  const date = new Date(dateString);

  const jour = date.getDate().toString().padStart(2, '0');
  const mois = (date.getMonth() + 1).toString().padStart(2, '0');
  const annee = date.getFullYear().toString();

  const heure = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  const dateFormatee = `${jour}/${mois}/${annee} ${heure}:${minute}`;
  return dateFormatee;
}