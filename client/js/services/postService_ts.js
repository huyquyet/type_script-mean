var mean;
(function (mean) {
    angular.module('postService_ts', []).factory('Post_ts', Post);
    var Post = (function () {
        function Post($http) {
            var _this = this;
            this.$http = $http;
            this.get = function (url) {
                return _this.$http.get(url);
            };
            this.create = function (url, data) {
                return _this.$http.post(url, data);
            };
            this.detail = function (url, id) {
                return _this.$http.get(url + id);
            };
            this.delete = function (url, id) {
                return _this.$http.delete(url + id);
            };
            this.edit = function (url, data) {
                return _this.$http.post(url, data);
            };
            return;
        }
        Post.$inject = ['$http'];
        return Post;
    }());
    mean.Post = Post;
})(mean || (mean = {}));
//# sourceMappingURL=postService_ts.js.map