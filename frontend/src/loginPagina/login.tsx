import Style from "./login.module.css"
import bg from "../assets/inlog-background.jpg"

export default function loginPage() {
    function login (formData: any){
        const username: string = formData.get('username')
        alert(username)
    }
    return (
        <>
            <div className={Style.background} style={{backgroundImage: `url(${bg})` }}>
                <div className={Style.wrapper}>
                    <h1 className={Style.title}>Inloggen</h1>
                    <div className={Style.loginContainer}>
                        <form action={login} className={Style.loginForm}>
                            <p className={Style.tag}>Gebruikersnaam</p>
                            <input type={"text"} name={"username"} className={Style.inputField} />
                            <p className={Style.tag}>Wachtwoord</p>
                            <input type={"password"} name={"password"} className={Style.inputField}/>
                            <button className={Style.button}>Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
