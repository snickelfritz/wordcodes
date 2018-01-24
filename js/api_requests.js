var ALLOWED_METHODS = ["post", "get"];

var makeApiRequest = function(url, method, params, onSuccessFn, onErrorFn) {
    method = method.toLowerCase();
    if (ALLOWED_METHODS.indexOf(method) === -1) {
        throw new Error("Invalid api request method: " + method);
    }

    var requestUrl = url + "?";
    for (var key in params) {
        requestUrl += key + "=" + params[key] + "&";
    }
    requestUrl = requestUrl.slice(0, -1); // either need to chop off the ? or a & at the end

    return fetch(requestUrl, {method: method})
        .then(function(data) {
            data.json()
            .then(function(jsonData) {
                if (onSuccessFn) {
                    onSuccessFn(jsonData);
                }
            })
            .catch(function(jsonError) {
                // would this really ever error out?
                console.log(jsonError)
            });
        }, function(error) {
            if (onErrorFn) {
                onErrorFn(jsonData);
            }
        });
};

export { makeApiRequest };
