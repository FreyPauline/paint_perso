/*jslint browser: true, node: true */
/*global */
"use strict";
var elements = {
    canvas : document.getElementById("canvas"),
    context : this.canvas.getContext('2d'),
    actFunc : "paint",
    writingInput : document.getElementById("text"),
    colorInput : document.getElementById("color"),
    sizeInput : document.getElementById("ligne_size"),
    usingInput : document.getElementById("usingChoice"),

    painting : function () {
        var paint = false,
            color = document.getElementById("color").value,
            start = false,
            cursX,
            cursY,
            that = this,
            line = document.getElementById("ligne_size").value;

        that.context.lineJoin = 'round';
        that.context.lineCap = 'round';

        that.colorInput.onchange = function () {
            color = that.colorInput.value;
        };

        that.sizeInput.onchange = function () {
            line = that.sizeInput.value;
        };

        this.canvas.onmousedown = function (e) {
            cursX = (e.pageX - this.offsetLeft);
            cursY = (e.pageY - this.offsetTop);
            that.context.strokeStyle = color;
            that.context.lineWidth = line;
            that.context.strokeRect(cursX, cursY, 1, 1);
            paint = true;
        };

        this.canvas.onmouseup = function () {
            paint = false;
            start = false;
        };

        this.canvas.onmousemove = function (e) {

            if (paint) {
                cursX = (e.pageX - this.offsetLeft);
                cursY = (e.pageY - this.offsetTop);

                if (!start) {
                    that.context.beginPath();
                    that.context.moveTo(cursX, cursY);
                    start = true;
                } else {
                    that.context.lineTo(cursX, cursY);
                    that.context.strokeStyle = color;
                    that.context.lineWidth = line;
                    that.context.stroke();
                }
            }
        };
    },

    rectan : function () {
        var color = document.getElementById("color").value,
            cursX,
            cursY,
            endCursX,
            endCursY,
            that = this,
            line = document.getElementById("ligne_size").value;

        that.colorInput.onchange = function () {
            color = that.colorInput.value;
        };

        that.sizeInput.onchange = function () {
            line = that.sizeInput.value;
        };

        this.canvas.onmousedown = function (e) {
            cursX = (e.pageX - this.offsetLeft);
            cursY = (e.pageY - this.offsetTop);
        };

        this.canvas.onmouseup = function (e) {
            endCursX = (e.pageX - this.offsetLeft);
            endCursY = (e.pageY - this.offsetTop);
            that.context.strokeStyle = color;
            that.context.lineWidth = line;
            that.context.strokeRect(cursX, cursY, endCursX - cursX, endCursY - cursY);
        };
    },

    circle : function () {
        var color = document.getElementById("color").value,
            cursX,
            cursY,
            endCursX,
            endCursY,
            tmp1,
            tmp2,
            tmp,
            that = this,
            line = document.getElementById("ligne_size").value;

        that.colorInput.onchange = function () {
            color = that.colorInput.value;
        };

        that.sizeInput.onchange = function () {
            line = that.sizeInput.value;
        };

        this.canvas.onmousedown = function (e) {
            cursX = (e.pageX - this.offsetLeft);
            cursY = (e.pageY - this.offsetTop);
        };

        this.canvas.onmouseup = function (e) {
            endCursX = (e.pageX - this.offsetLeft);
            endCursY = (e.pageY - this.offsetTop);
            tmp1 = endCursX - cursX;
            tmp2 = endCursY - cursY;
            tmp = Math.sqrt(Math.pow(tmp1, 2) + Math.pow(tmp2, 2));
            that.context.beginPath();
            that.context.strokeStyle = color;
            that.context.lineWidth = line;
            that.context.arc(cursX, cursY, tmp, 0, 2 * Math.PI, false);
            that.context.stroke();
            that.context.closePath();
        };
    },

    ligne : function () {
        var color = document.getElementById("color").value,
            cursX,
            cursY,
            endCursX,
            endCursY,
            that = this,
            line = document.getElementById("ligne_size").value;
        that.context.lineJoin = 'round';
        that.context.lineCap = 'round';

        that.colorInput.onchange = function () {
            color = that.colorInput.value;
        };

        that.sizeInput.onchange = function () {
            line = that.sizeInput.value;
        };

        this.canvas.onmousedown = function (e) {
            cursX = (e.pageX - this.offsetLeft);
            cursY = (e.pageY - this.offsetTop);
            that.context.beginPath();
            that.context.moveTo(cursX, cursY);
        };

        this.canvas.onmouseup = function (e) {
            endCursX = (e.pageX - this.offsetLeft);
            endCursY = (e.pageY - this.offsetTop);
            that.context.strokeStyle = color;
            that.context.lineTo(endCursX, endCursY);
            that.context.lineWidth = line;
            that.context.stroke();
        };
    },

    stopSubmit : function (evt) {
        evt.preventDefault();
    },

    textFunc : function () {
        var that = this,
            cursY,
            cursX,
            color = document.getElementById("color").value,
            line = document.getElementById("ligne_size").value,
            texte = document.getElementById("text").value,
            police = document.getElementById("policeChoice").value;

        that.sizeInput.onchange = function () {
            line = that.sizeInput.value;
        };

        that.colorInput.onchange = function () {
            color = that.colorInput.value;
        };
        that.writingInput.onchange = function () {
            texte = that.writingInput.value;
        };
        this.canvas.onmousedown = function (e) {
            cursX = (e.pageX - this.offsetLeft);
            cursY = (e.pageY - this.offsetTop);
            that.context.font = line + "px " + police;
            that.context.fillStyle = color;
            that.context.fillText(texte, cursX, cursY);
        };

        this.canvas.onmouseup = null;
    },

    using : function () {
        this.painting();
        var that = this,
            link = document.getElementById('download');
        document.getElementById("clear").addEventListener("click", that.stopSubmit);
        document.getElementById("clear").addEventListener("click", function () {
            that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
        });

        link.addEventListener('click', function () {
            var dataURL = that.canvas.toDataURL('image/png');
            link.href = dataURL;
        }, false);

        this.usingInput.onchange = function () {
            var acti = this.value;
            if (acti === "paint") {
                that.painting();
                that.actFunc = "paint";
            }
            if (acti === "rect") {
                that.rectan();
                that.actFunc = "rect";
            }
            if (acti === "cercle") {
                that.circle();
                that.actFunc = "cercle";
            }
            if (acti === "ligne") {
                that.ligne();
                that.actFunc = "ligne";
            }
            if (acti === "texte") {
                that.textFunc();
                that.actFunc = "texte";
            }
        };
    }

};

elements.using();