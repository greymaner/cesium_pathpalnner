var wallpoint = new Array()
var zhangaiwall = new Array()
var bianjiepoint = new Array()
var zhangaipoint = new Array()
var scanpath = new Array()
var scanline = new Array()
var zds = new Array()
var anglerotationval = 0
var czml
var czml2
var heightplus = 20

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
var tileset = new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(40866)
});
viewer.scene.primitives.add(tileset);
viewer.zoomTo(tileset);


var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

handler.setInputAction(function (evt) {
    var scene = viewer.scene;
    var pickedObject = scene.pick(evt.position); //判断是否拾取到模型
    if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
        var cartesian = viewer.scene.pickPosition(evt.position);
        if (Cesium.defined(cartesian)) {
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
        var pp1point = [point[0], point[1], point[2]+heightplus]
        bianjiepoint.push(pp1point)
        wallpoint.push(point[0]);
        wallpoint.push(point[1]);
        wallpoint.push(point[2]+heightplus);
    }

    if(oOptVal == 2){
        var pppoint = [point[0], point[1], point[2]+heightplus]
        zhangaipoint.push(pppoint)
        zhangaiwall.push(point[0]);
        zhangaiwall.push(point[1]);
        zhangaiwall.push(point[2]+heightplus);
    }
    
    if(bianjiepoint.length > 2){
        // console.log(zhangaipoint)
        zds=[];
        if(zhangaipoint.length>2){
            zds.push(zhangaipoint)
        }

        scanpath = add_flight_point(bianjiepoint,zds,0.0001,anglerotationval);
        // console.log(scanpath)
        scanline = [];
        
        for(var yy=0;yy<scanpath.length;yy++){
            var mindis = 999999
            var mindisi = 0
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
                if(dis<mindis && cross1 >0 &&cross2>0){
                    mindis = dis;
                    mindisi =zz;
                }
            }
            var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-bianjiepoint[mindisi][0],2)+Math.pow(scanpath[yy][1]-bianjiepoint[mindisi][1],2));
            var distzz1Tozz = Math.sqrt(Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][0]-bianjiepoint[mindisi][0],2)+Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][1]-bianjiepoint[mindisi][1],2));
            var heightdif = bianjiepoint[sii(mindisi+1,bianjiepoint.length)][2]-bianjiepoint[mindisi][2];
            var heightmid = (distTozz/distzz1Tozz)*heightdif + bianjiepoint[mindisi][2];
            scanline.push(scanpath[yy][0]);
            scanline.push(scanpath[yy][1]);
            scanline.push(heightmid);
        }
        // console.log(scanline)
        
    }
    myrepaint()
    myrepaintentity()

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

var moveTool= MoveEntity({ 'viewer': viewer});

function myrepaintentity(){
    var entitys = viewer.entities._entities._array;
    // console.log("====删除实体");
    // console.log(entitys.length);
    // console.log(entitys);
    for (var i = 0; i < entitys.length; i++) {
        // if (entitys[i]._name === "lablebill") {
        // console.log("i=" + i);
        // console.log(entitys[i]._name);
        // console.log(entitys[i]._id);                  
        viewer.entities.remove(entitys[i]);
        i--;
        // }
    }           

    
    // for(var kk = 0;kk<bianjiepoint.length;kk++){
    //     viewer.entities.add({
    //         name : 'Green ellipsoid',
    //         position: Cesium.Cartesian3.fromDegrees(bianjiepoint[kk][0], bianjiepoint[kk][1], bianjiepoint[kk][2]),
    //         ellipsoid : {
    //             radii : new Cesium.Cartesian3(1, 1, 1),
    //             material : Cesium.Color.GREEN
    //         }
    //     });
    // }

    for(var kk = 0;kk<bianjiepoint.length;kk++){
        namei = 'Yello' + String(kk)
        viewer.entities.add({
            name : namei,
            position: Cesium.Cartesian3.fromDegrees(bianjiepoint[kk][0], bianjiepoint[kk][1], bianjiepoint[kk][2]-heightplus),
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
            position: Cesium.Cartesian3.fromDegrees(zhangaipoint[kk][0], zhangaipoint[kk][1], zhangaipoint[kk][2]-heightplus),
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
        viewer.entities.add({
            name : 'grennup',
            position: Cesium.Cartesian3.fromDegrees(scanline[kk], scanline[kk+1], scanline[kk+2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.PURPLE
            }
        });
    }

    for(var kk = 0;kk<scanline.length;kk=kk+3){
        viewer.entities.add({
            name : 'xuxian',
            polyline : {
                positions : Cesium.Cartesian3.fromDegreesArrayHeights([scanline[kk], scanline[kk+1], scanline[kk+2]-heightplus,
                    scanline[kk], scanline[kk+1], scanline[kk+2]]),
                width : 10,
                material : new Cesium.PolylineDashMaterialProperty({
                    color : Cesium.Color.GREEN,
                })
            }
        })
    }


    
    
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
    myrepaintentity()
    myrepaint()
    console.log('delete all')
}

function outputPath(){

    console.log("output")
}


function getangle(val){
    // var anglerotation = document.getElementById('angle');
    anglerotationval = val;
    // console.log(anglerotationval);
    document.getElementById('value').innerHTML = anglerotationval;

    //?
    zds=[];
    if(zhangaipoint.length>2){
        zds.push(zhangaipoint)
    }

    scanpath = add_flight_point(bianjiepoint,zds,0.0001,anglerotationval);
    // console.log(scanpath)
    scanline = [];
    
    for(var yy=0;yy<scanpath.length;yy++){
        var mindis = 999999
        var mindisi = 0
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
            if(dis<mindis && cross1 >0 &&cross2>0){
                mindis = dis;
                mindisi =zz;
            }
        }
        var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-bianjiepoint[mindisi][0],2)+Math.pow(scanpath[yy][1]-bianjiepoint[mindisi][1],2));
        var distzz1Tozz = Math.sqrt(Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][0]-bianjiepoint[mindisi][0],2)+Math.pow(bianjiepoint[sii(mindisi+1,bianjiepoint.length)][1]-bianjiepoint[mindisi][1],2));
        var heightdif = bianjiepoint[sii(mindisi+1,bianjiepoint.length)][2]-bianjiepoint[mindisi][2];
        var heightmid = (distTozz/distzz1Tozz)*heightdif + bianjiepoint[mindisi][2];
        scanline.push(scanpath[yy][0]);
        scanline.push(scanpath[yy][1]);
        scanline.push(heightmid);
    }
    myrepaint()
    myrepaintentity()
}
    