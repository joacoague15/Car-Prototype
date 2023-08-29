import { Howl } from 'howler';
import Hammer from 'hammerjs';

import openCarSound from './sounds/car-open.wav';
import startEngineSound from './sounds/start-engine.wav';
import carMovingSound from './sounds/car-moving.wav';

import firstCopilotLeftIndicationSound from './sounds/first-copilot-left-indication.mp3';
import firstCopilotRightIndicationSound from './sounds/first-copilot-right-indication.mp3';

import copilotAskForCassette from './sounds/copilot-ask-for-cassette.mp3';

import turnIndicatorSound from './sounds/turn-indicator.mp3';

import music1 from './sounds/music1.m4a';

import insertCassetteSound from './sounds/insert-cassette.wav';

const changeIconOpacity = (element) => {
    if (element.style.opacity === '1')
        element.style.opacity = '0.2';
    else
        element.style.opacity = '1';
}

const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');
const upIcon = document.getElementById('up-icon');

document.getElementById('playButton').addEventListener('click', () => {
    const openSound = new Howl({
        src: [openCarSound],
        onend: () => startEngine()
    });

    openSound.play();
    document.getElementById('playButton').style.display = 'none';
});

const startEngine = () => {
    const engineSound = new Howl({
        src: [startEngineSound],
        onend: () => carMoving()
    });

    engineSound.play();
}

const carMoving = () => {
    const movingSound = new Howl({
        src: [carMovingSound],
        loop: true,
    });

    copilotStartTalking();

    movingSound.play();
}

const copilotStartTalking = () => {
    const copilotIndication = new Howl({
        src: [firstCopilotLeftIndicationSound],
        onend: startHandleSteeringWheel
    });

    copilotIndication.play();
}

const startHandleSteeringWheel = () => {
    const swipeArea = document.getElementById('swipe-area');
    const hammerManager = new Hammer(swipeArea);
    changeIconOpacity(leftIcon);

    hammerManager.on('swipeleft', (e) => {
        const turnIndication = new Howl({
            src: [turnIndicatorSound],
        });

        turnIndication.play();

        hammerManager.off('swipeleft', e);
        changeIconOpacity(leftIcon);
        secondCopilotIndication();
    });
}

const secondCopilotIndication = () => {
    const copilotIndication = new Howl({
        src: [firstCopilotRightIndicationSound],
        onend: () => {
            const swipeArea = document.getElementById('swipe-area');
            const hammerManager = new Hammer(swipeArea);
            changeIconOpacity(rightIcon);

            hammerManager.on('swiperight', (e) => {
                const turnIndication = new Howl({
                    src: [turnIndicatorSound],
                });

                turnIndication.play();

                hammerManager.off('swiperight', e);
                changeIconOpacity(rightIcon);
                copilotAskForCassete();
            });
        }
    });

    copilotIndication.play();
}

const copilotAskForCassete = () => {
    const copilotIndication = new Howl({
        src: [copilotAskForCassette],
        onend: insertCasseteAction
    });

    copilotIndication.play();
}

const insertCasseteAction = () => {
    const swipeArea = document.getElementById('swipe-area');
    const hammerManager = new Hammer(swipeArea);
    changeIconOpacity(upIcon);

    // Enable vertical swiping
    hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerManager.on('swipeup', (e) => {
        const insertAction = new Howl({
            src: [insertCassetteSound],
            onend: () => playMusic()
        });

        insertAction.play();

        changeIconOpacity(upIcon);
        hammerManager.off('swipeup', e);
    });
}

const playMusic = () => {
    const music = new Howl({
        src: [music1],
        loop: true,
    });
    // showPresentation();

    music.play();

            setTimeout(() => {
                const element = document.getElementById('presentation-area');
                element.style.display = 'block';
                secondTimeOut();
            }, 2100);

}

const secondTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Flo';
        thirdTimeOut();
    }, 1100);
}

const thirdTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Cris';
        fourthTimeOut();
    }, 1300);
}

const fourthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Yamil';
        fifthTimeOut();
    }, 1800);
}

const fifthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Joaco';
        sixthTimeOut();
    }, 2400);
}

const sixthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Presentan';
        seventhTimeOut();
    }, 2700);
}

const seventhTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Echo Driver';
        eighthTimeOut();
    }, 5500);
}

const eighthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('presentation-area');
        element.style.display = 'none';
    }, 5000);
}

playMusic();

