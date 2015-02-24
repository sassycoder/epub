'use strict';

		$(window).load(function() {

			var header = $('header'),
					navBtn = $('.nav-btn'),
					expBtn = $('.bttn-exp'),
					expBtnText = $('.bttn-exp').text(),
					$window = $(window),
					vidWrapper = $('.video-player'),
					btnPlay = $('.vid-btn'),
					btnText = btnPlay.text(),
					poster = $('.vid-ph'),
					iframe = $('#vid1')[0],
        	vid = $f(iframe),
        	vidPlaying = false,
        	owl = $('.owl-carousel'),		

					playVid = function (e) {
						if (vidPlaying) {
							$(vidWrapper).removeClass('vid-playing');
							vid.api('pause');
							btnPlay.text(btnText);	
							vidPlaying = false;

						} else {
							$(vidWrapper).addClass('vid-playing');
							vid.api('play');
							btnPlay.text('Close video');
							vidPlaying = true;
						}
						$(this).blur();
						e.preventDefault();
					},

					vidFinished = function () {
						$(vidWrapper).removeClass('vid-playing');
						btnPlay.text(btnText);
					},

					handleScrollFn = function () {
						if ($window.scrollTop() > 250) {
					    header.addClass('fixed').removeClass('menu-open');
					  } else {
					    header.removeClass('fixed menu-open');
					  };

					  // if ($window.scrollTop() > 580 && vidPlaying) {
					  // 	vid.api('pause');
					  // }
					},

					handleNav = function (e) {
						header.toggleClass('menu-open');
						header.hasClass('fixed') ? {} : header.addClass('fixed');
						e.preventDefault();
					},

					handleCarousel = function (e) {
						var $this = $(this);

						if ($this.hasClass('tech')) {
							 owl.trigger('to.owl.carousel', 1);
							 $this.removeClass('tech');
							 $this.text('Back To Simple  explanation');
						} else {
							owl.trigger('to.owl.carousel', 4);
							$this.addClass('tech');
							$this.text(expBtnText);
							
						}

						e.preventDefault();
					},

					initMap = function () {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 17,
                panControl: false,
                mapTypeControl: false,
                zoomControl: false,
                scrollwheel: false,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(51.5236779, -0.0833322), // Rhapsody

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{'featureType':'landscape','stylers':[{'saturation':-100},{'lightness':65},{'visibility':'on'}]},{'featureType':'poi','stylers':[{'saturation':-100},{'lightness':51},{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'road.arterial','stylers':[{'saturation':-100},{'lightness':30},{'visibility':'on'}]},{'featureType':'road.local','stylers':[{'saturation':-100},{'lightness':40},{'visibility':'on'}]},{'featureType':'transit','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'administrative.province','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':-25},{'saturation':-100}]},{'featureType':'water','elementType':'geometry','stylers':[{'hue':'#ffff00'},{'lightness':-25},{'saturation':-97}]}]
            };

            // Get the HTML DOM element that will contain your map 
            // We are using a div with id='map' seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(51.5236779, -0.0833322),
                map: map,
                icon: 'assets/img/structure/map-marker.png',
                title: 'Rhapsody Media'
            });
        	};

        	vid.addEvent('ready', function() {
		        vid.addEvent('pause', function () { vidPlaying = false;});
		        vid.addEvent('finish', vidFinished);
		        vid.addEvent('playProgress', function () { vidPlaying = true;});
			    });

        initMap();
        $window.on('scroll', handleScrollFn);
        navBtn.on('click', handleNav);    
        $('.vid-btn').on('click', playVid);
        expBtn.on('click', handleCarousel);  

        handleScrollFn();

        owl.owlCarousel({
				    items: 3,
				    responsiveClass: true,
				    nav: true,
				    responsive:{
				        0:{
				            items:1
				        },
				        480: {
				        	items: 2
				        },
				        767:{
				            items:3
				        },
				        1024:{
				            items:3
				        }
				    }
				});

				owl.on('translated.owl.carousel', function(e){
					var $this = $(this),
							items = $this.find('.owl-item'),
							dots = $this.find('.owl-dot'),
							lastItemIndex = e.item.count-1,
							lastDotIndex = (dots.length)-1;
					
					if (items.eq(lastItemIndex).hasClass('active')) {
						dots.removeClass('active').eq(lastDotIndex).addClass('active');
					}
				});
        
        $('#contactForm').validate({
        	focusInvalid: true,
				  rules: {
				  	name: {
				  		required: true
				  	},
				  	jobTitle: {
				  		required: {
				    		depends: function(element) {
				          return $(element).val().length > 0;
				        }
				    	}
				  	},
				  	company: {
				  		required: {
				    		depends: function(element) {
				          return $(element).val().length > 0;
				        }
				    	}
				  	},
				  	email: {
				    	required: {
				    		depends: function(element) {
				          return $(element).val().length > 0;
				        }
				    	},
				      email: true
				    },
				  	phone: {
				  		required: true
				  	},
				  	pub: {
				  		required: {
				    		depends: function(element) {
				          return $(element).val().length > 0;
				        }
				    	}
				  	}
				  },
				  errorPlacement: function(error, element) {
				      $(element).parent().removeClass('valid').addClass('invalid');
			    },
			    success: function(label, element) {
				    $(element).parent().removeClass('invalid').addClass('valid');
				  }
				});
		});