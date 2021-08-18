class Boat{
    constructor(x,y,w,h,boatPos,boatAnimation){
        var options = {
            restitutuin: 0.8,
            friction:1.0,
            density:1.0
        }
        
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w
        this.h =h;
        this.boatPos = boatPos;
        this.image= loadImage("assets/boat.png")
        World.add(world,this.body)
    }

    display(){
        var index = floor(this.speed % this.animation.length)
        push()
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.boatPos,this.w,this.h)
        pop()
    }

    remove(index) {
       
        
      }
    
    animate(){
        
    }
}