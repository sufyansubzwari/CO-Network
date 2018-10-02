import v1 from "uuid/v1";

// if(Meteor.settings.AWSAccessKeyId && Meteor.settings.AWSSecretAccessKeyId)
Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: /.*/i,
    maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

if(Meteor.settings.AWSAccessKeyId && Meteor.settings.AWSSecretAccessKey)
Slingshot.createDirective("myFileUploads",  Slingshot.S3Storage, {
    bucket: "mlsociety-public",

    acl: "public-read",

    authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },

    key: function (file) {
        //Store file into a directory by the user's username.

        var user = Meteor.users.findOne(this.userId);
        console.log("-------------------------------------------------")
        console.log(file)
        console.log(this.userId)
        console.log("-------------------------------------------------")

        return v1() + "/" + file.name;
    }
});