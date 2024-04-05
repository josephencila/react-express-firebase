const admin = require('../configs/firebaseConfig')

const firebaseMW = async (req, res, next) => {
    
    console.log('fb-midware',req.headers.authorization)

    const reqHeader = req.headers.authorization || req.headers.Authorization

    if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = reqHeader.split(' ')[1]
  
    try {
         const decoded = await admin.auth().verifyIdToken(token)
         req.user = decoded
       
        return next()
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' })
    }
}

module.exports = firebaseMW