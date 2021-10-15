const ponyNames = ['Twilight Sparkle', 'Fluttershy', 'Applejack', 'Rainbow Dash', 'Rarity', 'Pinkie Pie'];

export const randomName = () => {
    let random = Math.floor(Math.random() * ponyNames.length);
    return ponyNames[random];
}