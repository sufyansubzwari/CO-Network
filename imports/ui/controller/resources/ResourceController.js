import {Meteor} from 'meteor/meteor';

const saveResource = (body, ext, path, callBack) => {

    Meteor.call('resource.upload', body, ext, path, (error, result) => {
        callBack && callBack(error, result)
        if (error) {
            alert("Uploading error", 'danger');
            console.log(error)
        }
    })
}


export {saveResource}