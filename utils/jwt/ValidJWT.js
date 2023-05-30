import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Функция для проверки авторизации пользователя
async function isAuthenticated() {
    try {
        const res = await fetch('/api/auth/validation', { credentials: 'include' })
        return res.ok
    } catch (error) {
        console.error(error)
        return false
    }
}

// Компонент для проверки авторизации
export default function AuthGuard({ children }) {
    const router = useRouter()

    useEffect(() => {
        async function check() {
            const authenticated = await isAuthenticated()
            if (!authenticated) {
                // В случае, если пользователь не авторизован, перенаправляем на страницу авторизации
                router.push('/login')
            }
        }
        check()
    }, [])

    return children
}
