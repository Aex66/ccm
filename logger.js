export class Logger {
    static log(message) {
        console.warn(`§a(CCM) [LOG]: §b${message}`);
    }
    static warn(message) {
        console.warn(`§e(CCM) [CCM] > [WARN]: §c${message}`);
    }
}
