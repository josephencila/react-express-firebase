const { createUploadthing } = require('uploadthing/express')
const { UploadThingError } = require('uploadthing/server')

const admin = require('./firebaseConfig')

const f = createUploadthing()
const uploadRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: '4MB',
      maxFileCount: 1
    }
  })
    .middleware(async ({ req, res }) => {
      console.log('fb-midware', req.headers)

      const reqHeader = req.headers.authorization || req.headers.Authorization

      if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
        // return res.status(401).send('Unauthorized')
        res.status(401)
        throw new UploadThingError({ message: 'Unauthorized Access.' })

      }

      const token = reqHeader.split(' ')[1]

      try {
        await admin.auth().verifyIdToken(token)
        
      } catch (error) {
        res.status(401)
        throw new UploadThingError({ message: 'Forbidden: you don’t have permission to access this resource.' })
      }

    }).onUploadComplete(async ({ metadata, file }) => {

      return {
        success: true,
        file
      };

    }),

}


module.exports = uploadRouter


