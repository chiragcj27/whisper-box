import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/VerificationEmail'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const mail = await resend.emails.send({
            from: 'info@cjcodes.xyz',
            to: email,
            subject: 'Wishper Box Verification',
            react: VerificationEmail({username,otp :verifyCode})
        });
        console.log(mail)
        return {success: true, message: 'Verification email send successfully'}
    }
    catch(emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: 'Failed to send verification email'}
    }
}