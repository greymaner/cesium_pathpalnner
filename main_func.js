var wallpoint = new Array()
var zhangaiwall = new Array()
var bianjiepoint = new Array()
var zhangaipoint = new Array()
var scanpath = new Array()
var scanline = new Array()
var jixian = new Array()
var jixianwall = new Array()
var zhunxianwall = new Array()
var zhunxian = new Array()
var xiushi = new Array()
var xiushi1 = new Array()
var xiushi2 = new Array()
var xiushi1wall = new Array()
var xiushi2wall = new Array()
var huxian = new Array()
var huxians = new Array()
var zds = new Array()
var anglerotationval = 0
var czml
var czml2
var heightplus = 10   //m
var zhelines = 11    //条
var durate = 4   //m
var duration = durate*0.00001
var update_path = true
var scanpoint_selected = null
var scanpoint_selected_name = null


var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    geocoder:false,
    animation:false,
    navigationHelpButton:false,
    baseLayerPicker:false,
    homeButton:false,
    timeline:false,
    fullscreenButton:false,
    sceneModePicker:false,
    // globe:false,
    vrButton:false
    });

var terrain = new Cesium.createWorldTerrain()

//添加3d模型
var tilesets = new Cesium.Cesium3DTileset({
    // url: Cesium.IonResource.fromAssetId(40866)
//    url :  new Cesium.Resource({
//     url: 'http://localhost/Scene/Production_1.json' ,
//     headers: {
//       'X-My-Access-Control-Allow-Origin': '*'
//     },
//     retryAttempts: 1
//  })
    // url: 'http://localhost/Scene/Production_1.json'
     url : 'Scene/Production_1.json'
});

var tileset = viewer.scene.primitives.add(tilesets);
viewer.zoomTo(tileset);




var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);


handler.setInputAction(function (movement) {
    var pick = viewer.scene.pick(movement.position);
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="Greep")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="Yellp")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="Blacp")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="jixip")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="zhunp")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
    if(Cesium.defined(pick) && (pick.id.name.substring(0,5) =="xiusp")){
        scanpoint_selected_name = pick.id.name.substring(0,5)
        var numArr = pick.id.name.match(/\d+/g)
        scanpoint_selected = parseInt(numArr)
        console.log('11111', scanpoint_selected)

    }
   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


handler.setInputAction(function (evt) {
    var scene = viewer.scene;
    var pickedObject = scene.pick(evt.position); //判断是否拾取到模型
    if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        var cartesian = viewer.scene.pickPosition(evt.position);
        if (Cesium.defined(cartesian)) {
            console.log(cartesian)
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
            var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
            var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
            var height = cartographic.height;//模型高度
            var point = [lng,lat,height];
            // console.log(point);
        }
    }
    //get 点类型
    var oOpt = document.getElementById('sel-opt');
    var oOptVal = oOpt.options[oOpt.selectedIndex].value;
    // console.log(oOptVal)

    if(oOptVal == 1){
        var pp1point = [point[0], point[1], point[2]];
        bianjiepoint.push(pp1point);
        wallpoint.push(point[0]);
        wallpoint.push(point[1]);
        wallpoint.push(point[2]+heightplus);
        update_path = true
    }

    if(oOptVal == 2){
        var pppoint = [point[0], point[1], point[2]];
        zhangaipoint.push(pppoint);
        zhangaiwall.push(point[0]);
        zhangaiwall.push(point[1]);
        zhangaiwall.push(point[2]+heightplus);
        update_path = true
    }
    
    if(oOptVal == 3){
        // console.log("add flight point");
        var pp3point = [point[0], point[1], 1, point[2]+heightplus];
        scanpath.push(pp3point)
        // console.log(scanpath)
        scanline.push(pp3point[0])
        scanline.push(pp3point[1])
        scanline.push(pp3point[3])
        update_path = false
    }

    if(oOptVal == 4){
        var pp4point = [point[0], point[1], point[2]];
        jixian.push(pp4point)
        jixianwall.push(pp4point[0])
        jixianwall.push(pp4point[1])
        jixianwall.push(pp4point[2]+heightplus)
        
        update_path = true
    }

    if(oOptVal == 5){
        var pp5point = [point[0], point[1], point[2]];
        zhunxian.push(pp5point)
        zhunxianwall.push(pp5point[0])
        zhunxianwall.push(pp5point[1])
        zhunxianwall.push(pp5point[2]+heightplus)

        update_path = true
    }
    if(oOptVal == 6){
        var pp6point = [point[0], point[1], point[2]];
        xiushi.push(pp6point)
        update_path = true
    }
    if(update_path){
        if(bianjiepoint.length > 2){
            // console.log(zhangaipoint)
            zds=[];
            if(zhangaipoint.length>2){
                zds.push(zhangaipoint)
            }
            fuzhuo()
        }
        if(jixian.length>0 && zhunxian.length>0 && jixian.length == zhunxian.length){
            calculate_zhexian()
        }
    }
    
    myrepaint()
    myrepaintentity()

}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

var moveTool= MoveEntity({ 'viewer': viewer});


function createModel(url, lon, lat, height) {
    // viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 0.2,
            maximumScale : 0.2
        }
    });
    // viewer.zoomTo(entity);
}

function myrepaintentity(){
    var entitys = viewer.entities._entities._array;
    for (var i = 0; i < entitys.length; i++) {                 
        viewer.entities.remove(entitys[i]);
        i--;
    }           

    // for (var i = 0;i<huxians.length;i++){
    //     var entity = viewer.entities.add({
    //         position : huxians[i],
    //         path : {
    //             resolution : 1,
    //             material : new Cesium.PolylineGlowMaterialProperty({
    //                 glowPower : 0.1,
    //                 color : Cesium.Color.YELLOW
    //             }),
    //             width : 10
    //         }
    //     });
    //     // entity.position.setInterpolationOptions({
    //     //     interpolationDegree : 2,
    //     //     interpolationAlgorithm : Cesium.HermitePolynomialApproximation
    //     // });
    // }
    

    for(var kk = 0;kk<bianjiepoint.length;kk++){
        namei = 'Yello' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(bianjiepoint[kk][0], bianjiepoint[kk][1], bianjiepoint[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<bianjiepoint.length;kk++){
        namei = 'Yellp' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(bianjiepoint[kk][0], bianjiepoint[kk][1], bianjiepoint[kk][2]+heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<jixian.length;kk++){
        namei = 'jixia' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(jixian[kk][0], jixian[kk][1], jixian[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<jixian.length;kk++){
        namei = 'jixip' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(jixian[kk][0], jixian[kk][1], jixian[kk][2]+heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<zhunxian.length;kk++){
        namei = 'zhunx' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(zhunxian[kk][0], zhunxian[kk][1], zhunxian[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<zhunxian.length;kk++){
        namei = 'zhunp' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(zhunxian[kk][0], zhunxian[kk][1], zhunxian[kk][2]+heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<xiushi.length;kk++){
        namei = 'xiush' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(xiushi[kk][0], xiushi[kk][1], xiushi[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }
    for(var kk = 0;kk<xiushi.length;kk++){
        namei = 'xiusp' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(xiushi[kk][0], xiushi[kk][1], xiushi[kk][2]+heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
    }

    for(var kk = 0;kk<zhangaipoint.length;kk++){
        namei = 'Black' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(zhangaipoint[kk][0], zhangaipoint[kk][1], zhangaipoint[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.BLACK
            }
        });
    }
    for(var kk = 0;kk<zhangaipoint.length;kk++){
        namei = 'Blacp' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(zhangaipoint[kk][0], zhangaipoint[kk][1], zhangaipoint[kk][2]+heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.BLACK
            }
        });
    }

    for(var kk = 0;kk<scanline.length;kk=kk+3){
        namei = 'Green' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(scanline[kk], scanline[kk+1], scanline[kk+2]-heightplus),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.GREEN
            }
        });
    }

    for(var kk = 0;kk<scanline.length;kk=kk+3){
        namei = 'Greep' + String(parseInt(kk/3))
        if(scanpath[kk/3][2]==1){
            viewer.entities.add({
                name : namei,
                position: Cesium.Cartesian3.fromDegrees(scanline[kk], scanline[kk+1], scanline[kk+2]),
                ellipsoid : {
                    radii : new Cesium.Cartesian3(1, 1, 1),
                    material : Cesium.Color.BLUE
                }
            });
        }
        else{
            viewer.entities.add({
                name : namei,
                position: Cesium.Cartesian3.fromDegrees(scanline[kk], scanline[kk+1], scanline[kk+2]),
                ellipsoid : {
                    radii : new Cesium.Cartesian3(1, 1, 1),
                    material : Cesium.Color.BROWN
                }
            });
        }
        
    }

    for(var kk = 0;kk<scanline.length;kk=kk+3){
        viewer.entities.add({
            name : 'xuxian',
            polyline : {
                positions : Cesium.Cartesian3.fromDegreesArrayHeights([scanline[kk], scanline[kk+1], scanline[kk+2],
                    scanline[kk], scanline[kk+1], scanline[kk+2]-heightplus]),
                width : 10,
                material : new Cesium.PolylineDashMaterialProperty({
                    color : Cesium.Color.GREEN,
                })
            }
        })
    }

    // for(var kk = 0;kk<huxians.length;kk++){
    //     for(var jj = 0;jj<huxians[kk].length;jj++){
    //         viewer.entities.add({
    //             name : '111',
    //             position: Cesium.Cartesian3.fromDegrees(huxians[kk][jj][0], huxians[kk][jj][1], huxians[kk][jj][2]),
    //             ellipsoid : {
    //                 radii : new Cesium.Cartesian3(0.1, 0.1, 0.1),
    //                 material : Cesium.Color.BLUE
    //             }
    //         });
    //     }
        
    // }
    
    
}


function myrepaint(){
    for (var i = 0; i < viewer.dataSources.length; i++) {
        viewer.dataSources.remove(viewer.dataSources.get(i));
        i--;
        // console.log('shanchuyige')
    }

    // for(var kk = 0;kk<bianjiepoint.length;kk++){
    //     czml = [{
    //         "id" : "document",
    //         "name" : "CZML Point",
    //         "version" : "1.0"
    //     }, {
    //         "id" : "point 1",
    //         "name": "point",
    //         "position" : {
    //             "cartographicDegrees" : bianjiepoint[kk]
    //         },
    //         "point": {
    //             "color": {
    //                 "rgba": [255, 255, 255, 255]
    //             },
    //             "outlineColor": {
    //                 "rgba": [255, 0, 0, 255]
    //             },
    //             "outlineWidth" : 4,
    //             "pixelSize": 20
    //         }
    //     }];
    //     var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
    //     viewer.dataSources.add(dataSourcePromise);
    // }

    // for(var kk = 0;kk<zhangaipoint.length;kk++){
    //     czmlz = [{
    //         "id" : "document",
    //         "name" : "CZML Point",
    //         "version" : "1.0"
    //     }, {
    //         "id" : "point 2",
    //         "name": "zpoint",
    //         "position" : {
    //             "cartographicDegrees" : zhangaipoint[kk]
    //         },
    //         "point": {
    //             "color": {
    //                 "rgba": [255, 255, 255, 255]
    //             },
    //             "outlineColor": {
    //                 "rgba": [0, 0, 255, 255]
    //             },
    //             "outlineWidth" : 4,
    //             "pixelSize": 20
    //         }
    //     }];
    //     var dataSourcePromise = Cesium.CzmlDataSource.load(czmlz);
    //     viewer.dataSources.add(dataSourcePromise);
    // }

    wallpoint.push(wallpoint[0]);
    wallpoint.push(wallpoint[1]);
    wallpoint.push(wallpoint[2]);
    zhangaiwall.push(zhangaiwall[0]);
    zhangaiwall.push(zhangaiwall[1]);
    zhangaiwall.push(zhangaiwall[2]);
    czml2 = [{
        "id" : "document",
        "name" : "CZML Wall",
        "version" : "1.0"
    },{
        "id" : "wall",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : wallpoint
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [0, 255, 0, 150]
                    }
                }
            }
        }
    },{
        "id" : "wallz",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : zhangaiwall
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [255, 0, 0, 150]
                    }
                }
            }
        }
    },{
        "id" : "wallj",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : jixianwall
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [0, 255, 0, 150]
                    }
                }
            }
        }
    },{
        "id" : "wallzh",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : zhunxianwall
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [0, 255, 0, 150]
                    }
                }
            }
        }
    },{
        "id" : "wallxiu1",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : xiushi1wall
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [0, 255, 0, 150]
                    }
                }
            }
        }
    },{
        "id" : "wallxiu2",
        "wall" : {
            "positions" : {
                "cartographicDegrees" : xiushi2wall
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [0, 255, 0, 150]
                    }
                }
            }
        }
    }];
    var dataSourcePromise2 = Cesium.CzmlDataSource.load(czml2);
    viewer.dataSources.add(dataSourcePromise2);
    wallpoint.pop();
    wallpoint.pop();
    wallpoint.pop();
    zhangaiwall.pop();
    zhangaiwall.pop();
    zhangaiwall.pop();

    czml3 = [{
        "id" : "document",
        "name" : "CZML SCANPATH",
        "version" : "1.0"
    },{
        "id" : "purpleLine",
        "name" : "Purple arrow at height",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : scanline
            },
            "material" : {
                "polylineArrow" : {
                    "color" : {
                        "rgba" : [148, 0, 211, 255]
                    }
                }
            },
            "arcType" : "NONE",
            "width" : 10
        }
    }];
    var dataSourcePromise = Cesium.CzmlDataSource.load(czml3);
    viewer.dataSources.add(dataSourcePromise);

    for(var i = 0;i<huxians.length;i++){
        var poss = [huxians[i][0][0], huxians[i][0][1], huxians[i][0][2],
         huxians[i][1][0],huxians[i][1][1], huxians[i][1][2],
          huxians[i][2][0], huxians[i][2][1], huxians[i][2][2],
          huxians[i][3][0], huxians[i][3][1], huxians[i][3][2],
         huxians[i][4][0],huxians[i][4][1], huxians[i][4][2]]
        czml4 = [{
            "id" : "document",
            "name" : "CZML HUXIAN",
            "version" : "1.0"
        },{
            "id" : "yellowline",
            "name" : "yello huxian",
            // "someInterpolatableProperty": {
            //     "cartesian" : poss,
            //     "interpolationAlgorithm": "LAGRANGE",
            //     "interpolationDegree": 5
            // }
            "polyline" : {
                "positions" : {
                    "cartographicDegrees" : poss
                },
                "material" : {
                    "polylineArrow" : {
                        "color" : {
                            "rgba" : [148, 255, 211, 255]
                        }
                    }
                },
                // "arcType" : "NONE",
                "width" : 10
                
            // },
            // "InterpolatableProperty":{
            //     "Interpolatable" : yes,
            //     "Properties" :{
            //         "interpolationAlgorithm": "LAGRANGE",  //插值算法为LAGRANGE，还有HERMITE,GEODESIC
            //         "interpolationDegree": 2 //1为线性插值，2为平方插值
            //     }
            }
            
        }];
        var dataSourcePromise = Cesium.CzmlDataSource.load(czml4);
        viewer.dataSources.add(dataSourcePromise);
    }
    

}

function deletePoint(){
    if(scanpoint_selected_name == "Greep"){
        scanpath.splice(parseInt(scanpoint_selected), 1)
        // console.log(scanpath)
        scanline = []
        for(var i = 0;i< scanpath.length;i++){
            scanline.push(scanpath[i][0]);
            scanline.push(scanpath[i][1]);
            scanline.push(scanpath[i][3]);
        }
    }
    if(scanpoint_selected_name == "Yellp"){
        bianjiepoint.splice(parseInt(scanpoint_selected), 1)
        // console.log(bianjiepoint)
        wallpoint = []
        for(var i = 0;i<bianjiepoint.length;i++){
            wallpoint.push(bianjiepoint[i][0])
            wallpoint.push(bianjiepoint[i][1])
            wallpoint.push(bianjiepoint[i][2]+heightplus)
        }
        fuzhuo()
    }
    if(scanpoint_selected_name == "Blacp"){
        
    }
    if(scanpoint_selected_name == "jixip"){
        jixian.splice(parseInt(scanpoint_selected), 1)
        jixianwall = []
        for(var i = 0;i<jixian.length;i++){
            jixianwall.push(jixian[i][0])
            jixianwall.push(jixian[i][1])
            jixianwall.push(jixian[i][2]+heightplus)
            
        }
        calculate_zhexian()
        
    }
    if(scanpoint_selected_name == "zhunp"){
        zhunxian.splice(parseInt(scanpoint_selected), 1)
        zhunxianwall = []
        for(var i = 0;i<zhunxian.length;i++){
            zhunxianwall.push(zhunxian[i][0])
            zhunxianwall.push(zhunxian[i][1])
            zhunxianwall.push(zhunxian[i][2]+heightplus)
        }
        calculate_zhexian()
    }
    if(scanpoint_selected_name == "xiusp"){
        xiushi.splice(parseInt(scanpoint_selected), 1)
        calculate_zhexian()
    }
    
    myrepaint()
    myrepaintentity()
    

}

function clearallpoints(){
    czml = []
    czml2=[]
    czml3=[]
    wallpoint=[]
    bianjiepoint=[]
    zhangaipoint=[]
    zhangaiwall=[]
    scanline = []
    jixian = []
    zhunxian = []
    jixianwall = []
    zhunxianwall = []
    xiushi = []
    xiushi1wall = []
    xiushi2wall = []
    myrepaintentity()
    myrepaint()
    console.log('delete all')
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function pathGenerate(){
    if(zhangaipoint.length>2){
        zds.push(zhangaipoint)
    }
    output_string = new Array()
    var graphd1 = "\"<?xml version=\"1.0\" encoding=\"utf-16\"?>\n<ArrayOfNavigationalPointEntity xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n"
    output_string.push(graphd1)
    var id_cnt = 0

    
    for(var i = 0;i<bianjiepoint.length;i++){
        var graphd2_arr = new Array("  <NavigationalPointEntity>\n",
        "    <ID>", String(id_cnt + 1), "</ID>\n",
        "    <RealID>", String(i + 1), "</RealID>\n",
        "    <Lat>", String(bianjiepoint[i][1]), "</Lat>\n",
        "    <Lng>", String(bianjiepoint[i][0]), "</Lng>\n",
        "    <GCJLat>0</GCJLat>\n",
        "    <GCJLng>0</GCJLng>\n",
        "    <Height>", String(0), "</Height>\n",
        "    <IsWork>0</IsWork>\n",
        "    <IsWorkCN>是</IsWorkCN>\n",
        "    <BreakType>0</BreakType>\n",
        "    <IsActiveState>0</IsActiveState>\n",
        "    <PointType>边界点</PointType>\n",
        "    <BianJu>0</BianJu>\n",
        "    <Group>0</Group>\n",
        "  </NavigationalPointEntity>\n")
        var join1 = graphd2_arr.join("")
        output_string.push(join1)
        id_cnt += 1
        
    }

    var group_cnt = 0
    for(var j = 0;j<zds.length;j++){
        for(var i = 0;i<zds[j].length;i++){
            var graph3_arr = new Array("  <NavigationalPointEntity>\n",
            "    <ID>", String(id_cnt + 1), "</ID>\n",
            "    <RealID>", String(i + 1), "</RealID>\n",
            "    <Lat>", String(zds[j][i][1]), "</Lat>\n",
            "    <Lng>", String(zds[j][i][0]), "</Lng>\n",
            "    <GCJLat>0</GCJLat>\n",
            "    <GCJLng>0</GCJLng>\n",
            "    <Height>", String(0), "</Height>\n",
            "    <IsWork>0</IsWork>\n",
            "    <IsWorkCN>是</IsWorkCN>\n",
            "    <BreakType>0</BreakType>\n",
            "    <IsActiveState>0</IsActiveState>\n",
            "    <PointType>边界点</PointType>\n",
            "    <BianJu>0</BianJu>\n",
            "    <Group>", String(group_cnt+1), "</Group>\n",
            "  </NavigationalPointEntity>\n")
            id_cnt += 1
            var join2 = graph3_arr.join("")
            output_string.push(join2)
        }
        group_cnt += 1
    }

    for(var i = 0;i<scanpath.length;i++){
        var distance = 0
        var theata = 0
        if(i<scanpath.length-1){
            euclidean_distance = Math.sqrt((scanpath[i + 1][1] - scanpath[i][1])
                                                       * (scanpath[i + 1][1] - scanpath[i][1])
                                                       + (scanpath[i + 1][0] - scanpath[i][0])
                                                       * (scanpath[i + 1][0] - scanpath[i][0]))
            distance = euclidean_distance /0.00001
        }
        if(i>0 && i<scanpath.length-1){
            var p2y = scanpath[i][1]
            var p1y = scanpath[i - 1][1]
            var p2x = scanpath[i][0]
            var p1x = scanpath[i - 1][0]
            var p3x = scanpath[i + 1][0]
            var p3y = scanpath[i + 1][1]
            var p1z = scanpath[i-1][3]*0.00001
            var p2z = scanpath[i][3]*0.00001
            var p3z = scanpath[i+1][3]*0.00001

            theata = (p1x - p2x) * (p3x - p2x) + (p1y - p2y) * (p3y - p2y) + (p1z-p2z)*(p3z-p2z)
            var mo1 = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)+Math.pow(p1z - p2z, 2))
            var mo2 = Math.sqrt(Math.pow(p3x - p2x, 2) + Math.pow(p3y - p2y, 2)+Math.pow(p3z - p2z, 2))
            var theata1 = theata / (mo1 * mo2)
            theata = Math.acos(theata1)
        }
        

        if(scanpath[i][2] == 1){
            if(distance<10 || theata<(0.75 * 3.14159265)){
                var graph4_arr = new Array("  <NavigationalPointEntity>\n",
                "    <ID>", String(id_cnt + 1), "</ID>\n",
                "    <RealID>", String(i + 1), "</RealID>\n",
                "    <Lat>", String(scanpath[i][1]), "</Lat>\n",
                "    <Lng>", String(scanpath[i][0]), "</Lng>\n",
                "    <GCJLat>0</GCJLat>\n",
                "    <GCJLng>0</GCJLng>\n",
                "    <Height>", String(0), "</Height>\n",
                "    <IsWork>1</IsWork>\n",
                "    <IsWorkCN>[", String(scanpath[i][3]), "]</IsWorkCN>\n",
                "    <BreakType>0</BreakType>\n",
                "    <IsActiveState>0</IsActiveState>\n",
                "    <PointType>航点</PointType>\n",
                "    <BianJu>0</BianJu>\n",
                "    <Group>0</Group>\n",
                "  </NavigationalPointEntity>\n")
            }
            else{
                var graph4_arr = new Array("  <NavigationalPointEntity>\n",
                "    <ID>", String(id_cnt + 1), "</ID>\n",
                "    <RealID>", String(i + 1), "</RealID>\n",
                "    <Lat>", String(scanpath[i][1]), "</Lat>\n",
                "    <Lng>", String(scanpath[i][0]), "</Lng>\n",
                "    <GCJLat>0</GCJLat>\n",
                "    <GCJLng>0</GCJLng>\n",
                "    <Height>", String(0), "</Height>\n",
                "    <IsWork>3</IsWork>\n",
                "    <IsWorkCN>[", String(scanpath[i][3]), "]</IsWorkCN>\n",
                "    <BreakType>0</BreakType>\n",
                "    <IsActiveState>0</IsActiveState>\n",
                "    <PointType>航点</PointType>\n",
                "    <BianJu>0</BianJu>\n",
                "    <Group>0</Group>\n",
                "  </NavigationalPointEntity>\n")
            }
        }
        else if(scanpath[i][2] == 0){
            if(distance<10 || theata<(0.75 * 3.14159265)){
                var graph4_arr = new Array("  <NavigationalPointEntity>\n",
                "    <ID>", String(id_cnt + 1), "</ID>\n",
                "    <RealID>", String(i + 1), "</RealID>\n",
                "    <Lat>", String(scanpath[i][1]), "</Lat>\n",
                "    <Lng>", String(scanpath[i][0]), "</Lng>\n",
                "    <GCJLat>0</GCJLat>\n",
                "    <GCJLng>0</GCJLng>\n",
                "    <Height>", String(0), "</Height>\n",
                "    <IsWork>0</IsWork>\n",
                "    <IsWorkCN>[", String(scanpath[i][3]), "]</IsWorkCN>\n",
                "    <BreakType>0</BreakType>\n",
                "    <IsActiveState>0</IsActiveState>\n",
                "    <PointType>航点</PointType>\n",
                "    <BianJu>0</BianJu>\n",
                "    <Group>0</Group>\n",
                "  </NavigationalPointEntity>\n")
            }
            else{
                var graph4_arr = new Array("  <NavigationalPointEntity>\n",
                "    <ID>", String(id_cnt + 1), "</ID>\n",
                "    <RealID>", String(i + 1), "</RealID>\n",
                "    <Lat>", String(scanpath[i][1]), "</Lat>\n",
                "    <Lng>", String(scanpath[i][0]), "</Lng>\n",
                "    <GCJLat>0</GCJLat>\n",
                "    <GCJLng>0</GCJLng>\n",
                "    <Height>", String(0), "</Height>\n",
                "    <IsWork>2</IsWork>\n",
                "    <IsWorkCN>[", String(scanpath[i][3]), "]</IsWorkCN>\n",
                "    <BreakType>0</BreakType>\n",
                "    <IsActiveState>0</IsActiveState>\n",
                "    <PointType>航点</PointType>\n",
                "    <BianJu>0</BianJu>\n",
                "    <Group>0</Group>\n",
                "  </NavigationalPointEntity>\n")
            }
        }
        var join3 = graph4_arr.join("")
        output_string.push(join3)
    }
    id_cnt += 1
    var graph5_arr = new Array("\n",
    "</ArrayOfNavigationalPointEntity>\n")
    var join4 = graph5_arr.join("")
    output_string.push(join4)

    var graph_out = output_string.join("")
    return graph_out
}

function outputPath(){
    
    var path = pathGenerate()
    download("scanning.d",path)

    console.log("output")
}


function getangle(val){
    // var anglerotation = document.getElementById('angle');
    anglerotationval = val;
    // console.log(anglerotationval);
    // document.getElementById('value1').innerHTML = anglerotationval;

    //?
    zds=[];
    if(zhangaipoint.length>2){
        zds.push(zhangaipoint)
    }
    if(bianjiepoint.length>2){
        fuzhuo()
        myrepaint()
        myrepaintentity()
    }
    
}

function getheight(val){
    heightval = val
    // document.getElementById('value2').innerHTML = heightval
    
    heightplus = parseFloat(heightval)
    // console.log(heightval)
    if(bianjiepoint.length>2){
        fuzhuo()
        
    }
    if(jixian.length>0 && zhunxian.length>0 && jixian.length ==zhunxian.length){
        calculate_zhexian()
    }
    myrepaint()
    myrepaintentity()

}

function getDuration(val){
    durationval = val
    // document.getElementById('value2').innerHTML = heightval
    
    durate = parseFloat(durationval)
    duration = durate*0.00001
    // console.log(heightval)
    if(bianjiepoint.length>2){
        fuzhuo()
        myrepaint()
        myrepaintentity()
    }
}

function getTiao(val){
    zhelines = parseInt(val) + 1
    if(jixian.length>0 && zhunxian.length>0 && jixian.length ==zhunxian.length){
        calculate_zhexian()
        myrepaint()
        myrepaintentity()
    }
    
}
    

function fuzhuo(){
    scanpath = add_flight_point(bianjiepoint,zds,duration,anglerotationval);
        // console.log(scanpath)
        scanline = [];
        height_calcu()
        // for(var yy=0;yy<scanpath.length;yy++){
            
        //     var mindis = 999999
        //     var mindisi = 0
        //     for(var zz=0;zz<bianjiepoint.length;zz++){
        //         var lineY2=bianjiepoint[sii(zz+1,bianjiepoint.length)][1];
        //         var lineY1=bianjiepoint[zz][1];
        //         var lineX2=bianjiepoint[sii(zz+1,bianjiepoint.length)][0];
        //         var lineX1=bianjiepoint[zz][0];
        //         var pointX=scanpath[yy][0];
        //         var pointY=scanpath[yy][1];
        //         var a = lineY2 - lineY1;
        //         var b = lineX1 - lineX2;
        //         var c = lineX2 * lineY1 - lineX1 * lineY2;
        //         var dis = (Math.abs(a * pointX + b * pointY + c)) / (Math.pow(a * a + b * b, 0.5));
        //         var cross1 = (lineX2-lineX1)*(pointX-lineX1) + (lineY2-lineY1)*(pointY-lineY1);
        //         var cross2 = (lineX1-lineX2)*(pointX-lineX2) + (lineY1-lineY2)*(pointY-lineY2);
        //         if(dis<mindis && cross1 >0 &&cross2>0){
        //             mindis = dis;
        //             mindisi =zz;
        //         }
        //     }
        //     var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-bianjiepoint[mindisi][0],2)+Math.pow(scanpath[yy][1]-bianjiepoint[mindisi][1],2));
        //     var distzz1Tozz = Math.sqrt(Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][0]-bianjiepoint[mindisi][0],2)+Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][1]-bianjiepoint[mindisi][1],2));
        //     var heightdif = bianjiepoint[sii(mindisi+1,bianjiepoint.length)][2]-bianjiepoint[mindisi][2];
        //     var heightmid = (distTozz/distzz1Tozz)*heightdif + bianjiepoint[mindisi][2];
        //     scanpath[yy].push(heightmid)
        //     scanline.push(scanpath[yy][0]);
        //     scanline.push(scanpath[yy][1]);
        //     scanline.push(scanpath[yy][3]+heightplus);
        // }
}

function height_calcu(){
    
    for(var yy=0;yy<scanpath.length;yy++){
            
        var mindisb = 999999
        var mindisib = 0
        var mindisz = 999999
        var mindisiz = 0
        for(var zz=0;zz<bianjiepoint.length;zz++){
            var lineY2=bianjiepoint[sii(zz+1,bianjiepoint.length)][1];
            var lineY1=bianjiepoint[zz][1];
            var lineX2=bianjiepoint[sii(zz+1,bianjiepoint.length)][0];
            var lineX1=bianjiepoint[zz][0];
            var pointX=scanpath[yy][0];
            var pointY=scanpath[yy][1];
            var a = lineY2 - lineY1;
            var b = lineX1 - lineX2;
            var c = lineX2 * lineY1 - lineX1 * lineY2;
            var dis = (Math.abs(a * pointX + b * pointY + c)) / (Math.pow(a * a + b * b, 0.5));
            var cross1 = (lineX2-lineX1)*(pointX-lineX1) + (lineY2-lineY1)*(pointY-lineY1);
            var cross2 = (lineX1-lineX2)*(pointX-lineX2) + (lineY1-lineY2)*(pointY-lineY2);
            if(dis<mindisb && cross1 >0 &&cross2>0){
                mindisb = dis;
                mindisib =zz;
            }
        }
        for(var zz=0;zz<zhangaipoint.length;zz++){
            var lineY2=zhangaipoint[sii(zz+1,zhangaipoint.length)][1];
            var lineY1=zhangaipoint[zz][1];
            var lineX2=zhangaipoint[sii(zz+1,zhangaipoint.length)][0];
            var lineX1=zhangaipoint[zz][0];
            var pointX=scanpath[yy][0];
            var pointY=scanpath[yy][1];
            var a = lineY2 - lineY1;
            var b = lineX1 - lineX2;
            var c = lineX2 * lineY1 - lineX1 * lineY2;
            var dis = (Math.abs(a * pointX + b * pointY + c)) / (Math.pow(a * a + b * b, 0.5));
            var cross1 = (lineX2-lineX1)*(pointX-lineX1) + (lineY2-lineY1)*(pointY-lineY1);
            var cross2 = (lineX1-lineX2)*(pointX-lineX2) + (lineY1-lineY2)*(pointY-lineY2);
            if(dis<mindisz && cross1 >0 &&cross2>0){
                mindisz = dis;
                mindisiz =zz;
            }
        }
        if(mindisb<mindisz){
            var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-bianjiepoint[mindisib][0],2)+Math.pow(scanpath[yy][1]-bianjiepoint[mindisib][1],2));
            var distzz1Tozz = Math.sqrt(Math.pow(bianjiepoint[sii(mindisib+1,bianjiepoint.length)][0]-bianjiepoint[mindisib][0],2)+Math.pow(bianjiepoint[sii(mindisib+1,bianjiepoint.length)][1]-bianjiepoint[mindisib][1],2));
            var heightdif = bianjiepoint[sii(mindisib+1,bianjiepoint.length)][2]-bianjiepoint[mindisib][2];
            var heightmid = (distTozz/distzz1Tozz)*heightdif + bianjiepoint[mindisib][2];
        }
        else{
            var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-zhangaipoint[mindisiz][0],2)+Math.pow(scanpath[yy][1]-zhangaipoint[mindisiz][1],2));
            var distzz1Tozz = Math.sqrt(Math.pow(zhangaipoint[sii(mindisiz+1,zhangaipoint.length)][0]-zhangaipoint[mindisiz][0],2)+Math.pow(zhangaipoint[sii(mindisiz+1,zhangaipoint.length)][1]-zhangaipoint[mindisiz][1],2));
            var heightdif = zhangaipoint[sii(mindisiz+1,zhangaipoint.length)][2]-zhangaipoint[mindisiz][2];
            var heightmid = (distTozz/distzz1Tozz)*heightdif + zhangaipoint[mindisiz][2];
        }
        
        scanpath[yy].push(heightmid)
        scanpath[yy][3] += heightplus
        scanline.push(scanpath[yy][0]);
        scanline.push(scanpath[yy][1]);
        scanline.push(scanpath[yy][3]);
    }
}



function calculate_zhexian(){
    scanline = [];
    scanpath = []
    xiushi1 = [];
    xiushi2 = [];
    for(var i = 0;i<xiushi.length;i++){
        var mindis = 999999;
        var mindisi = 0;
        for(var j = 0;j<2;j++){
            var lineY2 = zhunxian[j*(zhunxian.length-1)][1];
            var lineY1 = jixian[j*(jixian.length-1)][1];
            var lineX2 = zhunxian[j*(zhunxian.length-1)][0];
            var lineX1 = jixian[j*(jixian.length-1)][0];
            var pointX = xiushi[i][0];
            var pointY = xiushi[i][1];
            a = lineY2 - lineY1;
            b = lineX1 - lineX2;
            c = lineX2 * lineY1 - lineX1 * lineY2;
            dis = (Math.abs(a * pointX + b * pointY + c)) / (Math.pow(a * a + b * b, 0.5));
            cross1 = (lineX2 - lineX1) * (pointX - lineX1) + (lineY2 - lineY1) * (pointY - lineY1);
            cross2 = (lineX1 - lineX2) * (pointX - lineX2) + (lineY1 - lineY2) * (pointY - lineY2);
            if(dis<mindis && cross1>0 && cross2>0){
                mindis = dis;
                mindisi = j+1;
            }
        }
        if(mindisi == 1){
            xiushi1.push(xiushi[i]);
        }
        else if(mindisi ==2){
            xiushi2.push(xiushi[i]);
        }
    }
    if(xiushi1.length>0){
        xiushi1.unshift(jixian[0]);
        xiushi1.push(zhunxian[0]);
    }
    if(xiushi2.length>0){
        xiushi2.unshift(jixian[jixian.length-1])
        xiushi2.push(zhunxian[zhunxian.length-1])
    }
    xiushi1wall = []
    xiushi2wall = []
    for(var i = 0;i<xiushi1.length;i++){
        xiushi1wall.push(xiushi1[i][0])
        xiushi1wall.push(xiushi1[i][1])
        xiushi1wall.push(xiushi1[i][2]+heightplus)
    }
    for(var i = 0;i<xiushi2.length;i++){
        xiushi2wall.push(xiushi2[i][0])
        xiushi2wall.push(xiushi2[i][1])
        xiushi2wall.push(xiushi2[i][2]+heightplus)
    }
    for(var m = 1;m<zhelines;m++){
        if(m%2==0){
            if(xiushi1.length>0){
                var xtemp1 = (zhunxian[0][0] - jixian[0][0]) * m / zhelines + jixian[0][0]
                var ytemp1 = (zhunxian[0][1] - jixian[0][1]) * m / zhelines + jixian[0][1]
                var ztemp1 = (zhunxian[0][2] - jixian[0][2]) * m / zhelines + jixian[0][2]
                var xtemp2 = (zhunxian[1][0] - jixian[1][0]) * m / zhelines + jixian[1][0]
                var ytemp2 = (zhunxian[1][1] - jixian[1][1]) * m / zhelines + jixian[1][1]
                var xytemp1 = [xtemp1, ytemp1]
                var xytemp2 = [xtemp2, ytemp2]
                for(var i = 0;i<xiushi1.length-1;i++){
                    var point_temperate = calcPointInLineWith2point(xiushi1[i], xiushi1[i+1],xytemp1, xytemp2)
                    if(point_temperate){
                        var xytemp = [point_temperate[0], point_temperate[1], 1, ztemp1+heightplus]
                        scanpath.push(xytemp)
                    }
                }
            }
            var upk = 0
            var downk = 0
            if(xiushi1.length>0){
                upk = 1
            }
            if(xiushi2.length>0){
                downk = 1
            }
            for(var i = upk;i<jixian.length-downk;i++){
                var xtemp = (zhunxian[i][0] - jixian[i][0]) * m / zhelines + jixian[i][0]
                var ytemp = (zhunxian[i][1] - jixian[i][1]) * m / zhelines + jixian[i][1]
                var ztemp = (zhunxian[i][2] - jixian[i][2]) * m / zhelines + jixian[i][2]
                if(i<jixian.length-1 || xiushi2.length>0){
                    var xytemp = [xtemp, ytemp, 1, ztemp+heightplus]
                }
                else if(xiushi2.length == 0 && i == jixian.length-1){
                    var xytemp = [xtemp, ytemp, 0, ztemp+heightplus]
                }
                scanpath.push(xytemp)
            }
            if(xiushi2.length>0){
                var xtemp1 = (zhunxian[zhunxian.length-1][0] - jixian[zhunxian.length-1][0]) * m / zhelines + jixian[zhunxian.length-1][0]
                var ytemp1 = (zhunxian[zhunxian.length-1][1] - jixian[zhunxian.length-1][1]) * m / zhelines + jixian[zhunxian.length-1][1]
                var ztemp1 = (zhunxian[zhunxian.length-1][2] - jixian[zhunxian.length-1][2]) * m / zhelines + jixian[zhunxian.length-1][2]
                var xtemp2 = (zhunxian[zhunxian.length-2][0] - jixian[zhunxian.length-2][0]) * m / zhelines + jixian[zhunxian.length-2][0]
                var ytemp2 = (zhunxian[zhunxian.length-2][1] - jixian[zhunxian.length-2][1]) * m / zhelines + jixian[zhunxian.length-2][1]
                var xytemp1 = [xtemp1, ytemp1]
                var xytemp2 = [xtemp2, ytemp2]
                for(var i = 0;i<xiushi2.length-1;i++){
                    var point_temperate = calcPointInLineWith2point(xiushi2[i], xiushi2[i+1],xytemp1, xytemp2)
                    if(point_temperate){
                        var xytemp = [point_temperate[0], point_temperate[1], 0, ztemp1+heightplus]
                        scanpath.push(xytemp)
                    }
                }
            }
        }
        else if (m%2 == 1){
            if(xiushi2.length>0){
                var xtemp1 = (zhunxian[zhunxian.length-1][0] - jixian[zhunxian.length-1][0]) * m / zhelines + jixian[zhunxian.length-1][0]
                var ytemp1 = (zhunxian[zhunxian.length-1][1] - jixian[zhunxian.length-1][1]) * m / zhelines + jixian[zhunxian.length-1][1]
                var ztemp1 = (zhunxian[zhunxian.length-1][2] - jixian[zhunxian.length-1][2]) * m / zhelines + jixian[zhunxian.length-1][2]
                var xtemp2 = (zhunxian[zhunxian.length-2][0] - jixian[zhunxian.length-2][0]) * m / zhelines + jixian[zhunxian.length-2][0]
                var ytemp2 = (zhunxian[zhunxian.length-2][1] - jixian[zhunxian.length-2][1]) * m / zhelines + jixian[zhunxian.length-2][1]
                var xytemp1 = [xtemp1, ytemp1]
                var xytemp2 = [xtemp2, ytemp2]
                for(var i = 0;i<xiushi2.length-1;i++){
                    var point_temperate = calcPointInLineWith2point(xiushi2[i], xiushi2[i+1],xytemp1, xytemp2)
                    if(point_temperate){
                        var xytemp = [point_temperate[0], point_temperate[1], 1, ztemp1+heightplus]
                        scanpath.push(xytemp)
                    }
                }
            }
            var scanpath_fan = []
            var upk = 0
            var downk = 0
            if(xiushi1.length>0){
                upk = 1
            }
            if(xiushi2.length>0){
                downk = 1
            }
            for(var i = upk;i<jixian.length-downk;i++){
                var xtemp = (zhunxian[i][0] - jixian[i][0]) * m / zhelines + jixian[i][0]
                var ytemp = (zhunxian[i][1] - jixian[i][1]) * m / zhelines + jixian[i][1]
                var ztemp = (zhunxian[i][2] - jixian[i][2]) * m / zhelines + jixian[i][2]
                if(i==0 && xiushi1.length==0){
                    var xytemp = [xtemp, ytemp, 0, ztemp+heightplus]
                }
                else if(xiushi1.length > 0 || i > 0){
                    var xytemp = [xtemp, ytemp, 1, ztemp+heightplus]
                }
                scanpath_fan.push(xytemp)
            }
            for(var i = 0;i<scanpath_fan.length;i++){
                scanpath.push(scanpath_fan[scanpath_fan.length-i-1])
            }
            if(xiushi1.length>0){
                var xtemp1 = (zhunxian[0][0] - jixian[0][0]) * m / zhelines + jixian[0][0]
                var ytemp1 = (zhunxian[0][1] - jixian[0][1]) * m / zhelines + jixian[0][1]
                var ztemp1 = (zhunxian[0][2] - jixian[0][2]) * m / zhelines + jixian[0][2]
                var xtemp2 = (zhunxian[1][0] - jixian[1][0]) * m / zhelines + jixian[1][0]
                var ytemp2 = (zhunxian[1][1] - jixian[1][1]) * m / zhelines + jixian[1][1]
                var xytemp1 = [xtemp1, ytemp1]
                var xytemp2 = [xtemp2, ytemp2]
                for(var i = 0;i<xiushi1.length-1;i++){
                    var point_temperate = calcPointInLineWith2point(xiushi1[i], xiushi1[i+1],xytemp1, xytemp2)
                    if(point_temperate){
                        var xytemp = [point_temperate[0], point_temperate[1], 0, ztemp1+heightplus]
                        scanpath.push(xytemp)
                    }
                }
            }
        }
    }
    // height_calcu()
    for(var i = 0;i< scanpath.length;i++){
        scanline.push(scanpath[i][0]);
        scanline.push(scanpath[i][1]);
        scanline.push(scanpath[i][3]);
    }
    console.log(scanpath)
    calcu_radian()
}


// function computeCirclularFlight(x, y, z, r, alpha, belta, spanangle) {
//     console.log("r", r)
//     if(spanangle>0){
//         for (var i = belta; i <= belta+spanangle; i += 3.14159265/180) { //弧线长度
//             var radians = i
//             var cosb = Math.sqrt((1+(Math.tan(radians)*Math.tan(radians)))/(Math.pow(Math.tan(radians)/Math.cos(alpha), 2)+1));
//             // console.log('cos alpha', Math.cos(alpha))
//             console.log('cosb', Math.acos(cosb)*180/3.14159265)
//             var hh = Math.sqrt(r*r*(1-cosb*cosb));
//             console.log('hh', hh)
//             var sigmaa = radians
//             console.log('sigma',sigmaa*180/3.14159265)
//             console.log('xdelta', r * cosb * Math.cos(sigmaa))
//             console.log('ydelta', r * cosb * Math.sin(sigmaa))
//             if(alpha>0){
//                 var catesian33 = new Cesium.Cartesian3(x + (r * cosb * Math.cos(sigmaa)), y + (r *cosb* Math.sin(sigmaa)), z+hh);
//             }
//             else{
//                 var catesian33 = new Cesium.Cartesian3(x + (r * cosb * Math.cos(sigmaa)), y + (r *cosb* Math.sin(sigmaa)), z-hh);
//             }
//             console.log('zz+hh', catesian33.z)
//             var position = Cesium.Cartographic.fromCartesian(catesian33);
//             var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
//             var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
//             var height = position.height;//模型高度
//             var point = [lng,lat,height];
//             console.log('height', point[2])
//             huxian.push(point)
            
    
    
//         }
//     }
//     else{
//         for (var i = belta+spanangle; i <= belta; i += 3.14159265/180) { //弧线长度
//             var radians = i
//             var cosb = Math.sqrt((1+(Math.tan(radians)*Math.tan(radians)))/(Math.pow(Math.tan(radians)/Math.cos(alpha), 2)+1));
//             var hh = Math.sqrt(r*r*(1-cosb*cosb));
//             // console.log(hh)
//             var sigmaa = radians
//             if(alpha>0){
//                 var catesian33 = new Cesium.Cartesian3(x + (r * cosb * Math.cos(sigmaa)), y + (r *cosb* Math.sin(sigmaa)), z+hh);
//             }
//             else{
//                 var catesian33 = new Cesium.Cartesian3(x + (r * cosb * Math.cos(sigmaa)), y + (r *cosb* Math.sin(sigmaa)), z-hh);
//             }
//             var position = Cesium.Cartographic.fromCartesian(catesian33);
//             var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
//             var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
//             var height = position.height;//模型高度
//             var point = [lng,lat,height];
//             huxian.push(point)
    
    
//         }
//     }
    
//     // return property;
// }

function calcu_radian(){
    huxians = []
    for(var i = 1;i<scanpath.length-1;i++){
        var abso_not = 1
        for(var m = 0;m<parseInt(zhelines);m++){
            if(i == jixian.length*m || i == jixian.length*m+jixian.length-1){
                abso_not = 0
                break
            }
        }
        if(abso_not==0){
            continue
        }
        // console.log('scanpathi', scanpath[i])
        scanpathcartesian_i_1 = Cesium.Cartesian3.fromDegrees(scanpath[i-1][0],scanpath[i-1][1],scanpath[i-1][3])
        scanpathcartesian_i = Cesium.Cartesian3.fromDegrees(scanpath[i][0],scanpath[i][1],scanpath[i][3])
        scanpathcartesian_i1 = Cesium.Cartesian3.fromDegrees(scanpath[i+1][0],scanpath[i+1][1],scanpath[i+1][3])
        //将经纬度转换成直角坐标系，单位为m
        var p2y = scanpathcartesian_i.y
        var p1y = scanpathcartesian_i_1.y
        var p2x = scanpathcartesian_i.x
        var p1x = scanpathcartesian_i_1.x
        var p3x = scanpathcartesian_i1.x
        var p3y = scanpathcartesian_i1.y
        var p1z = scanpathcartesian_i_1.z
        var p2z = scanpathcartesian_i.z
        var p3z = scanpathcartesian_i1.z

        theata = (p1x - p2x) * (p3x - p2x) + (p1y - p2y) * (p3y - p2y) + (p1z-p2z)*(p3z-p2z)
        var mo1 = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2)+Math.pow(p1z - p2z, 2))
        var mo2 = Math.sqrt(Math.pow(p3x - p2x, 2) + Math.pow(p3y - p2y, 2)+Math.pow(p3z - p2z, 2))
        var theata1 = theata / (mo1 * mo2)
        theata = Math.acos(theata1)
        // console.log('theata', theata*180/3.14159265)
        if(theata<(0.55*3.14159265)){
            continue
        }
        
        var minidistance = 10 //这里设置加速度速度max(flight_speed * flight_speed / flight_a, 5)
        if (mo1<(2*minidistance) || mo2<(2*minidistance)){
            continue
        }
        var circle_r = minidistance*Math.tan(theata/2) 
        // console.log('R', circle_r)
        //A点坐标
        var Ax = p2x-(p2x-p1x)*(minidistance/mo1)
        var Ay = p2y-(p2y-p1y)*(minidistance/mo1)
        var Az = p2z-(p2z-p1z)*(minidistance/mo1)
        var catesiann = new Cesium.Cartesian3(Ax, Ay, Az)
        var position = Cesium.Cartographic.fromCartesian(catesiann);
        var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        var height = position.height;//模型高度
        var point = [lng,lat,height];
        // var point = [Ax, Ay, Az]
        var AA = point
        
        //B点坐标
        var Bx = p2x-(p2x-p3x)*(minidistance/mo2)
        var By = p2y-(p2y-p3y)*(minidistance/mo2)
        var Bz = p2z-(p2z-p3z)*(minidistance/mo2)
        var catesiann = new Cesium.Cartesian3(Bx, By, Bz)
        var position = Cesium.Cartographic.fromCartesian(catesiann);
        var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        var height = position.height;//模型高度
        var point = [lng,lat,height];
        // var point = [Bx, By, Bz]
        var BB = point
        

        //Q点坐标，Q为AB的中点
        var Qx = (Ax+Bx)/2
        var Qy = (Ay+By)/2
        var Qz = (Az+Bz)/2

        //R点坐标，R为圆弧中点
        var xishur = ((circle_r/Math.sin(theata/2)-circle_r)/(circle_r*Math.cos(theata/2)/Math.tan(theata/2)))
        var Rx = xishur*(Qx-p2x) +p2x
        var Ry = xishur*(Qy-p2y) +p2y
        var Rz = xishur*(Qz-p2z) +p2z
        var catesiann = new Cesium.Cartesian3(Rx, Ry, Rz)
        var position = Cesium.Cartographic.fromCartesian(catesiann);
        var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        var height = position.height;//模型高度
        var point = [lng,lat,height];
        // var point = [Rx, Ry, Rz]
        var RR = point

        //O点坐标，O为圆心点
        // var xishuo = 1/(Math.cos(theata/2)*Math.cos(theata/2))
        // var Ox = xishuo*(Qx-p2x) +p2x
        // var Oy = xishuo*(Qy-p2y) +p2y
        // var Oz = xishuo*(Qz-p2z) +p2z


        var Ap2x = (Ax+p2x)/2
        var Ap2y = (Ay+p2y)/2
        var Ap2z = (Az+p2z)/2

        var Bp2x = (Bx+p2x)/2
        var Bp2y = (By+p2y)/2
        var Bp2z = (Bz+p2z)/2

        var ARx = (Ax+Rx)/2
        var ARy = (Ay+Ry)/2
        var ARz = (Az+Rz)/2

        var BRx = (Bx+Rx)/2
        var BRy = (By+Ry)/2
        var BRz = (Bz+Rz)/2

        var xishus = (1-Math.cos(theata/4))/(1-(Math.cos(theata/4)*Math.cos(theata/4)))
        var Sx = xishus*(ARx-Ap2x) + Ap2x
        var Sy = xishus*(ARy-Ap2y) + Ap2y
        var Sz = xishus*(ARz-Ap2z) + Ap2z
        var catesiann = new Cesium.Cartesian3(Sx, Sy, Sz)
        var position = Cesium.Cartographic.fromCartesian(catesiann);
        var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        var height = position.height;//模型高度
        var point = [lng,lat,height];
        // var point = [Rx, Ry, Rz]
        var SS = point

        var Tx = xishus*(BRx-Bp2x) + Bp2x
        var Ty = xishus*(BRy-Bp2y) + Bp2y
        var Tz = xishus*(BRz-Bp2z) + Bp2z
        var catesiann = new Cesium.Cartesian3(Tx, Ty, Tz)
        var position = Cesium.Cartographic.fromCartesian(catesiann);
        var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        var height = position.height;//模型高度
        var point = [lng,lat,height];
        // var point = [Rx, Ry, Rz]
        var TT = point

        


        huxian.push(AA)
        huxian.push(SS)
        huxian.push(RR)
        huxian.push(TT)
        huxian.push(BB)
        huxians.push(huxian)
        huxian = []

        

        

        // var catesian33 = new Cesium.Cartesian3(Ox, Oy, Oz);
        // var position = Cesium.Cartographic.fromCartesian(catesian33);
        // var lng = Cesium.Math.toDegrees(position.longitude); //根据弧度获取到经度
        // var lat = Cesium.Math.toDegrees(position.latitude); //根据弧度获取到纬度
        // var height = position.height;//模型高度
        // var point = [lng,lat,height];
        // console.log("point", point)

        // //夹角alpha
        // var alpha = Math.asin((scanpath[i][3]-point[2])/(circle_r/Math.sin(theata/2)))
        // console.log("alpha", alpha*180/3.14159265)
        // // console.log("alpha1", p2z)

        // //belta 圆弧中心逆时针转的角度
        // var vect1 = [10, 0]
        // var vect2 = [-p2x+Ox, -p2y+Oy]
        // var cos_theat = (vect1[0]*vect2[0] + vect1[1]*vect2[1])/(circle_r*Math.cos(alpha)*10)
        // var belta = Math.acos(cos_theat)
        // // belta = belta*180/3.14159265
        // if(vect2[1]<0){
        //     belta = -belta
        // }
        // console.log('belta', belta*180/3.14159265)
        // //gama 旋转角度
        // var gama = 1.57079632-(theata/2)
        // console.log('gama', gama*180/3.14159265)
        // computeCirclularFlight(Ox, Oy, Oz, circle_r, alpha, belta, gama)
        // computeCirclularFlight(Ox, Oy, Oz, circle_r, alpha, belta, -gama)
        // huxians.push(huxian)
        // huxian = []



    }
    // console.log(huxians)
    // myrepaint()
    // myrepaintentity()
    

}