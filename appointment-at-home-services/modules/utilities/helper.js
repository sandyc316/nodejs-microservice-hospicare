module.exports = {
    
    createResponseErrorObject : (errors, module) => {
        var messages = require('../'+module+'/messages.json');
        var response = [];
        var error = {};

        if(errors && errors[0].code) {

            errors.forEach(code => {
                
                if(messages[code.code]) {
                    error.message = messages[code.code].message;
                    error.status = messages[code.code].status;
                }
                
            });
        }

        if(!error.message) {
            error.message = 'oops! something went wrong.';
        }

        if(!error.status) {
            error.status = 400;
        }

        response.push(error);
        
        return ({errors: response});
    },

    createResponseSuccessObject : (code, module, data='') => {
        var messages = require('../'+module+'/messages.json');
        var response = {};

        if(messages[code.code]) {
            response.message = messages[code.code].message;
            response.status = messages[code.code].status;
        }
        
        if(!response.status) {
            response.status = 200;    
        }
        
        if(data && data != '') {
            response.data = data;
        }

        if(!response.message) {
            response.message = 'success';
        }
        return response;
    }
}