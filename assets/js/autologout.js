function AutoLogout($scope,$uibModal){
    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
        }
    }

    $scope.$on('IdleStart', function () {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'

        });
    });

    $scope.$on('IdleEnd', function () {
        closeModals();
    });

    $scope.$on('IdleTimeout', function () {
        closeModals();
        $scope.timedout = $uibModal.open({
            templateUrl: 'timedout-dialog.html',
            controller: TimedoutCtrl,
            windowClass: 'modal-danger'
        });
    });

    $scope.start = function () {
        closeModals();
        Idle.watch();
        $scope.started = true;
    };

    $scope.stop = function () {
        closeModals();
        Idle.unwatch();
        $scope.started = false;

    };
}