class Container{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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