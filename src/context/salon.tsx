import { createContext, useContext, useState, ReactNode } from 'react'

interface SalonContextProps {
    Salon: Salon | null
    setSalon: React.Dispatch<React.SetStateAction<Salon | null>>
}

export const SalonContext = createContext<SalonContextProps | undefined>(
    undefined
)

export const SalonProvider = ({ children }: { children: ReactNode }) => {
    const [Salon, setSalon] = useState<Salon | null>(null)

    return (
        <SalonContext.Provider value={{ Salon, setSalon }}>
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
