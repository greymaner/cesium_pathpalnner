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
            }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
            handler.setInputAction(function(wheelment){
                try{
                    if (pointDraged.id) {
                        viewer.scene.screenSpaceCameraController.enableZoom = false;//锁定相机
                    }
                    else{
                        viewer.scene.screenSpaceCameraController.enableZoom = true;
                    }
                }
                catch(err){
                    viewer.scene.screenSpaceCameraController.enableZoom = true;
                }
                
                
                if(pointDraged.id.name.substring(0,5) =="Green"){
                    var numArr = pointDraged.id.name.match(/\d+/g)
                    num = parseInt(numArr)
                    console.log(num)
                    
                    heightpp = parseInt(wheelment)/100
                    scanline[num+2] += heightpp
                    myrepaint()
                    myrepaintentity()
                }
                if(pointDraged.id.name.substring(0,5) =="Yello"){
                    var numArr = pointDraged.id.name.match(/\d+/g)
                    num = parseInt(numArr)
                    console.log(num)
                    
                    heightpp = parseInt(wheelment)/100
                    bianjiepoint[num][2] += heightpp
                    fuzhuo()
                    myrepaint()
                    myrepaintentity()
                }
                if(pointDraged.id.name.substring(0,5) =="Black"){
                    var numArr = pointDraged.id.name.match(/\d+/g)
                    num = parseInt(numArr)
                    console.log(num)
                    
                    heightpp = parseInt(wheelment)/100
                    zhangaipoint[num][2] += heightpp
                    fuzhuo()
                    myrepaint()
                    myrepaintentity()
                }
                if(pointDraged.id.name.substring(0,5) =="jixia"){
                    var numArr = pointDraged.id.name.match(/\d+/g)
                    num = parseInt(numArr)
                    console.log(num)
                    
                    heightpp = parseInt(wheelment)/100
                    jixian[num][2] += heightpp
                    calculate_zhexian()
                    myrepaint()
                    myrepaintentity()
                }
                if(pointDraged.id.name.substring(0,5) =="zhunx"){
                    var numArr = pointDraged.id.name.match(/\d+/g)
                    num = parseInt(numArr)
                    console.log(num)
                    
                    heightpp = parseInt(wheelment)/100
                    zhunxian[num][2] += heightpp
                    calculate_zhexian()
                    myrepaint()
                    myrepaintentity()
                }
                if(pointDraged.id.name.substring(0,5) =="xiush"){
                    
                    myrepaint()
                    myrepaintentity()
                }

            },Cesium.ScreenSpaceEventType.WHEEL);

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
                        var pp1point = [point[0], point[1], point[2]]
                        bianjiepoint[num] = pp1point
                        wallpoint[num*3] = point[0]
                        wallpoint[num*3+1] = point[1]
                        wallpoint[num*3+2] = point[2]+heightplus
                        fuzhuo()
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
                        var pp1point = [point[0], point[1], point[2]]
                        zhangaipoint[num] = pp1point
                        zhangaiwall[num*3] = point[0]
                        zhangaiwall[num*3+1] = point[1]
                        zhangaiwall[num*3+2] = point[2]+heightplus
                        fuzhuo()
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
                    if(pointDraged.id.name.substring(0,5) =="jixia"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        var pp1point = [point[0], point[1], point[2]]
                        jixian[num] = pp1point
                        jixianwall[num*3] = point[0]
                        jixianwall[num*3+1] = point[1]
                        jixianwall[num*3+2] = point[2]+heightplus
                        calculate_zhexian()
                        myrepaint()
                        myrepaintentity()
                    }
                    if(pointDraged.id.name.substring(0,5) =="zhunx"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        var pp1point = [point[0], point[1], point[2]]
                        zhunxian[num] = pp1point
                        zhunxianwall[num*3] = point[0]
                        zhunxianwall[num*3+1] = point[1]
                        zhunxianwall[num*3+2] = point[2]+heightplus
                        calculate_zhexian()
                        myrepaint()
                        myrepaintentity()
                    }
                    if(pointDraged.id.name.substring(0,5) =="xiush"){
                        var numArr = pointDraged.id.name.match(/\d+/g)
                        num = parseInt(numArr)
                        console.log(num)
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
                        var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
                        var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度
                        var height = cartographic.height;//模型高度
                        var point = [lng,lat,height];
                        var pp1point = [point[0], point[1], point[2]]
                        xiushi[num] = pp1point
                        
                        calculate_zhexian()
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

