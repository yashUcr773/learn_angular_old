import { animate, AnimationEvent, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('divState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0)',
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(700px)'
            })),
            transition('normal <=> highlighted', animate(300)),
            // transition('highlighted => normal', animate(900)),
        ]),
        trigger('wildState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0) scale(1)',
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(700px) scale(1)'
            })),
            state('shrunken', style({
                backgroundColor: 'green',
                transform: 'translateX(0) scale(0.5)'
            })),
            // transition('normal <=> highlighted', animate(300)),
            transition('normal => highlighted', animate(400)),
            transition('highlighted => normal', animate(900)),
            transition('* <=> shrunken', [
                style({
                    backgroundColor: 'orange'
                }),
                animate(1000, style({
                    borderRadius: '50px'
                })),
                animate(500)
            ])
        ]),
        trigger('list1', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)',
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100px)',
                }),
                animate(300)
            ]),
            transition('* => void', [
                animate(300, style({
                    opacity: 0,
                    transform: 'translateX(100px)',
                }))
            ]),
        ]),
        trigger('list2', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)',
            })),
            transition('void => *', [
                animate(1000, keyframes([
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0,
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3,
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8,
                    }),
                    style({
                        transform: 'translateX(0px)',
                        opacity: 1,
                        offset: 1,
                    }),
                ]))
            ]),
            transition('* => void', [
                group([
                    animate(300, style({
                        color: 'red'
                    })),
                    animate(800, style({
                        opacity: 0,
                        transform: 'translateX(100px)',
                    }))
                ])
            ]),
        ]),
    ]
})
export class AppComponent {
    list: string[] = ['Milk', 'Sugar', 'Bread'];
    animationState = 'normal';
    wildState = 'normal';

    onAdd(item: string) {
        this.list.push(item);
    }

    onDelete(item: string) {
        this.list.splice(this.list.indexOf(item), 1);
    }

    onAnimate() {
        this.animationState === 'normal' ? this.animationState = 'highlighted' : this.animationState = 'normal';
        this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
        this.wildState = 'shrunken'
    }

    animationStarted(event: AnimationEvent) {
        console.log('Animation started');
        console.log(event)
    }
    animationEnded(event: AnimationEvent) {
        console.log('Animation ended');
        console.log(event)
    }
}
