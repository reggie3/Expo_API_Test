import validator from 'validator';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
import appSecrets from './appSecrets';
export const AWSUtilities = {
    
    updateConfig: function (idToken, authType) {
        let loginsObject = {}
        switch (authType) {
            case 'Facebook':
                loginsObject = { 'graph.facebook.com': idToken }
                break;
            case 'Google':
                loginsObject = { 'accounts.google.com': idToken }
                break;
            default:
                console.error("unexpected result in 'utilities' in 'updateConfig' function");
            break;
        }
        AWS.config.update({
            region: 'us-east-1',
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPooolId: appSecrets.aws.poolID,
                Logins: loginsObject
            })
        })
    }
}

/**
 * Encode object to url parameters
 *
 * @param      {Object} paramsObj The object needs to encode as url parameters
 * @return     {String} Encoded url parameters
 */
export const objectToParams = function (paramsObj) {
    let str = '';
    for (const key in paramsObj) {
        if (str !== '') {
            str += '&';
        }
        str += `${key}=${encodeURIComponent(paramsObj[key])}`;
    }
    return str;
};

/*********
 * generate a random 5 digit number
 */
export const genRand = () => { return Math.floor(Math.random() * 89999 + 10000); }

/**************
 * Strong password generator
 */
export const generatePassword = (len) => {

    let length = (len) ? (len) : (10);
    let string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    let numeric = '0123456789';
    let punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = "";
    let character = "";
    //let crunch = true;
    while (password.length < length) {
        let entity1 = Math.ceil(string.length * Math.random() * Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        let hold = string.charAt(entity1);
        hold = (entity1 % 2 === 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    return `${password}Aa1@`;
}


/*******************
 * remove all validation errors prior to performing new validation so 
 * that we are not seeing old validation feedback
 * @params validatorObjects - object with validator - message pairs
 */
export const resetValidators = (validatorObjects, component) => {
    let resetKey = (component, key) => {
        component.setState({ key: '' })
    }
    Object.keys(validatorObjects).forEach((key) => resetKey(component, key));
}

export const validateEmail = (email) => {
    if (email <= 0) { return 'email address is required'; }
    if (!validator.isEmail(email)) { return 'must be an email address'; }
    else { return ''; }
}

/***********
 *  validateNotEmpty
 * @ text - the string to be checked
 * @ name - the name of the string to be checked.  It will be added to the beginning
 * of the error string
 * */
export const validateNotEmpty = (text, name) => {
    if (text.length <= 0) { return `${name} is required`; }
    else { return ''; }
}


export const validatePassword =(thisPassword, otherPassword) =>{
        if (thisPassword.length <= 0) { return 'password is required'; }
        if (thisPassword < 8) { return 'password must be at least 8 characters long'; }
        if(otherPassword){
            if (thisPassword !== otherPassword) { return 'passwords must match'; }
        }
        else { return ''; }
}

/************************************
 * create globally-unique identifiers to use as object names
 */
export const getGUID =() => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export const getHashCode = (string) => {
  var hash = 0, i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/*************************************************
 * create an id for a story related resource item 
 * (picture, sound, locationMarker, etc.)
 */
export const getItemId = (userName, itemType) =>{
    let id = itemType + "_" + getHashCode(userName) + "_" + Math.floor(Date.now() / 1000);
    console.log(`${itemType} id=${id} created`);
    return id;
}

/************************************************
 * 
 */
export const syntaxHighlight = (json) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
