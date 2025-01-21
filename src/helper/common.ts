import fs from 'fs'
import multer from 'multer'
import path from "path";

const readHTMLFile = function (path: any, cb: any) {
    // read file
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) {
            console.log(err)
            throw err;
        } else {
            cb(null, data);
        }
    });
}

const uploadMulter = (destination_path: string) => {
    const storage = multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const filePath = path.resolve(__dirname, "../uploads/", destination_path);
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
            } catch (error) {
                console.log("error", error);
            }
            cb(null, filePath);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, Date.now() + "-" + file.originalname); // File naming
        },
    });

    // Initialize Multer with the storage configuration
    return multer({ storage: storage });
}

export { readHTMLFile, uploadMulter }