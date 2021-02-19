(function () {

	var app = angular.module('nxGeometryy', []);

	app.directive('nxGeometry', function () {

		return {

        restrict: 'A',

        link: function (scope, element, attrs) {

            // Scene variables
      

            var camera,mixer, mixer2,action,leftfinger,rightfinger, rightshoulder,leftshoulder,lefthand,righthand,leftthumb,rightthumb, leftarm, rightarm,currentlyAnimating, scene, geometry, renderer, material, object, container, clock, clock2, raycaster, ambientlight, pointlight, loader, model;


            // Element dimensions

            scope.width = element[0].offsetWidth;
            scope.height = element[0].offsetHeight;
            scope.objectColor = '#ffaa00';
            scope.backgroundColor = '#333333';

            // Initialization function

            scope.init = function () {


                container = angular.element('<div>')[0];

                element[0].appendChild(container);

                camera = new THREE.PerspectiveCamera(50, scope.width / scope.height, 1, 1000);

                camera.position.x = 0;
                camera.position.y = 8;
                camera.position.z = 5;

                camera.aspect = window.innerWidth / window.innerHeight;

                camera.updateProjectionMatrix();


                scene = new THREE.Scene();

                clock = new THREE.Clock();
                clock2 = new THREE.Clock();

                currentlyAnimating = true;

                raycaster = new THREE.Raycaster()

                ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );

                pointLight = new THREE.PointLight( 0xffffff, 0.8 );


                scene.add( camera );

                scene.add( ambientLight );

                camera.add( pointLight );


                loader = new THREE.GLTFLoader().setPath( 'js/morning_town/' );
                 //console.log(loader)
	            loader.load( 'scene.gltf', function ( gltf ) {

                    model = gltf.scene
                    //console.log(gltf.scene)
                    
                    //let fileAnimations = gltf.animations;
                    
                    model.traverse(o => {

                        if (o.isMesh) {
    
                            o.castShadow    = true;
                            o.receiveShadow = true;
                            
                        }
                        
                        // Reference the neck and waist bones
                       // //console.log(o.name,o.isBone)
                        if (o.isBone && o.name === 'Head_Chica') { 
    
                            neck = o;
                            
                        }

                        if (o.isBone && o.name === 'HairR002_Chica') { 
                            
                            waist = o;
                        }

                        if (o.isBone && o.name === 'ArmL_Chica') { 
                            
                            leftarm = o;
                        }

                        if (o.isBone && o.name === 'ArmR_Chica') { 
                            
                            rightarm = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'ShoulderR_Chica') { 
                            
                            rightshoulder = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'ShoulderL_Chica') { 
                            
                            leftshoulder = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'HandR_Chica') { 
                            
                            righthand = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'HandL_Chica') { 
                            
                            lefthand = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'FingerR_Chica') { 
                            
                            rightfinger = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'FingerL_Chica') { 
                            
                            leftfinger = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'ThumbR_Chica') { 
                            
                            rightthumb = o;
                            //console.log("rightarm found..")

                        }
                        if (o.isBone && o.name === 'ThumbL_Chica') { 
                            
                            leftthumb = o;
                            //console.log("rightarm found..")

                        }
                        
                                }); 

        gltf.scene.scale.set(.04,.04,.04)
        mixer = new THREE.AnimationMixer( gltf.scene );
        
        if((window.location.href === "https://aqueous-woodland-14387.herokuapp.com/") || (window.location.href==="http://localhost:8080/")){

            //animate2()

    
        }else{

        
            //console.log(window.location.href)
    
    
        }
     
		gltf.scene.position.set(0,1.8,0)
		gltf.scene.rotation.y = Math.PI / .8;

	  	//console.log(gltf.scene)
        scene.add( gltf.scene );

	} );


    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
	renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaOutput = true;
	document.body.appendChild( renderer.domElement );
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, - 0.2, - 0.2 );
	controls.maxPolarAngle = Math.PI / 2;
	controls.minPolarAngle = Math.PI / 3;
	controls.enablePan = false;
    controls.noPan = true;
    controls.update();
   // window.addEventListener( 'resize', onWindowResize, false );

    //console.log(renderer.domElement)

    }           

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

requestAnimationFrame( animate );
renderer.render( scene, camera );

var delta = clock.getDelta();

if ( mixer2 ) mixer2.update( delta );


}
function animate2() {

    requestAnimationFrame( animate2 );

    renderer.render( scene, camera );

    var delta2 = clock2.getDelta();

    if ( mixer ) mixer.update( delta2 );


}
document.addEventListener('mousemove', function(e){

    var mousecoords = getMousePos(e);
    ////console.log(mousecoords)
    if(!currentlyAnimating){

        if(mousecoords.y < 2000){

            if(neck && waist && leftarm && rightarm ){

                moveJoint(mousecoords,neck,50)
                moveJoint(mousecoords,waist,30)
            
            }
        
        }else{
        
            if(neck && waist && leftarm && rightarm ){
                moveJoint(mousecoords,neck,20)
                moveJoint(mousecoords,waist,30)
                moveJoint(mousecoords,leftarm,20)
                moveJoint(mousecoords,rightarm,30)
            }
        
        }

    }

}


)
document.addEventListener('mousedown', function(e){

    if((window.location.href === "https://aqueous-woodland-14387.herokuapp.com/") || (window.location.href==="http://localhost:8080/")){

        animate2()
        if ( action !== null ) {

            action.stop();
            action.play();
            mixer.addEventListener('finished', ()=>{

            action.reset()
            action.paused = true;

            })
            
          }

    }else{

        //console.log(window.location.href)


    }


 

})

function getMousePos(e){
return { x: e.clientX, y: e.clientY }
}

function moveJoint(mouse,joint,degreeLimit){
let degrees = getMouseDegrees(mouse.x,mouse.y,degreeLimit)
joint.rotation.y = THREE.Math.degToRad(degrees.x)
joint.rotation.x = THREE.Math.degToRad(degrees.y)
}
function getMouseDegrees(x, y, degreeLimit) {
let dx = 0,
   dy = 0,
   xdiff,
   xPercentage,
   ydiff,
   yPercentage;

let w = { x: window.innerWidth, y: window.innerHeight };

// Left (Rotates neck left between 0 and -degreeLimit)
// 1. If cursor is in the left half of screen
if (x <= w.x / 2) {
// 2. Get the difference between middle of screen and cursor position
 xdiff = w.x / 2 - x; 
 // 3. Find the percentage of that difference (percentage toward edge of screen)
 xPercentage = (xdiff / (w.x / 2)) * 100; 
 // 4. Convert that to a percentage of the maximum rotation we allow for the neck
 dx = ((degreeLimit * xPercentage) / 100) * -1; 
}

// Right (Rotates neck right between 0 and degreeLimit)
if (x >= w.x / 2) {
 xdiff = x - w.x / 2;
 xPercentage = (xdiff / (w.x / 2)) * 100;
 dx = (degreeLimit * xPercentage) / 100;
}
// Up (Rotates neck up between 0 and -degreeLimit)
if (y <= w.y / 2) {
 ydiff = w.y / 2 - y;
 yPercentage = (ydiff / (w.y / 2)) * 100;
 // Note that I cut degreeLimit in half when she looks up
 dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
}
// Down (Rotates neck down between 0 and degreeLimit)
if (y >= w.y / 2) {
 ydiff = y - w.y / 2;
 yPercentage = (ydiff / (w.y / 2)) * 100;
 dy = (degreeLimit * yPercentage) / 100;
}
return { x: dx, y: dy };
}

 


            scope.init();
            animate2();



}



        

    };

	});
	




})();