import { axiosInstance } from './axios';
import { Student, LoginCredentials, RegisterCredentials, RegisterResponse } from '@/components/types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await axiosInstance.post<Student>(
            'auth/student/login',
            credentials
        );
        return data;
    },
    register: async (credentials: RegisterCredentials) => {
        const { data } = await axiosInstance.post<RegisterResponse>(
            'auth/student/signup',
            credentials
        );
        return data;
    },

    verifyEmail: async (code: string) => {
        const { data } = await axiosInstance.post<Student>(
            'auth/student/verify',
            { code }
        );
        return data;
    },

    resetPassword: async (email: string) => {
        const { data } = await axiosInstance.post<string>(
            `password/verifyEmail/${email}`,
        );
        return data;
    }
};