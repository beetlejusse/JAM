import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStores"
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import React, { useEffect, useState } from "react"

const updateApiToken = (token: string | null) => {
    //added jwt token to axiosInstance so that we dont have to check for token repeatedly
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else{
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

export const AuthProvider = ({children}: {children:React.ReactNode}) => {
    //getting token from here first so that we can get some data from api's
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const {checkAdminstatus} = useAuthStore()

    useEffect(() => {
        const initAuth = async() => {
            try {
                const Token = await getToken()
                updateApiToken(Token)

                //check for admin status
                if(Token){
                    await checkAdminstatus()
                }
            } catch (error) {
                updateApiToken(null)
                console.log("Error in Auth provider", error)
            } finally{
                setLoading(false)
            }
        }

        initAuth()
    }, [getToken])

    if(loading) return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin" />
        </div>
    )

  return <>{children}</>
}
