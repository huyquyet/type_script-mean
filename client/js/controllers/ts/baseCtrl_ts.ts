module mean{
  declare var angular;
  angular.module('baseCtrl_ts',[]);
  class baseController {
    static $inject = ['$scope','$http'];
    constructor($scope, $http){
    }
  }
}
