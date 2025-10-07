/**
 * Lotus Menu - Interactive Radial Navigation
 * 
 * Handles the interactive behavior of the lotus flower menu system
 * including hover effects, click navigation, and multi-level menu display
 */

$(document).ready(function () {
	// Cache DOM elements for better performance
	const $menu = $('.menu');
	const $petal = $menu.find('.petal');
	const $title = $('.menu .title');
	const $defaultTitle = $title.html();

	let $currentPetal;
	let hoverState = 1;
	let timeoutId;

	/**
	 * Initialize the menu system
	 */
	function initMenu() {
		bindMainPetalEvents();
		bindSubMenuEvents();
		bindClickEvents();
		bindMouseLeaveEvents();
	}

	/**
	 * Handle main petal interactions (hover and click)
	 */
	function bindMainPetalEvents() {
		$('.petal > .leaf').on('click mouseenter', function (e) {
			clearTimeout(timeoutId);
			hoverState = 1;

			const $this = $(this);
			const $submenu = $this.next('.sub-menu');

			// Prevent navigation on first click
			if (!$this.hasClass('clicked')) {
				e.preventDefault();
			}

			handlePetalActivation($this, $submenu);
			updateTitle($this);
		});
	}

	/**
	 * Handle sub-menu item interactions
	 */
	function bindSubMenuEvents() {
		$('.sub-menu > li > .leaf').on('click mouseenter', function (e) {
			clearTimeout(timeoutId);
			hoverState = 1;

			const $this = $(this);
			const $submenu = $this.next('.sub-menu');

			// Prevent navigation on first click
			if (!$this.hasClass('clicked')) {
				e.preventDefault();
			}

			handleSubMenuActivation($this, $submenu);
			updateSubMenuTitle($this);
		});
	}

	/**
	 * Handle click events for navigation
	 */
	function bindClickEvents() {
		$('.leaf').on('click', function (e) {
			const $this = $(this);

			if ($this.hasClass('clicked')) {
				// Second click - navigate to URL
				window.location = this.href;
				return false;
			} else {
				// First click - mark as clicked for next interaction
				$this.addClass('clicked');
			}
		});
	}

	/**
	 * Handle mouse leave events with special timing for petal-three
	 */
	function bindMouseLeaveEvents() {
		$petal.on('mouseleave', function () {
			const $currentPetal = $(this);

			if ($currentPetal.hasClass('petal-three')) {
				// Special delayed behavior for petal-three
				hoverState = 0;
				timeoutId = setTimeout(function () {
					if (hoverState === 0) {
						resetPetalState($currentPetal);
						resetTitle();
					}
				}, 400);
			} else {
				// Immediate reset for other petals
				resetPetalState($currentPetal);
				resetTitle();
			}
		});
	}

	/**
	 * Activate a main petal and its submenu
	 */
	function handlePetalActivation($petal, $submenu) {
		$currentPetal = $petal.parents('.petal');
		$currentPetal.addClass('open');

		// Reset other petals
		$('.menu .petal:not(.open)').each(function () {
			$(this).find('.sub-menu, .leaf').removeClass('active');
			$(this).find('li').removeClass('false-hidden');
		});

		$currentPetal.removeClass('open');

		// Activate current petal
		$currentPetal.find('.leaf').removeClass('active');
		$petal.addClass('active');
		$submenu.addClass('active');
		$submenu.find('li').removeClass('false-hidden');
		$submenu.find('.sub-menu').removeClass('active');
	}

	/**
	 * Handle sub-menu item activation
	 */
	function handleSubMenuActivation($item, $submenu) {
		if ($submenu.hasClass('active')) {
			// Deactivate if already active
			$submenu.find('.leaf').removeClass('active');
			$submenu.find('li').removeClass('false-hidden');
			$submenu.find('.sub-menu').removeClass('active');

			// Clear title if no subtext
			if (!$item.attr('data-subtext')) {
				$('.menu .title').find('h5').empty();
			}
			$('.menu .title').find('p').empty();
		} else {
			// Activate submenu
			$item.parent('li').siblings('li').find('.leaf').removeClass('active');
			$item.addClass('active');
			$submenu.addClass('active');

			// Hide siblings if this has a submenu
			if ($item.parents('.sub-menu').length > 0 && $submenu.length > 0) {
				$item.parent('li').siblings('li').addClass('false-hidden');
			}
		}
	}

	/**
	 * Update main title based on petal data
	 */
	function updateTitle($petal) {
		const title = $petal.attr('data-title');
		if (title) {
			$title.empty();
			$title.append(`<h2>${title}</h2><h3></h3><h5></h5><p></p>`);
		}
	}

	/**
	 * Update sub-menu titles based on item data
	 */
	function updateSubMenuTitle($item) {
		const $petalClass = $item.parents('li.petal').attr('data-color');
		const subtitle = $item.attr('data-subtitle');
		const subtext = $item.attr('data-subtext');
		const paratext = $item.attr('data-paratext');

		if (subtitle) {
			$title.find('h3').empty().addClass($petalClass).text(subtitle);
		}
		if (subtext) {
			$title.find('h5').empty().addClass($petalClass).text(subtext);
		}
		if (paratext) {
			$title.find('p').empty().addClass($petalClass).text(paratext);
		}
	}

	/**
	 * Reset petal state to default
	 */
	function resetPetalState($petal) {
		$petal.find('.sub-menu').removeClass('active');
		$petal.find('.leaf').removeClass('active');
		$petal.find('li').removeClass('false-hidden');
	}

	/**
	 * Reset title to default state
	 */
	function resetTitle() {
		$title.html($defaultTitle);
	}

	// Initialize the menu when document is ready
	initMenu();
});
