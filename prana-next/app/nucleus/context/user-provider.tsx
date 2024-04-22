import { UserSession } from '@/app/types/UserSession';
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';

const defaultUserSession: UserSession = {
    user: {
        id: '',
        email: '',
    },
    selectedTenant: {
        id: '',
        name: '',
    },
    tenants: [],
};
const UserSessionContext =
    createContext<UserSessionContextType>({
        userSession: defaultUserSession,
        updateUserSession: () => {},
    });

export const UserSessionProvider = ({
    children,
}: UserSessionProviderProps) => {
    const [userSession, setUserSession] =
        useState<UserSession>(defaultUserSession);
    console.log('us: ', userSession);
    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const selectedTenantId =
                    localStorage.getItem(
                        'selectedTenantId',
                    );
                if (selectedTenantId) {
                    const response = await fetch(
                        `/api/user-session?selectedTenantId=${selectedTenantId}`,
                    );
                    if (response.ok) {
                        const userData =
                            await response.json();
                        await updateUserSession(userData);
                    }
                }
            } catch (error) {
                console.error(
                    'Error fetching user session:',
                    error,
                );
            }
        };
        fetchUserSession();
    }, []);

    const updateUserSession = (
        userSessionUpdates:
            | UserSession
            | ((prevSession: UserSession) => UserSession),
    ) => {
        const updateLocalStorage = (
            session: UserSession,
        ) => {
            const tenantId = session.selectedTenant?.id;
            if (tenantId) {
                localStorage.setItem(
                    'selectedTenantId',
                    tenantId,
                );
            } else {
                localStorage.removeItem('selectedTenantId');
            }
        };

        if (typeof userSessionUpdates === 'function') {
            setUserSession((prevSession) => {
                const updatedSession =
                    userSessionUpdates(prevSession);
                updateLocalStorage(updatedSession);
                return updatedSession;
            });
        } else {
            setUserSession(userSessionUpdates);
            updateLocalStorage(userSessionUpdates);
        }
    };

    return (
        <UserSessionContext.Provider
            value={{ userSession, updateUserSession }}
        >
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => {
    const context = useContext(UserSessionContext);
    if (!context) {
        throw new Error(
            'useUserSession must be used within a UserSessionProvider',
        );
    }
    return context;
};

type UserSessionContextType = {
    userSession: UserSession;
    updateUserSession: (
        userSession:
            | UserSession
            | ((prevSession: UserSession) => UserSession),
    ) => void;
};
type UserSessionProviderProps = {
    children: ReactNode;
};
