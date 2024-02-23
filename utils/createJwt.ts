"use server"

import jwt from 'jsonwebtoken'

export const generateToken = (payload: string) => {
    const secretKey = process.env.secretKey;

    return jwt.sign({name: payload}, secretKey, {expiresIn: 60*60*60});
};