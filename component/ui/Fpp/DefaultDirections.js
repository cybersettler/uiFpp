const THREE = require("three");
const BASIC = {
    NORTH: new THREE.Vector3(0,1,0),
    SOUTH: new THREE.Vector3(0,-1,0),
    EAST: new THREE.Vector3(1,0,0),
    WEST: new THREE.Vector3(-1,0,0)
};

module.exports = {
    UP: new THREE.Vector3(0,0,1),
    DOWN: new THREE.Vector3(0,0,-1),
    NORTH: BASIC.NORTH,
    SOUTH: BASIC.SOUTH,
    EAST: BASIC.EAST,
    WEST: BASIC.WEST,
    TWELVE_OCLOCK: BASIC.NORTH,
    ONE_THIRTY: new THREE.Vector3(-0.707,0,0.707),
    TWO_OCLOCK: new THREE.Vector3(-0.866,0,0.5),
    THREE_OCLOCK: BASIC.EAST,
    FOUR_THIRTY: new THREE.Vector3(-0.707,0,-0.707),
    SIX_OCLOCK: BASIC.SOUTH,
    SEVEN_THIRTY: new THREE.Vector3(0.707,0,-0.707),
    NINE_OCLOCK: BASIC.WEST,
    TEN_THIRTY: new THREE.Vector3(0.707,0,0.707),
    TEN_OCLOCK: new THREE.Vector3(0.866,0,0.5)
};