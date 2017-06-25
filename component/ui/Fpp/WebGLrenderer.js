const THREE = require("three");

function WebGLrenderer( oConfig ){

  var context = this;
  var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;
  var webglParams = oConfig.webgl || { antialias: false };

  var width = oConfig.width || window.innerWidth;
  var height = oConfig.height || window.innerHeight;

  var scene = oConfig.scene;
  var camera = oConfig.camera;
  this.onBeforeRender = oConfig.onBeforeRender || function(){};

  var clearColor = oConfig.clearColor || 0x000000;

  // var view = oConfig.view;
  var requestId;
  var parentElement = oConfig.parentElement;

  var renderer = new THREE.WebGLRenderer( );
  renderer.setSize( width, height );
  renderer.setPixelRatio( oConfig.pixelRatio );
//  renderer.setClearColor( clearColor );

  function animate(){
    requestId = requestAnimationFrame( animate );
    context.onBeforeRender();
    renderer.render( scene, camera );
  }

  this.start = function(){
    parentElement.appendChild( renderer.domElement );
    animate();
  };

  this.stop = function(){
    cancelAnimationFrame( requestId );
  };

  this.updateResolution = function( width, height ){
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
    renderer.render( scene, camera );
  };

  this.render = function(){
    renderer.render( scene, camera );
  }
}

module.exports = WebGLrenderer;
