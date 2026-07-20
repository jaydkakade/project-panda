/* ==========================================
            PROJECT PANDA
========================================== */

const panda = document.getElementById("panda");

const OPEN_EYES = "assets/standing.png";
const CLOSED_EYES = "assets/standing-blink.png";

let gatherFireflies = false;

document.addEventListener("DOMContentLoaded", () => {

    createStars();

    createFireflies();

    showIntroText();

    const button = document.getElementById("startButton");

    button.addEventListener("click", transitionToScene2); 

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

const pandaLines = [
    "There you are...",
    "I was wondering when you'd finally arrive.",
    "I've been keeping something special just for today...",
    "But before we begin..."
];

async function startDialogue() {

    const text = document.getElementById("pandaText");

    text.replaceChildren();

    for (let i = 0; i < pandaLines.length; i++) {

        const dialogue = document.getElementById("dialogue");

        // restart animation
        dialogue.classList.remove("bubblePulse");
        void dialogue.offsetWidth;
        dialogue.classList.add("bubblePulse")

        dialogue.classList.remove("shine");
        void dialogue.offsetWidth;
        dialogue.classList.add("shine");

        text.textContent = pandaLines[i];

        panda.classList.remove("speak");
        void panda.offsetWidth;
        panda.classList.add("speak");

        text.classList.remove("dialogueFadeIn");
        void text.offsetWidth;
        text.classList.add("dialogueFadeIn");

        if (i !== pandaLines.length - 1) {

            await wait(3000);

           text.classList.remove("dialogueFadeIn");

           text.classList.add("dialogueFadeOut");

           await wait(150);

           text.textContent = "";

           await wait(60);

           text.classList.remove("dialogueFadeOut");

            await wait(120);
        }
    }
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


async function transitionToScene2(){

    const scene1 = document.getElementById("scene1");
    const scene2 = document.getElementById("scene2");

    scene1.style.transition = "opacity .8s ease";

    scene1.style.opacity = "0";

    await wait(800);

    scene1.classList.add("hidden");

    scene2.classList.remove("hidden");

    scene2.style.opacity = "1";

    requestAnimationFrame(() => {

        startPandaIntro();

});

}

async function startPandaIntro() {

    const panda = document.getElementById("panda");

    const dialogue = document.getElementById("dialogue");

    // Panda entrance
    const animation = panda.animate(
[
    {
        transform: "translateY(0) scale(1) rotate(0deg)"
    },
    {
        transform: "translateY(-3px) scale(1.012) rotate(-0.3deg)",
        offset: 0.5
    },
    {
        transform: "translateY(0) scale(1) rotate(0deg)"
    }
],
{
    duration: 420,
    easing: "cubic-bezier(.22,1,.36,1)"
});

await animation.finished;

// Freeze the final state manually
panda.style.opacity = "1";
panda.style.transform = "translateY(0) scale(1)";
panda.style.filter = "blur(0px)";

// Remove the WAAPI animation completely
animation.cancel();

// Force the browser to recalculate styles
void panda.offsetWidth;

// Now start the CSS animations
panda.style.animation =
    "pandaIdle 7.5s cubic-bezier(.42,0,.58,1) infinite, " +
    "pandaGlow 7.5s ease-in-out infinite";

    // Dialogue bubble appears
    dialogue.classList.add("show");

    // Let the bubble finish appearing
    await wait(600);

    // Start typing
    await startDialogue();

    await wait(1500);

    showFriendButton();
}

function showFriendButton() {

    const button = document.getElementById("friendButton");

    button.classList.remove("hidden");

    button.animate(
        [
            {
                opacity: 0,
                transform: "translateY(20px) scale(.9)"
            },
            {
                opacity: 1,
                transform: "translateY(0) scale(1)"
            }
        ],
        {
            duration: 600,
            easing: "ease-out",
            fill: "forwards"
        }
    );

}

async function transitionToScene3(){

    const scene2 = document.getElementById("scene2");
    const scene3 = document.getElementById("scene3");

    const magic = document.getElementById("magicTransition");

    // Magical glow appears
    magic.classList.add("magic-in");

    await wait(800);

    scene2.classList.add("hidden");

    scene3.classList.remove("hidden");

    loadQuestion(0);

    magic.classList.remove("magic-in");
    magic.classList.add("magic-out");

    await wait(800);

    magic.classList.remove("magic-out");

}

const friendButton = document.getElementById("friendButton");

friendButton.addEventListener("click", async () => {

    await transitionToScene3();

});

const friendshipQuestions = [

{
    question:"If I ever felt sad...<br>what would you do?",

    reaction:"Aww... you're such a wonderful friend. 💛",

    panda:"happy",

    answers:[

        {
            emoji:"❤️",
            title:"I'd cheer you up.",
            subtitle:"I'll make you smile again!"
        },

        {
            emoji:"🤗",
            title:"I'd give you a hug.",
            subtitle:"A warm hug for you!"
        },

        {
            emoji:"🍰",
            title:"I'd share my cake.",
            subtitle:"The sweetest things are for you!"
        },

        {
            emoji:"✨",
            title:"I'd stay beside you.",
            subtitle:"I'll always be here for you!"
        }

    ]
},

{
    question:"Can I always cheer you on<br>when things get difficult?",

    reaction:"Hehe... that's what best friends are for! 🌟",

    panda:"happy",

    answers:[

        {
            emoji:"💛",
            title:"Always!",
            subtitle:"I'll always support you."
        },

        {
            emoji:"🌸",
            title:"Without a doubt.",
            subtitle:"You'll never be alone."
        },

        {
            emoji:"🤝",
            title:"We'll do it together.",
            subtitle:"Teamwork!"
        },

        {
            emoji:"⭐",
            title:"Every single time.",
            subtitle:"I'm cheering for you!"
        }

    ]
},

{
    question:"Will you save a tiny slice<br>of birthday cake for me?",

    reaction:"Yay!! I promise I won't eat the whole cake first! 🍰",

    panda:"happy",

    answers:[

        {
            emoji:"🍰",
            title:"Of course!",
            subtitle:"Cake is better shared."
        },

        {
            emoji:"🎂",
            title:"The biggest slice!",
            subtitle:"Just for you."
        },

        {
            emoji:"💖",
            title:"We'll eat together.",
            subtitle:"That's more fun."
        },

        {
            emoji:"🥳",
            title:"Absolutely!",
            subtitle:"Birthday promise."
        }

    ]
},

{
    question:"Will this adventure stay<br>in your memories?",

    reaction:"That makes my little panda heart so happy. 🐼",

    panda:"happy",

    answers:[

        {
            emoji:"🌙",
            title:"Forever.",
            subtitle:"A magical memory."
        },

        {
            emoji:"✨",
            title:"Always.",
            subtitle:"I'll never forget."
        },

        {
            emoji:"📖",
            title:"Like a storybook.",
            subtitle:"A beautiful chapter."
        },

        {
            emoji:"💛",
            title:"Absolutely.",
            subtitle:"I'll treasure it."
        }

    ]
},

{
    question:"One last promise...<br>Will we always be friends?",

    reaction:"YAY!! You're officially my Best Friend! 🐼💛",

    panda:"happy",

    answers:[

        {
            emoji:"💛",
            title:"Always.",
            subtitle:"Forever friends."
        },

        {
            emoji:"🌸",
            title:"Forever.",
            subtitle:"No matter what."
        },

        {
            emoji:"🤝",
            title:"Pinky Promise.",
            subtitle:"It's a deal."
        },

        {
            emoji:"✨",
            title:"No Matter What.",
            subtitle:"Best friends forever."
        }

    ]
}

];

let currentQuestion = 0;

const friendshipPanda =
    document.getElementById("friendshipPanda");

function loadQuestion(index){

    const question = friendshipQuestions[index];

    document.getElementById("questionText").innerHTML =
        question.question;

    const container =
        document.getElementById("answerButtons");

    container.innerHTML = "";

    question.answers.forEach(answer => {

    const card = document.createElement("button");

    card.className = "choice-card";

    card.innerHTML = `

        <div class="choice-icon">

            ${answer.emoji}

        </div>

        <div class="choice-text">

            <h3>${answer.title}</h3>

            <p>${answer.subtitle}</p>

        </div>

    `;

    card.addEventListener("click", handleAnswer);

    container.appendChild(card);

});

}

const bubble =
    document.getElementById("reactionBubble");

const bubbleText =
    document.getElementById("reactionText");

async function handleAnswer(){

    document.querySelectorAll(".choice-card").forEach(card=>{
        card.disabled = true;
    });

    const question = friendshipQuestions[currentQuestion];

    friendshipPanda.src =
        "assets/images/panda/happy.png";

    bubbleText.textContent =
        question.reaction;

    bubble.classList.remove("hidden");

    requestAnimationFrame(()=>{
        bubble.classList.add("show");
    });

    await wait(2800);

    // ---------- LAST QUESTION ----------
    if(currentQuestion === friendshipQuestions.length - 1){

        bubble.classList.remove("show");

        await wait(350);

        bubbleText.textContent =
            "But... I have one last surprise waiting for you... ✨";

        bubble.classList.remove("hidden");

        requestAnimationFrame(()=>{
            bubble.classList.add("show");
        });

        await wait(2600);

        bubble.classList.remove("show");

        await wait(400);

        bubble.classList.add("hidden");

        friendshipPanda.src =
            "assets/images/panda/thinking.png";

        await startBirthdayTransition();

        return;
    }

    bubble.classList.remove("show");

    await wait(350);

    bubble.classList.add("hidden");

    friendshipPanda.src =
        "assets/images/panda/thinking.png";

    await wait(250);

    currentQuestion++;

    loadQuestion(currentQuestion);

}

async function startBirthdayTransition(){

    const star=document.getElementById("birthdayStar");
    const portal=document.getElementById("portalGlow");
    const glow=document.getElementById("magicTransition");

    star.className="";
    portal.className="";
    glow.className="";

    star.style.opacity="1";
    portal.style.opacity="0";

    // Star appears

    star.classList.add("star-appear");

    await wait(900);

    // Fly

    star.className="";
    void star.offsetWidth;
    star.classList.add("star-fly");

    await wait(1700);

    // Portal

    portal.classList.add("portal-open");

    await wait(400);

    // Fade star

    star.animate(
    [
        {
            opacity:1,
            transform:"translate(-50%,0) scale(1.2)"
        },
        {
            opacity:0,
            transform:"translate(-50%,0) scale(.5)"
        }
    ],
    {
        duration:600,
        fill:"forwards",
        easing:"ease-out"
    });

    await wait(450);

    // Screen glow

    glow.classList.add("magic-in");

    await wait(800);

    // Show birthday scene

    await showScene4();

}

/* ==========================================
            SHOW SCENE 4
========================================== */

/* ==========================================
            SHOW SCENE 4
========================================== */

async function showScene4(){

    /* ============================
            Scene Switch
    ============================ */

    document
        .getElementById("scene3")
        .classList.add("hidden");

    document
        .getElementById("scene4")
        .classList.remove("hidden");

    /* ============================
            Hide Portal
    ============================ */

    document
        .getElementById("birthdayStar")
        .style.display="none";

    document
        .getElementById("portalGlow")
        .style.display="none";

    const glow=
        document.getElementById("magicTransition");

    glow.style.transition=
        "opacity 1.2s ease";

    glow.style.opacity="0";

    await wait(1200);

    glow.style.display="none";

    /* ============================
            Elements
    ============================ */

    const panda=
        document.getElementById("birthdayPanda");

    const cake=
        document.getElementById("birthdayCake");

    const gift=
        document.getElementById("giftBox");

    const card=
        document.getElementById("birthdayCard");

    const footer=
        document.getElementById("birthdayFooter");

    /* ===================================================
                HAPPY BIRTHDAY
    =================================================== */

    const birthdayText =
    document.getElementById("birthdayText");

birthdayText.animate(

[
    {

        opacity:0,

        transform:
            "translateY(-45px) scale(.88)"

    },

    {

        opacity:1,

        transform:
            "translateY(0) scale(1.04)"

    },

    {

        opacity:1,

        transform:
            "translateY(0) scale(1)"

    }

],

{

    duration:1200,

    easing:"cubic-bezier(.2,.9,.2,1)",

    fill:"forwards"

}

);

await wait(900);

    /* ===================================================
                    PANDA
    =================================================== */

    panda.animate(

        [

            {

                opacity:0,

                transform:
                    "translateX(-35%) scale(.35)"

            },

            {

                opacity:1,

                transform:
                    "translateX(-50%) scale(1.08)"

            },

            {

                opacity:1,

                transform:
                    "translateX(-50%) scale(1)"

            }

        ],

        {

            duration:900,

            easing:"ease-out",

            fill:"forwards"

        }

    );

    await wait(350);

    /* ===================================================
                    CAKE
    =================================================== */

    cake.animate(

        [

            {

                opacity:0,

                transform:
                    "translateX(-50%) translateY(80px)"

            },

            {

                opacity:1,

                transform:
                    "translateX(-50%) translateY(0)"

            }

        ],

        {

            duration:800,

            easing:"ease-out",

            fill:"forwards"

        }

    );

    await wait(220);

    /* ===================================================
                    GIFT
    =================================================== */

    gift.animate(

        [

            {

                opacity:0,

                transform:
                    "translateY(45px) scale(.6)"

            },

            {

                opacity:1,

                transform:
                    "translateY(0) scale(1)"

            }

        ],

        {

            duration:700,

            easing:"ease-out",

            fill:"forwards"

        }

    );

    gift.animate(

        [

            {

                transform:"translateY(0)"

            },

            {

                transform:"translateY(-10px)"

            },

            {

                transform:"translateY(0)"

            }

        ]
    );

    await wait(600);

    /* ===================================================
                    FOOTER
    =================================================== */

    footer.animate(

        [

            {

                opacity:0

            },

            {

                opacity:.85

            }

        ],

        {

            duration:900,

            fill:"forwards"

        }

    );


    /* ===================================================
                    CONFETTI
    =================================================== */

    //startConfetti();

}



const DEV_MODE = false;

if (DEV_MODE) {

    document.getElementById("scene1").classList.add("hidden");
    document.getElementById("scene2").classList.add("hidden");
    document.getElementById("scene3").classList.add("hidden");

    showScene4();

}