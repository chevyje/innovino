// import Style from "./login.module.css"
// import bg from "../assets/inlog-background.jpg"

// export default function loginPage() {
//     function loginSubmit(formData: any) {
//         const username: string = formData.get('username')
//         const password: string = formData.get('password')
//         auth({ username: username, password: password }).then(() => console.log('login tried'))



//     }
//     return (
//         <>
//             <div className={Style.background} style={{ backgroundImage: `url(${bg})` }}>
//                 <div className={Style.wrapper}>
//                     <h1 className={Style.title}>Inloggen</h1>
//                     <div className={Style.loginContainer}>
//                         <form action={loginSubmit} className={Style.loginForm}>
//                             <p className={Style.tag}>Gebruikersnaam</p>
//                             <input type={"text"} name={"username"} className={Style.inputField} />
//                             <p className={Style.tag}>Wachtwoord</p>
//                             <input type={"password"} name={"password"} className={Style.inputField} />
//                             <button className={Style.button}>Log in</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// interface User {
//     username: string
//     password: string
// }
// function auth(user: User) {
//     const headers: Headers = new Headers()
//     headers.set("Content-Type", "application/json")
//     headers.set("Accept", "application/json")

//     const request: RequestInfo = new Request('http://127.0.0.1:8000/api/users/auth', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(user)
//     })

//     return fetch(request).then(res => res.json()).then((data) => alert(JSON.stringify(data)))
// }
import Style from './login.module.css';
import bg from '../assets/inlog-background.jpg';

interface User {
    username: string;
    password: string;
}

interface AuthResponse {
    message: string;
    session_id: string;
}

export default function LoginPage() {
    async function loginSubmit(formData: FormData) {
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const { session_id } = await auth({ username, password });
            localStorage.setItem('session_id', session_id);
            console.log('Session opgeslagen:', session_id);
            // Optioneel: window.location.href = '/products';
        } catch (error) {
            console.error('Inloggen mislukt', error);
            alert('Inloggen mislukt, controleer je gegevens.');
        }
    }

    return (
        <div className={Style.background} style={{ backgroundImage: `url(${bg})` }}>
            <div className={Style.wrapper}>
                <h1 className={Style.title}>Inloggen</h1>
                <div className={Style.loginContainer}>
                    <form action={loginSubmit} className={Style.loginForm}>
                        <p className={Style.tag}>Gebruikersnaam</p>
                        <input type="text" name="username" className={Style.inputField} />
                        <p className={Style.tag}>Wachtwoord</p>
                        <input type="password" name="password" className={Style.inputField} />
                        <button className={Style.button} type="submit">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function auth(user: User) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });

    const request: RequestInfo = new Request('http://127.0.0.1:8000/api/users/auth', {
        method: 'POST',
        headers,
        body: JSON.stringify(user),
    });

    return fetch(request).then((res) => {
        if (!res.ok) {
            throw new Error('Inloggen mislukt');
        }
        return res.json() as Promise<AuthResponse>;
    });
}
