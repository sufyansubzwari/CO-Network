class UploadToS3fromClient{

    constructor(){
        Slingshot.fileRestrictions("myFileUploads", {
            allowedFileTypes: /.*/i,
            maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
        });

        this.uploader = new Slingshot.Upload("myFileUploads");
    }

    async uploadFromClient(file){
        return new Promise((resolve, reject) => {
            this.uploader.send(file, (error, downloadUrl) => {
                if (error) {
                    console.error("Error uploading");
                    return reject(-1);
                } else {
                    console.log("the urls us :  " + downloadUrl);
                    return resolve(downloadUrl)
                }
            });
        });
    }

}

export default new UploadToS3fromClient();