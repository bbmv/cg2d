/**
 * Two-Dimensional Computer Graphics Library
 * cg2d.js (c) 2017 Boris Buimov
 * 
 * @version 1.1.0
 * @author Boris Buimov
 * @fileoverview This file contains three classes 
 * to work with elements of computer graphics - objects, transformations matrices and a scene.
 */
/**
 * @namespace
 * @name cg2d
 * @return {object} An interface 
 */
var cg2d = (function() {

  var Matrix = lalgebra.Matrix;
  var errMsg = lalgebra.errMsg;
  var check2dArray = lalgebra.check2dArray;

  /**
   * Creates an object.
   * 
   * @memberof cg2d
   * @constructor
   * @this {Object2d}
   * @param {Array} vertices An array of elements for the Matrix.
   * @param {Array} edges An array of edges of the object.
   * @param {object} settings An object with properties of segments, points and captions.
   */
  function Object2d(vertices, edges, settings) {
    var cols = 0;
    var obj = new Matrix(vertices);

    if(obj.getCols()!==3) {
      throw errMsg("Matrix of the two-dimensional object should have three columns!", "cg-ob-001");
    }
    if(check2dArray(edges)) cols = edges[0].length;

    if(cols!==2) {
      throw errMsg("Matrix of edges should have two columns!", "cg-ob-002");
    }
    if(!(settings["segments"] && settings["points"] && settings["captions"])) {
      throw errMsg("Settings should have three properties: segments, points and captions!", "cg-ob-003");
    }
    /**
     * Copies the object.
     *
     * @memberof cg2d.Object2d
     * @return {Object2d} A copy of the object
     */
    this.getCopy = function() { 
      var els = obj.getElems();
      return new Object2d(els, edges, settings);
      //JSON.parse(JSON.stringify(edges)), JSON.parse(JSON.stringify(settings))
    };
    /**
     * Gets elements of the object matrix.
     *
     * @memberof cg2d.Object2d
     * @return {Array} An array of the object matrix
     */
    this.getElems = function() { 
      return obj.getElems();
    };
    /**
     * Applies a transformation to the object.
     *
     * @memberof cg2d.Object2d
     * @param {Transform2d} tMx Contains a matrix of the transformation.
     */
    this.applyTransformation = function(tMx) { 
      if(tMx instanceof Transform2d) { 
        obj = obj.multiply(tMx.getMatrix()).normolize();
      }
    };
    /**
     * Displays the array elements into columns like in matrixes.
     * @memberof cg2d.Object2d
     */
    this.trace = function() { obj.trace(); };
    /**
     * Returns coordinates of the object edges and their visual settings.
     *
     * @memberof cg2d.Object2d
     * @return {object} An object contains coordinates of the edges, their width and color.
     */
    this.getSegments = function() {
      var coords = [];
      var tmpArr = obj.getElems();

      var amountEdges = edges.length;
      var p1, p2;

      for(var i=0; i<amountEdges; i+=1) {
        p1 = tmpArr[edges[i][0]].slice(0, -1);
        p2 = tmpArr[edges[i][1]].slice(0, -1);
        coords.push({
          "p1":{"x":p1[0], "y":p1[1]},  
          "p2":{"x":p2[0], "y":p2[1]}
        });
      }
      return {
        "coords": coords,
        "width": settings.segments.width,
        "color": settings.segments.color
      };
    };
    /**
     * Returns coordinates of the object verteces and their visual settings.
     *
     * @memberof cg2d.Object2d
     * @return {object} An object contains coordinates of the verteces, their width and color.
     */
    this.getPoints = function() {
      var coords = [];
      var tmpArr = obj.getElems();
      var rows = obj.getRows();
      var cols = obj.getCols();
      var p;

      for(var i=0; i<rows; i+=1) {
        p = tmpArr[i].slice(0, -1);
        coords.push({"x":p[0], "y":p[1]});
      }
      return {
        "coords": coords,
        "width": settings.points.width,
        "color": settings.points.color
      };
    };
    /**
     * Returns captions of the verteces and their visual settings.
     *
     * @memberof cg2d.Object2d
     * @return {object} An object contains coordinates of the verteces, their texts, font and color.
     */
    this.getCaptions = function() {
      var coords = this.getPoints().coords;

      return {
        "coords": coords,
        "texts": settings.captions.texts || [],
        "font": settings.captions.font,
        "color": settings.captions.color
      };
    };
  }  
  //==================================================================================
  /**
   * Creates a matrix of combined transformations.
   * 
   * @memberof cg2d
   * @constructor
   * @this {Transform2d}
   * @param {Array} els An array of elements for the transformation Matrix
   */
  function Transform2d(els) {
    var elements = els ||  [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
    var tMx = new Matrix(elements);
    /**
     * Displays the array elements into columns like in matrixes.
     * @memberof cg2d.Transform2d
     */
    this.trace = function() { tMx.trace(); };
    /**
     * Returns a copy of the transformation Matrix.
     *
     * @memberof cg2d.Transform2d
     * @return {Matrix} A copy of the transformation Matrix
     */
    this.getMatrix = function() { return tMx.getCopy(); };
    /**
     * Gets elements of the transformation Matrix.
     *
     * @memberof cg2d.Transform2d
     * @return {Array} An array of the transformation Matrix
     */
    this.getElems = function() { return tMx.getElems(); };
    /**
     * Multiplies the matrix of combined transformations by shearing matrix.
     *
     * @memberof cg2d.Transform2d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.shear = function(axis, v) {
      var tmpArr; 
      
      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "x": tmpArr = [[ 1,0,0 ],
                            [ v,1,0 ],
                            [ 0,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,v,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
        break;
        default:  tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
      }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };    
    /**
     * Multiplies the matrix of combined transformations by translation matrix.
     *
     * @memberof cg2d.Transform2d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.move = function(axis, v) {
      var tmpArr; 
      
      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "x": tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ v,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,v,1 ]];
        break;
        default:  tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
      }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };    
    /**
     * Multiplies the matrix of combined transformations by rotation matrix.
     *
     * @memberof cg2d.Transform2d
     * @param {number} angle An angle of rotation.
     */
    this.rotate = function(angle) {
      var tmpArr; 
      var a;

      angle = parseFloat(angle);
      if(isNaN(angle)) 
        tmpArr = [[ 1,0,0 ],
                  [ 0,1,0 ],
                  [ 0,0,1 ]];
      else {
        a = lalgebra.degreeToRadian(angle);
        tmpArr = [[ Math.cos(a), Math.sin(a), 0],
                  [-Math.sin(a), Math.cos(a), 0],
                  [ 0,           0,           1]];
      }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };
    /**
     * Multiplies the matrix of combined transformations by arbitary rotation matrix.
     *
     * @memberof cg2d.Transform2d
     * @param {object} point The arbitary point.
     * @param {number} angle An angle of rotation.
     */
    this.rotateFree = function(point, angle) {
      var p = {};

      if(!(point.x && point.y)) {
        p = { x:0, y:0 };
      }
      else {
        p.x = point.x;
        p.y = point.y;
      }
      angle = parseFloat(angle);
      if(isNaN(angle)) angle = 0;
      a = lalgebra.degreeToRadian(angle);

      this.move("x", -p.x);
      this.move("y", -p.y);
      this.rotate(a);
      this.move("x", p.x);
      this.move("y", p.y);
    }
    /**
     * Multiplies the matrix of combined transformations by scaling matrix.
     *
     * @memberof cg2d.Transform2d
     * @param {string} axis A name of axis.
     * @param {number} v A value of the transformation.
     */
    this.scale = function(axis, v) {
      var tmpArr; 

      v = parseFloat(v);
      if(isNaN(v)) axis = "n"; // function will return a unity martix

      switch(axis.toLowerCase())
      {
        case "x": tmpArr = [[ v,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
        break;
        case "y": tmpArr = [[ 1,0,0 ],
                            [ 0,v,0 ],
                            [ 0,0,1 ]];
        break;
        case "s": tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,v ]];
        break;
        default:  tmpArr = [[ 1,0,0 ],
                            [ 0,1,0 ],
                            [ 0,0,1 ]];
     }
      var transform = new Matrix(tmpArr);
      tMx = tMx.multiply(transform);
    };
  }
  //==================================================================================
  /**
   * Creates a scene with three-dimensional objects.
   * 
   * @memberof cg2d
   * @constructor
   * @this {Scene2d}
   * @param {CanvasRenderingContext2D} ctx Two-dimensional context.
   * @param {object} center A center of the canvas.
   * @param {number} scale A koefficient of scaling.
   */
  function Scene2d(ctx, center, scale) {
    var objects = [];
    var space = new Transform2d;

    if(!(ctx instanceof CanvasRenderingContext2D))
      throw errMsg("Problem with a canvas context!", "cg-sc-001");

    center = center || {"x":0, "y":0};

    setSpace();
    /**
     * Creates a transformation matrix to convert object coordinates into the screen coordinates.
     */
    function setSpace() {
      space = new Transform2d;

      space.scale("y", -1);
      space.scale("s", 1/scale);
      space.move("x", center.x);
      space.move("y", center.y);
    }
    /**
     * Removes one or more objects from the object array of the scene.
     * 
     * @memberof cg2d.Scene2d
     * @param {number} idx An index of the object.
     */
    this.clearObjects = function(idx) {
      idx = parseInt(idx);
      if(isNaN(idx)) objects.splice(0);
      else objects.splice(idx, 1);
    }
    /**
     * Adds an object to the object array of the scene.
     * 
     * @memberof cg2d.Scene2d
     * @param {Object2d} obj An three-dimensional object.
     */
    this.addObject = function(obj) {
      objects.push(obj);
    }
    /**
     * Displays the objects of the scene.
     * 
     * @memberof cg2d.Scene2d
     */
    this.draw = function() {
      var obj, o;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for(var i=0, count=objects.length; i<count; i+=1) {
        obj = objects[i].getCopy();
        obj.applyTransformation(space);

        drawSegments(obj.getSegments());
        drawPoints(obj.getPoints());
        drawCaptions(obj.getCaptions());
      }
    }
    /**
     * Displays the object edges.
     *
     * @memberof cg2d.Scene2d
     */
    function drawSegments(segments) {
      var p1, p2;
      var coords = segments.coords;

      ctx.beginPath();
      for(var i=0, count=coords.length; i<count; i+=1) {
        p1 = coords[i].p1;
        p2 = coords[i].p2;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = segments.color;
      ctx.lineWidth = segments.width;
      ctx.stroke();
    }
    /**
     * Displays the object verteces.
     *
     * @memberof cg2d.Scene2d
     */
    function drawPoints(points) {
      var p;
      var coords = points.coords;
      var radius = points.width/2;

      ctx.fillStyle = points.color;
      for(var i=0, count=coords.length; i<count; i+=1) {
        p = coords[i];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, radius, 0, Math.PI*2, true);
        ctx.fill();
      }
    }
    /**
     * Displays the captions of the verteces.
     *
     * @memberof cg2d.Scene2d
     */
    function drawCaptions(captions) {
      var p;
      var coords = captions.coords;
      var texts = captions.texts;
      ctx.font = captions.font;
      ctx.fillStyle = captions.color;
      ctx.textBaseline = "top";

      var count = (texts.length < coords.length)? texts.length : coords.length;
      for(var i=0; i<count; i+=1) {
        p = coords[i];
        ctx.beginPath();
        ctx.fillText(texts[i], p.x+2, p.y+2);
        ctx.fill();
      }
    }
  }
  //==================================================================================
  return { // An API of cg2d
    "Object2d": Object2d,
    "Transform2d": Transform2d,
    "Scene2d": Scene2d
  }
}());
