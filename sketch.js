let slimes;

function setup() {
  createCanvas(1920, 720);
  pixelDensity(1);
  
  slimes = new Slimes();
}

function draw() {
  background(255, 5);

  loadPixels();
  for (let i = 10; i--;)
    slimes.update();
	
  updatePixels();
}

class Slime {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.dir = random(PI * 2);
  }

	update() {        
        let ind = 0;
      
        if (this.getter(-Math.PI / 7) < this.getter(0) - 1 && this.getter(-Math.PI / 7) < this.getter(Math.PI / 7))
            ind = -1;

        if (this.getter(Math.PI / 7) < this.getter(0) - 1 && this.getter(-Math.PI / 7) > this.getter(Math.PI / 7))
            ind = 1;
      
		this.dir += Math.PI / 6 * ind;

    this.x = (this.x + cos(this.dir) + width) % width;
    this.y = (this.y + sin(this.dir) + height) % height;		
    pixels.set([0, 0, 0], (int(this.x) + int(this.y) * width) * 4);
  }
	
  getter(dirOffset) {
    let x = (floor(this.x + 10 * cos(this.dir + dirOffset)) + width) % width;
    let y = (floor(this.y + 10 * sin(this.dir + dirOffset)) + height) % height;
    return pixels[(x + y * width) * 4];
  }
}

class Slimes {
  constructor() {
    this.agents = Array(4000).fill().map((e) => new Slime());
  }
  update() {
    this.agents.forEach((e) => e.update());
  }
}
