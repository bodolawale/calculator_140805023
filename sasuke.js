inputs = new Array;
output = new Array;
oparray = new Array;
var totalString;
var temp;
var operands = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operators = ["+", "-", "/", "*"];
var operands2 = ["."];
var kakashi = {
    "+": { "precedence": 2, "ass": "left", "uniary": false, "function": function(a, b) { return (a + b); } },
    "-": { "precedence": 2, "ass": "left", "uniary": false, "function": function(a, b) { return (a - b); } },
    "*": { "precedence": 3, "ass": "left", "uniary": false, "function": function(a, b) { return (a * b); } },
    "/": { "precedence": 3, "ass": "left", "uniary": false, "function": function(a, b) { return (a / b); } },
    "^": { "precedence": 4, "ass": "right", "uniary": false, "function": function(a, b) { return Math.pow(a, b); } },
    "(": { "precedence": 0, "ass": "left", "uniary": false, },
    ")": { "precedence": -1, "ass": "left", "uniary": false, }

}
$(document).ready(function() {
    $(".num").click(function() {
        if (inputs.length == 0) {
            inputs.push((this.id));
        } else if (!isNaN(Number(inputs[inputs.length - 1]))) {
            temp = inputs.pop();
            temp = temp + this.id;
            inputs.push(temp);
        } else if ((inputs[inputs.length - 1]) === ".") {

        } else {
            inputs.push(this.id);
        }
        update();
    });
    $(".po").click(function() {
        inputs.push(this.id);
        update();
    });
    $(".leftb").click(function() {
        inputs.push(this.id);
        update();
    });
    $(".rightb").click(function() {
        inputs.push(this.id);
        update();
    });
    $(".sin").click(function() {
        var a = inputs[inputs.length - 1];
        if (!isNaN(Number(a))) {
            inputs.pop();
            inputs.push(Math.sin(Number(a)).toString());
        }
        update();
    });
    $(".cos").click(function() {
        var a = inputs[inputs.length - 1];
        if (!isNaN(Number(a))) {
            inputs.pop();
            inputs.push(Math.cos(Number(a)).toString());
        }
        update();
    });
    $(".tan").click(function() {
        var a = inputs[inputs.length - 1];
        if (!isNaN(Number(a))) {
            inputs.pop();
            inputs.push(Math.tan(Number(a)).toString());
        }
        update();
    });
    $(".log").click(function() {
        var a = inputs[inputs.length - 1];
        if (!isNaN(Number(a))) {
            inputs.pop();
            inputs.push(Math.log(Number(a)).toString());
        }
        update();
    });
    $(".c").click(function() {
        inputs = [];
        update();
    });
    $(".root").click(function() {
        var a = inputs[inputs.length - 1];
        if (!isNaN(Number(a))) {
            inputs.pop();
            inputs.push(Math.sqrt(Number(a)).toString());
        }
        update();
    });
    $(".fact").click(function() {
        try {
            var a = inputs[inputs.length - 1];
            if (!isNaN(Number(a))) {
                inputs.pop();
                inputs.push(fact(Number(a)).toString());
            }
            update();
        } catch (error) {
            alert(error);
            inputs = [];
            update();
        }

    });
    $(".pi").click(function() {
        var a = inputs[inputs.length - 1];
        if (inputs.length < 1) {
            inputs.push(Math.PI.toString());
        } else if (!isNaN(Number((a)) || (a === ")") || (a == "."))) {
            inputs.push("*");
            inputs.push(Math.PI.toString());
        } else {
            inputs.push(Math.PI.toString());
        }
        update();
    });
    $(".E").click(function() {
        var a = inputs[inputs.length - 1];
        if (inputs.length < 1) {
            inputs.push(Math.E.toString());
        } else if (!isNaN(Number((a)) || (a === ")") || (a == "."))) {
            inputs.push("*");
            inputs.push(Math.E.toString());
        } else {
            inputs.push(Math.E.toString());
        }
        update();
    });
    $(".point").click(function() {
        if ((!isNaN(Number(inputs[inputs.length - 1]))) && (inputs[inputs.length - 1].indexOf(".") == -1)) {
            temp = inputs.pop();
            temp = temp + this.id;
            inputs.push(temp);
        }
        update();
    });
    $(".operand").click(function() {
        var a = inputs[inputs.length - 1];
        if (this.id === "-" || this.id === "+") {
            inputs.push(this.id);
        } else if (!isNaN(Number(a))) {
            inputs.push(this.id);
        }
        update();
    });
    $(".clear").click(function() {
        if (inputs.length != 0) {
            a = inputs[inputs.length - 1];
            if (operators.includes(a)) {
                inputs.pop();
            } else {
                a = inputs[inputs.length - 1].substring(0, inputs[inputs.length - 1].length - 1);
                if (a == "") {
                    inputs.pop();
                } else {
                    inputs.pop();
                    inputs.push(a);
                }
            }
        }
        update();
    });


    $(".equ").click(function() {
        start();
    });

    function start() {
        try {
            posfix();
            var bod = finalsolve(output);
            output = [];
            if (isNaN(bod)) {
                throw "Error";
            }
            if (bod == "Infinity") {
                throw ("Divisor by 0");
            }
            inputs = [bod];
            update();
        } catch (error) {
            alert(error);
            inputs = [];
            update();
        }
    }

    function update() {
        totalString = inputs.join("");
        $("#ans").html(totalString);
    }

    function fact(n) {
        if (!isNaN(Number(n)) && (operands2.includes("."))) {
            if (Number(n) == 1 || Number(n) == 0) {
                return 1;
            } else {
                return (fact(Number(n - 1)) * (Number(n)));
            }
        } else {
            throw "fact error"
        }
    }

    function posfix() {
        var peek;
        for (var i = 0; i < inputs.length; i++) {
            if (!isNaN(Number(inputs[i]))) {
                output.push(inputs[i]);
            } else if (inputs[i] == "(") {
                if (!isNaN(inputs[i - 1])) {
                    oparray.push("*")
                    oparray.push(inputs[i])
                } else {
                    oparray.push(inputs[i]);
                }
            } else if (inputs[i] == ")") {
                while (oparray[oparray.length - 1] != "(") {
                    if (oparray[oparray.length - 1] != undefined) {
                        output.push(oparray.pop());
                    } else {
                        throw 0;
                    }
                }
                oparray.pop();
            } else if (isNaN(Number(inputs[i]))) {

                if (oparray[oparray.length - 1] == undefined) {
                    oparray.push(inputs[i]);
                } else {

                    peek = oparray[oparray.length - 1];

                    if ((((kakashi[peek].precedence) > (kakashi[inputs[i]].precedence)) ||
                            ((kakashi[peek].precedence) == (kakashi[inputs[i]].precedence)) && kakashi[peek].ass == "left") &&
                        (peek != "(")) {
                        output.push(oparray.pop());
                        oparray.push(inputs[i]);
                    } else {
                        oparray.push(inputs[i]);
                    }
                }
            }

        }
        while (oparray.length > 0) {
            if (oparray[oparray.length - 1] == "(") {
                throw "Syntax Error"
            }
            output.push(oparray.pop());
        }
        var finalans = finalsolve(output);
        inputs[finalans];
        update();
    }

    function finalsolve(finale) {
        var final = Array();
        for (var i = 0; i < finale.length; i++) {
            var token = finale[i];
            if (!isNaN(token)) {
                final.push(token);
            } else {
                if (kakashi[token].uniary) {
                    var e = Number(final.pop());
                    final.push(kakashi[token].function(e).toString());
                } else {
                    var b = Number(final.pop());
                    var a = Number(final.pop());
                    final.push(kakashi[token].function(a, b).toString());
                }
            }
        }
        if (final.length > 1) {
            output = [];
            throw "error";
        }
        return final[0];
    }
});