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
var zds = new Array()
var anglerotationval = 0
var czml
var czml2
var heightplus = 20
var zhelines = 11
var update_path = true

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
        var pp3point = [point[0], point[1], point[2]];
        scanline.push(pp3point[0])
        scanline.push(pp3point[1])
        scanline.push(pp3point[2]+heightplus)
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
        if(jixian.length>0 && zhunxian.length>0 && jixian.length ==zhunxian.length){
            calculate_zhexian()
        }
    }
    
    myrepaint()
    myrepaintentity()

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

var moveTool= MoveEntity({ 'viewer': viewer});

function myrepaintentity(){
    var entitys = viewer.entities._entities._array;
    for (var i = 0; i < entitys.length; i++) {                 
        viewer.entities.remove(entitys[i]);
        i--;
    }           

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
                positions : Cesium.Cartesian3.fromDegreesArrayHeights([scanline[kk], scanline[kk+1], scanline[kk+2],
                    scanline[kk], scanline[kk+1], scanline[kk+2]-heightplus]),
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
    jixian = []
    zhunxian = []
    jixianwall = []
    zhunxianwall = []
    xiushi = []
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
    document.getElementById('value1').innerHTML = anglerotationval;

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
    document.getElementById('value2').innerHTML = heightval
    
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
    

function fuzhuo(){
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
            scanpath[yy].push(heightmid)
            scanline.push(scanpath[yy][0]);
            scanline.push(scanpath[yy][1]);
            scanline.push(scanpath[yy][3]+heightplus);
        }
}

// function height_calcu(){
//     var point_all = [];
//     for(var i = 0;i<jixian.length;i++){
//         point_all.push(jixian[i]);
//     }
//     for(var i = 0;i<zhunxian.length;i++){
//         point_all.push(zhunxian[i]);
//     }
//     for(var i = 0;i<xiushi.length;i++){
//         point_all.push(xiushi[i]);
//     }
//     for(var yy=0;yy<scanpath.length;yy++){
            
//         var mindis = 999999
//         var mindisi = 0
//         for(var zz=0;zz<point_all.length;zz++){
//             var lineY2=point_all[sii(zz+1,point_all.length)][1];
//             var lineY1=point_all[zz][1];
//             var lineX2=point_all[sii(zz+1,point_all.length)][0];
//             var lineX1=point_all[zz][0];
//             var pointX=scanpath[yy][0];
//             var pointY=scanpath[yy][1];
//             var a = lineY2 - lineY1;
//             var b = lineX1 - lineX2;
//             var c = lineX2 * lineY1 - lineX1 * lineY2;
//             var dis = (Math.abs(a * pointX + b * pointY + c)) / (Math.pow(a * a + b * b, 0.5));
//             var cross1 = (lineX2-lineX1)*(pointX-lineX1) + (lineY2-lineY1)*(pointY-lineY1);
//             var cross2 = (lineX1-lineX2)*(pointX-lineX2) + (lineY1-lineY2)*(pointY-lineY2);
//             if(dis<mindis && cross1 >0 &&cross2>0){
//                 mindis = dis;
//                 mindisi =zz;
//             }
//         }
//         var distTozz = Math.sqrt(Math.pow(scanpath[yy][0]-point_all[mindisi][0],2)+Math.pow(scanpath[yy][1]-point_all[mindisi][1],2));
//         var distzz1Tozz = Math.sqrt(Math.pow(point_all[sii(mindisi+1,point_all.length)][0]-point_all[mindisi][0],2)+Math.pow(point_all[sii(mindisi+1,point_all.length)][1]-point_all[mindisi][1],2));
//         var heightdif = point_all[sii(mindisi+1,point_all.length)][2]-point_all[mindisi][2];
//         var heightmid = (distTozz/distzz1Tozz)*heightdif + point_all[mindisi][2];
//         scanpath[yy].push(heightmid)
//         scanline.push(scanpath[yy][0]);
//         scanline.push(scanpath[yy][1]);
//         scanline.push(scanpath[yy][3]);
//     }
// }

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
                        var xytemp = [point_temperate[0], point_temperate[1], 1, ztemp1]
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
                    var xytemp = [xtemp, ytemp, 1, ztemp]
                }
                else if(xiushi2.length == 0 && i == jixian.length-1){
                    var xytemp = [xtemp, ytemp, 0, ztemp]
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
                        var xytemp = [point_temperate[0], point_temperate[1], 0, ztemp1]
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
                        var xytemp = [point_temperate[0], point_temperate[1], 1, ztemp1]
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
                    var xytemp = [xtemp, ytemp, 0, ztemp]
                }
                else if(xiushi1.length > 0 || i > 0){
                    var xytemp = [xtemp, ytemp, 1, ztemp]
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
                        var xytemp = [point_temperate[0], point_temperate[1], 0, ztemp1]
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
        scanline.push(scanpath[i][3]+heightplus);
    }
    console.log(scanpath)
}