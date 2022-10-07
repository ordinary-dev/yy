import { FormEvent } from "react"

import styles from "./password.module.css"
import { PasswordAPI } from "pages/api/password"

const PasswordManager = () => {
    return (
        <div className={styles.Container}>
            <div>Password manager</div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    name="currentPassword"
                    placeholder="Current password"
                    type="password"
                />
                <input
                    name="newPassword"
                    placeholder="New password"
                    type="password"
                />
                <input
                    name="repeatedPassword"
                    placeholder="Repeat password"
                    type="password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

interface PasswordForm extends HTMLFormElement {
    currentPassword: HTMLInputElement
    newPassword: HTMLInputElement
    repeatedPassword: HTMLInputElement
}

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const target = e.target as PasswordForm
    if (target.newPassword.value !== target.repeatedPassword.value) {
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
    const res: PasswordAPI = await response.json()
    if (!res.ok) console.error("Request failed")
    else target.reset()
}

export default PasswordManager
