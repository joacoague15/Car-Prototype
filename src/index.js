import { Howl } from 'howler';
import Hammer from 'hammerjs';

import openCarSound from './sounds/car-open.wav';
import startEngineSound from './sounds/start-engine.wav';
import carMovingSound from './sounds/car-moving.wav';

import firstCopilotLeftIndicationSound from './sounds/first-copilot-left-indication.mp3';
import firstCopilotRightIndicationSound from './sounds/first-copilot-right-indication.mp3';
import secondCopilotRightIndicationSound from './sounds/second-copilot-right-indication.mp3';

import copilotAskToStopSound from './sounds/copilot-ask-to-stop.mp3';

import copilotAskForCassette from './sounds/copilot-ask-for-cassette.mp3';

import turnIndicatorSound from './sounds/turn-indicator.mp3';

import footstepsSound from './sounds/footsteps.wav';
import passengerSalutesCopilotSound from './sounds/passenger-salutes-copilot.mp3';
import copilotSalutesPassengerSound from './sounds/copilot-salutes-passenger.mp3';
import passengerSalutesProtagonistSound from './sounds/passenger-salutes-protagonist.mp3';
import handShakeSound from './sounds/hand-shake.mp3';
import passengerIsReadyToGoSound from './sounds/passenger-is-ready-to-go.mp3';
import carAccelerateSound from './sounds/car-accelerate.wav';

import insertCassetteSound from './sounds/insert-cassette.wav';
import music1 from "./sounds/music1.m4a";

const changeIconOpacity = (element) => {
    if (element.style.opacity === '1')
        element.style.opacity = '0.2';
    else
        element.style.opacity = '1';
}

const leftIcon = document.getElementById('left-icon');
const rightIcon = document.getElementById('right-icon');
const musicIcon = document.getElementById('music-icon');
const downIcon = document.getElementById('down-icon');
const upIcon = document.getElementById('up-icon');

const highFiveIcon = document.getElementById('high-five-icon');

class CarMoving {
    constructor(src) {
        this.sound = new Howl({
            src: [src],
            loop: true
        })
    }

    play() {
        this.sound.play();
    }

    fade() {
        this.sound.fade(1, 0, 3500)
    }
}

class PresentationSong {
    constructor(src) {
        this.sound = new Howl({
            src: [src],
        })
    }

    play() {
        this.sound.play();
    }

    fade() {
        this.sound.fade(1, 0, 3000);
    }
}

const movingSound = new CarMoving(carMovingSound);
const presentationSong = new PresentationSong(music1);

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
    changeIconOpacity(musicIcon);

    // Enable vertical swiping
    hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerManager.on('swipeup', (e) => {
        const insertAction = new Howl({
            src: [insertCassetteSound],
            onend: () => showPresentation()
        });

        insertAction.play();

        changeIconOpacity(musicIcon);
        hammerManager.off('swipeup', e);
    });
}

const showPresentation = () => {
    presentationSong.play();

    setTimeout(() => {
        const element = document.getElementById('presentation-area');
        element.style.display = 'block';
        secondTimeOut();
    }, 2700);

}

const secondTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Flo';
        thirdTimeOut();
    }, 1400);
}

const thirdTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Cris';
        fourthTimeOut();
    }, 2000);
}

const fourthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Yamil';
        fifthTimeOut();
    }, 2200);
}

const fifthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Joaco';
        sixthTimeOut();
    }, 2800);
}

const sixthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Presentan';
        seventhTimeOut();
    }, 1500);
}

const seventhTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('present-title');
        element.innerText = 'Echo Driver';
        eighthTimeOut();
        presentationSong.fade();
    }, 4200);
}

const eighthTimeOut = () => {
    setTimeout(() => {
        const element = document.getElementById('presentation-area');
        element.style.display = 'none';
        thirdCopilotIndication();
    }, 8000);
}

const thirdCopilotIndication = () => {
    const copilotIndication = new Howl({
        src: [secondCopilotRightIndicationSound],
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
                copilotAskToStop();
            });
        }
    });

    copilotIndication.play();
}

const copilotAskToStop = () => {
    const copilotIndication = new Howl({
        src: [copilotAskToStopSound],
        onend: () => {
            const swipeArea = document.getElementById('swipe-area');
            const hammerManager = new Hammer(swipeArea);
            changeIconOpacity(downIcon);

            // Enable vertical swiping
            hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
            hammerManager.on('swipedown', (e) => {

                movingSound.fade();

                hammerManager.off('swipedown', e);
                changeIconOpacity(downIcon);
                passengerIsApproaching();
            });
        }
    });

    copilotIndication.play();
}

const passengerIsApproaching = () => {
    const footsteps = new Howl({
        src: [footstepsSound],
        onend: () => carDoorOpened()
    });

    setTimeout(() => {
        footsteps.play();
    }, 3500);

}

const carDoorOpened = () => {
    const openSound = new Howl({
        src: [openCarSound],
        onend: () => passengerSalutesCopilot()
    });

    openSound.play();
}

const passengerSalutesCopilot = () => {
    const salute = new Howl({
        src: [passengerSalutesCopilotSound],
        onend: () => copilotSalutesPassenger()
    });

    salute.play();
}

const copilotSalutesPassenger = () => {
    const salute = new Howl({
        src: [copilotSalutesPassengerSound],
        onend: () => passengerSalutesProtagonist()
    });

    salute.play();
}

const passengerSalutesProtagonist = () => {
    const salute = new Howl({
        src: [passengerSalutesProtagonistSound],
        onend: () => handShake()
    });

    salute.play();
}

const handShake = () => {
    const swipeArea = document.getElementById('swipe-area');
    const hammerManager = new Hammer(swipeArea);

    highFiveIcon.style.display = 'block';

    hammerManager.on('tap', (e) => {
        highFiveIcon.style.display = 'none';

        const salute = new Howl({
            src: [handShakeSound],
        });

        salute.play();

        setTimeout(() => {
            const letsGo = new Howl({
                src: [passengerIsReadyToGoSound],
                onend: () => startMovingTheCar()
            });

            letsGo.play();
        }, 1000);

        hammerManager.off('tap', e);
    });
}

const startMovingTheCar = () => {
    musicIcon.style.display = 'none';
    upIcon.style.display = 'block';

    const swipeArea = document.getElementById('swipe-area');
    const hammerManager = new Hammer(swipeArea);

    hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerManager.on('swipeup', (e) => {
        const accelerateAction = new Howl({
            src: [carAccelerateSound],
        });

        accelerateAction.play();

        changeIconOpacity(upIcon);
        hammerManager.off('swipeup', e);
    });
}
