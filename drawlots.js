setTimeout(function () { initial() }, 500);
var drawTime = 0;
var initFinished = false;

function drawLotsInit() {
    nameList = document.getElementById("nameInputList").value.split("\n");
    store.set("LOCALnameListStorage_n23hk4ja8g4kjs", nameList);

    for (var j = nameList.length - 1; j >= 0; j--) {
        swap(j, randomNum(0, j), nameList);
    }

    drawTime = 0;
    initFinished = true;
}

function initial() {
    document.getElementById("nameButton").addEventListener("click", drawLots);
    document.getElementById("saveButton").addEventListener("click", drawLotsInit);

    if (notIE()) {
        if (store.get("LOCALnameListStorage_n23hk4ja8g4kjs") != null) {
            document.getElementById("nameInputList").value = store.get("LOCALnameListStorage_n23hk4ja8g4kjs").toString().replace(/,/g, "\n");
        }
    }
}

function drawLots() {
    if (!initFinished) {
        drawLotsInit();
    }
    var target = nameList[drawTime];
    while (target === "") {
        drawTime++;
        target = nameList[drawTime];
    }

    if (target === undefined) {
        target = "全部抽完"
    }

    document.getElementById("nameBox").innerHTML = target;
    drawTime++;
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

function swap(index1, index2, arrayList) {
    if (notIE()) [arrayList[index1], arrayList[index2]] = [arrayList[index2], arrayList[index1]];
    else {
        var tmp = arrayList[index1];
        arrayList[index1] = arrayList[index2];
        arrayList[index2] = tmp;
    }
}


function notIE() { //ie?
    return !(!!window.ActiveXObject || "ActiveXObject" in window)
}