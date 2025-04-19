"use client"

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
                <Link 
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--addi-color-400)] transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
