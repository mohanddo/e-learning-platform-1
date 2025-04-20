import { axiosInstance } from './axios';
import { Student, LoginCredentials, RegisterCredentials, VerifyUserRequest } from '@/components/types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        const { data } = await axiosInstance.post<Student>(
            'auth/student/login',
            credentials
        );
        return data;
    },
    register: async (credentials: RegisterCredentials) => {
        const { data } = await axiosInstance.post<void>(
            'auth/student/signup',
            credentials
        );
        return data;
    },

    verifyEmail: async (request: VerifyUserRequest) => {
        const { data } = await axiosInstance.post<Student>(
            'auth/student/verify',
            request
        );
        return data;
    },

    resendVerificationEmail: async (email: string) => {
        const { data } = await axiosInstance.post<void>(
            `auth/student/resend?email=${email}`
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