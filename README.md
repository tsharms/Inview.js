# inview-observer.js plugin

This plugin is created to add simple inview animations to your website. It uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and simple CSS to create elegant inview animations.

## Plugin usage

### Installation
Install package via NPM

`npm i inview-observer.js --save`

### Example HTML
```
<div class="js-inview-element" data-inview-delay="500"></div>
```

### Example SCSS
```
.js-inview-element {
    transition .5s cubic-bezier(.83, 0, .17, 1);
	transition-property: opacity, transform;
	opacity: 0;
}

.js-inview-element.is-inview {
    opacity: 1;
    transform: translate(0, 0)
}
```

### Initialize plugin

```
import InviewObserver from 'inview-observer.js';

document.addEventListener('DOMContentLoaded', () => {
    const inviewObserver = InviewObserver();

    inviewObserver.init();
});
```

## Options 

You can overwrite the default options:

```
inviewObserver.init({
    element: '.js-inview-element',
    observerOptions: {
		rootMargin: '100px 0px',
		threshold: 0.75
    },
    data: {
        delay: 'data-inview-delay'
    },
    classes: {
        inview: 'is-inview'
    },
});
```

| Option      | Type        | Default     | Description 
| ----------- | ----------- | ----------- | ----------- |
| `element` | String | `.js-inview-element` | Element that needs to be animated when inview. |
| `observerOptions` | Object | `{rootMargin: '0px 0px', threshold: 0.5}` | IntersectionObserver options  |
| `data` | Object | `{delay: 'data-inview-delay'}` | Data attribute containing the delay of the inview class |
| `classes` | Object | `{inview: 'is-inview'}` | Class that is added when element is inview |

## Events

We have added an event that you can dispatch if you want to reinit the IntersectionObserver. Especially handy if you have async elements. 

### Example

```
const reInitInview = new Event('inview-reinit');

window.dispatchEvent(reInitInview);
```

