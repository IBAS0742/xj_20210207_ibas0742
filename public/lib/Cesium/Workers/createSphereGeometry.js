define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-ec27f304","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-44fb48f1","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./GeometryOffsetAttribute-7350d9af","./VertexFormat-7572c785","./EllipsoidGeometry-ceb731dc"],function(a,e,t,o,r,i,n,s,c,d,l,m,u,f){"use strict";function p(e){var t=a.defaultValue(e.radius,1),r={radii:new o.Cartesian3(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new f.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}p.packedLength=f.EllipsoidGeometry.packedLength,p.pack=function(e,t,r){return f.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var y=new f.EllipsoidGeometry,G={radius:void 0,radii:new o.Cartesian3,vertexFormat:new u.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return p.unpack=function(e,t,r){var i=f.EllipsoidGeometry.unpack(e,t,y);return G.vertexFormat=u.VertexFormat.clone(i._vertexFormat,G.vertexFormat),G.stackPartitions=i._stackPartitions,G.slicePartitions=i._slicePartitions,a.defined(r)?(o.Cartesian3.clone(i._radii,G.radii),r._ellipsoidGeometry=new f.EllipsoidGeometry(G),r):(G.radius=i._radii.x,new p(G))},p.createGeometry=function(e){return f.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(e,t){return a.defined(t)&&(e=p.unpack(e,t)),p.createGeometry(e)}});
