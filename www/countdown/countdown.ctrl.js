angular.module('ecstatic.countdown')

.controller('CountdownCtrl', function($scope) {
	$scope.startTime = 3;

	var str = document.getElementById("music_start_time").value;

  new Countdown({
    selector: '.countdown',
    msgPattern: "DISCO BEGINS IN {days} D, {hours} H, {minutes} M, and {seconds} S",
    dateStart: new Date(), //milliseconds since epoch,
    dateEnd: new Date(Number(str.concat('000'))), /*seconds since epoch*/
    msgAfter: "MSGAFTER"
  });
  console.log(new Date(Number(str.concat('000'))))
});
