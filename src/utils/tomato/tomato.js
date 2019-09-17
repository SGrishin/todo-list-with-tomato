import { TEST_TOMATO, SHORT_TOMATO, LONG_TOMATO } from '../../constants';

const tomatoFabric = (tomatoes) => {
    let stage = 0;

    return {
        next: () => {
            if (stage === 8)  {
                stage = 0;
            }
    
            return tomatoes[stage++];
        },
        clear: () => {
            stage = 0;
        },
        isTimeout: () => {
            return (stage - 1) % 2 === 1;
        }
    };
};

export const testTomato = tomatoFabric(TEST_TOMATO);

export const shortTomato = tomatoFabric(SHORT_TOMATO);

export const longTomato = tomatoFabric(LONG_TOMATO);
