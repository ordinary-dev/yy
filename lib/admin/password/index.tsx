import { FormEvent } from "react"
import styles from "./password.module.css"

const PasswordManager = () => (
    <div className={styles.Container}>
        <h2>Password manager</h2>
        <form onSubmit={handleSubmit}>
            <input name="currentPassword"
                   placeholder="Current password"
                   type="password"
                   required
            />
            <input name="newPassword"
                   placeholder="New password"
                   type="password"
                   required
            />
            <input
                   name="repeatedPassword"
                   placeholder="Repeat password"
                   type="password"
                   required
            />
            <button type="submit">Change password</button>
        </form>
    </div>
)

interface PasswordForm extends HTMLFormElement {
    currentPassword: HTMLInputElement
    newPassword: HTMLInputElement
    repeatedPassword: HTMLInputElement
}

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const target = e.target as PasswordForm
    if (target.newPassword.value !== target.repeatedPassword.value) {
        alert("Passwords don't match")
        return
    }

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oldPassword: target.currentPassword.value,
            newPassword: target.newPassword.value,
        }),
    }

    const response = await fetch("/api/password", options)
    if (!response.ok) {
        alert("Request failed")
        return
    }
    alert('Password was changed')
    target.reset()
}

export default PasswordManager
