class Tree{
    constructor(leaf){
        this.leaf = leaf;
        this.lchild = undefined;
        this.rchild = undefined;
    }

    getLeafs(){
        if (this.lchild === undefined && this.rchild === undefined){
            return [this.leaf]
        } else {
            return [].concat(
                this.lchild.getLeafs(),
                this.rchild.getLeafs()
                )
        }
    }

    getIncludedPoints(points){
        if (this.lchild === undefined && this.rchild === undefined){
            points.concat(this.leaf.getIncludedPoints(points));
        }
        if (this.lchild !== undefined){
            points.concat(this.lchild.getIncludedPoints(points));
        }
        if (this.rchild !== undefined){
            points.concat(this.rchild.getIncludedPoints(points));
        }
        // if there is an lchild and rchild, create and add points to
        // connect the two centers
        // if (this.lchild !== undefined && this.rchild !== undefined){
        //     points.concat(this.lchild.leaf.pointsBetweenCenters(points, this.rchild.leaf));
        // }
        return points
    }
}