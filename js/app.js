require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/views/3d/externalRenderers",
  "esri/geometry/SpatialReference",
], function (
  Map,
  SceneView,
  Graphic,
  GraphicsLayer,
  externalRenderers,
  SpatialReference
) {
  let droneRender = null;
  let currentPointIndex = 0;
  let isPlay = true;
  let speed = 3;
  let map = new Map({
    basemap: "streets",
    ground: "world-elevation",
  });

  let view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [116.5, 40],
    ui: {
      components: [],
    },
    zoom: 11,
  });
  // 加载无人机路线
  function loadROute() {
    //模拟路线
    const dronePaths = {
      type: "FeatureCollection",
      bbox: [
        12942544.410000008,
        4841046.820000008,
        12966966.04000001,
        4864130.8000000045,
      ],
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [12942888.370000001, 4861417.290000007],
              [12943347.000000004, 4861608.38000001],
              [12943805.620000001, 4861875.909999996],
              [12944264.240000006, 4862258.100000009],
              [12944722.86000001, 4862640.280000016],
              [12945181.480000015, 4863175.340000011],
              [12945678.320000004, 4863595.74000001],
              [12946175.170000013, 4863710.400000006],
              [12946672.010000002, 4863748.620000012],
              [12947245.280000005, 4863748.620000012],
              [12947703.910000008, 4863748.620000012],
              [12948200.750000011, 4863710.400000006],
              [12948697.590000015, 4863672.18],
              [12949194.43000001, 4863672.18],
              [12949997.02, 4863672.18],
              [12950493.86000001, 4863672.18],
              [12950990.700000014, 4863557.530000009],
              [12951563.980000015, 4863557.530000009],
              [12952060.820000004, 4863557.530000009],
              [12952634.089999992, 4863557.530000009],
              [12953169.150000002, 4863557.530000009],
              [12953665.99000002, 4863557.530000009],
              [12954162.830000002, 4863557.530000009],
              [12954659.680000018, 4863557.530000009],
              [12955156.520000014, 4863557.530000009],
              [12955691.58000001, 4863557.530000009],
              [12956150.2, 4863595.74000001],
              [12956647.040000003, 4863710.400000006],
              [12957182.099999998, 4863710.400000006],
              [12957755.380000014, 4863748.620000012],
              [12958252.220000003, 4863786.840000011],
              [12958710.840000007, 4863863.270000011],
              [12959207.68000001, 4863901.49000001],
              [12959742.739999998, 4863977.930000007],
              [12960277.800000008, 4864130.8000000045],
              [12960774.640000012, 4864130.8000000045],
              [12961233.260000002, 4864130.8000000045],
              [12961806.540000003, 4863939.710000016],
              [12962265.160000015, 4863633.960000001],
              [12962570.91, 4863137.120000005],
              [12963067.750000011, 4862754.939999998],
              [12963526.370000001, 4862372.750000015],
              [12964061.429999996, 4861952.3500000015],
              [12964520.050000008, 4861570.159999996],
              [12965055.110000003, 4861187.980000012],
              [12965513.730000008, 4860767.57],
              [12965972.36000001, 4860308.95000001],
              [12966316.320000004, 4859850.330000013],
              [12966507.420000006, 4859391.710000008],
              [12966774.940000009, 4858894.870000005],
              [12966813.160000008, 4858398.030000009],
              [12966966.04000001, 4857939.400000006],
              [12966966.04000001, 4857404.340000011],
              [12966966.04000001, 4856945.720000006],
              [12966851.379999999, 4856487.100000009],
              [12966774.940000009, 4855952.040000014],
              [12966698.51000001, 4855455.200000003],
              [12966583.850000013, 4854996.579999998],
              [12966507.420000006, 4854537.960000001],
              [12966392.759999994, 4854041.120000005],
              [12966354.54000001, 4853544.270000003],
              [12966278.100000013, 4853085.650000013],
              [12966278.100000013, 4852627.030000009],
              [12966316.320000004, 4852053.750000007],
              [12966430.980000015, 4851595.13000001],
              [12966469.200000007, 4851136.510000005],
              [12966469.200000007, 4850563.230000019],
              [12966583.850000013, 4850066.3900000155],
              [12966622.070000004, 4849493.109999999],
              [12966736.730000015, 4848881.619999997],
              [12966736.730000015, 4848384.780000016],
              [12966774.940000009, 4847887.930000015],
              [12966774.940000009, 4847352.880000018],
              [12966774.940000009, 4846856.030000009],
              [12966736.730000015, 4846397.409999996],
              [12966583.850000013, 4845862.3500000015],
              [12966354.54000001, 4845327.289999999],
              [12966010.570000019, 4844792.230000004],
              [12965628.39000002, 4844180.740000002],
              [12965284.420000013, 4843645.680000007],
              [12964978.670000013, 4843187.060000017],
              [12964596.49000002, 4842728.440000005],
              [12964061.429999996, 4842422.689999998],
              [12963526.370000001, 4842193.380000003],
              [12963029.530000005, 4841964.06000001],
              [12962570.91, 4841734.750000007],
              [12962074.070000011, 4841620.100000009],
              [12961615.450000007, 4841581.880000003],
              [12961118.600000005, 4841581.880000003],
              [12960545.330000002, 4841505.4400000125],
              [12959972.05, 4841505.4400000125],
              [12959360.55, 4841467.220000006],
              [12958825.490000006, 4841429.010000005],
              [12958252.220000003, 4841352.570000008],
              [12957602.500000011, 4841352.570000008],
              [12956991.01000001, 4841352.570000008],
              [12956379.51000001, 4841352.570000008],
              [12955920.890000004, 4841352.570000008],
              [12955118.300000008, 4841314.3500000015],
              [12954392.15000001, 4841314.3500000015],
              [12953513.120000008, 4841237.909999996],
              [12952404.780000012, 4841161.480000004],
              [12951334.660000008, 4841161.480000004],
              [12950493.86000001, 4841123.259999998],
              [12949997.02, 4841046.820000008],
              [12949538.390000012, 4841046.820000008],
              [12949041.550000008, 4841046.820000008],
              [12948582.930000003, 4841046.820000008],
              [12948047.870000008, 4841046.820000008],
              [12947512.810000014, 4841046.820000008],
              [12947015.97000001, 4841046.820000008],
              [12946519.129999999, 4841046.820000008],
              [12946060.510000017, 4841046.820000008],
              [12945563.670000006, 4841046.820000008],
              [12945105.05, 4841161.480000004],
              [12944646.420000006, 4841505.4400000125],
              [12944187.8, 4841925.850000009],
              [12943843.839999992, 4842384.469999999],
              [12943690.96000002, 4842843.090000011],
              [12943576.310000014, 4843454.5900000185],
              [12943499.870000016, 4844066.080000006],
              [12943499.870000016, 4844715.799999997],
              [12943499.870000016, 4845250.860000007],
              [12943499.870000016, 4845709.480000012],
              [12943499.870000016, 4846282.759999998],
              [12943538.090000007, 4846817.820000008],
              [12943538.090000007, 4847276.4400000125],
              [12943576.310000014, 4847773.280000001],
              [12943652.740000006, 4848346.560000002],
              [12943690.96000002, 4848805.180000015],
              [12943690.96000002, 4849416.680000007],
              [12943690.96000002, 4849989.950000003],
              [12943690.96000002, 4850525.010000005],
              [12943690.96000002, 4851021.850000009],
              [12943499.870000016, 4851480.470000014],
              [12943385.210000005, 4852015.530000009],
              [12943232.340000007, 4852474.160000011],
              [12943117.68000001, 4852971.000000015],
              [12942926.590000015, 4853429.620000005],
              [12942850.15000001, 4853888.24000001],
              [12942735.500000011, 4854423.3000000045],
              [12942735.500000011, 4854881.920000017],
              [12942735.500000011, 4855378.760000013],
              [12942697.280000012, 4855875.600000016],
              [12942659.060000006, 4856525.320000008],
              [12942582.630000014, 4856983.9400000125],
              [12942582.630000014, 4857519.000000007],
              [12942582.630000014, 4858015.840000004],
              [12942544.410000008, 4858474.460000016],
              [12942544.410000008, 4858933.090000004],
              [12942544.410000008, 4859391.710000008],
              [12942544.410000008, 4859850.330000013],
              [12942544.410000008, 4860347.170000002],
              [12942582.630000014, 4860805.790000007],
              [12942773.720000003, 4861264.410000011],
              [12942850.15000001, 4861340.850000016],
            ],
          },
          properties: {
            objectid: 1,
            title: "线",
            visible: 1,
            descriptio: "",
            image_url: "",
            image_link: "",
            date: "1899-11-30T00:00:00.000Z",
            typeid: 0,
            st_length_: 84714.0581903,
          },
        },
      ],
    };
    const lineData = dronePaths.features[0].geometry.coordinates.map((p) => {
      return [p[0], p[1], 3000 + Math.random() * 1000];
    });
    let defaultLineSymbol = {
      type: "simple-line",
      color: [73, 221, 221],
      width: 2,
      style: "short-dash",
    };

    const routeLayer = new GraphicsLayer({ id: "droneRouteLayer" });
    view.map.add(routeLayer);
    const lineGra = new Graphic({
      geometry: {
        type: "polyline",
        hasZ: true,
        hasM: false,
        paths: lineData,
        spatialReference: { wkid: 102100 }, //此处坐标系根据航线坐标系调整
      },
      symbol: defaultLineSymbol,
    });
    routeLayer.graphics = [lineGra];
    view.goTo(lineGra.geometry).then(() => {
      const droneMesh = loadDrone();
      laodDroneRender(view, droneMesh, lineData);
    });
  }
  loadROute();

  //预加载无人机模型
  function loadDrone() {
    const dronePartList = ["无人机主体", "机翅1", "机翅2", "机翅3", "机翅4"];
    const mtlLoader = new THREE.MTLLoader();
    const droneMesh = new THREE.Object3D();
    dronePartList.map((dronepart, index) => {
      mtlLoader.load("./drone/" + dronepart + ".mtl", function (materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("./drone/" + dronepart + ".obj", function (object) {
          object.scale.set(0.1, 0.1, 0.1); //设置模型大小比例

          if (dronepart.indexOf("机翅") > -1) {
            object.castShadow = false;
            object.receiveShadow = false;

            // dummy = new THREE.Object3D();
            object.children[0].geometry.computeBoundingBox();
            object.children[0].geometry.center();
            const dummy = new THREE.Object3D();
            const plane = object;
            dummy.add(plane);

            if (index === 1) {
              dummy.name = "jc1";
              // dummy.position.set(5900, 4710, 4900);
            } else if (index === 2) {
              dummy.name = "jc2";
              // dummy.position.set(-7250, 4710, 4900);
            } else if (index === 3) {
              dummy.name = "jc3";
              // dummy.position.set(5900, 4710, -4900);
            } else if (index === 4) {
              dummy.name = "jc4";
              // dummy.position.set(-7250, 4710, -4900);
            }

            droneMesh.add(dummy);
          } else {
            droneMesh.add(object);
          }
        });
        return "";
      });
      return "";
    });
    return droneMesh;
  }
  //无人机渲染
  function laodDroneRender(view, droneMesh, paths) {
    let lastTime = Date.now();
    let sumTime = 0;

    droneRender = {
      renderer: null, // three.js renderer
      camera: null, // three.js camera
      webglScene: null, // three.js scene

      ambient: null, // three.js ambient light source
      sun: null, // three.js sun light source
      /**
       * Setup function, called once by the ArcGIS JS API.
       */
      setup: function (context) {
        // initialize the three.js renderer
        //////////////////////////////////////////////////////////////////////////////////////
        this.renderer = new THREE.WebGLRenderer({
          context: context.gl,
          premultipliedAlpha: false,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setViewport(0, 0, view.width, view.height);
        this.renderer.shadowMap.enabled = true;

        // prevent three.js from clearing the buffers provided by the ArcGIS JS API.
        this.renderer.autoClearDepth = false;
        this.renderer.autoClearStencil = false;
        this.renderer.autoClearColor = false;

        // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
        // We have to inject this bit of code into the three.js runtime in order for it to bind those
        // buffers instead of the default ones.
        var originalSetRenderTarget = this.renderer.setRenderTarget.bind(
          this.renderer
        );
        this.renderer.setRenderTarget = function (target) {
          originalSetRenderTarget(target);
          if (target === null) {
            context.bindRenderTarget();
          }
        };

        // setup the three.js scene
        this.webglScene = new THREE.Scene();

        // setup the camera
        this.camera = new THREE.PerspectiveCamera();

        // setup scene lighting
        this.ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.webglScene.add(this.ambient);

        this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
        this.sun.position.set(-600, 300, 60000);
        this.webglScene.add(this.sun);

        //scene中加载无人机模型
        var renderPos = [0, 0, 0];
        var pointMesh;

        var routePointList = paths;
        var pos = [
          routePointList[0][0] - 0.00004,
          routePointList[0][1],
          routePointList[0][2],
        ];
        externalRenderers.toRenderCoordinates(
          view,
          pos,
          0,
          SpatialReference.WebMercator,
          renderPos,
          0,
          1
        );
        pointMesh = {
          mesh: droneMesh, //.clone()
        };
        pointMesh.setPosition = function (x, y, z) {
          this.mesh.position.set(x, y, z);
        }.bind(pointMesh);
        pointMesh.setPosition(renderPos[0], renderPos[1], renderPos[2] - 3);

        // 亲测可用
        pointMesh.mesh.rotation.x = 0.25 * Math.PI;
        pointMesh.mesh.rotation.y = 0.6 * Math.PI; // 角度
        pointMesh.mesh.rotation.z = 0.143 * Math.PI;

        var v1 = new THREE.Vector3(0, 1, 0);
        pointMesh.mesh.rotateOnAxis(v1, ((-65.5 * 2) / 360) * Math.PI); //摆正

        this.webglScene.add(pointMesh.mesh);

        // cleanup after ourselfs
        context.resetWebGLState();
      },

      render: function (context) {
        sumTime += Date.now() - lastTime;
        lastTime = Date.now();

        // update camera parameters

        var cam = context.camera;

        this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
        this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
        this.camera.lookAt(
          new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2])
        );

        // // Projection matrix can be copied directly
        this.camera.projectionMatrix.fromArray(cam.projectionMatrix);
        if (droneRender) {
          let l = context.sunLight;
          this.sun.position.set(l.direction[0], l.direction[1], l.direction[2]);
          this.sun.intensity = l.diffuse.intensity;
          this.sun.color = new THREE.Color(
            l.diffuse.color[0],
            l.diffuse.color[1],
            l.diffuse.color[2]
          );
          this.ambient.intensity = l.ambient.intensity;
          this.ambient.color = new THREE.Color(
            l.ambient.color[0],
            l.ambient.color[1],
            l.ambient.color[2]
          );

          this.renderer.resetGLState();
          this.renderer.render(this.webglScene, this.camera);

          // as we want to smoothly animate the ISS movement, immediately request a re-render
          // externalRenderers.requestRender(view);

          // cleanup
          context.resetWebGLState();
        }

        var currentRoute = paths;
        if (currentPointIndex < currentRoute.length && isPlay) {
          var renderPos = [0, 0, 0];

          var z = currentRoute[currentPointIndex][2];
          var x = currentRoute[currentPointIndex][0];
          var y = currentRoute[currentPointIndex][1];
          var pos = [x, y, z];

          externalRenderers.toRenderCoordinates(
            view,
            pos,
            0,
            SpatialReference.WebMercator,
            renderPos,
            0,
            1
          );
          const pointMesh = {
            mesh: droneMesh, //.clone()
          };
          pointMesh.setPosition = function (x, y, z) {
            this.mesh.position.set(x, y, z);
          }.bind(pointMesh);
          pointMesh.setPosition(renderPos[0], renderPos[1], renderPos[2]);

          // 亲测可用
          pointMesh.mesh.rotation.x = 0.25 * Math.PI;
          pointMesh.mesh.rotation.y = 0.6 * Math.PI; //角度
          pointMesh.mesh.rotation.z = 0.143 * Math.PI;

          var v1 = new THREE.Vector3(0, 1, 0);
          pointMesh.mesh.rotateOnAxis(v1, ((-65.5 * 2) / 360) * Math.PI); //将车身摆正

          this.webglScene.add(pointMesh.mesh);
          //鸡翅转动
          if (pointMesh.mesh.getObjectByName("jc1")) {
            pointMesh.mesh.getObjectByName("jc1").rotation.y -= 0.1 * 100;
          }
          if (pointMesh.mesh.getObjectByName("jc2")) {
            pointMesh.mesh.getObjectByName("jc2").rotation.y -= 0.1 * 100;
          }
          if (pointMesh.mesh.getObjectByName("jc3")) {
            pointMesh.mesh.getObjectByName("jc3").rotation.y -= 0.1 * 100;
          }
          if (pointMesh.mesh.getObjectByName("jc4")) {
            pointMesh.mesh.getObjectByName("jc4").rotation.y -= 0.1 * 100;
          }
          if (sumTime > 700 - 100 * speed) {
            //speedTimeGap
            currentPointIndex = currentPointIndex + 1;
            sumTime = 0;
          }
        } else if (currentPointIndex >= currentRoute.length) {
          currentPointIndex = 0;
          isPlay = false;
          $("#playbar")[0].innerText = "飞行";
        }

        let l = context.sunLight;
        this.sun.position.set(l.direction[0], l.direction[1], l.direction[2]);
        this.sun.intensity = l.diffuse.intensity;
        this.sun.color = new THREE.Color(
          l.diffuse.color[0],
          l.diffuse.color[1],
          l.diffuse.color[2]
        );
        this.ambient.intensity = l.ambient.intensity;
        this.ambient.color = new THREE.Color(
          l.ambient.color[0],
          l.ambient.color[1],
          l.ambient.color[2]
        );

        this.renderer.resetGLState();
        this.renderer.render(this.webglScene, this.camera);

        // as we want to smoothly animate the ISS movement, immediately request a re-render
        externalRenderers.requestRender(view);

        // cleanup
        context.resetWebGLState();
      },
    };
    // register the external renderer
    externalRenderers.add(view, droneRender);
  }
  $("#playbar").on("click", (e) => {
    isPlay = !isPlay;
    isPlay
      ? ($("#playbar")[0].innerText = "暂停")
      : ($("#playbar")[0].innerText = "飞行");
  });

  $("#s1").on("click", () => {
    changeSpeed(1);
  });
  $("#s2").on("click", () => {
    changeSpeed(2);
  });
  $("#s3").on("click", () => {
    changeSpeed(3);
  });
  $("#s4").on("click", () => {
    changeSpeed(4);
  });
  $("#s5").on("click", () => {
    changeSpeed(5);
  });
  $("#s6").on("click", () => {
    changeSpeed(6);
  });

  function changeSpeed(s) {
    for (let i = 0; i <= 6; i++) {
      if (i <= s) {
        $(`#s${i}`).attr("class", "activeSpeed");
      } else {
        $(`#s${i}`).attr("class", "speed");
      }
    }
    speed = s;
    $("#speed")[0].innerText = `X${s}`;
  }
});
