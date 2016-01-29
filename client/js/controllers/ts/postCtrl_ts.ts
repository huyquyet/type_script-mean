/// <reference path="../../../../typings/angularjs/angular.d.ts"/>

module mean {
  declare var angular;
  angular.module('postCtrl_ts', [])
  .controller('ListPostController_ts', ['$scope', '$state', 'flash', '$modal', 'appAlert', 'Post_ts', ListPostController])
      .controller('CreatePostController_ts', ['$scope', '$state', 'flash', 'Post_ts', CreatePostController])
      .controller('DetailPostController_ts', ['$scope', '$state', '$http', '$stateParam', 'flash', 'Post_ts', DetailPostController]);

  // export interface
  interface Arguments {
    $scope: ng.IScope;
    $state: any;
     linkGet?: string;
     linkCreate?: string;
     linkDetail?: string;
     linkEdit?: string;
     linkDelete?: string;
     flash?: any;
     $modal?: any;
     $http?: any;
     appAlert?: any;
     Post_ts?: any;
  }
  export class ListPostController implements Arguments {
     linkGet: string = "/api/post/list";
     linkDelete: string = "/api/post/delete/";
      static $inject = ['$scope','$state', 'flash', '$modal', 'appAlert', 'Post_ts',];

    constructor(public $scope, public $state, public flash, public $modal, public appAlert, public Post_ts) {
      // this.$scope =  $scope;
      // this.$state =  $state;
      // this.flash = flash;
      // this.$modal = $modal;
      // this.appAlert = appAlert;
      // this.Post_ts = Post_ts;
      this.listPost(this.linkGet);
    }

    listPost = (linkGet) => {
        this.Post_ts.get_ts(linkGet).success((data) => {
        this.$scope.posts = data;
      }).error(() => {
        this.$scope.error = "Có lỗi trong quá trình tai bài viết";
      });
    };

    deletePost = (linkDelete, post_id) => {
        this.appAlert.confirm({
          title : "Xác nhận xóa",
          message : "Bạn chắc chắn muốn xóa bài viết này ?"
        }, (isOk) => {
            if (isOk) {
                this.Post_ts.delete_ts(this.linkDelete, post_id)
            .success(() => {
                this.flash.success = "Xóa bài viết thành công";
                this.listPost(this.linkGet);
              })
            .error(() => {
                this.flash.error = "Có lỗi trong quá trình xóa bài viết";
            });
          }
        });
      }
   }

  export class CreatePostController implements Arguments {
      linkCreate = "/api/post/create";
      linkDetail = "/api/post/detail/";
      static $inject = ['$scope','$state', 'flash', 'Post_ts',];
    constructor(public $scope, public $state, public flash, public Post_ts) {
        $scope.Process_ts = false;
        $scope.formData = {};
        //$scope.createPost(this.linkCreate);
        //$scope.vm = this;

    }

    createPost_ts = () => {
      this.$scope.Proccess_ts = true;
      if (!$.isEmptyObject(this.$scope.formData)) {
          this.Post_ts.create_ts(this.linkCreate, this.$scope.formData)
        .success( (data) => {
          this.$scope.formData = {};
          this.$scope.form.$setPristine();
          this.$scope.Proccess_ts = false;
          this.flash.success = "Thêm bài viết mới thành công!";
                  this.$state.go("detail_ts", {url: this.linkDetail, id: data._id});
        })
        .error((data) => {
          console.log(data);
          this.flash.error = "Có lỗi trong quá trình thêm bài viết.";
        });
      }
      else {
        this.flash.error = "Bạn cần điền đầy đủ các mục.";
        this.$scope.Proccess_ts = false;
      }
    }
  }

  export class DetailPostController implements Arguments {
    linkDetail = "/api/post/detail/";
      linkEdit = "/api/post/edit";
      static $inject = ['$scope','$state','$http', 'flash', '$stateParam', 'Post_ts',];
    constructor(public $scope, public $state, public $http, public $stateParam, public flash, public Post_ts ) {
        this.detailPost(this.linkDetail);
    }

    detailPost = (linkDetail) => {
        this.Post_ts.detail_ts(linkDetail, this.$stateParam.id)
      .success((data) => {
        if (data.title != null) {
          this.$scope.post = data;
          this.$scope.loading = false;
        }
        else {
          this.$state.go('404');
        }
      })
      .error(() => {
        console.log("error");
      });
    };

      editPost = () => {
        this.$scope.Proccess = true;
        if (!$.isEmptyObject(this.$scope.post)) {
            this.Post_ts.edit_ts(this.linkEdit, this.$scope.post)
          .success((data) => {
            this.$scope.Proccess = false;
            this.flash.success = "Sửa bài viết thành công!";
          })
          .error(() => {
            this.flash.error = "Có lỗi trong quá trình sửa bài viết.";
          });
        }
        else {
          this.flash.error = "Bạn cần điền đầy đủ các mục.";
          this.$scope.Proccess = false;
        }
    }
  }
}
