$(function () {
	'use strict';

	var facets = $('.facets .sub-items');

	$(facets).hide();

	$(document).on('click', '.facets .item', function(e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.toggleClass('active').blur().next('.sub-items').hide();
		} else {
			$this.toggleClass('active').next('.sub-items').show();
		}
	});
			
});