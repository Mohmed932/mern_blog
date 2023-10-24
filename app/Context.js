"use client"
import { createContext, useState } from 'react'
export const CustomContext = createContext(null)

const Context = ({ children }) => {
    const [data, setData] = useState(null)
    return <CustomContext.Provider value={{ data, setData }}>{children}</CustomContext.Provider>
}

export default Context
