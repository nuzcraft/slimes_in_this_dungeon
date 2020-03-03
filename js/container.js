class Container{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.center = new Point(
            this.x + (Math.floor(this.w/2)),
            this.y + (Math.floor(this.h/2))
        )
    }

    getIncludedPoints(points){
        var i, j;
        for (i = this.x; i < this.x + this.w; i++){
            for (j = this.y; j < this.y + this.h; j++){
                points.push([i, j]);
            }
        }
        return points
    }

    pointsBetweenCenters(points, other){
        // here we can map the path between the centers of 2 containers
        // first, get the absolute difference between the two centers x and y
        var diff_x = Math.abs(other.center.x - this.center.x);
        var diff_y = Math.abs(other.center.y - this.center.y);
        // then get the min x and y as our starting place
        var min_x = Math.min(other.center.x, this.center.x);
        var min_y = Math.min(other.center.y, this.center.y);
        // console.log(diff_x, diff_y, min_x, min_y);
        // now we path between them
        for (var i = min_x; i <= min_x + diff_x; i++){
            for (var j = min_y; j <= min_y + diff_y; j++){
                // console.log([i, j]);
                points.push([i, j]);
            }
        }
        return points        
    }
}

function split_container(container, iter){
    var root = new Tree(container);
    if (iter != 0){
        var sr = random_split(container);
        if (sr != undefined){
            root.lchild = split_container(sr[0], iter - 1);
            root.rchild = split_container(sr[1], iter - 1);
        }
    }
    return root
}

function random_split(container){
    var r1, r2;
    // lets reduce some of the randomness, force a room to be at least 3 wide
    // for that are small in one dimension, force them to split the other
    var force_horiz = false, force_vert = false;
    // here '4' is double the minimum size
    if (container.w > 4 || container.h > 4) {
        var random_num = randomRange(0, 1);
        if (container.w <= 4){
            force_horiz = true;
        }
        if (container.h <= 4){
            force_vert = true;
        }
        if ((random_num == 0 && !force_horiz) || force_vert){
            // here '2' is the minimum size and 3 is 2+1
            var vert_split = randomRange(2, container.w - 3);
            // vertical
            r1 = new Container(
                container.x,
                container.y,
                vert_split,
                container.h
            )
            r2 = new Container(
                container.x + r1.w + 1,
                container.y,
                container.w - r1.w - 1, 
                container.h
            )
        } else if ((random_num == 1 && !force_vert) || force_horiz) {
            var horiz_split = randomRange(2, container.h - 3);
             // Horizontal
             r1 = new Container(
                container.x, 
                container.y,
                container.w, 
                horiz_split
            )
            r2 = new Container(
                container.x, 
                container.y + r1.h + 1,
                container.w, 
                container.h - r1.h - 1
            )
        }
        return[r1, r2]
    }
    return undefined
}