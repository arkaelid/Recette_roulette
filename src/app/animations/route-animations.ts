import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'scale(0.98)'
      })
    ], { optional: true }),
    
    group([
      query(':leave', [
        animate('300ms ease', style({ 
          opacity: 0,
          transform: 'scale(1.02)'
        }))
      ], { optional: true }),
      
      query(':enter', [
        animate('300ms 150ms ease', style({ 
          opacity: 1,
          transform: 'scale(1)'
        }))
      ], { optional: true })
    ])
  ])
]); 