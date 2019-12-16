var MoveEntity = (
    function () {
        var leftDownFlag = false;
        var pointDraged = null;
        var viewer;
        var handler;
        function ConstructMoveEntity(options) {
            viewer = options.viewer;
            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            Init();
        }
        function Init() {
            // Select plane when mouse down
            handler.setInputAction(function (movement) {
                pointDraged = viewer.scene.pick(movement.position);//选取当前的entity 
                if(pointDraged.id){
                    console.log(pointDraged.id.name)

                }
                leftDownFlag = true;
                if (pointDraged.id) {
                    viewer.scene.screenSpaceCameraController.enableRotate = false;//锁定相机
                }
                else if(pointDraged.id == null){
                    viewer.scene.screenSpaceCameraController.enableRotate = true;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            // Release plane on mouse up
            handler.setInputAction(function (movement) {
                if (leftDownFlag === true && pointDraged.id != null) {
                    // let ray = viewer.camera.getPickRay(movement.endPosition);
                    let cartesian = viewer.scene.pickPosition(movement.position);
                    if(pointDraged.id.name.substring(0,5) =="Yello"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        var pp1point = [point[0], point[1], point[2]+heightplus]
                        bianjiepoint[num] = pp1point
                        wallpoint[num*3] = point[0]
                        wallpoint[num*3+1] = point[1]
                        wallpoint[num*3+2] = point[2]+heightplus
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
                    if(pointDraged.id.name.substring(0,5) =="Black"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        var pp1point = [point[0], point[1], point[2]+heightplus]
                        zhangaipoint[num] = pp1point
                        zhangaiwall[num*3] = point[0]
                        zhangaiwall[num*3+1] = point[1]
                        zhangaiwall[num*3+2] = point[2]+heightplus
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
                    if(pointDraged.id.name.substring(0,5) =="Green"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        scanline[num] = point[0]
                        scanline[num+1] = point[1]
                        scanline[num+2] = point[2]+heightplus
                        myrepaint()
                        myrepaintentity()
                }
            }

                leftDownFlag = false;
                pointDraged = null;
                viewer.scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
            // Update plane on mouse move
            handler.setInputAction(function (movement) {
                if (leftDownFlag === true && pointDraged.id != null) {
                    // let ray = viewer.camera.getPickRay(movement.endPosition);
                    let cartesian = viewer.scene.pickPosition(movement.endPosition);
                    
                    
                    


                    // console.log(cartesian);
                    pointDraged.id.position = new Cesium.CallbackProperty(function () {
                        return cartesian;
                    }, false);//防止闪烁，在移动的过程
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
        return ConstructMoveEntity;
    })();
