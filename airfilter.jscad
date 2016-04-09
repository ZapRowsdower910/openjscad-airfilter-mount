// title      : Example 003
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example003.scad ported to OpenJSCAD.org
// file       : example003.jscad

function getCenter(){
    return [true, true, false];
}

function createHolder() {
    return cube({size: [108, 150, 21], center: getCenter()})
        .subtract([
            cube({size: [89, 134, 21], center: getCenter()}),   // Air Flow
        cube({size: [104, 148, 16], center: getCenter()})   
            .translate([0,1,2.5])     // Entry Hole
        ]);

}

function createFilter(){
    return cube({
        size:[102,148.5,15], 
        center: getCenter()
    }).setColor([1,0,0])
    .translate([0,0,2.5]);
}

function createFanMount(){
    return cube({size:[120,120,2], center: getCenter()})
        .subtract(cylinder({r:58, h:10}))
        .subtract(cylinder({r:2.5, h:10}).translate([53,53,0]))
        .subtract(cylinder({r:2.5, h:10}).translate([53,-53,0]))
        .subtract(cylinder({r:2.5, h:10}).translate([-53,53,0]))
        .subtract(cylinder({r:2.5, h:10}).translate([-53,-53,0]))
        .translate([0, 0, 52])
        .setColor([0,0,100]);
}

function createFanShield(){
    return cube({
        size: [120, 120, 30], 
        center: getCenter()
    })
    .subtract([
        cube({size: [118,118,32], center: getCenter()})
    ])
    .translate([0, 0, 22])
}

function createShield(){
    
    return polyhedron({      // openscad-like (e.g. pyramid)
      points: [ 
        [60,60,52],         // 0
        [60,-60,52],        // 1
        [-60,-60,52],       // 2
        [-60,60,52],        // 3
        
        [54,75,21],         // 4 
        [54,-75,21],        // 5
        [-54,-75,21],       // 6
        [-54,75,21]         // 7
        
      ],
      triangles: [ 
          [0,1,2]
          ,[2,3,0]
          ,[0,3,4]
          ,[4,3,7]
          ,[3,2,7]
          ,[7,2,6]
          ,[6,2,1]
          ,[1,5,6]
          ,[5,1,4]
          ,[1,0,4]
          ,[5,4,7]
          ,[7,6,5]
      ]
    })
    .subtract([
        polyhedron({ 
            points: [ 
                [58,58,52],         // 0
                [58,-58,52],        // 1
                [-58,-58,52],       // 2
                [-58,58,52],        // 3
                
                [53,74,21],         // 4 
                [53,-74,21],        // 5
                [-53,-74,21],       // 6
                [-53,74,21]         // 7
                
            ],
            triangles: [ 
              [0,1,2]
              ,[2,3,0]
              ,[0,3,4]
              ,[4,3,7]
              ,[3,2,7]
              ,[7,2,6]
              ,[6,2,1]
              ,[1,5,6]
              ,[5,1,4]
              ,[1,0,4]
              ,[5,4,7]
              ,[7,6,5]
          ]
        })
    ]);
}

function main() {
    var filter = createFilter(),
        frame = createHolder(),
        fanMount = createFanMount(),
        fanShield = createShield();

    return [
        frame
//	, filter	// Used to size filter holder
        , fanMount
        , fanShield
    ];
}

