import { SpatialGrid2 }  from '@thi.ng/geom-accel';
import { MersenneTwister}from './mersenne-twister';
 
export class Coord{
    constructor(x,y,Origin){
        this.x=x;
        this.y=y;
        this.Origin=Origin;
        this.SMALL_NUM=1e-6;
    }
    subtract(A){
        return Coord(this.x-A.x,this.y-A.y)
    }
    sum(A){
        return Coord(this.x+A.x,this.y+A.y)
    }
    divide(s){
        return Coord(this.x/s,this.y/s)
    }

    dot (v){
        return (this).x() * (v).x() + (this).y() * (v).y();
    }
    norm(){
        return sqrt(this.dot(this));
    }
    perp(v){
        return (this).x() * (v).y() - (this).y() * (v).x();
    } 
    
}
export  class CoordSegment {
    constructor (start,end){
        this.start=end;
        this.start=end;
    }
    intersect2D_Segments(S2, I0, I1) {
        u=this.end.subtract(this.start);
        v=S2.end.subtract(S2.start);
        w=this.start.subtract(S2.start);
        D = perp(v);
    
        // test if  they are parallel (includes either being a point)
        if (Math.abs(D) < this.SMALL_NUM) { // this and S2 are parallel
            if (perp(u, w) != 0 || perp(v, w) != 0) {
                return 0; // they are NOT collinear
            }
            // they are collinear or degenerate
            // check if they are degenerate  points
            du = u.dot(u);
            dv = v.dot(v);
            if (du == 0 && dv == 0) { // both segments are points
                if (this.start != S2.start) // they are distinct  points
                    return 0;
                I0 = this.start; // they are the same point
                return 3;
            }
            if (du == 0) { // this is a single point
                if (inSegment(this.start, S2) == 0) // but is not in S2
                    return 0;
                I0 = this.start;
                return 3;
            }
            if (dv == 0) { // S2 a single point
                if (inSegment(S2.start, this) == 0) // but is not in this
                    return 0;
                I0 = S2.start;
                return 3;
            }
            // they are collinear segments - get  overlap (or not)
            t0, t1; // endpoints of this in eqn for S2
            w2=this.end.subtract(S2.start);
            if (v.x() != 0) {
                t0 = w.x() / v.x();
                t1 = w2.x() / v.x();
            } else {
                t0 = w.y() / v.y();
                t1 = w2.y() / v.y();
            }
            if (t0 > t1) { // must have t0 smaller than t1
                t = t0;
                t0 = t1;
                t1 = t; // swap if not
            }
            if (t0 > 1 || t1 < 0) {
                return 0; // NO overlap
            }
            t0 = t0 < 0 ? 0 : t0; // clip to min 0
            t1 = t1 > 1 ? 1 : t1; // clip to max 1
            if (t0 == t1) { // intersect is a point
                var a;
                a.x=(v.x() * t0);
                a.y=(v.y() * t0);
                IO=S2.start.sum(a)
                return 1;
            }
    
            // they overlap in a valid subsegment
            var a;
            a.x=(v.x() * t0);
            a.y=(v.y() * t0);
            IO=S2.start.sum(a)
                
            var b;
            b.x=(v.x() * t1);
            b.y=(v.y() * t1);
            I1=S2.start.sum(b);
    
            return 2;
        }
    
        // the segments are skew and may intersect in a point
        // get the intersect parameter for this
        sI = v.perp(w)/D;
        if (sI < 0 || sI > 1) // no intersect with this
            return 0;
    
        // get the intersect parameter for S2
        tI = u.perp(w) / D;
        if (tI < 0 || tI > 1) // no intersect with S2
            return 0;
        var c;
        c.x=(u.x() * sI);
        c.y=(u.y() * sI);
        IO=this.start.sum(c);
        //        I0 = this.start + sI * u; // compute this intersect point
        return 1;
    }
    inSegment(P, S) {
        if (S.start.x() != S.end.x()) { // S is not  vertical
            if (S.start.x() <= P.x() && P.x() <= S.end.x())
                return 1;
            if (S.start.x() >= P.x() && P.x() >= S.end.x())
                return 1;
        } else { // S is vertical, so test y  coordinate
            if (S.start.y() <= P.y() && P.y() <= S.end.y())
                return 1;
            if (S.start.y() >= P.y() && P.y() >= S.end.y())
                return 1;
        }
        return 0;
    }
}
export class CoordSystem{
    constructor(Origin,Seed){
         this.SpatialGrid2=SpatialGrid2<ReadonlyVec,Number>([-500,-500],[1000,1000],100000);
         this.size=0;
         this.coords=[];
         this.bags=[];
         this.Origin=Origin;
         this.rng=MersenneTwister(Seed);
    }
    buildBags(directions,i,radius){
        const piDiv=2*Math.PI/directions;
        const ZEROQ =  0.0001;
        const tempbag=[];
        for(i=0;i<directions;i++){
            coss=radius*Math.cos(pidiv*i);
            sinn=radius*Math.sin(piDiv*i);
            tempbag.concat(Coord((fabs(coss)<ZEROQ)?0:coss,(fabs(sinn)<ZEROQ)?0:sinn,Origin))
        }
        if(this.bags.length<i){
            this.bags[i]=tempbag
        }else{
            this.bags.concat(tempbag)
        }
    }
    addToPath(count,directions,radius){
        pos=this.buildBags.length
        while(count>0){
            this.buildBags(directions,pos,radius);
            if(bagl=this.buildBags[pos-1].length){
                for(;i<bagl;){
                    chosen=this.rng.random()*bagl;
                    chcoord=this.buildBags[pos-1][chosen]
                    const x1=this.coords[pos-2].x;
                    const y1=this.coords[pos-2].y;
                    const x2=this.coords[pos-1].x;
                    const y2=this.coords[pos-1].y;
                    flag=false;
                    pts=Vec();
                    if(chcoord.x+(x2-x1)!==0 && chcoord.y+(y2-y1)!==0){
                        pts=[[chcoord.x+radius,chcoord.y+radius],[chcoord.x-radius,chcoord.y+radius],[chcoord.x-radius,chcoord.y-radius],[chcoord.x+radius,chcoord.y-radius]];
                        const searchRet=this.index.queryKeys(pts,2*radius).length;
                        if(searchRet==0){
                            a=Vec2()
                            seg1=CoordSegment(chcoord,this.coords[pos-1])
                            for(j=0;j<pos-2;j++){
                                var I0,I1;
                                temp=CoordSegment(this.coords[j],this.coords[j+1]).intersect2D_Segments(seg1,I0,I1)
                                if(temp){
                                    flag=true;
                                    break;
                                }
                            }
                        }
                        if(!flag){
                            this.index.set()
                            this.coords.concat(chcoord);
                            count--;
                            pos++;
                        }else{
                            count++;
                            pos--;
                        }
                    }
                    
                    i++;
                }
            }
        }
        return this.coords;
    }
}