$(function () {

'use strict';

var $document = $(document),
		panelHeaders = $('.panel-header');


		$(panelHeaders).each(function (i) {
			if (i === 0) {
				$(this).addClass('first');
				return;
			}
		});

	$document.on('click', '.panel-header', function (ev) {
		if ($(window).innerWidth() < 768) {
			var $this = $(this);

			if ($this.hasClass('active')) {
				$(this).next('.panel').slideUp('fast', function () {
					$this.toggleClass('active');
				});
			} else {
				$this.toggleClass('active');
				$(this).next('.panel').slideDown('fast');
			}
		}
		ev.preventDefault();
	});


	var windowWidth = $(window).innerWidth();

	$(window).on('resize', function () {
		if ($(window).width() != windowWidth) {
			windowWidth = $(window).innerWidth();

			if ($(this).innerWidth() > 767) {
				$('.panel').show();
			} else {
				$('.panel').hide().prev('.panel-header').removeClass('active');
			}
		}
	});
});