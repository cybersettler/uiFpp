const THREE = require("three");
const Assets = require('./Assets.js');

function addMesh(item) {
    var objectLoader = this.objectLoader;
    var assets = this.assets;
    var meshMap = this.meshMap;

    item.geometry = this.assets.map.geometries[item.geometryName];
    item.material = this.assets.map.materials[item.materialName];

    // TODO: is not possible to use jsonLoader directly
    /*
    if(item.modelURL){
        return new Promise( function( resolve ){
            jsonLoader.load(item.modelURL, function(geometry, materials) {
                var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials) );
                mesh.name = data.name;
                resolve( mesh );
            });
        });
    }
    */

    var result = new Promise(function(fulfill) {
        let data = {
            object: item,
            geometries: assets.geometries,
            materials: assets.materials,
            textures: assets.textures,
            images: assets.images
        };
        objectLoader.parse(data, fulfill);
    });
    return result.then(function(mesh){
        meshMap[mesh.name] = mesh;
    });
}



module.exports = {
    loadObjects: function(sceneData) {
        var config =  {
            assets: new Assets(sceneData),
            objectLoader: new THREE.ObjectLoader(),
            jsonLoader: new THREE.JSONLoader(),
            meshMap: {}
        };
        return Promise.all(sceneData.bodies.map(addMesh, config))
            .then(function() {
                return config.meshMap;
            });
    }
};