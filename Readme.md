## 2-D Computer Graphics Library
cg2d.js (c) 2017 Boris Buimov

version 1.1.0

This library contains three classes to work with two-dimensional elements of computer graphics - objects, transformations matrices and a scene (With a JSDoc documentation).

#### API

``` cg2d.Object2d(vertices, edges, settings) ```
\- *Creates an object.*

``` cg2d.Object2d.applyTransformation(tMx) ```
\- *Applies a transformation to the object.*

``` cg2d.Object2d.getCaptions() ```
\- *Returns captions of the verteces and their visual settings.*

``` cg2d.Object2d.getCopy() ```
\- *Copies the object.*

``` cg2d.Object2d.getElems() ```
\- *Gets elements of the object matrix.*

``` cg2d.Object2d.getPoints() ```
\- *Returns coordinates of the object verteces and their visual settings.*

``` cg2d.Object2d.getSegments() ```
\- *Returns coordinates of the object edges and their visual settings.*

``` cg2d.Object2d.trace() ```
\- *Displays the array elements into columns like in matrixes.*

``` cg2d.Transform2d(els) ```
\- *Creates a matrix of combined transformations.*

``` cg2d.Transform2d.getElems() ```
\- *Gets elements of the transformation Matrix.*

``` cg2d.Transform2d.getMatrix() ```
\- *Returns a copy of the transformation Matrix.*

``` cg2d.Transform2d.move(axis, v) ```
\- *Multiplies the matrix of combined transformations by translation matrix.*

``` cg2d.Transform2d.rotate(angle) ```
\- *Multiplies the matrix of combined transformations by rotation matrix.*

``` cg2d.Transform2d.rotateFree(point, angle) ```
\- *Multiplies the matrix of combined transformations by arbitary rotation matrix.*

``` cg2d.Transform2d.scale(axis, v) ```
\- *Multiplies the matrix of combined transformations by scaling matrix.*

``` cg2d.Transform2d.shear(axis, v) ```
\- *Multiplies the matrix of combined transformations by shearing matrix.*

``` cg2d.Transform2d.trace() ```
\- *Displays the array elements into columns like in matrixes.*
 	
``` cg2d.Scene2d(ctx, center, scale) ```
\- *Creates a scene with three-dimensional objects.*

``` cg2d.Scene2d.addObject(obj) ```
\- *Adds an object to the object array of the scene.*

``` cg2d.Scene2d.clearObjects(idx) ```
\- *Removes one or more objects from the object array of the scene.*

``` cg2d.Scene2d.draw() ```
\- *Displays the objects of the scene.*

``` cg2d.Scene2d.drawCaptions(captions) ```
\- *Displays the captions of the verteces.*

``` cg2d.Scene2d.drawPoints(points) ```
\- *Displays the object verteces.*

``` cg2d.Scene2d.drawSegments(segments) ```
\- *Displays the object edges.*

``` setSpace() ```
\- *Creates a transformation matrix to convert object coordinates into the screen coordinates.*

