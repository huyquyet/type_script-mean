module mean{
  declare var angular;
  angular.module('postService_ts', []).factory('Post_ts', Post);

   export class Post{
     static $inject = ['$http'];
     constructor(private $http) { return; }
       get = (url) => {
         // '/api/post/list'
            return this.$http.get(url);
       }
       create = (url, data) => {
        //  '/api/post/create'
           return this.$http.post(url, data);
       }
       detail = (url, id) => {
        //  'api/post/detail/'
           return this.$http.get(url + id);
       }
       delete = (url, id) => {
        //  '/api/post/delete/'
           return this.$http.delete(url + id);
       }
       edit = (url, data) => {
        //  '/api/post/edit'
           return this.$http.post(url , data);
       }
  }
}
