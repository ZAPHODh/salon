'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SalonContextProps {
    salon: Salon | null
    setSalon: (salon: Salon) => void
}

const SalonContext = createContext<SalonContextProps | undefined>(undefined)

export const SalonProvider = ({ children }: { children: ReactNode }) => {
    const [salon, setSalon] = useState<Salon | null>(null)

    return (
        <SalonContext.Provider value={{ salon, setSalon }}>
            {children}
        </SalonContext.Provider>
    )
}

export const useSalon = () => {
    const context = useContext(SalonContext)
    if (!context) {
        throw new Error('useSalon must be used within a SalonProvider')
    }
    return context
}
