import jwt from 'jsonwebtoken'

const createToken = (userId) => {
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    return token
}

export default createToken

