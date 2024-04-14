This is a lab project done under the course CS5016 Computational Methods and Applications.

This project illustrates the functionality of a very pivotal algorithm called Marching Cubes Algorithm.
This algorithm is used to approximate shapes and images, and find contour lines/bands.

The basic principle of this algorithm is as follows:
<ol>
<li>1. Assume a grid around the shape (a plane in case of 2D or a cube in case of 3D).</li>
<li>2. Each grid unit (square/cube/triangle) would have a small subpart of the total shape.</li>
<li>3. Approximate the subpart with a line according to the pixel/image values corresponding to the unit.</li>
</ol>
Usually, this process is repeated sequentially for each unit (hence the name 'Marching').
