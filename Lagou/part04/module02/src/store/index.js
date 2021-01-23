import { observable, computed, action } from 'mobx';

export default class AppleStore {
    @observable apples = [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ];
    @observable newAppleId = 3;
    @observable isPicking = false;
    @observable buttonText = '摘苹果';

    @computed
    get status() {
        const status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        this.apples.forEach(apple => {
            let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
            status[selector].quantity++;
            status[selector].weight += apple.weight;
        });
        return status;
    }

    @action
    pickApple = () => {
        if (this.isPicking) {
            return;
        }

        this.isPicking = true;
        this.buttonText = '正在采摘...';
        fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
            .then(() => {
                let weight = Math.floor(200 + Math.random() * 50);
                this.isPicking = false;
                this.buttonText = '摘苹果';
                this.apples.push({
                    id: this.newAppleId++,
                    weight: weight,
                    isEaten: false
                });
            });
    }

    @action
    eatApple = (appleId) => {
        let targetIndex = '';
        this.apples.forEach((apple, index) => {
            if (apple.id == appleId) {
                targetIndex = index
            }
        });
        this.apples[targetIndex].isEaten = true;
    }

}
