const THREE = require("three");
const Shader = require("./SkyShader.js");

function initSky( scene, shaderConfig ){
    var shader = new Shader(shaderConfig);
    var sky = shader.getSky();
    var sunSphere = shader.getSunSphere();

    scene.add(sky);
    scene.add(sunSphere);

    return shader;
}

function hasShader(perspective) {
    return perspective.sceneData &&
        perspective.sceneData.environment &&
        perspective.sceneData.environment.sky &&
        perspective.sceneData.environment.sky.shader;
}

module.exports = {
    initScene: function(perspective) {
        var scene = new THREE.Scene();
        perspective.clock = new THREE.Clock(false);
        perspective.delta = 0;

        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
        var shaderConfig =  hasShader(perspective) ?
            perspective.sceneData.environment.sky.shader : {
                turbidity: 10,
                reileigh: 2,
                mieCoefficient: 0.005,
                mieDirectionalG: 0.8,
                luminance: 1,
                inclination: 0.49, // elevation / inclination
                azimuth: 0.25, // Facing front,
                sun: false
            };
        perspective.shader = initSky(scene, shaderConfig);
        perspective.scene = scene;
        return perspective;
    }
};