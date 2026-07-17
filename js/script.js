/* ==========================================
            PROJECT PANDA
========================================== */

let gatherFireflies = false;

document.addEventListener("DOMContentLoaded", () => {

    createStars();

    createFireflies();

    showIntroText();

});

/* ==========================================
            TYPEWRITER
========================================== */

const introLines = [

    "On a quiet moonlit night...",

    "The stars gathered to celebrate someone special...",

    "Take my hand...",

    "Let's begin this little adventure together."

];

async function startIntro(){

    const text = document.getElementById("dialogueText");

    text.replaceChildren();

    text.style.animation =
        "magicGlow 3s ease-in-out infinite";

    for(let i = 0; i < introLines.length; i++){

        await typeLine(text, introLines[i]);

        if(i !== introLines.length - 1){

            await wait(2500);

            text.classList.add("fadeOut");

            await wait(900);

            text.classList.remove("fadeOut");

            text.style.opacity = "1";

            text.replaceChildren();

            await wait(400);

        }

    }

    await wait(2500);

    await revealAdventure();

}

function showIntroText(){

    const text = document.querySelector(".intro-text");

    text.style.animation =
        "introTextAppear 1s ease-out forwards";

    text.addEventListener("animationend",()=>{

        startIntro();

    },{once:true});

}

function showButton(){

    const glow = document.querySelector(".button-glow");
    const button = document.getElementById("startButton");

    button.animate(
        [
            {
                opacity:0,
                transform:"translateY(30px) scale(.85)",
                filter:"brightness(.7)"
            },
            {
                opacity:1,
                transform:"translateY(0) scale(1.08)",
                filter:"brightness(1.3)",
                offset:.7
            },
            {
                opacity:1,
                transform:"translateY(0) scale(1)",
                filter:"brightness(1)"
            }
        ],
        {
            duration:1400,
            easing:"cubic-bezier(.22,1,.36,1)",
            fill:"forwards"
        }
    );
    glow.animate(
    [
        {
            opacity:0,
            transform:"translate(-50%,-50%) scale(.6)"
        },
        {
            opacity:.9,
            transform:"translate(-50%,-50%) scale(1.2)",
            offset:.6
        },
        {
            opacity:.45,
            transform:"translate(-50%,-50%) scale(1)"
        }
    ],
    {
        duration:1400,
        easing:"ease-out",
        fill:"forwards"
    }
    );

    setTimeout(() => {

     playMagicBurst();

    }, 1000);

    setTimeout(()=>{
        button.classList.add("buttonPulse");
    },1400);

}

function typeLine(element, line){

    return new Promise(resolve=>{

        let i = 0;

        function type(){

            if(i < line.length){

                const span = document.createElement("span");

                span.className = "magic-letter";

                const char = line.charAt(i);

                // Preserve spaces
                span.textContent = char === " " ? "\u00A0" : char;

                element.appendChild(span);

                i++;

                const speed = 55 + Math.random()*20;

                setTimeout(type,speed);

            }

            else{

                resolve();

            }

        }

        type();

    });

}

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

/* ==========================================
            STAR SYSTEM
========================================== */

function createStars(){

    const sky = document.getElementById("stars");

    createSmallStars(sky);

    createMediumStars(sky);

    createHeroStars(sky);

}

/* ==========================================
            SMALL STARS
========================================== */

function createSmallStars(container){

    for(let i=0;i<90;i++){

        const star=document.createElement("div");

        star.className="star-small";

        const size=Math.random()*2+1;

        star.style.width=size+"px";

        star.style.height=size+"px";

        star.style.left=Math.random()*100+"%";

        star.style.top=Math.random()*75+"%";

        star.style.animationDelay=`${Math.random()*6}s`;

        star.style.animationDuration=`${2+Math.random()*4}s`;

        container.appendChild(star);

    }

}

/* ==========================================
            MEDIUM STARS
========================================== */

function createMediumStars(container){

    for(let i=0;i<25;i++){

        const star=document.createElement("div");

        star.className="star-medium";

        const size=Math.random()*3+3;

        star.style.width=size+"px";

        star.style.height=size+"px";

        star.style.left=Math.random()*100+"%";

        star.style.top=Math.random()*70+"%";

        star.style.animationDelay=`${Math.random()*6}s`;

        star.style.animationDuration=`${2+Math.random()*4}s`; 

        container.appendChild(star);

    }

}

/* ==========================================
            HERO STARS
========================================== */

function createHeroStars(container){

    for(let i=0;i<8;i++){

        const star=document.createElement("div");

        star.className="star-big";

        star.innerHTML="✦";

        star.style.left=Math.random()*100+"%";

        star.style.top=Math.random()*55+"%";

        star.style.animationDelay=`${Math.random()*6}s`;

        star.style.animationDuration= `${3+Math.random()*3}s`;

        container.appendChild(star);

    }

}

/* ==========================================
            FIREFLIES
========================================== */


const fireflies = [];

function createFireflies(){

    const container = document.getElementById("fireflies");

    const TOTAL = 4;

    for(let i = 0; i < TOTAL; i++){

        const firefly = document.createElement("div");

        firefly.className = "firefly";

        container.appendChild(firefly);

        const fly = {

            element: firefly,

            radius: 18 + Math.random() * 28,

            angle: Math.random() * Math.PI * 2,

            speed: 0.003 + Math.random() * 0.003,

            size: 10 + Math.random() * 8,

            opacity: 1,

            x: 0,

            y: 0,

            offsetX: (Math.random() - 0.5) * 30,

            offsetY: (Math.random() - 0.5) * 20

        };

        // Initial position
        fly.x = 50 + Math.cos(fly.angle) * fly.radius;

        fly.y = 10 + Math.sin(fly.angle) * (fly.radius * 0.45);

        fireflies.push(fly);

    }

    animateFireflies();

}

function animateFireflies(){

    const centerX = 50;
    const centerY = 10;

    fireflies.forEach(f => {

        if(!gatherFireflies){

            f.angle += f.speed;

            f.x = centerX + Math.cos(f.angle) * f.radius;
            f.y = centerY + Math.sin(f.angle) * (f.radius * 0.45);

            // Restore opacity while orbiting
            f.opacity = 1;

        }
        else{

            const targetX = 85 + f.offsetX;
            const targetY = 160 + f.offsetY;

            // Move faster toward the button
            f.x += (targetX - f.x) * 0.05;
            f.y += (targetY - f.y) * 0.05;

            // Distance from target
            const distance = Math.hypot(
                targetX - f.x,
                targetY - f.y
            );

            // Fade only when very close
            if(distance < 18){

                f.opacity -= 0.03;

                if(f.opacity < 0){
                    f.opacity = 0;
                }

            }

        }

        f.element.style.left = `${f.x}px`;
        f.element.style.top = `${f.y}px`;

        f.element.style.width = `${f.size}px`;
        f.element.style.height = `${f.size}px`;

        // Apply fade
        f.element.style.opacity = f.opacity;

    });

    requestAnimationFrame(animateFireflies);

}

async function revealAdventure(){

    blessMoon();

    await wait(1800);

    gatherFireflies = true;

    await wait(2600);

    showButton();

}

function blessMoon(){

    document.querySelector(".moon").style.animation =
        "moonFloat 8s ease-in-out infinite, moonBlessing 2s ease forwards";

}

function playMagicBurst(){

    const container = document.getElementById("magicBurst");
    const button = document.getElementById("startButton");

    const rect = button.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for(let i = 0; i < 12; i++){

        const spark = document.createElement("div");

        spark.className = "burst";

        spark.style.left = `${cx}px`;
        spark.style.top = `${cy}px`;

        const angle = (Math.PI * 2 / 12) * i;
        const distance = 30 + Math.random() * 25;

        spark.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        spark.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        container.appendChild(spark);

        spark.addEventListener(
            "animationend",
            () => spark.remove()
        );

    }

}