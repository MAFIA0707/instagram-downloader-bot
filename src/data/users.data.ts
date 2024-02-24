export interface UserType {
    tgId: number | undefined
    firstName: string | undefined
    lastName: string | undefined
    phoneNumber: string | undefined
}

export const users: UserType[] = []