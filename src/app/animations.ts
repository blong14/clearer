import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateY(-3px)'
      }),
      animate('.5s ease-in')
    ]),
    transition('* => void', [
      animate('.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(3px)'
      }))
    ])
  ]);
