import { randomBytes, scryptSync } from 'crypto'

export const getSalt = () => {
    return randomBytes(16).toString('hex')
}

export const getHash = (password: string, salt: string) => {
    return scryptSync(password, salt, 64).toString('hex')
}
