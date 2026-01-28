// =========================================
// Reset Password Page
// app/(auth)/Reset-password/page.tsx
// =========================================

import { Metadata } from 'next';
import ResetPasswordPage from '@/pages-section/reset-password';

export const metadata: Metadata = {
  title: "Reset Password - Symspace",
  description: "Reset your Symspace account password",
};

export default function ResetPassword() {
  return <ResetPasswordPage />
}