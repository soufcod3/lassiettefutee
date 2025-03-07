import { useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { getUserDb } from '@/lib/actions/user.actions'; // Adjust the path as needed
import { IUserClerk, IUserDb } from '@/lib/types/user';

export const useUser = () => {
    const [userDb, setUserDb] = useState<IUserDb | null>(null);
    const { user } = useClerkUser(); // Fetch user data from Clerk

    const [userData, setUserData] = useState<IUserClerk | IUserDb | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const fetchedUser = await getUserDb(user.id); // Fetch user from DB
                    setUserDb(fetchedUser);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            }
        };

        fetchUserData();
    }, [user]); // Re-fetch user data when Clerk user changes

    // useEffect to refresh userData
    useEffect(() => {
        if (userDb) {
            setUserData({
                id: user?.id || '',
                lastname: user?.lastName || userDb.lastname || '',
                firstname: user?.firstName || userDb.firstname || '',
                email: user?.emailAddresses[0].emailAddress || userDb.email || '',
                phone: user?.phoneNumbers[0]?.phoneNumber || userDb.phone || '',
                createdAt: user?.createdAt || userDb.createdAt,
                updatedAt: user?.updatedAt || userDb.updatedAt,
            });
        } else {
            setUserData({
                id: user?.id || '',
                lastname: user?.lastName || '',
                firstname: user?.firstName || '',
                email: user?.emailAddresses[0].emailAddress || '',
                phone: user?.phoneNumbers[0]?.phoneNumber || '',
                createdAt: user?.createdAt || new Date(),
                updatedAt: user?.updatedAt || new Date(),
            });
        }
    }, [user, userDb]);

    return { user: userData, isLoading: !userDb }; // Return loading state too
};

export default useUser;
