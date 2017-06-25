const THREE = require("three");

module.exports = {
    initCamera: function(perspective) {
        var position = [ 0, 100, 2000 ]; // perspective.subjectData.position;
        // this.movingDirection = new THREE.Vector3();
        perspective.rotation = new THREE.Euler( 0, 0, 0, "YXZ" ); // perspective.subjectData.rotation;
        perspective.position = new THREE.Vector3( position[0], position[1], position[2] );
        // this.activeBlock;
        perspective.focusDistance = 5;
        perspective.pitchObject = new THREE.Object3D();
        perspective.yawObject = new THREE.Object3D();
        perspective.yawObject.position.set( position[0], position[1], position[2] + 1.6 );
        perspective.yawObject.add( this.pitchObject );
        perspective.focus = new THREE.Raycaster(perspective.yawObject.position.clone(),
            new THREE.Vector3( 0, -1, 0 ), 0, perspective.focusDistance );
        perspective.cursor;

        var aspect = perspective.display.width / perspective.display.height;

        var camera = new THREE.PerspectiveCamera( 75, aspect, 0.01, 2000000 );
        perspective.pitchObject.add( camera );
        perspective.scene.add(perspective.yawObject);
        return perspective;
    }
};