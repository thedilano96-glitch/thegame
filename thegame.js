class UserConfig {
    constructor() {
        this.country = 'CM'; // Default country
        this.language = 'en';
        this.currencyInfo = { symbol: 'FCFA', rate: 600 };
        this.detectLocation();
    }

    async detectLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const data = await response.json();
                this.country = data.country_code || 'CM';
                this.updateCurrency();
            }
        } catch (e) {
            console.log("IP detection failed, using defaults");
        }
    }

    updateCurrency() {
        const currencies = {
            'CM': { symbol: 'FCFA', rate: 600 },
            'FR': { symbol: '€', rate: 1 },
            'US': { symbol: '$', rate: 1.08 },
            'CI': { symbol: 'FCFA', rate: 600 },
            'SN': { symbol: 'FCFA', rate: 600 }
        };
        this.currencyInfo = currencies[this.country] || { symbol: 'FCFA', rate: 600 };
    }

    formatPrice(priceInEUR) {
        if (this.currencyInfo.symbol === 'FCFA') {
            return `${Math.round(priceInEUR * 600).toLocaleString('en-US')} FCFA`;
        }
        return `${(priceInEUR * this.currencyInfo.rate).toFixed(2)} ${this.currencyInfo.symbol}`;
    }

    getText(key) {
        const translations = {
            en: {
                welcome: "Welcome to The Game!",
                play: "Play",
                buy_coins: "Buy 100 Coins"
            }
        };
        return translations.en[key] || key;
    }
}

class Game {
    constructor() {
        this.user = new UserConfig();
    }
}

const gameInstance = new Game();
