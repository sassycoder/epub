$(function () {
	'use strict';
	var $document = $(document),
		targetEl,
		offsetHeight,
		coords,
		parentCoords = $(targetEl).parent().offset(),
		closeFn = function (ev) {
			if ((ev === undefined) || $(ev.target).closest(targetEl).length === 0) {
				$(targetEl).hide();
				$(this).removeClass('active');
			} else {
				$document.one('click', closeFn);
			}
		};

	$document.on('click', '.show-dialog', function (ev) {
		var $this = $(this);
			targetEl = $this.data('target-element');
			offsetHeight = $this.height();
			coords = $this.offset();
			parentCoords = $(targetEl).parent().offset();

		if ($this.hasClass('active')) {
			$(targetEl).hide();
			$this.toggleClass('active');
			$document.off('click', closeFn);
		} else {
			if ($(window).innerWidth() < 1023) {
				$('.nav').find('.nav-btn').removeClass('open');
				$('.nav').find('.megamenu-list').hide();
			}

			$(targetEl).show().css({
				top: (coords.top - parentCoords.top) + offsetHeight,
				left: ((coords.left + ($this.width()/2)) - ($(targetEl).width() + parentCoords.left))
			});
			$(targetEl).find('#username').focus();
			$this.toggleClass('active');
			$document.one('click', closeFn);
		}

		ev.preventDefault();
	});

	$(window).on('resize', function () {
		closeFn();
	});

});