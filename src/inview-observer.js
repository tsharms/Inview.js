/*------------------------------------------------------------------------*/
/*  SIMPLE INVIEW PLUGIN
/*------------------------------------------------------------------------*/

const Inview = (() => {
    let settings;
    let observer;

    const defaults = {
        element: '.js-inview-element',
        observerOptions: {
            rootMargin: '0px 0px',
            threshold: 0.5
        },
        data: {
            delay: 'data-inview-delay'
        },
        classes: {
            inview: 'is-inview'
        }
    };

    /**
     * Check is element is in view
     * If element is in view add a class to it
     * Also checks if element has delay data attribute
     */
    const checkInView = entries => {

        entries.forEach(entry => {
            const { isIntersecting, target } = entry;

            if (isIntersecting) {
                const delay = target.getAttribute(settings.data.delay);

                observer.unobserve(target);

                if(delay) {
                    setTimeout(() => {
                        target.classList.add(settings.classes.inview);    
                    }, parseInt(delay));
                } else {
                    target.classList.add(settings.classes.inview);
                }
            }
        });
    };

    /**
     * Bind all events to make a whole block clickable
     */
    const _bindEvents = () => {
        window.addEventListener('inview-reinit', _setup);
    };
 
    /**
     * Setup link plugin
     */
    const _setup = () => {
        const inviewElements = document.querySelectorAll(settings.element);
        const options = settings.observerOptions;

		observer = new IntersectionObserver(checkInView, options);

        inviewElements.forEach(element => {
            observer.observe(element);
        });

		_bindEvents();
    };

    /**
     * Cleanup plugin variables and remove event listeners 
     */
    const destroy = () => {
        settings = {};
        observer = false;

        window.removeEventListener('inview-reinit', _setup);
    }

    /**
     * Init plugin and checks if there are link element
     * 
     * @param {Object} options This object overrides defaults
     */
    const init = options => {
        // Setup settings.
        options = options || {};
        settings = {...defaults, ...options};

        _setup();
    };

    // Return an object exposed to the public
    return { init, destroy, checkInView };
});

export default Inview;
