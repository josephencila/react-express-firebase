import { generateUploadButton} from '@uploadthing/react'

const BASE_URL = "http://localhost:4000";

const intOpts = {
    url: `${BASE_URL}/api/uploadthing`,
}

export const UploadButton = generateUploadButton(
    intOpts)





