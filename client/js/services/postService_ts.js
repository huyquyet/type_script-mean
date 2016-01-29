var mean;
(function (mean) {
    var Post = (function () {
        //static $inject = ['$http'];
        function Post($http) {
            var _this = this;
            this.$http = $http;
            this.get_ts = function (url) {
                // '/api/post/list'
                return _this.$http.get(url);
            };
            this.create_ts = function (url, data) {
                //  '/api/post/create'
                return _this.$http.post(url, data);
            };
            this.detail_ts = function (url, id) {
                //  'api/post/detail/'
                return _this.$http.get(url + id);
            };
            this.delete_ts = function (url, id) {
                //  '/api/post/delete/'
                return _this.$http.delete(url + id);
            };
            this.edit_ts = function (url, data) {
                //  '/api/post/edit'
                return _this.$http.post(url, data);
            };
        }
        return Post;
    })();
    mean.Post = Post;
    angular.module('postService_ts', []).factory('Post_ts', ['$http', Post]);
})(mean || (mean = {}));
//# sourceMappingURL=postService_ts.js.map