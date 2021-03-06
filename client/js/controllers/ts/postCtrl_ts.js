/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
var mean;
(function (mean) {
    angular.module('postCtrl_ts', []).controller('ListPostController_ts', ['$scope', '$state', 'flash', '$modal', 'appAlert', 'Post_ts', ListPostController]).controller('CreatePostController_ts', ['$scope', '$state', 'flash', 'Post_ts', CreatePostController]).controller('DetailPostController_ts', ['$scope', '$state', '$http', '$stateParam', 'flash', 'Post_ts', DetailPostController]);
    var ListPostController = (function () {
        function ListPostController($scope, $state, flash, $modal, appAlert, Post_ts) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.flash = flash;
            this.$modal = $modal;
            this.appAlert = appAlert;
            this.Post_ts = Post_ts;
            this.linkGet = "/api/post/list";
            this.linkDelete = "/api/post/delete/";
            this.listPost = function (linkGet) {
                _this.Post_ts.get_ts(linkGet).success(function (data) {
                    _this.$scope.posts = data;
                }).error(function () {
                    _this.$scope.error = "Có lỗi trong quá trình tai bài viết";
                });
            };
            this.deletePost = function (linkDelete, post_id) {
                _this.appAlert.confirm({
                    title: "Xác nhận xóa",
                    message: "Bạn chắc chắn muốn xóa bài viết này ?"
                }, function (isOk) {
                    if (isOk) {
                        _this.Post_ts.delete_ts(_this.linkDelete, post_id).success(function () {
                            _this.flash.success = "Xóa bài viết thành công";
                            _this.listPost(_this.linkGet);
                        }).error(function () {
                            _this.flash.error = "Có lỗi trong quá trình xóa bài viết";
                        });
                    }
                });
            };
            // this.$scope =  $scope;
            // this.$state =  $state;
            // this.flash = flash;
            // this.$modal = $modal;
            // this.appAlert = appAlert;
            // this.Post_ts = Post_ts;
            this.listPost(this.linkGet);
        }
        ListPostController.$inject = ['$scope', '$state', 'flash', '$modal', 'appAlert', 'Post_ts',];
        return ListPostController;
    })();
    mean.ListPostController = ListPostController;
    var CreatePostController = (function () {
        function CreatePostController($scope, $state, flash, Post_ts) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.flash = flash;
            this.Post_ts = Post_ts;
            this.linkCreate = "/api/post/create";
            this.linkDetail = "/api/post/detail/";
            this.createPost_ts = function () {
                _this.$scope.Proccess_ts = true;
                if (!$.isEmptyObject(_this.$scope.formData)) {
                    _this.Post_ts.create_ts(_this.linkCreate, _this.$scope.formData).success(function (data) {
                        _this.$scope.formData = {};
                        _this.$scope.form.$setPristine();
                        _this.$scope.Proccess_ts = false;
                        _this.flash.success = "Thêm bài viết mới thành công!";
                        _this.$state.go("detail_ts", { url: _this.linkDetail, id: data._id });
                    }).error(function (data) {
                        console.log(data);
                        _this.flash.error = "Có lỗi trong quá trình thêm bài viết.";
                    });
                }
                else {
                    _this.flash.error = "Bạn cần điền đầy đủ các mục.";
                    _this.$scope.Proccess_ts = false;
                }
            };
            $scope.Process_ts = false;
            $scope.formData = {};
            //$scope.createPost(this.linkCreate);
            //$scope.vm = this;
        }
        CreatePostController.$inject = ['$scope', '$state', 'flash', 'Post_ts',];
        return CreatePostController;
    })();
    mean.CreatePostController = CreatePostController;
    var DetailPostController = (function () {
        function DetailPostController($scope, $state, $http, $stateParam, flash, Post_ts) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$http = $http;
            this.$stateParam = $stateParam;
            this.flash = flash;
            this.Post_ts = Post_ts;
            this.linkDetail = "/api/post/detail/";
            this.linkEdit = "/api/post/edit";
            this.detailPost = function (linkDetail) {
                _this.Post_ts.detail_ts(linkDetail, _this.$stateParam.id).success(function (data) {
                    if (data.title != null) {
                        _this.$scope.post = data;
                        _this.$scope.loading = false;
                    }
                    else {
                        _this.$state.go('404');
                    }
                }).error(function () {
                    console.log("error");
                });
            };
            this.editPost = function () {
                _this.$scope.Proccess = true;
                if (!$.isEmptyObject(_this.$scope.post)) {
                    _this.Post_ts.edit_ts(_this.linkEdit, _this.$scope.post).success(function (data) {
                        _this.$scope.Proccess = false;
                        _this.flash.success = "Sửa bài viết thành công!";
                    }).error(function () {
                        _this.flash.error = "Có lỗi trong quá trình sửa bài viết.";
                    });
                }
                else {
                    _this.flash.error = "Bạn cần điền đầy đủ các mục.";
                    _this.$scope.Proccess = false;
                }
            };
            this.detailPost(this.linkDetail);
        }
        DetailPostController.$inject = ['$scope', '$state', '$http', 'flash', '$stateParam', 'Post_ts',];
        return DetailPostController;
    })();
    mean.DetailPostController = DetailPostController;
})(mean || (mean = {}));
//# sourceMappingURL=postCtrl_ts.js.map