import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from "@angular/animations";

/**
 * Enumeration of {@link Animations} expand animation states.
 */
export enum ExpandStates{  open="open", closed="closed" }
/**
 * Enumeration of {@link Animations} scale animation states
 */
export enum ScaleStates{  scale="scale", normal="normal" }
/**
 * Enumeration of {@link Animations} highlight states
 */
export enum HighlightStates{  highlight="highlight", normal="normal"  }
/**
 * Enumeration of {@link Animations} fade states
 */
export enum FadeStates { in="in", out="out" }
/**
 * Enumeration of triggers for {@link Animations}.
 */
export enum AnimationTriggers{
    expand="expand", scale="scale", highlight="highlight", 
    fade="fade", slide="slide", float="float"
}
/**
 * Enumeration of animation lengths for {@link Animations}
 */
export enum AnimationPeriods{
    short=0.5, medium=1,long=2
}

/**
 * # Animations
 * ## Description
 * Static factory for `AnimationTriggerMetaData`
 * ## Example Usage
 * Use static functions within this class in the `animations` attribute of the `@Component` annotation of an **Angular** Component to register animations with the template, i.e.,
 * ```typescript
 * @Component({
 *  selector: 'app-component',
 *  templateUrl: './component.component.html',
 *  styleUrls: ['./component.component.css'],
 *  animations: [
 *      Animations.getExpandTrigger('5%')
 *  ]
 * })
 * ```
 * This will expose the animation directive in the Component template HTML. Before using the directive, define a control variable using {@link AnimationControl} within the Component typescript class to bind to the directive,
 * ```javascript
 * export class Component{
 *  public animation: AnimationControl = new AnimationControl(AnimationTriggers.expand)
 *  # ...
 * }
 * ```
 * Then, to invoke the animation, add the directive to an HTML element and bind it to the `state` of the {@link AnimationControl},
 * ```html
 * <app-component [@expand]="animation.state"></app-component>
 * ```
 * Changing the state of the {@link AnimationControl} will cause the animation to fire. States are enumerated through exported `enum`s within the *animations.ts* module.
 */
export class Animations{

    /**
     * # Description
     * Get animation trigger for expanding an element to a given height over a specific time period.
     * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.)
     * @returns animation expand trigger
     */
    public static getExpandTrigger(toHeight: string, animateLength: number = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.expand,[
            state(ExpandStates.open, style({ 
                height: `${toHeight}`, opacity: 1
            })),
            state(ExpandStates.closed, style({ 
                height: '0', opacity: 0 
            })),
            transition(`${ExpandStates.open} <=> ${ExpandStates.closed}`,[
                animate(`${animateLength}s`)
            ])
        ])
    }

    /**
     * # Description
     * Get animation trigger for scaling an element by a given factor over a specified time period
     * @param scaleFactor scale factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.)
     * @returns animation scale trigger
     */
    public static getScaleTrigger(scaleFactor: number, animateLength: number = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.scale, [
            state(ScaleStates.scale, style({
                transform: `scale(${scaleFactor}, ${scaleFactor})`
            })),
            transition(`void <=> ${ScaleStates.scale}`, [
                animate(`${animateLength}s`)
            ])
        ])
    }

    /**
     * # Get animation trigger for highlighting an element by a given factor over a specified time period.
     * @param scaleFactor highlight factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.)
     * @returns animation scale trigger
     */
     public static getHighlightTrigger(highlightFactor: number, animateLength: number = AnimationPeriods.short)
     : AnimationTriggerMetadata {
         return trigger(AnimationTriggers.highlight, [
             state(HighlightStates.highlight, style({
                 filter: `brightness(${highlightFactor})`
             })),
             transition(`void <=> ${ScaleStates.scale}`, [
                 animate(`${animateLength}s`)
             ])
         ])
     }

     /**
      * 
      * @param animateLength 
      * @returns 
      */
     public static getFadeTrigger(animateLength: number = AnimationPeriods.medium)
     : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.fade, [
            state(FadeStates.in, style({
                opacity: 1
            })),
            state(FadeStates.out, style({
                opacity: 0
            })),
            transition(':enter', [
                style({opacity: 1}),
                animate(`${animateLength}s`)
            ]),
            transition(':leave', [
                style({opacity: 0}),
                animate(`${animateLength}s`)
            ]),
            transition(`${FadeStates.in} <=> ${FadeStates.out}`, [
                animate(`${animateLength}s`)
            ])
        ])
     }

     public static getSlideTrigger(animateLength: number = AnimationPeriods.medium)
     : AnimationTriggerMetadata {
         return trigger(AnimationTriggers.slide, [
            transition(':enter',
                animate(`${animateLength}s`, keyframes([
                    style({ transform: 'translateX(-100%)', offset: 0}),
                    style({ transform: 'translateX(-75%)', offset: 0.25}),
                    style({ transform: 'translateX(-50%)', offset: 0.50}),
                    style({ transform: 'translateX(-25%)', offset: 0.75}),
                    style({ transform: 'translateX(0%)', offset: 1})
                ]))
            ),
            transition(':leave', 
                animate(`${animateLength}s`, keyframes([
                    style({ transform: 'translateX(100%)', offset: 0}),
                    style({ transform: 'translateX(75%)', offset: 0.25}),
                    style({ transform: 'translateX(50%)', offset: 0.50}),
                    style({ transform: 'translateX(25%)', offset: 0.75}),
                    style({ transform: 'translateX(0%)', offset: 1}) 
                ]))
            )
        ])
     }

    public static getFloatTrigger(animateLength: number = AnimationPeriods.medium)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.float, [
        transition(':leave',
            animate(`${animateLength}s`, keyframes([
                style({ transform: 'translateY(-100%)', offset: 0}),
                style({ transform: 'translateY(-75%)', offset: 0.25}),
                style({ transform: 'translateY(-50%)', offset: 0.50}),
                style({ transform: 'translateY(-25%)', offset: 0.75}),
                style({ transform: 'translateY(0%)', offset: 1})
            ]))
        ),
        transition(':enter', 
            animate(`${animateLength}s`, keyframes([
                style({ transform: 'translateY(100%)', offset: 0}),
                style({ transform: 'translateY(75%)', offset: 0.25}),
                style({ transform: 'translateY(50%)', offset: 0.50}),
                style({ transform: 'translateY(25%)', offset: 0.75}),
                style({ transform: 'translateY(0%)', offset: 1}) 
            ]))
        )
    ])
    }
}

/**
 * # Description
 * Class for handling the state of an animated HTML element. See {@link Animations} for example usage.
 */
export class AnimationControl{
    public animationType : AnimationTriggers;
    public state !: string;

    constructor(type: AnimationTriggers){
        this.animationType = type;
        this.prime();
    }

    /**
     * Trigger {@link AnimationControl} by switching the appropriate {@link state} based on the {@link animationType}
     */
    public animate() { 
        switch(this.animationType){
            case AnimationTriggers.expand:
                this.state = ExpandStates.open;
                break;
            case AnimationTriggers.highlight:
                this.state = HighlightStates.highlight;
                break;
            case AnimationTriggers.scale:
                this.state = ScaleStates.scale;
                break;
        }
    }

    /**
     * Return {@link AnimationControl} to its initial {@link state} and prime for another animation based on the {@link animationType}
     */
    public prime(){
        switch(this.animationType){
            case AnimationTriggers.expand:
                this.state = ExpandStates.closed;
                break;
            case AnimationTriggers.highlight:
                this.state = HighlightStates.normal;
                break;
            case AnimationTriggers.scale:
                this.state = ScaleStates.normal;
                break;
        }
    }

    /**
     * # Description
     * Sets {@link AnimationControl} to new {@link state}. The {@link state} must match the {@link animationType}, i.e. if `animationType=='highlight'`, then the allowable values of {@link state} are `highlight` and `normal`. Animation states are enumeration through exported `enum`s of the *animations.ts* module.
     * @param newState animation state
     */
    public setState(newState: string): void { this.state = newState; }
}