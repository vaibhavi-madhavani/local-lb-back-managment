export default interface userAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    otp: string;
    otp_expire_time: Date;
    companyId: number
}

