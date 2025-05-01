"use client";

import ResetPassword from "@/components/auth/resetPassword";

const ResetPasswordPage = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ResetPassword />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
