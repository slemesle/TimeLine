
var logs = [];
var keys = [];


function logCtrl ($scope, $sce) {

    $scope.logs = logs;

    $scope.distinct = [];

    $scope.diff = function (log){

        return  $sce.trustAsHtml( diffString(JSON.stringify(log.found), JSON.stringify(log.input)));
    }

    $scope.hide = function(log){
        return ( log["hide"] == undefined || log["hide"]);
    }

    $scope.show = function(log){

        if (log["hide"] == undefined || log["hide"]) {
            log.hide = false;
        } else {
            log.hide = true;
        }

    }


    $scope.countIdAq = function (log){

        if ($scope.distinct[log.found.idAq] == undefined) {
            $scope.distinct[log.found.idAq] = 1;
        } else {
            $scope.distinct[log.found.idAq] ++;
        }

        return $scope.distinct[log.found.idAq];
    }

    $scope.diffLabel = function (valA, valB){
        vstrA = JSON.stringify(valA);
        vstrB = JSON.stringify(valB);

        if (vstrA == vstrB){
            return "success";
        } else {
            return "danger";
        }
    }


    $scope.labelInvalidate = function(log){
        var res = "info";
        if (log.found.invalidated == 1){
            res = "primary"
        } else if (log.found.invalidated > 1) {
            res = "warning"
        }
        return res;
    }


    $scope.stringInvalidate = function (log){
        var res = "SHOULD NOT INVALIDATE";
        if (log.found.invalidated == 1){
            res = "SHOULD INVALIDATE"
        } else if (log.found.invalidated > 1) {
            res = "SHOULD HAVE BEEN INVALIDATED"
        }
        return res;
    }


    $scope.invalidateClass = function (log){
        var res = "blue";
        if (log.found.invalidated == 1){
            res = "orange"
        } else if (log.found.invalidated > 1) {
            res = "red"
        }
        return res;
    }
}

function headerCtrl($scope){

    var regexp = /^([0-9]{4})([0-9]{2})([0-9]{2}).+$/;

    $scope.od = logs[0].found.od;

    var tab = regexp.exec(logs[0].found.departureDate);

    $scope.date = tab[3]+'-'+tab[2]+'-'+tab[1];

}


function keysCtrl($scope){
    $scope.keys = keys;

    $scope.$watchCollection('keys', function(newNames, oldNames) {
        $scope.dataCount = newNames.length;
    });

}
