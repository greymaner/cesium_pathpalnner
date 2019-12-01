function transformation(x,y,tx,ty,deg1,sx,sy){
    var deg = deg1 * Math.PI / 180;
    if (sy == 0)
        sy = 1;
    if (sx == 0)
        sx = 1;
    var trans_x = sx * ((x - tx) * Math.cos(deg) - (y - ty) * Math.sin(deg)) + tx;
    var trans_y = sy * ((x - tx) * Math.sin(deg) + (y - ty) * Math.cos(deg)) + ty;
    var trans = [trans_x, trans_y];
    return trans;
}

function calcPointInLineWithY(p1, p2, y, x1, x2){
    var s = p1[1] - p2[1];
    if (s!=0){
        var x = (y - p1[1]) * (p1[0] - p2[0]) / s + p1[0];
        var point = [x, y];
    }   
    else{
        return false;
    }
    if (x > p1[0] && x > p2[0]){
        return false;
    }
    if (x < p1[0] && x < p2[0]){
        return false;
    }
    if (x1 != 0 && x2 != 0){
        if (x < x1 || x > x2){
            return false;
        }
    }
    return point;
}

function outbound_box(point,duration){
    var max_x = -99999;
    var max_y = -99999;
    var min_x = 99999;
    var min_y = 99999;
    var length_point = point.length;
    for(var i=0;i<length_point;i++){
        if (max_x < point[i][0]){
            max_x = point[i][0];
        }
        if (min_x > point[i][0]){
            min_x = point[i][0];
        }
        if (max_y < point[i][1]){
            max_y = point[i][1];
        }
        if (min_y > point[i][1]){
            min_y = point[i][1];
        }
    }
        
    var rect = [min_x-duration/2, min_y-duration/2, max_x+duration/2, max_y+duration/2];
    return rect;
}

function rotation_polygon(point,rect,rotate){
    var res = new Array();
    var rect_centerx = (rect[2] + rect[0]) / 2;
    var rect_centery = (rect[1] + rect[3]) / 2;
    var lenth_point = point.length
    for(var i=0;i<lenth_point;i++){
        var trs = transformation(point[i][0], point[i][1], rect_centerx, rect_centery, rotate, 1, 1);
        var trsx = trs[0];
        var trsy = trs[1];
        if (point[i].length > 2){
            res.push([trsx, trsy, point[i][2]]);
        }
        else{
            res.push([trsx, trsy]);
        }
    }
        
    return res;

}

function sii(i,l){
    if(i>l-1){
        return i-l;
    }
    if(i<0){
        return l+i;
    }
    return i;
}

function sij(i,l){
    if(i==0){
        return l-1;
    }
    else{
        return i-1;
    }
}


function ascend(a,b){
    if(a[0]<b[0]){
        return -1;
    }
    if(a[0]>b[0]){
       return 1;
    }
    return 0;
}

function nearesty(point, aobianxing_p, upordown){
    var mindist = 9999999;
    var mindisti = 0;
    var aobianxing11 = aobianxing_p.sort(ascend);
    if (upordown == 0){
        for(var i=0;i<point.length;i++){
            var distance = Math.abs((point[i][1])-(aobianxing11[aobianxing11.length-1][1]));
            if (distance < mindist){
                mindist = distance;
                mindisti = i;
            }
        }
    }
        
    else if(upordown ==1){
        for(var i=0;i<point.length;i++){
            var distance = Math.abs((point[i][1])-(aobianxing11[0][1]));
            if (distance < mindist){
                mindist = distance;
                mindisti = i;
            }
        }
    }        
    var point_out = [point[mindisti][0], point[mindisti][1], 0];
    return point_out;
}

// function waikuo(points,kuochongs){
//     var dplist = new Array();
//     var ndplist = new Array();
//     var out = new Array();

//         for(var i=0;i<points.length;i++){
//             var deta = points[(sii(i+1, points.length))] - points[i];
//             dplist.push(deta);
//             // var unitlen = 1.0 / Math.sqrt(np.dot(dplist[i], dplist[i]));
//             var unitlen = 1.0 / Math.sqrt(dplist[i][0]*dplist[i][0]+dplist[i][1]*dplist[i][1]);
//             ndplist.push(dplist[i] * unitlen);
//         }
            
//         for(var k=0;k<points.length;k++){
//             var x1 = ndplist[sij(k, points.length)][0];
//             var y1 = ndplist[sij(k, points.length)][1];
//             var x2 = ndplist[k][0];
//             var y2 = ndplist[k][1];
//             var theat1 = x1*y2;
//             var theat2 = x2*y1;
//             var sintheta = (theat1-theat2);
//             var orientvector = ndplist[k] - ndplist[sij(k, points.length)];
//             var out_x = points[k][0] + (kuochongs/sintheta)*orientvector[0];
//             var out_y = points[k][1] + (kuochongs/sintheta)*orientvector[1];
//             var tempout = [out_x, out_y];
//             out.push(tempout);
//         }
    

//     return out;
// }

function add_flight_point(point,zpoint,duration,rotate){
    var rect = outbound_box(point, 0);
    // console.log(rect)
    var points = rotation_polygon(point, rect, -rotate);
    var zpoint_waikuo = new Array();
    var Zpoint = new Array();
    for(var i=0;i<zpoint.length;i++){
        var zpoints = rotation_polygon(zpoint[i], rect, -rotate);
        // var zpoint_kuo = waikuo(zpoints, duration/2);
        var rectz = outbound_box(zpoints, 0);
        var zpoints1 = [[rectz[0], rectz[1]], [rectz[0], rectz[3]], [rectz[2], rectz[3]], [rectz[2], rectz[1]]];
        Zpoint.push(zpoints1);
        zpoint_waikuo.push(zpoints);
    }
    console.log(Zpoint)
    // Zpoint = Zpoint.sort(ascend);
    // zpoint_waikuo = Zpoint;

    var rect2 = outbound_box(points, 0);
    var dist = rect2[3] - rect2[1];
    var lines = parseInt(dist / duration);
    

    var lenpoints = points.length;

    var finaline = [];
    var aobianxingl = [];
    var aobianxingr = [];
    for(var i=0;i<lines;i++){
        var line = [];
        for(var j=0;j<lenpoints;j++){
            var out_point = calcPointInLineWithY(points[j], points[sii(j+1, lenpoints)], rect2[1]+i*duration+0.5*duration, rect2[0], rect2[2]);
            if (out_point){
                line.push(out_point);
            }
        }
        // console.log(line)
        line = line.sort(ascend);
        // console.log(line)
        if (line.length < 2){
            continue;
        }
            
        if (line[0][0] == line[1][0]){
            continue;
        }
        if (line.length== 4){
            if (i % 2 == 1){
                var point_smaller = [line[0][0], line[0][1], 0];
                var point_smaller_bigger = [line[1][0], line[1][1], 1];
                var point_bigger_smaller = [line[2][0], line[2][1], 1];
                var point_bigger = [line[3][0], line[3][1], 0];
                aobianxingl.push(point_smaller_bigger);
                for(var t=0;t<zpoint_waikuo.length;t++){
                    var k = zpoint_waikuo.length - t - 1;
                    var linez = [];
                    for (var r=0;r<zpoint_waikuo[k].length;r++){
                        var out_zpoint = calcPointInLineWithY(zpoint_waikuo[k][r], zpoint_waikuo[k][sii(r + 1, zpoint_waikuo[k].length)],
                        line[0][1], line[0][0], line[1][0]);
                        if (out_zpoint){
                            linez.push(out_zpoint);
                        }
                    }
 
                    linez = linez.sort(ascend);
                    if (linez.length >1){
                        if (Math.abs(Zpoint[k][0][1]-linez[0][1]) < Math.abs(Zpoint[k][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[k][0][0], linez[0][1], 1];
                            var zpoint_bigger = [Zpoint[k][3][0], linez[1][1], 0];
                            var zpoint_smaller1 = [Zpoint[k][0][0], Zpoint[k][0][1], 0];
                            var zpoint_bigger1 = [Zpoint[k][3][0], Zpoint[k][3][1], 0];
                        }
                        else if(Math.abs(Zpoint[k][0][1]-linez[0][1]) >= Math.abs(Zpoint[k][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[k][1][0], linez[0][1], 1];
                            var zpoint_bigger = [Zpoint[k][2][0], linez[1][1], 0];
                            var zpoint_smaller1 = [Zpoint[k][1][0], Zpoint[k][1][1], 0];
                            var zpoint_bigger1 = [Zpoint[k][2][0], Zpoint[k][2][1], 0];
                        }
                        aobianxingl.push(zpoint_bigger);
                        aobianxingl.push(zpoint_bigger1);
                        aobianxingl.push(zpoint_smaller1);
                        aobianxingl.push(zpoint_smaller);
                    }
    
                        
                }
                   
                aobianxingl.push(point_smaller);
    
    
                aobianxingr.push(point_bigger_smaller);
                for(var k=0;k<zpoint_waikuo.length;k++){
                    var linez = [];
                    for (var r=0;r<zpoint_waikuo[k].length;r++)
                        var out_zpoint = calcPointInLineWithY(zpoint_waikuo[k][r], zpoint_waikuo[k][sii(r + 1, zpoint_waikuo[k].length)],
                                                         line[2][1], line[2][0], line[3][0]);
                        if (out_zpoint){
                            linez.push(out_zpoint);
                        }
                            
                    linez = linez.sort(ascend);
                    if (linez.length >1){
                        if (Math.abs(Zpoint[k][0][1]-linez[0][1]) < Math.abs(Zpoint[k][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[k][0][0], linez[0][1], 0];
                            var zpoint_bigger = [Zpoint[k][3][0], linez[1][1], 1];
                            var zpoint_smaller1 = [Zpoint[k][0][0], Zpoint[k][0][1], 0];
                            var zpoint_bigger1 = [Zpoint[k][3][0], Zpoint[k][3][1], 0];
                        }
                        else if(Math.abs(Zpoint[k][0][1]-linez[0][1]) >= Math.abs(Zpoint[k][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[k][1][0], linez[0][1], 0];
                            var zpoint_bigger = [Zpoint[k][2][0], linez[1][1], 1];
                            var zpoint_smaller1 = [Zpoint[k][1][0], Zpoint[k][1][1], 0];
                            var zpoint_bigger1 = [Zpoint[k][2][0], Zpoint[k][2][1], 0];
                        }
                        aobianxingr.push(zpoint_smaller);
                        aobianxingr.push(zpoint_smaller1);
                        aobianxingr.push(zpoint_bigger1);
                        aobianxingr.push(zpoint_bigger);
                    }
    
                        
                }
                   
                aobianxingr.push(point_bigger);
           


            }
        else if(i % 2 == 0){
            var point_smaller = [line[0][0], line[0][1], 0];
            var point_smaller_bigger = [line[1][0], line[1][1], 0];
            var point_bigger_smaller = [line[2][0], line[2][1], 0];
            var point_bigger = [line[3][0], line[3][1], 1];
            aobianxingl.push(point_smaller);
            for(var m=0;m<zpoint_waikuo.length;m++){
                var linez = [];
                for (var r=0;r<zpoint_waikuo[m].length;r++){
                    var out_zpoint = calcPointInLineWithY(zpoint_waikuo[m][r], zpoint_waikuo[m][sii(r + 1, zpoint_waikuo[m].length)],
                    line[2][1], line[0][0], line[1][0]);
                    if (out_zpoint){
                        linez.push(out_zpoint);
                    }
                }

                linez = linez.sort(ascend);
                if (linez.length >1){
                    if (Math.abs(Zpoint[m][0][1]-linez[0][1]) < Math.abs(Zpoint[m][1][1]-linez[0][1])){
                        var zpoint_smaller = [Zpoint[m][3][0], linez[1][1], 1];
                        var zpoint_bigger = [Zpoint[m][0][0], linez[0][1], 0];
                        var zpoint_smaller1 = [Zpoint[m][3][0], Zpoint[m][3][1], 0];
                        var zpoint_bigger1 = [Zpoint[m][0][0], Zpoint[m][0][1], 0];
                    }
                    else if(Math.abs(Zpoint[m][0][1]-linez[0][1]) >= Math.abs(Zpoint[m][1][1]-linez[0][1])){
                        var zpoint_smaller = [Zpoint[m][2][0], linez[1][1], 1];
                        var zpoint_bigger = [Zpoint[m][1][0], linez[0][1], 0];
                        var zpoint_smaller1 = [Zpoint[m][2][0], Zpoint[m][2][1], 0];
                        var zpoint_bigger1 = [Zpoint[m][1][0], Zpoint[m][1][1], 0];
                    }
                    aobianxingl.push(zpoint_bigger);
                    aobianxingl.push(zpoint_bigger1);
                    aobianxingl.push(zpoint_smaller1);
                    aobianxingl.push(zpoint_smaller);
                }

                    
            }      
            aobianxingl.push(point_smaller_bigger);

            aobianxingr.push(point_bigger);
            for(var t=0;t<zpoint_waikuo.length;t++){
                var m = zpoint_waikuo.length-t-1;
                var linez = [];
                for (var r=0;r<zpoint_waikuo[m].length;r++){
                    var out_zpoint = calcPointInLineWithY(zpoint_waikuo[m][r], zpoint_waikuo[m][sii(r + 1, zpoint_waikuo[m].length)],
                    line[2][1], line[2][0], line[3][0]);
                    if (out_zpoint){
                        linez.push(out_zpoint);
                    }
                }

                linez = linez.sort(ascend);
                if (linez.length >1){
                    if (Math.abs(Zpoint[m][0][1]-linez[0][1]) < Math.abs(Zpoint[m][1][1]-linez[0][1])){
                        var zpoint_smaller = [Zpoint[m][3][0], linez[1][1], 0];
                        var zpoint_bigger = [Zpoint[m][0][0], linez[0][1], 1];
                        var zpoint_smaller1 = [Zpoint[m][3][0], Zpoint[m][3][1], 0];
                        var zpoint_bigger1 = [Zpoint[m][0][0], Zpoint[m][0][1], 0];
                    }
                    else if(Math.abs(Zpoint[m][0][1]-linez[0][1]) >= Math.abs(Zpoint[m][1][1]-linez[0][1])){
                        var zpoint_smaller = [Zpoint[m][2][0], linez[1][1], 0];
                        var zpoint_bigger = [Zpoint[m][1][0], linez[0][1], 1];
                        var zpoint_smaller1 = [Zpoint[m][2][0], Zpoint[m][2][1], 0];
                        var zpoint_bigger1 = [Zpoint[m][1][0], Zpoint[m][1][1], 0];
                    }
                    aobianxingr.push(zpoint_smaller);
                    aobianxingr.push(zpoint_smaller1);
                    aobianxingr.push(zpoint_bigger1);
                    aobianxingr.push(zpoint_bigger);
                }

                    
            }      
            aobianxingr.push(point_bigger_smaller);
        }
           
        }

            



        

        else if(line.length==2){
            if (aobianxingl.length > 0 && aobianxingr.length > 0){
                console.log(aobianxingl)
                var averg_l = ((aobianxingl[0][0]) + (aobianxingl[1][0])) / 2;
                var averg_r = ((aobianxingr[0][0]) + (aobianxingr[1][0])) / 2;
            

                if (finaline.length >= 2){
                    var averg_p = ((finaline[finaline.length - 1][0]) + (finaline[finaline.length - 2][0])) / 2;
                }
                    
                else{
                    var averg_p = 0;
                }
                    

                if (Math.abs(averg_p - averg_l)<Math.abs(averg_p - averg_r)){
                    for(var w=0;w<aobianxingl.length;w++){
                        finaline.push(aobianxingl[w]);
                    }
                    var nearestpoints = nearesty(points, aobianxingl, 0);
                    finaline.push(nearestpoints);
                    for(var z=0;z<aobianxingr.length;z++){
                        finaline.push(aobianxingr[z]);
                    }
                    finaline.push(nearestpoints);
                }
                    


                else if (Math.abs(averg_p - averg_r)<Math.abs(averg_p - averg_l)){
                    for(var w=0;w<aobianxingr.length;w++){
                        finaline.push(aobianxingr[w]);
                    }
                    var nearestpoints = nearesty(points, aobianxingr, 1);
                    finaline.push(nearestpoints);
                    for(var z=0;z<aobianxingl.length;z++){
                        finaline.push(aobianxingl[z]);
                    }
                    finaline.push(nearestpoints);
                }
                aobianxingl = [];
                aobianxingr = [];
            }


            if( i % 2 == 0){
                var point_smaller = [line[0][0], line[0][1], 1];
                var point_bigger = [line[1][0], line[1][1], 0];

                finaline.push(point_smaller);

                for(var o=0;o<zpoint_waikuo.length;o++){
                    var linez = [];
                    for(var r=0;r<zpoint_waikuo[o].length;r++){
                        var out_zpoint = calcPointInLineWithY(zpoint_waikuo[o][r], zpoint_waikuo[o][sii(r + 1, zpoint_waikuo[o].length)],
                        line[0][1], line[0][0], line[1][0]);
                        if (out_zpoint){
                            linez.push(out_zpoint);
                        }
                            
                    }
                        
                    linez = linez.sort(ascend);
                    if (linez.length >1){
                        if (Math.abs(Zpoint[o][0][1]-linez[0][1]) < Math.abs(Zpoint[o][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[o][3][0], linez[1][1], 1];
                            var zpoint_bigger = [Zpoint[o][0][0], linez[0][1], 0];
                            var zpoint_smaller1 = [Zpoint[o][3][0], Zpoint[o][3][1], 0];
                            var zpoint_bigger1 = [Zpoint[o][0][0], Zpoint[o][0][1], 0];
                        }
                        else if(Math.abs(Zpoint[o][0][1]-linez[0][1]) >= Math.abs(Zpoint[o][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[o][2][0], linez[1][1], 1];
                            var zpoint_bigger = [Zpoint[o][1][0], linez[0][1], 0];
                            var zpoint_smaller1 = [Zpoint[o][2][0], Zpoint[o][2][1], 0];
                            var zpoint_bigger1 = [Zpoint[o][1][0], Zpoint[o][1][1], 0];
                        }
                        finaline.push(zpoint_bigger);
                        finaline.push(zpoint_bigger1);
                        finaline.push(zpoint_smaller1);
                        finaline.push(zpoint_smaller);
                    }
                }
                finaline.push(point_bigger);
            }
                
            else if(i % 2 == 1){
                var point_smaller = [line[0][0], line[0][1], 0];
                var point_bigger = [line[1][0], line[1][1], 1];
                finaline.push(point_bigger);

                for(var t=0;t<zpoint_waikuo.length;t++){
                    n = zpoint_waikuo.length -t-1;
                    var linez = [];
                    for(var r=0;r<zpoint_waikuo[n].length;r++){
                        var out_zpoint = calcPointInLineWithY(zpoint_waikuo[n][r], zpoint_waikuo[n][sii(r + 1, zpoint_waikuo[n].length)],
                        line[0][1], line[0][0], line[1][0]);
                        if (out_zpoint){
                            linez.push(out_zpoint);
                        }
                            
                    }
                        
                    linez = linez.sort(ascend);
                    if (linez.length >1){
                        if (Math.abs(Zpoint[n][0][1]-linez[0][1]) < Math.abs(Zpoint[n][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[n][0][0], linez[0][1], 1];
                            var zpoint_bigger = [Zpoint[n][3][0], linez[1][1], 0];
                            var zpoint_smaller1 = [Zpoint[n][0][0], Zpoint[n][0][1], 0];
                            var zpoint_bigger1 = [Zpoint[n][3][0], Zpoint[n][3][1], 0];
                        }
                        else if(Math.abs(Zpoint[n][0][1]-linez[0][1]) >= Math.abs(Zpoint[n][1][1]-linez[0][1])){
                            var zpoint_smaller = [Zpoint[n][1][0], linez[0][1], 1];
                            var zpoint_bigger = [Zpoint[n][2][0], linez[1][1], 0];
                            var zpoint_smaller1 = [Zpoint[n][1][0], Zpoint[n][1][1], 0];
                            var zpoint_bigger1 = [Zpoint[n][2][0], Zpoint[n][2][1], 0];
                        }
                        finaline.push(zpoint_bigger);
                        finaline.push(zpoint_bigger1);
                        finaline.push(zpoint_smaller1);
                        finaline.push(zpoint_smaller);
                    }
                }
                finaline.push(point_smaller);


            }
        

        }
               
    }
    var finaline1 = []
    finaline1 = rotation_polygon(finaline, rect, rotate);
    return finaline1;
}


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


function myrepaintentity(){

    
    for(var kk = 0;kk<bianjiepoint.length;kk++){
        viewer.entities.add({
            name : 'Green ellipsoid',
            position: Cesium.Cartesian3.fromDegrees(bianjiepoint[kk][0], bianjiepoint[kk][1], bianjiepoint[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.GREEN
            }
        });
    }

    for(var kk = 0;kk<zhangaipoint.length;kk++){
        viewer.entities.add({
            name : 'Red ellipsoid',
            position: Cesium.Cartesian3.fromDegrees(zhangaipoint[kk][0], zhangaipoint[kk][1], zhangaipoint[kk][2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.RED
            }
        });
    }

    for(var kk = 0;kk<scanline.length;kk=kk+3){
        viewer.entities.add({
            name : 'Yello ellipsoid',
            position: Cesium.Cartesian3.fromDegrees(scanline[kk], scanline[kk+1], scanline[kk+2]),
            ellipsoid : {
                radii : new Cesium.Cartesian3(1, 1, 1),
                material : Cesium.Color.YELLOW
            }
        });
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
    for (var i = 0; i < viewer.dataSources.length; i++) {
            viewer.dataSources.remove(viewer.dataSources.get(i));
            i--;
    }
    console.log('delete')
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
}
    