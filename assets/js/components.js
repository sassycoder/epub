'use strict';

		$(window).load(function() {

			var header = $('header'),
					navBtn = $('.nav-btn'),
					//navlink = $('.nav-link'),
					expBtn = $('.bttn-exp'),
					expBtnText = $('.bttn-exp').text(),
					techFrame,
					$window = $(window),
					vidWrapper = $('.video-player'),
					btnPlay = $('.vid-btn'),
					btnText = btnPlay.text(),
					//poster = $('.vid-ph'),
					iframe = $('#vid1')[0],
					vid = $f(iframe),
					vidPlaying = false,
					owl = $('.owl-carousel'),
					readMore = $('.read-more'),
					$newsTemplate = $('.hbs-news-posts'),

					getNewsPosts = function () {
						var template;
						$.ajax({
							url: 'http://www.rhapsodymedia.co.uk/blog/?json=get_recent_posts&count=3',
							dataType: 'jsonp',
							success: function (data) {
								if (data) {
									//handlebars
									template = Rhapsody.Templates.newspost;
									$newsTemplate.append(template(data));
								}
							},
							complete: function () {
								$newsTemplate.removeClass('loading');
							},
							error: function (jqXHR) {
								$newsTemplate
								.html('<p>No news items at the moment, please check back soon!</p>')
								.removeClass('loading');
								console.log('ERROR: News posts ' + jqXHR.status + ' ' + jqXHR.statusText + ' - Suggest checking the JSON url');
							}
						});
					},

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
					  }

						// if ($window.scrollTop() > 580 && vidPlaying) {
						// 	vid.api('pause');
						// }
					},

					resizeHero = function (isMobile) {
						if (isMobile) {
							var vHeight = $window.height();
							vidWrapper.css('height', vHeight + 'px');
						} else {
							vidWrapper.css('height', 'auto');
						}
					},

					handleNav = function (e) {
						header.toggleClass('menu-open');
						header.hasClass('fixed') ? {} : header.addClass('fixed');
						e.preventDefault();
					},

					// handleNavLink = function (e) {
					// 	header.removeClass('menu-open');
					// 	e.preventDefault();
					// },

					carouselData = {
						0:{
							heading: 'The ePublish workflow: Overview',
							txt: 'Our three stage delivery starts with tagging print Adobe Indesign files. These are uploaded to our ePublish system where the user adds in interactive elements such as roll overs and videos. HTML is them exported from the CMS to any file format.',
							bg: '#a5c3c9'
						},
						1:{
							heading: 'The ePublish workflow: Tag and Export',
							txt: 'The first stage starts with the user tagging up their InDesign document, they then select the template which they would like to export the content to and them export this via an XML feed to the CMS',
							bg: '#efd32b'
						},
						2:{
							heading: 'The ePublish workflow: Edit & Collate',
							txt: 'Once the content is in the CMS the user adds in their interactions such as videos, rollovers or carousels. When they have finished the app they then export the content using PugPig or Adobe DPS.',
							bg: '#c3c4af'
						},
						3:{
							heading: 'The ePublish workflow: Publish & Deliver',
							txt: 'Finally the user pushed content to the various news stand where they can be downloaded as iOS, Android, Windows 8 or Adobe DPS apps or viewed as a responsive website.',
							bg: '#efd32b'
						}
					},

					handleCarousel = function (e) {
						var $this = $(this);

						if ($this.hasClass('tech')) {
							 owl.trigger('to.owl.carousel', 0);
							 $this.removeClass('tech');
							 $this.text(expBtnText);
						} else {
							owl.hasClass('owl-responsive-0') ? techFrame = 3 : techFrame = 1;
							owl.trigger('to.owl.carousel', techFrame);
							$this.addClass('tech');
							$this.text('Back To Simple  explanation');
						}
						e.preventDefault();
					},

					handleCarData = function (slide) {
						var index;

						if (slide <= 2) {
							index = 0;
						} else if (slide > 2 && slide <= 5) {
							index = 1;
						} else if (slide > 5 && slide <= 8) {
							index = 2;
						} else {
							index = 3;
						}

						$('.carHeading').text(carouselData[index].heading);
						$('.carTxt').text(carouselData[index].txt);
						$('.carBg').css('background', carouselData[index].bg);
					},

					setCapHeight = function (reverse) {
						if (reverse) {
							$('.cap').css('height', 'auto');
						} else {
							$('.cap').css('height', $('.partner-text').height() + 'px');
						}
					},

					handleCap = function (e) {
						var $this = $(this),
								$text = $this.parent().prev('.cap');

						$text.toggleClass('un-cap');

						if ($text.hasClass('un-cap')) {
							$this.text('Read less');
						} else {
							$this.text('Read more...');
						}

						e.preventDefault();
					},

					initMap = function () {
						// Basic options for a simple Google Map
						// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
						// API key (referenced in the script includes in footer) is generated from rhapsody.dps@gmail.com
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

						var infowindow = new google.maps.InfoWindow(),
								boxText = document.createElement('div');
								boxText.innerHTML = '<strong>Rhapsody Ltd</strong><br><br>109-123 Clifton Street,<br>London,<br>EC2A 4LD';

						google.maps.event.addListener(marker, 'click', function() {
							infowindow.setContent(boxText);
							infowindow.open(map, marker);
						});


					};

					//  format an ISO date using Moment.js
					//  http://momentjs.com/
					//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
					//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
					Handlebars.registerHelper('dateFormat', function(context, block) {
						if (window.moment) {
							var f = block.hash.format || 'MMMM Do YYYY, h:mm:ss a';
							return moment(context).format(f); //had to remove Date(context)
						}else{
							return context;   //  moment plugin not available. return data as is.
						}
					});

					vid.addEvent('ready', function() {
						vid.addEvent('pause', function () { vidPlaying = false;});
						vid.addEvent('finish', vidFinished);
						vid.addEvent('playProgress', function () { vidPlaying = true;});
					});

					getNewsPosts();
					initMap();
					$window.on('scroll', handleScrollFn);
					navBtn.on('click', handleNav);
					// navlink.on('click', handleNavLink);
					$('.vid-btn').on('click', playVid);
					expBtn.on('click', handleCarousel);
					$(header).scrollupbar();
					$(readMore).on('click', handleCap);

					handleScrollFn();

					if ($window.innerWidth() < 1025) {
						resizeHero(true);
					}

					if ($window.innerWidth() < 481) {
						setCapHeight();
					}

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
							slide = e.item.index,
							lastItemIndex = e.item.count-1,
							lastDotIndex = (dots.length)-1;
					
					if (items.eq(lastItemIndex).hasClass('active')) {
						dots.removeClass('active').eq(lastDotIndex).addClass('active');
					}

					handleCarData(slide);
				});

				jQuery.validator.addMethod('checkEmail', function(value) {
					if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
						return true;
					}
					return false;
				});

				$('#contactForm').validate({
					submitHandler: function(form, e) {
						e.preventDefault();

						//Prevent spammers - if this hidden field has data (populated by robots) then don't submit form
						if ($('#fax').val().length > 0) {
							return false;
						}

						var getForm = $(form);
						$.post('save-data.php',{ data: getForm.serialize() }, function( response ){
							if ( response == '1' ) {
								getForm[0].reset();
								getForm.find('.field-row').removeClass('valid');
								$('#modalSuccess').addClass('fade-in');
								setTimeout(function(){$('#modalSuccess').removeClass('fade-in');},4000);
							}
							else {
								$('#modalFail').addClass('fade-in');
								setTimeout(function(){$('#modalFail').removeClass('fade-in');},4000);
							}
						});
					},
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
							checkEmail: true,
							required: true
						},
						phone: {
							required: {
								depends: function(element) {
									return $(element).val().length > 0;
								}
							}
						},
					},
					errorPlacement: function(error, element) {
						$(element).parent().removeClass('valid').addClass('invalid');
					},
					success: function(label, element) {
						$(element).parent().removeClass('invalid').addClass('valid');
					}
				});

			$window.on('resize', function () {
				if ($(this).innerWidth() < 1025) {
					resizeHero(true);
					setCapHeight(true);
				} else {
					resizeHero(false);
				}

				if ($(this).innerWidth() < 481) {
					setCapHeight();
				}
			});
		});
this["Rhapsody"] = this["Rhapsody"] || {};
this["Rhapsody"]["Templates"] = this["Rhapsody"]["Templates"] || {};

this["Rhapsody"]["Templates"]["newspost"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<div class=\"pane news-item\">\n	<a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.attachments : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\"news item\"></a>\n	<p class=\"news-date\">"
    + escapeExpression(((helpers.dateFormat || (depth0 && depth0.dateFormat) || helperMissing).call(depth0, (depth0 != null ? depth0.date : depth0), {"name":"dateFormat","hash":{
    'format': ("MMMM Do, YYYY")
  },"data":data})))
    + "</p>\n	<p class=\"news-title\"><a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></p>\n	<div class=\"news-desc\">";
  stack1 = lambda((depth0 != null ? depth0.excerpt : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.posts : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});