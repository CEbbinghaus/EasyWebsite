"use strict";
var names = ["World", "Chief", "There", "Cloud", "Array", "Brand", "Cycle"];
var $ = document.querySelector.bind(document);
var DeltaTime = 0;
var LastTime = Date.now();
function lerp(a, b, t) {
    return a + (b - a) * t;
}
window.onload = function () {
    var element = $("#MainMessage");
    if (element === null)
        throw "Could not find Main message";
    var message = element;
    var msgBlueprint = message.innerHTML;
    var index = 0;
    var fromMsg = "";
    var msg = "";
    var toMsg = "";
    var replaceMessage = function () {
        if (msg === "" && toMsg === "")
            fromMsg = toMsg = names[index];
        else {
            fromMsg = toMsg;
            toMsg = names[index];
        }
        index = ++index % names.length;
    };
    var resetTime = 5;
    var timeout = resetTime;
    function Animate() {
        //Calculate Delta time for Time specific Applications
        var CurrentTime = Date.now();
        DeltaTime = (CurrentTime - LastTime) / 1000;
        LastTime = CurrentTime;
        console.log("Current Delta time is: " + DeltaTime);
        if (timeout >= resetTime) {
            replaceMessage();
            timeout = 0;
        }
        if (fromMsg.length != toMsg.length)
            throw "Words are Different Sizes";
        if (timeout <= 2) {
            var a = fromMsg.split("").map(function (v) { return v.charCodeAt(0); });
            var b = toMsg.split("").map(function (v) { return v.charCodeAt(0); });
            var res = [];
            for (var i = 0; i < a.length; ++i) {
                var value = lerp(a[i], b[i], timeout / 2);
                res.push(String.fromCharCode(Math.round(value)));
            }
            msg = res.join("");
            message.innerHTML = msgBlueprint.replace("{{N}}", msg);
        }
        else {
            message.innerHTML = msgBlueprint.replace("{{N}}", toMsg);
        }
        timeout += DeltaTime;
        window.requestAnimationFrame(Animate);
    }
    window.requestAnimationFrame(Animate);
};
