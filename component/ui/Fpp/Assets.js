const THREE = require("three");
const DefaultDirections = require('./DefaultDirections.js');

function Assets(sceneData) {
    this.baseUrl = sceneData.baseURL;
    this.images = [];
    this.textures= [];
    this.materials = [];
    this.geometries = [];

    this.map = {
        textures: {},
        materials: {},
        geometries: {}
    };

    sceneData.textures.forEach(addTexture, this);
    sceneData.materials.forEach(addMaterial, this);
    sceneData.geometries.forEach(addGeometry, this);
}

function addTexture(item) {
    item.uuid = THREE.Math.generateUUID();
    if (item.imageURL) {
        let image = {
            uuid: THREE.Math.generateUUID(),
            url: this.baseUrl + item.imageURL
        };
        this.images.push(image);
        item.image = image.uuid;
    }

    this.textures.push(item);
    this.map.textures[item.name] = item.uuid;
}

function addMaterial(item) {
    item.uuid = THREE.Math.generateUUID();
    if (item.texture) {
        item.map = this.map.textures[item.texture];
    }
    this.map.materials[item.name] = item.uuid;
    this.materials.push(item);
}

function addGeometry(item) {
    if (item.type === "BoxGeometry") {
        translateGeometryDimensions(item);
    }
    item.uuid = THREE.Math.generateUUID();
    this.map.geometries[item.name ] = item.uuid;
    this.geometries.push(item);
}

function translateGeometryDimensions(geometry) {
    if(DefaultDirections.UP.y === 0 && DefaultDirections.NORTH.z === 0){
        var height = geometry.depth;
        var depth = geometry.height;
        geometry.height = height;
        geometry.depth = depth;
    }
}

module.exports = Assets;