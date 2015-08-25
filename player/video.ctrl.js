angular.module('ecstatic.video')

// THE VIDEO THING MACHINE


.controller('VideoCtrl',
        ["$sce", function ($sce) {
            var controller = this;
            controller.API = null;
 
            controller.onPlayerReady = function(API) {
                controller.API = API;
                controller.setVideo();
            };

            controller.videos = [
                {
                    sources: [
                        {src: $sce.trustAsResourceUrl("loop.mp4"), type: "video/mp4"}
                    ]
                },
                {
                    sources: [
                        {src: $sce.trustAsResourceUrl("loop2.mp4"), type: "video/mp4"}
                    ]
                }
            ];   

            controller.config = {
                autoPlay: true,
                sources: controller.videos[0].sources,
                tracks: [
                    {}
                ],
                theme: "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    poster: "#"
                }
            };

            controller.setVideo = function(index) {
                controller.API.stop();
                controller.config.sources = controller.videos[index].sources;
                $timeout(controller.API.play.bind(controller.API), 100);
            };

        }]
    );
