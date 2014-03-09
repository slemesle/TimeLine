/**
 * Created by slemesle on 09/03/2014.
 */
angular.module('app', []).
    filter('key', function() {
        return function(input, selected) {

            if (selected.length == 0){

                return input;
            }



            var res = [];

            _.forEach(input, function (log){
                if (_.contains(selected, buildKey(log.found)) || _.contains(selected, buildKey(log.input))){
                    res.push(log)
                }
            });

            return res;
        };
    });
