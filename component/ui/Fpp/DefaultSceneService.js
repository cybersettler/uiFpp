const THREE = require("three");
var skyColor;

function generateGrid() {

    var size = 60, step = 0.6;
    var geometry = new THREE.Geometry();

    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }

    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
    var line = new THREE.Line( geometry, material );
    line.type = THREE.LinePieces;

    return line;
}

function generateDefaultGround() {

    var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
    var body = new THREE.Mesh( geometry );
    body.visible = false;
    return body;
}

function generateDefaultScene( ){

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('lightgrey');
    return scene;
}

module.exports = {
    generateDefaultScene: generateDefaultScene,
    generateDefaultGround: generateDefaultGround,
    generateGrid: generateGrid
};