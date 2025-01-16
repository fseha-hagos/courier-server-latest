import axios from "axios"


export const sendVerificationSms = async (
  phoneNumber: string,
  otp: string
) => {
  try {
    // await axios({
    //   url: 'https://api.afromessage.com/api/send',
    //   method: 'get',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.AFRO_SMS_API_KEY}`
    //   },
    //   params: {
    //     timeout: 10000, // default is `0` (no timeout)
    //     from: process.env.AFRO_SMS_IDENTIFIER_ID,
    //     to: phoneNumber,
    //     message: `Your verification code is ${otp}. This code will expire in 10 minutes. Thank you for joining.`,
    //   },
    // });
    console.log("OTP: ", otp)
  } catch (error) {
    console.error(error);
  }

};
