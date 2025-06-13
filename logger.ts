export class Logger {
    static log(message: string){
        console.warn(`§a(CCM) [LOG]: §b${message}`)
    }

    static warn(message: string){
        console.warn(`§e(CCM) [CCM] > [WARN]: §c${message}`)
    }
}