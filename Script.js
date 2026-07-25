/* ==========================================================================
   CANVAS ANIMATION: FLOATING COMPUTERS & TECH NODES IN BACKGROUND
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Floating Tech Object Constructor
class FloatingTech {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 25 + 20;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.type = Math.floor(Math.random() * 3);
        this.opacity = Math.random() * 0.4 + 0.15;
        this.rotSpeed = (Math.random() - 0.5) * 0.01;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotSpeed;

        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = `rgba(0, 240, 255, ${this.opacity})`;
        ctx.lineWidth = 1.5;

        if (this.type === 0) {
            // Laptop
            ctx.strokeRect(-this.size/2, -this.size/3, this.size, this.size/1.8);
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.7, this.size/3);
            ctx.lineTo(this.size * 0.7, this.size/3);
            ctx.lineTo(this.size * 0.5, this.size/3 + 8);
            ctx.lineTo(-this.size * 0.5, this.size/3 + 8);
            ctx.closePath();
            ctx.stroke();
        } else if (this.type === 1) {
            // Microchip
            ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
            for (let i = -this.size/3; i <= this.size/3; i += this.size/3) {
                ctx.beginPath();
                ctx.moveTo(i, -this.size/2); ctx.lineTo(i, -this.size/2 - 5);
                ctx.moveTo(i, this.size/2); ctx.lineTo(i, this.size/2 + 5);
                ctx.moveTo(-this.size/2, i); ctx.lineTo(-this.size/2 - 5, i);
                ctx.moveTo(this.size/2, i); ctx.lineTo(this.size/2 + 5, i);
                ctx.stroke();
            }
        } else {
            // Monitor
            ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size/1.5);
            ctx.beginPath();
            ctx.moveTo(0, this.size/6); ctx.lineTo(0, this.size/2);
            ctx.moveTo(-this.size/4, this.size/2); ctx.lineTo(this.size/4, this.size/2);
            ctx.stroke();
        }

        ctx.restore();
    }
}

const techObjects = Array.from({ length: 25 }, () => new FloatingTech());

function animate() {
    ctx.clearRect(0, 0, width, height);
    techObjects.forEach(obj => {
        obj.update();
        obj.draw();
    });
    requestAnimationFrame(animate);
}

animate();

/* ==========================================================================
   FORM SUBMISSION HANDLING
   ========================================================================== */
document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your project request has been submitted to Adeshola O. Enterprise.');
    this.reset();
});
