const THREE = require("three");
const Shader = require("./SkyShader.js");

function initSky( scene, shaderConfig ){
    shader = new Shader( shaderConfig );
    var sky = shader.getSky();
    var sunSphere = shader.getSunSphere();

    scene.add( sky );
    scene.add( sunSphere );

    return shader;
}

module.exports = {
    initScene: function(perspective) {
        var scene = new THREE.Scene();
        perspective.clock = new THREE.Clock(false);
        perspective.delta = 0;

        scene.add(perspective.yawObject);

        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
        perspective.shader = initSky(scene, perspective.sceneData.environment.sky.shader);
        perspective.scene = scene;
        return perspective;
    }
};