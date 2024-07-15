const adminLogin = () => {
    const form = document.querySelector('.formAuth');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const viewPassword = document.getElementById('viewPassword');

    form?.addEventListener('submit', handleAuth);
    viewPassword?.addEventListener('change', displayPassword)

    async function handleAuth(event) {

        try {
            event.preventDefault();
            displayMessage(form, 'load', 'Loading...', 'block')

            const postData = {
                email: email.value.trim(),
                password: password.value
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            };

            const response = await fetch('/users/server/login', requestOptions);

            if (response.status === 200) {
                const descendRemonte = await response.json();
                localStorage.setItem('descendRemonte', descendRemonte)
                window.location.href = '/dashboard';

            } else {
                const message = await response.json();
                return displayMessage(form, 'error', message.message, 'block')
            }

        } catch (error) {
            console.error(error);
        }

        email.value = '';
        password.value = '';
    }
}
adminLogin();

const adminLogout = () => {
    const logout = document.querySelector('.logout');

    logout?.addEventListener('click', async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch('/users/server/logout', requestOptions);

            if (response.status === 200) {
                localStorage.removeItem('descendRemonte')
                window.location.href = '/';
            } else {
                return console.error('Erreur erreur s\'est produite lors du processus de ls deconnexion');
            }

        } catch (error) {
            console.error(error);
        }
    })
}
adminLogout()

function displayPassword() {
    if (viewPassword.checked) {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}

function displayMessage(form, statusElement, message, display) {
    const dispalyAll = document.querySelectorAll('.displayMessage');
    dispalyAll?.forEach(element => element.style.display = 'none');

    const div = document.createElement('div');
    const close = document.createElement('div');
    const bar1 = document.createElement('div');
    const bar2 = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = message;
    p.style.display = display;
    p.style.textAlign = 'center'
   
    bar1.style.transform = "rotate(45deg)";
    bar1.style.width = "3px";
    bar1.style.height = "25px";
    bar1.style.backgroundColor = "white";
    bar1.style.position = 'absolute';
    bar2.style.transform = "rotate(-45deg)";
    bar2.style.width = "3px";
    bar2.style.height = "25px";
    bar2.style.backgroundColor = "white";
    bar2.style.position = 'absolute';
    close.appendChild(bar1);
    close.appendChild(bar2);
    close.style.position = 'relative';
    close.style.cursor = 'pointer';
    close.style.marginLeft = 'auto';
    close.style.marginRight = '0';
    close.style.width = '35px';
    close.style.height = '35px';

    div.appendChild(close);
    div.appendChild(p);
    div.style.position = 'absolute';
    div.style.top = '50%'
    div.style.left = '50%'
    div.style.transform = 'translate(-50%, -50%)';
    div.style.padding = '15px';
    div.style.borderRadius = '15px'
    div.style.display = 'flex';
    div.style.flexDirection = 'column'
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.gap = '12px';
    div.classList.add('displayMessage');
    div.style.backgroundColor = statusElement === 'load' && '#0dcaf0' || statusElement === 'success' && "#198754" || statusElement === 'error' && '#dc3545';

    form.appendChild(div);
    form.style.position = 'relative';

    close.addEventListener('click', () => {
        div.style.display = 'none';
    })
}