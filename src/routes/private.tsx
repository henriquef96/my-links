import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { auth } from '../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { RouteLoader } from '../components/loader';

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email
                };
                localStorage.setItem("@detailUser", JSON.stringify(userData));
                setSigned(true);
            } else {
                setSigned(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return <RouteLoader />;
    }

    if (!signed) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
