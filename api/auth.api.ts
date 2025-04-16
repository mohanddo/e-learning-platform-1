import { axiosInstance } from './axios';
import { Student, LoginCredentials } from '@/components/types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await axiosInstance.post<Student>(
            'auth/student/login',
            credentials
        );
        return data;
    },
};