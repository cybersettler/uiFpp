function Scene(sceneData, components, bodies) {
        this.obstacles = [];
        this.bodies = bodies;
        this.components = components;
        this.userDefaultPosition = sceneData.userDefaultPosition;
}

module.exports = Scene;