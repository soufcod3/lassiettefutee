// hooks/useUserData.ts

import { useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { getUserDb } from '@/lib/actions/user.actions'; // Adjust the path as needed
import { IUserData, IUserDb } from '@/lib/models/user.model';

export const useUser = () => {
    const [userDb, setUserDb] = useState<IUserDb | null>(null);
    const { user } = useClerkUser(); // Fetch user data from Clerk

    const [userData, setUserData] = useState<IUserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const fetchedUser = await getUserDb(user.id); // Fetch user from DB
                    setUserDb(Array.isArray(fetchedUser) ? fetchedUser[0] : fetchedUser);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            }
        };

        fetchUserData();
    }, [user]); // Re-fetch user data when Clerk user changes

    // Return user data with fallbacks to ensure we have full user data
    // const userData: IUserData | null = userDb ? {
    //     id: user?.id || '',
    //     lastname: user?.lastName || userDb.lastname || '',
    //     firstname: user?.firstName || userDb.firstname || '',
    //     email: user?.emailAddresses[0].emailAddress || userDb.email || '',
    //     phone: user?.phoneNumbers[0]?.phoneNumber || userDb.phone || '',
    // } : null;

    // useEffect to refresh userData
    useEffect(() => {
        if (userDb) {
            setUserData({
                id: user?.id || '',
                lastname: user?.lastName || userDb.lastname || '',
                firstname: user?.firstName || userDb.firstname || '',
                email: user?.emailAddresses[0].emailAddress || userDb.email || '',
                phone: user?.phoneNumbers[0]?.phoneNumber || userDb.phone || '',
            });
        } else {
            setUserData({
                id: user?.id || '',
                lastname: user?.lastName || '',
                firstname: user?.firstName || '',
                email: user?.emailAddresses[0].emailAddress || '',
                phone: user?.phoneNumbers[0]?.phoneNumber || '',
            });
        }
    }, [user, userDb]);

    return { user: userData, isLoading: !userDb }; // Return loading state too
};

export default useUser;
