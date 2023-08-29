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

    hammerManager.on('swipeleft', (e) => {
        const turnIndication = new Howl({
            src: [turnIndicatorSound],
        });

        turnIndication.play();

        hammerManager.off('swipeleft', e);
        secondCopilotIndication();
    });
}

const secondCopilotIndication = () => {
    const copilotIndication = new Howl({
        src: [firstCopilotRightIndicationSound],
        onend: () => {
            const swipeArea = document.getElementById('swipe-area');
            const hammerManager = new Hammer(swipeArea);

            hammerManager.on('swiperight', (e) => {
                const turnIndication = new Howl({
                    src: [turnIndicatorSound],
                });

                turnIndication.play();

                hammerManager.off('swiperight', e);
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

    // Enable vertical swiping
    hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerManager.on('swipeup', (e) => {
        console.log("Swipe up")
        const insertAction = new Howl({
            src: [insertCassetteSound],
            onend: () => playMusic()
        });

        insertAction.play();

        hammerManager.off('swipeup', e);
    });
}

const playMusic = () => {
    const music = new Howl({
        src: [music1],
        loop: true,
    });

    music.play();
}