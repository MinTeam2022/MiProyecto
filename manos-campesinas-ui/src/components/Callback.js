import { useEffect } from "react"
import { Redirect, useLocation } from "react-router"
import { useAuthDispatch } from "../context/AuthContext"


const Callback = () => {
    const search = useLocation().search
    const auth = JSON.parse(new URLSearchParams(search).get('auth'))
    const authDispatch = useAuthDispatch()

    useEffect(() => {
        if (auth) {
            authDispatch({
                type: 'added',
                auth
            })
        }

    }, [auth, authDispatch])
    return (
        <Redirect to="/login"></Redirect>
    )
}

export default Callback