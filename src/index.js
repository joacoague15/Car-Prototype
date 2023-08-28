import { Howl } from 'howler';
import Hammer from 'hammerjs';

import openCarSound from './sounds/car-open.wav';
import startEngineSound from './sounds/start-engine.wav';
import carMovingSound from './sounds/car-moving.wav';
import firstCopilotLetIndicationSound from './sounds/first-copilot-left-indication.mp3';

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
    const firstCopilotIndication = new Howl({
        src: [firstCopilotLetIndicationSound],
        onend: () => startHandleSteeringWheel()
    });

    firstCopilotIndication.play();
}

const startHandleSteeringWheel = () => {
    const swipeArea = document.getElementById('swipe-area');
    const hammerManager = new Hammer(swipeArea);

    hammerManager.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_LEFT }));

    hammerManager.on('swipeleft', (e) => {
        console.log('You swiped left!');
    });
}
