import { randomName } from './PonyName';

const api = {
    main: 'https://ponychallenge.trustpilot.com',
    create: 'https://ponychallenge.trustpilot.com/pony-challenge/maze',
    maze: 'https://ponychallenge.trustpilot.com/pony-challenge/maze/'
}

const settingsCreate = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "maze-width": 20,
        "maze-height": 20,
        "maze-player-name": randomName(),
        "difficulty": 5
    })
}

export const newMaze = async () => {
    try {
        const requestMaze = await fetch(api.create, settingsCreate);
        const data = await requestMaze.json();
        console.log(data.maze_id);
        return data.maze_id;
    } catch (err) {
        return console.log(err);
    }

}