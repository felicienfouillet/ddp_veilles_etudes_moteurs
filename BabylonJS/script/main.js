window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();

        var box = BABYLON.Mesh.CreateBox("Box", 4.0, scene);

        // Create a second object so we can actually witness the movement
        // Make this one wireframe to distiguish the difference.
        var box2 = BABYLON.Mesh.CreateBox("Box2", 4.0, scene);
        var material = new BABYLON.StandardMaterial("material1", scene);
        material.wireframe = true;
        box2.material = material;

        box2.position = new BABYLON.Vector3(0, 5, 0);

        var camera = new BABYLON.FollowCamera("followCam", BABYLON.Vector3.Zero(), scene);
        camera.target = box;
        camera.radius = 100;
        camera.heightOffset = 0;
        camera.attachControl(canvas, true);

        scene.activeCamera = camera;
        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function() {
        scene.getMeshByName("Box").position.y += 0.1;
        scene.getMeshByName("Box").position.x += 0.1;
        scene.render();
    });
});