"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Appbar(){
    const session = useSession();
    return (
        <div>
            <button onClick={() => {
                signIn()
            }}>Sign in</button>
            <button onClick={() => {
                signOut()
            }}>Logout</button>
            <p>{JSON.stringify(session)}</p>
        </div>
    )
}