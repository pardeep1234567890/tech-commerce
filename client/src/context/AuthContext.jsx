import { useContext, createContext, useState, useEffect, Children } from "react";
import axios from "axios"
import { toast } from "react-toastify";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const getAuthInitialState = () => {
        try {
            const saved = localStorage.getItem('auraAuth')
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Failed to parse auth from localStorage', error);
            return null;
        }
    }
    const [auth, setAuth] = useState(getAuthInitialState());

    // Here we create the Login function 

    // four mistake that i found was , 
    // 1. i did not use async/await , did not give parameter , or don't send the data as object , console.error
    const login = async (email, password) => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/users/login", { email, password });
            toast.success("Login Successfully")
            setAuth(data);
            localStorage.setItem('auraAuth', JSON.stringify(data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMessage);
        }
    }
    // here we create a register function 
    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/users", { name, email, password });
            toast.success("Register Successfully")
            setAuth(data);
            localStorage.setItem('auraAuth', JSON.stringify(data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(errorMessage);
            throw error; // Re-throw so RegisterPage can catch it
        }
    }

    // Here we create the logout function 
    const logout = () => {
        localStorage.removeItem('auraAuth');
        setAuth(null)
        toast.success("logout successfully")
    }

    const value = {
        auth,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}