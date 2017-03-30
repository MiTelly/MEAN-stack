(function () {
    angular
        .module("SoccerApp", [])
        .controller("SoccerController", SoccerController);

    function SoccerController($scope, $http) {
        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.updatePost = updatePost;

        function start() {
          getAllPosts();
        }

        start();

        function updatePost(post){
          $http
            .put("/api/soccerpost/"+post._id, post)
            .success(getAllPosts);
        }

        function editPost(postId) {
          $http
            .get("/api/soccerpost/"+postId)
            .success(function(post) {
              $scope.post = post;
            });
        }

        function deletePost(postId) {
          $http
            .delete("/api/soccerpost/"+postId)
            .success(getAllPosts);
        }

        function getAllPosts() {
          $http
            .get("/api/soccerpost")
            .success(function(posts){
              sortedPosts = posts.reverse();
              $scope.posts = sortedPosts;
              $scope.post = {};
            });
        }

        function createPost(post) {
            $http
              .post("/api/soccerpost", post)
              .success(function(){
                getAllPosts();
              });
        }
    }
})();
